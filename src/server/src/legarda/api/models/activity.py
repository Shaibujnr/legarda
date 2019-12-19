from legarda.api import db, flask_bcrypt
from sqlalchemy.sql import func
from .helper import users_purchases

class Activity(db.Model):
    """ Activity Model for storing user activities """

    __tablename__ = "activities"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    occured_at = db.Column(db.DateTime, nullable=False, default=func.now())
    activity_type = db.Column(db.String(50), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity':'activity',
        'polymorphic_on':activity_type
    }

class SignupActivity(Activity):
    sign_up_token = db.Column(db.String(300))

    __mapper_args__ = {
        'polymorphic_identity':'sign_up'
    }

class SigninActivity(Activity):
    sign_in_token = db.Column(db.String(300))

    __mapper_args__ = {
        'polymorphic_identity':'sign_in'
    }

class EmailVerificationActivity(Activity):
    email = db.Column(db.String(100))

    __mapper_args__ = {
        'polymorphic_identity':'email_verification'
    }

class PurchaseInitiatedActivity(Activity):
    purchase_id = db.Column(db.Integer, db.ForeignKey('purchases.id'))
    amount = db.Column(db.Float)

    __mapper_args__ = {
        'polymorphic_identity':'purchase_initiated'
    }

class TransactionActivity(Activity):
    transaction_id = db.Column(db.Integer, db.ForeignKey('transactions.id'))
    __mapper_args__ = {
        'polymorphic_identity':'transaction'
    }

class ChangePasswordActivity(Activity):
    __mapper_args__ = {
        'polymorphic_identity':'change_password'
    }

class ResetPasswordActivity(Activity):
    __mapper_args__ = {
        'polymorphic_identity':'reset_password'
    }

class ChangeEmailActivity(Activity):
    old_email = db.Column(db.String(100))
    new_email = db.Column(db.String(100))

    __mapper_args__ = {
        'polymorphic_identity':'change_email'
    }
