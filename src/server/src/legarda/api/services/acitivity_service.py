import time
from legarda.api import db
from legarda.api.models import *
from flask import current_app
import requests


class ActivityService:

    @staticmethod
    def all():
        """
        Fetches all activities
        """
        return Activity.query.all()

    @staticmethod
    def all_user_activities(owner_id: int):
        """
        fetch all user activities
        """
        result = Activity.query.filter_by(owner_id=owner_id).all()
        print('\n\n\n\nall user activities')
        print(result)
        return result

    @staticmethod
    def get(activity_id):
        """
        get a single activity
        """
        return Activity.query.get(purchase_id)
    

def make_create_method(name: str, class_type: type):
    def _method(owner_id: int, data: dict):
        try:
            A = class_type
            new_activity = A()
            new_activity.owner_id = owner_id
            if A == SignupActivity:
                new_activity.sign_up_token = data['token']
            if A == SigninActivity:
                new_activity.sign_in_token = data['token']
            if A == EmailVerificationActivity:
                new_activity.email = data['email']
            if A == PurchaseInitiatedActivity:
                new_activity.amount = data['amount']
                new_activity.purchase_id = data['purchase_id']
            if A == TransactionActivity:
                new_activity.transaction_id = data['transaction_id']
            if A == ChangeEmailActivity:
                new_activity.old_email = data['old_email']
                new_activity.new_email = data['new_email']
            db.session.add(new_activity)
            db.session.commit()
            return {
                'status': 'success',
                'activity_id': new_activity.id,
                'acitivity_type': new_activity.activity_type
            }, 200
        except Exception as e:
            print(str(e))
            return {
                'status': 'fail',
                'message': str(e)
            }, 400
        static_method = staticmethod(_method)
        method_name = "create_%s_activity"%name
        setattr(ActivityService, method_name, static_method)


create_activity_methods_data = [
    {'name':'sign_up',  'class_type':SignupActivity},
    {'name':'sign_in', 'class_type':SigninActivity},
    {'name':'email_verification', 'class_type':EmailVerificationActivity},
    {'name':'purchase_initiated', 'class_type':PurchaseInitiatedActivity},
    {'name':'transaction', 'class_type':TransactionActivity},
    {'name':'change_password', 'class_type':ChangePasswordActivity},
    {'name':'reset_password', 'class_type':ResetPasswordActivity},
    {'name':'change_email', 'class_type':ChangeEmailActivity}
]

for data in create_activity_methods_data:
    make_create_method(**data)
