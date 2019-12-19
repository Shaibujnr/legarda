from flask import request
from flask_restplus import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity

from legarda.api.utils.dto import ActivityDto
from legarda.api.services.acitivity_service import ActivityService

api = ActivityDto.api
_activity = ActivityDto.activity
parser = api.parser()
parser.add_argument('Authorization', location='headers', required=True)

@api.route('/activities')
class ActivityList(Resource):

    @api.doc('list_of_all_user_activities')
    @api.marshal_list_with(_activity, envelope='data')
    @api.expect(parser, validate=True)
    @jwt_required
    def get(self):
        """List all user activities"""
        owner_id = get_jwt_identity()
        return ActivityService.all_user_activities(owner_id)
