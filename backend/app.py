from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
db.init_app(app)

class Locations(db.Model):
    name = db.Column(db.String, primary_key=True)
    image = db.Column(db.String)
    rating = db.Column(db.Float)
    count = db.Column(db.Integer)
    category = db.Column(db.String)

with app.app_context():
    db.create_all()
