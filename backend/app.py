from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.sqlite3'
db = SQLAlchemy(app)
db.init_app(app)

CORS(app, supports_credentials=True)

class Locations(db.Model):
    location = db.Column(db.String, primary_key=True)
    image = db.Column(db.String)
    x = db.Column(db.Float)
    y = db.Column(db.Float)
    total_rating = db.Column(db.Float)
    count = db.Column(db.Integer)
    category = db.Column(db.String)
    comments = db.Column(db.JSON)

with app.app_context():
    db.create_all()

@app.route("/")
def show_all():
   return Locations.query.all()

@app.route('/location', methods=['GET', 'POST', 'DELETE'])
@cross_origin(supports_credentials=True)
def location():
    if request.method == 'GET':
        location = request.args.get('location')
        location = Locations.query.filter_by(location=location).first()
        return location

    if request.method == 'POST':
        location = request.args.get('location')
        image = request.args.get('image')
        x = request.args.get('x')
        y = request.args.get('y')
        total_rating = request.args.get('total_rating')
        count = request.args.get('count')
        category = request.args.get('category')
        comments = request.args.get('comments')
        new_location = Locations(location=location, image=image, x=x, y=y, total_rating=total_rating, count=count, category=category, comments=comments)

        db.session.add(new_location)
        db.session.commit()
        return "Location added"

    if request.method == 'DELETE':
        location = request.args.get('location')
        location = Locations.query.filter_by(location=location).first()
        db.session.delete(location)
        db.session.commit()
        return "Location deleted"