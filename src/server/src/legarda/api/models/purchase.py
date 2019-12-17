from legarda.api import db, flask_bcrypt
from sqlalchemy.sql import func


class Purchase(db.Model):
    """ Purchase model """

    __tablename__ = "purchases"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(10), nullable=False, default='pending')
    paid = db.Column(db.Float, nullable=False, default=0)
    count = db.Column(db.Integer, nullable=False, default=1)
    date_created = db.Column(db.DateTime, nullable=False, default=func.now())
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'),nullable=False)
    transactions = db.relationship('Transaction', backref='purchase', lazy=True, uselist=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    

    def __init__(self, count=1):
        self.count = count

    def __repr__(self):
        return "<Purchase '{}'>".format(self.product.name)
