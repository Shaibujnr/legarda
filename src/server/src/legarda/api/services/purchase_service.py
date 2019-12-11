from legarda.api import db
from legarda.api.models import Purchase, Product


def get_product_If_available(product_id):
    product: Product = Product.query.get(product_id)
    if product is not None and product.is_available and product.count > 0:
        return product
    return None

class PurchaseService:

    @staticmethod
    def start_purchase(data):
        """
        Starts a product purchase
        """
        try:
            product = get_product_If_available(data['productId'])
            if not product:
                response_object = {
                    'status': 'fail',
                    'message': 'Product is not available for purchase'
                }
                return response_object, 400
            else:
                new_purchase: Purchase = Purchase(data['productId'], data.get('count', 1))
                db.session.add(new_purchase)
                db.session.commit()
                response_object = {
                    'status': 'success',
                    'data': {
                        'id': new_purchase.id,
                        'productId': new_purchase.product_id,
                        'count': new_purchase.count,
                        'paid': new_purchase.paid,
                        'status': new_purchase.status
                    }
                }
                return response_object, 201
        except Exception as e:
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
    