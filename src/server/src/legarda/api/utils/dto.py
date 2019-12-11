from flask_restplus import Namespace, fields


class UserDto:
    api = Namespace('user', description='user related operations', path='/')
    user = api.model('user', {
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
        'id': fields.String(description='category id'),
        'name': fields.String(required=True, description='category name')
    })

class ProductDto:
    api = Namespace('product', description='product related operations', path='/')
    product = api.model('product', {
        'id': fields.String(description='product id'),
        'name': fields.String(required=True, description='product name'),
        'manufacturer': fields.String(description='product manufacturer'),
        'price': fields.Float(required=True, description='product price'),
        'location': fields.String(required=True, description='product location'),
        'count': fields.Integer(description='number of products available'),
        'dateCreated': fields.DateTime(description='date created')
    })
