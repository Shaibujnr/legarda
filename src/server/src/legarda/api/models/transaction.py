from legarda.api import db, flask_bcrypt
from sqlalchemy.sql import func


class Transaction(db.Model):
    """ Transaction model """

    __tablename__ = "transactions"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(10), nullable=False, default='initialized')
    reference = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False, default=0)
    date_created = db.Column(db.DateTime, nullable=False, default=func.now())
    purchase_id = db.Column(db.Integer, db.ForeignKey('purchases.id'),nullable=False)
    

    def __init__(self, product_id, count=1):
        self.product_id = product_id
        self.count = count

    def __repr__(self):
        return "<Transaction %s %s>"%(self.reference, self.status.upper())
