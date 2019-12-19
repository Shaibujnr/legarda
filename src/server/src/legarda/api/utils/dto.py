from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations', path='/')
    user = api.model('user', {
        'id': fields.Integer(description='user id'),
        'firstName': fields.String(required=True, description='user first name'),
        'lastName': fields.String(required=True, description='user last name'),
        'email': fields.String(required=True, description='user email address'),
        'username': fields.String(required=True, description='user username'),
        'password': fields.String(required=True, description='user password')
    })

class AuthDto:
    api = Namespace('auth', description='authentication related operations', path='/auth')
    user_auth = api.model('auth_details', {
        'name': fields.String(required=True, description='The email address or username'),
        'password': fields.String(required=True, description='The user password '),
    })

class CategoryDto:
    api = Namespace('category', description='category related operations', path='/')
    category = api.model('category', {
        'id': fields.Integer(description='category id'),
        'name': fields.String(required=True, description='category name')
    })

class ProductDto:
    api = Namespace('product', description='product related operations', path='/')
    product = api.model('product', {
        'id': fields.Integer(description='product id'),
        'name': fields.String(required=True, description='product name'),
        'manufacturer': fields.String(description='product manufacturer'),
        'price': fields.Float(required=True, description='product price'),
        'location': fields.String(required=True, description='product location'),
        'count': fields.Integer(description='number of products available'),
        'dateCreated': fields.DateTime(description='date created')
    })

class PurchaseDto:
    api = Namespace('purchase', description='purchase related operations', path='/')
    purchase = api.model('purchase', {
        'id': fields.Integer(description='purchasee id'),
        'productId': fields.Integer(required=True, description='product id'),
        'paid': fields.Float(description='purchase amount paid'),
        'count': fields.Integer(description='number of products available', required=True, min=1),
        'sharedUserIds': fields.List(fields.Integer, description='list of user_ids this product should be shared with', required=True),
        'status': fields.String(description='purchase status'),
        'toPay': fields.Float(description='amount to be paid to start purchase', required=True, min=100)
    })
        
class ActivityDto:
    api = Namespace('activity', description='activity related operations', path='/')
    activity = api.model('activity', {
        'id': fields.Integer(description='activity id'),
        'occured_at': fields.DateTime(description='date and time the activity was created'),
        'activity_type': fields.String(description='type of activity')
    })
