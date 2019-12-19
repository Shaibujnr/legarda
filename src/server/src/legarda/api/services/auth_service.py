from flask_jwt_extended import create_access_token, decode_token, get_jti
from legarda.api import db
from legarda.api.models import User, BlacklistToken, SigninActivity
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

                new_activity = SigninActivity(sign_in_token= auth_token)
                new_activity.owner_id = user.id
                db.session.add(new_activity)
                db.session.commit()

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
            db.session.rollback()
            print(e)
            response_object = {
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

    @staticmethod
    def validateToken(token):
        data = decode_token(token)
        isBlacklisted = BlacklistToken.is_blacklisted(data['jti'])
        if isBlacklisted:
            response_object = {
                'status': 'fail',
                'message': 'invalid token'
            }
            return response_object, 400
        if data:
            user_id = data['identity']
            user: User = User.query.get(user_id)
            response_object = {
                'status': 'sucess',
                'data': {
                    'id': user.id,
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                    'email': user.email,
                    'username': user.username,
                    'isAdmin': user.admin,
                    'isActive': user.is_active,
                    'isVerified': user.is_email_verified
                }
            }
            return response_object, 200
        else:
            response_object = {
                'status': 'fail',
                'message': 'invalid token'
            }
            return response_object, 400
