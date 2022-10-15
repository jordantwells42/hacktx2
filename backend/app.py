import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.sqlite3'
db = SQLAlchemy(app)
db.init_app(app)

CORS(app, supports_credentials=True)

class Locations(db.Model):
    location = db.Column(db.String, primary_key=True)
    description = db.Column(db.String)
    image = db.Column(db.String)
    x = db.Column(db.Float)
    y = db.Column(db.Float)
    total_rating = db.Column(db.Float)
    count = db.Column(db.Integer)
    category = db.Column(db.String)
    comments = db.Column(db.JSON)

    def __init__(self, location, description, image, x, y, total_rating, count, category, comments):
        self.location = location
        self.description = description
        self.image = image
        self.x = x
        self.y = y
        self.total_rating = total_rating
        self.count = count
        self.category = category
        self.comments = comments

    @property
    def serialize(self):
        return {
            'location': self.location,
            'description': self.description,
            'image': self.image,
            'x': self.x,
            'y': self.y,
            'total_rating': self.total_rating,
            'count': self.count,
            'category': self.category,
            'comments': self.comments
        }

with app.app_context():
    db.create_all()

@app.route("/")
def show_all():
    return [location.serialize for location in Locations.query.all() if location is not None]

@app.route('/location', methods=['GET', 'POST', 'DELETE', 'PUT'])
@cross_origin(supports_credentials=True)
def location():
    if request.method == 'GET':
        try:
            location = request.args.get('location')
            location = Locations.query.filter_by(location=location).first()
            return jsonify(location.serialize)
        except:
            raise Exception("Location not found")

    if request.method == 'POST':
        r = request.get_json()
        location = r['location']
        description = r['description']
        image = r['image']
        x = r['x']
        y = r['y']
        total_rating = r['total_rating']
        count = r['count']
        category = r['category']
        comments = r['comments']

        if Locations.query.filter_by(location=location).first() is not None:
            raise Exception("Location already exists")

        new_location = Locations(location=location, description=description, image=image, x=x, y=y, total_rating=total_rating, count=count, category=category, comments={'Comments': []})
        db.session.add(new_location)
        db.session.commit()
        return "Location added"

    if request.method == 'PUT':
        r = request.get_json()
        location = r['location']
        description = r['description']
        image = r['image']
        x = r['x']
        y = r['y']
        total_rating = r['total_rating']
        count = r['count']
        category = r['category']
        comments = r['comments']

        if Locations.query.filter_by(location=location).first() is None:
            raise Exception("Location not found")
        else:
            new_total_rating = total_rating + Locations.query.filter_by(location=location).first().total_rating
            new_count = count + Locations.query.filter_by(location=location).first().count
            old_comments = Locations.query.filter_by(location=location).first().comments['Comments']
            if len(comments) > 0:
                old_comments.append(comments)
            Locations.query.filter_by(location=location).update(dict(total_rating=new_total_rating, count=new_count, comments={'Comments': old_comments}))
            db.session.commit()
            return "Location updated"

    if request.method == 'DELETE':
        try:
            location = request.args.get('location')
            location = Locations.query.filter_by(location=location).first()
            db.session.delete(location)
            db.session.commit()
            return "Location deleted"
        except:
            raise Exception("Location not found")
    return "Default"

if __name__ == "__main__":
    app.run(debug=True)