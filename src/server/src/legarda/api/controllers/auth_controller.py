from flask import request
from flask_restplus import Resource, Model, fields
from flask_jwt_extended import jwt_required, get_jwt_identity

from legarda.api.services.auth_service import AuthService
from legarda.api.utils.dto import AuthDto

api = AuthDto.api
user_auth = AuthDto.user_auth

parser = api.parser()
parser.add_argument('Authorization', location='headers')

validate_model = api.model('validate_token_details', {'token': fields.String(required=True, description='The user token')})

@api.route('/login')
class UserLogin(Resource):
    """
    User Login Resource
    """
    @api.doc('user login')
    @api.expect(user_auth, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        print('\n\n')
        print(post_data)
        return AuthService.login_user(data=post_data)

@api.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """
    @jwt_required
    @api.expect(parser)
    @api.doc('logout a user')
    def post(self):
        # get auth token
        get_jwt_identity()
        auth_header = request.headers.get('Authorization')
        return AuthService.logout_user(data=auth_header)

@api.route('/validate')
class ValidateToken(Resource):
    """
    Validate token resource
    """
    @api.doc('validate user token')
    @api.expect(validate_model, validate=True)
    def post(self):
        # get the post data
        post_data = request.json
        print('\n\n')
        print(post_data)
        return AuthService.validateToken(post_data['token'])
