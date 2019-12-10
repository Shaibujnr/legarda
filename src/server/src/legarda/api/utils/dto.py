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
