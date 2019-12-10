from legarda.api import db


class Dummy(db.Model):
    """Dummy Model"""
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
