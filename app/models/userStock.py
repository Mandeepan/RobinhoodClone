from .db import SCHEMA, add_prefix_for_prod, db, environment

class UserStock(db.Model):
    __tablename__ = "userStocks"


#     __tablename__ = "tweets"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    stock_id = db.Column(db.Integer, db.ForeignKey("stocks.id", ondelete="CASCADE"), nullable=False)
    share_quantity = db.Column(db.Integer)
    share_price = db.Column(db.Float(precision=2))
