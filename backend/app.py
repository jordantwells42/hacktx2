from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy import create_engine
from sqlalchemy.pool import StaticPool

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.sqlite3'
db = SQLAlchemy(app)
db.init_app(app)

class Locations(db.Model):
    location = db.Column(db.String, primary_key=True)
    image = db.Column(db.String)
    rating = db.Column(db.Float)
    count = db.Column(db.Integer)
    category = db.Column(db.String)
    comments = db.Column(db.ARRAY(db.String))

with app.app_context():
    db.create_all()

@app.route("/")
def show_all():
   return Locations.query.all()

@app.route('/location')
def location():
    if request.method == 'GET':
        location = request.args.get('location')
        location = Locations.query.filter_by(location=location).first()
        return location

    if request.method == 'POST':
        location = request.args.get('location')
        image = request.args.get('image')
        rating = request.args.get('rating')
        count = request.args.get('count')
        category = request.args.get('category')
        comments = request.args.get('comments')
        new_location = Locations(location=location, image=image, rating=rating, count=count, category=category, comments=comments)

        db.session.add(new_location)
        db.session.commit()
        return "Location added"

