from legarda.api import db, flask_bcrypt
from sqlalchemy.sql import func


class Product(db.Model):
    """ Product model for storing farm product details """

    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    manufacturer = db.Column(db.String(255), nullable=True)
    price = db.Column(db.Float, nullable=False, default=0)
    image = db.Column(db.String(255), nullable=True)
    location = db.Column(db.String(255), nullable=False)
    count = db.Column(db.Integer, nullable=False, default=1)
    is_available = db.Column(db.Boolean, nullable=False, default=True)
    date_created = db.Column(db.DateTime, nullable=False, default=func.now())
    purchase = db.relationship('Purchase', backref='product', lazy=True, uselist=False)
    

    def __init__(self, name, price, location, count=1, manufacturer=None):
        self.name = name
        self.price = price
        self.manufacturer = manufacturer
        self.location = location
        self.count = count

    def __repr__(self):
        return "<Product '{}'>".format(self.name)
