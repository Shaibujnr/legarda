import datetime

from flask_jwt_extended import create_access_token, get_jwt_identity

from legarda.api import db
from legarda.api.models import User


class UserService:
    
    def save_new_user(self, data: dict):
        """
        Adds a new user to the database. 
        """
        try:
            user = User.query.filter_by(email=data['email']).first() or \
                User.query.filter_by(username=data['username']).first()
            if not user:
                new_user: User = User(
                    data['firstName'], 
                    data['lastName'], 
                    data['email'], 
                    data['username'], 
                    data['password']
                )
                self.__save_changes(new_user)
                response_object = {
                    'status': 'success',
                    'message': 'Successfully registered.',
                    'token': create_access_token(identity=new_user.id)
                }
                return response_object, 201
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'User already exists. Please Log in.',
                }
                return response_object, 409
        except Exception as e:
            response_object = {
                'status': 'fail',
                'message': e
            }
            return response_object, 409

    def all(self):
        """
        Fetches all user from the database
        """
        return User.query.all()

    def get(self, user_id: int):
        """
        Get a single user from the database using the user id
        """
        pass

    def get_by_username(self, username: str):
        """
        Get a single user from the database using the username
        """
        return User.query.filter_by(username=username).first()

    def get_by_email(self, email: str):
        """
        Get a single user from the database using the email
        """
        return User.query.filter_by(email=email).first()

    def __save_changes(self, data: User):
        db.session.add(data)
        db.session.commit()
