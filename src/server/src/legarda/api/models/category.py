from legarda.api import db, flask_bcrypt
from sqlalchemy.sql import func
from .helper import products_categories

class Category(db.Model):
    """ Category model for categorizing farm products """

    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    date_created = db.Column(db.DateTime, nullable=False, default=func.now())
    products = db.relationship('Product', secondary=products_categories, lazy='subquery',
        backref=db.backref('categories', lazy=True))
    

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return "<Category '{}'>".format(self.name)
