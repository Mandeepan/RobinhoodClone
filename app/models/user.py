from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from .db import SCHEMA, db, environment
# from .likes import likes


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    cash_balance = db.Column(db.Float(precision=2), default=0.00)

    user_stocks = db.relationship("UserStock", backref="users", cascade="all, delete-orphan")
    watchlist_stocks = db.relationship("WatchlistStock", backref="users", cascade="all, delete-orphan")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict_basic(self):
        return {"id": self.id, "username": self.username, "email": self.email}

    def to_dict(self):
        return {
            **self.to_dict_basic()
            # "Tweets": [tweet.to_dict_basic() for tweet in self.tweets],
            # "LikedTweets": [tweet.to_dict_basic() for tweet in self.liked_tweets],
        }
