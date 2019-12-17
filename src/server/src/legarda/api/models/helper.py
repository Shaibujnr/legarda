from legarda.api import db


products_categories = db.Table('products_categories',
    db.Column('product_id', db.Integer, db.ForeignKey('products.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey('categories.id'), primary_key=True)
)


users_purchases = db.Table(
    'users_purchases',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('purchase_id', db.Integer, db.ForeignKey('purchases.id'), primary_key=True)
)