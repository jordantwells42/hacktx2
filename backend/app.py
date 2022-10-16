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
    name = db.Column(db.String, primary_key=True)
    description = db.Column(db.String)
    image = db.Column(db.String)
    x = db.Column(db.Float)
    y = db.Column(db.Float)
    total_rating = db.Column(db.Float)
    count = db.Column(db.Integer)
    category = db.Column(db.String)
    comments = db.Column(db.JSON)

    def __init__(self, name, description, image, x, y, total_rating, count, category, comments):
        self.name = name
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
            'name': self.name,
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
    return {"locations": [location.serialize for location in Locations.query.all() if location is not None]}

@app.route('/location', methods=['GET', 'POST', 'DELETE', 'PUT'])
@cross_origin(supports_credentials=True)
def location():
    if request.method == 'GET':
        r = request.get_json()
        try:
            name = r['name']
            location = Locations.query.filter_by(name=name).first()
            return jsonify(location.serialize)
        except:
            raise Exception("Location not found")

    if request.method == 'POST':
        r = request.get_json()
        name = r['name']
        description = r['description']
        image = r['image']
        x = r['x']
        y = r['y']
        category = r['category']

        if Locations.query.filter_by(name=name).first() is not None:
            raise Exception("Location already exists")

        new_location = Locations(name=name, description=description, image=image, x=x, y=y, total_rating=0, count=0, category=category, comments={'Comments': []})
        db.session.add(new_location)
        db.session.commit()
        return "Location added"

    if request.method == 'PUT':
        r = request.get_json()
        if 'comment' in r:        
            name = r['name']
            comment = r['comment']
            user = r['user']
            location = Locations.query.filter_by(name=name).first()
            comment = location.comments['Comments'] + [{'user': user, 'comment': comment}]
            Locations.query.filter_by(name=name).update({'comments': {'Comments': comment}})
            db.session.commit()
            return "Comments updated"
        else:
            name = r['name']
            rating = r['rating']
            # FIXME: Track users and only allow one rating per user
            location = Locations.query.filter_by(name=name).first()
            total_rating = rating + location.total_rating
            count = location.count + 1
            Locations.query.filter_by(name=name).update({'total_rating': total_rating, 'count': count})
            db.session.commit()
            return "Rating updated"

    if request.method == 'DELETE':
        r = request.get_json()
        try:
            name = r['name']
            location = Locations.query.filter_by(name=name).first()
            db.session.delete(location)
            db.session.commit()
            return "Location deleted"
        except:
            raise Exception("Location not found")
    return "Default"

if __name__ == "__main__":
    app.run(debug=True)