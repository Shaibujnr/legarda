import time
from legarda.api import db
from legarda.api.models import Purchase, Product, User, Transaction, PurchaseInitiatedActivity, TransactionActivity
from flask import current_app
import requests


def get_product_if_available(product_id):
    product: Product = Product.query.get(product_id)
    if product is not None and product.is_available and product.count > 0:
        return product
    return None

def get_owner_and_shared_users(owner_id, user_id_list):
    owner = User.query.get(owner_id)
    shared_users = []
    for user_id in user_id_list:
        shared_users.append(User.query.get(user_id))
    return owner, shared_users


class PurchaseService:

    @staticmethod
    def start_purchase(owner_id, data):
        """
        Starts a product purchase and initiliazes a transaction then returns a code.
        """

        max_number_of_shared_users = 5

        def validate_data():
            """
            Ensure amount to be paid does not exceed product price
            Ensure product exists,
            Ensure number of shared users does not exceed maxnumber
            """
            error = None
            product = get_product_if_available(data['productId'])
            if data['toPay'] > product.price:
                error = {'status': 'fail', 'message': 'You cannot pay more than product price'}
            if not product:
                error = {'status':'fail', 'message':'Product is not available'}
            if len(data['sharedUserIds']) > 5:
                error = {'status':'fail', 'message':'Product can only be shared with 5 other users max.'}
            owner, shared_users = get_owner_and_shared_users(owner_id, data['sharedUserIds'])
            result = (error, 400) if error is not None else (product, owner, shared_users)
            return result


        def generate_transaction_reference(owner: User, product: Product):
            millis = int(round(time.time() * 1000))
            result = "%s-%s-%d-%s-%d"%(owner.username,product.name,product.count,product.name,millis)
            print("\n\n\ngenerated txRef is %s"%result)
            return result


        def get_paystack_payment_url(txRef, amount, email):
            secret_key = current_app.config['PAYSTACK_PRIVATE_KEY']
            endpoint = "https://api.paystack.co/transaction/initialize"
            headers = {
                "Authorization": "Bearer %s"%secret_key,
                "Content-Type": "application/json"
            }
            payload = {
                "reference": txRef, 
                "amount": amount, 
                "email": email
            }
            res = requests.post(endpoint, json=payload, headers=headers)
            print('\n\n\nauth url response is ', res.json())
            if res.status_code == 200:
                data = res.json()
                authorization_url = data['data']['authorization_url']
                print('\n\n\nauthorization url is ', authorization_url)
                return authorization_url
            return None


        try:
            params = validate_data()
            if len(params) == 2 and params[1] == 400:
                return params
            else:
                product, owner, shared_users = params
                new_purchase: Purchase = Purchase( data['count'])
                new_purchase.product_id = product.id
                new_purchase.owner_id = owner.id
                for shared_user in shared_users:
                    new_purchase.shared_users.append(shared_user)
                db.session.add(purchase)
                db.session.flush()

                txRef = generate_transaction_reference(owner, product)
                transaction = Transaction(reference=txRef)
                transaction.purchase = new_purchase
                auth_url = get_paystack_payment_url(transaction.reference, data['toPay'], owner.email)
                if not auth_url:
                    return {'status':'fail', 'message': 'Unable to complete this request please try again'}, 500
                db.session.add(transaction)
                db.session.flush()

                new_activity = PurchaseInitiatedActivity(amount=new_purchase.paid)
                new_activity.purchase_id = new_purchase.id
                db.session.add(new_activity)
                db.session.flush()

                transaction_activity = TransactionActivity()
                transaction_activity.transaction_id = transaction.id
                db.session.add(transaction_activity)
                db.session.flush()
                
                db.session.commit()
                response_object = {
                    'status': 'success',
                    'data': {
                        'id': new_purchase.id,
                        'productId': new_purchase.product_id,
                        'count': new_purchase.count,
                        'paid': new_purchase.paid,
                        'status': new_purchase.status,
                        'owner_id': new_purchase.owner_id,
                        'transaction_id': transaction.id,
                        'auth_url': auth_url
                    }
                }
                return response_object, 201
        except Exception as e:
            db.session.rollback()
            response_object = {
                    'status': 'fail',
                    'message': str(e)
            }
            return response_object, 400

    @staticmethod
    def all():
        """
        Fetches all purchases
        """
        return Purchase.query.all()

    @staticmethod
    def get(purchase_id):
        """
        get a single purchase
        """
        return Purchase.query.get(purchase_id)
    