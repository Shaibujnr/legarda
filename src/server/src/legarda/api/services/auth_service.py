from flask_jwt_extended import create_access_token, decode_token, get_jti
from legarda.api import db
from legarda.api.models import User, BlacklistToken
from legarda.api.utils.dto import AuthDto
from .blacklist_service import BlackListService


class AuthService:

    @staticmethod
    def login_user(data):
        try:
            # fetch the user data
            user: User = User.query.filter_by(email=data.get('name')).first() or User.query.filter_by(username=data.get('name')).first()
            if user and user.check_password(data.get('password')):
                auth_token: str = create_access_token(identity=user.id)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'token': auth_token
                    }
                    return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            print(e)
            response_object = {okay
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def logout_user(data):
        auth_token = ''
        if data:
            auth_token = data.split(" ")[1]
        if auth_token:
            token_jti = get_jti(auth_token)
            if token_jti:
                return BlackListService.blacklist_token(token=token_jti)
            else:
                response_object = {
                    'status': 'fail',
                    'message': "logout failed"
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 403
