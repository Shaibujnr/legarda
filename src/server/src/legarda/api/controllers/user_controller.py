from flask import request
from flask_restplus import Resource

from legarda.api.utils.dto import UserDto
from legarda.api.services.user_service import UserService

api = UserDto.api
_user = UserDto.user


@api.route('/users')
class UserList(Resource):
    service = UserService()

    @api.doc('list_of_registered_users')
    @api.marshal_list_with(_user, envelope='data')
    def get(self):
        """List all registered users"""
        return self.service.all()

    @api.response(201, 'User successfully created.')
    @api.doc('create a new user')
    @api.expect(_user, validate=True)
    def post(self):
        """Creates a new User """
        data = request.json
        return self.service.save_new_user(data=data)


@api.route('/users/<username>')
@api.param('username', 'The User\'s username')
@api.response(404, 'User not found.')
class User(Resource):
    service = UserService()

    @api.doc('get a user')
    @api.marshal_with(_user)
    def get(self, username):
        """get a user given its identifier"""
        user = self.service.get_by_username(username)
        if not user:
            api.abort(404)
        else:
            return user
