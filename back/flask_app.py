import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bd.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'mysecretkey'

db = SQLAlchemy(app)

# Models
class TDataSession(db.Model):
    __tablename__ = 'tdatasession'
    id = db.Column(db.Integer, primary_key=True)
    IdDataSession = db.Column(db.Integer)
    Time = db.Column(db.Integer)
    HR = db.Column(db.Float)
    SpO2 = db.Column(db.Float)
    O2 = db.Column(db.Float)
    O2set = db.Column(db.Float)
    CO2 = db.Column(db.Float)
    F = db.Column(db.Float)
    V = db.Column(db.Float)
    Ps = db.Column(db.Float)
    Pd = db.Column(db.Float)
    
    

class TGroup(db.Model):
    __tablename__ = 'tgroup'
    NGroup = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(50))

    def serialize(self):
        return{
            'NGroup' : self.NGroup,
            'Name' : self.Name
        }

class TPatien(db.Model):
    __tablename__ = 'tpatien'
    Nmedcard = db.Column(db.Integer, primary_key=True)
    Surname = db.Column(db.String(50))
    FirstName = db.Column(db.String(50))
    Patronymic = db.Column(db.String(50))
    DataOfBirth = db.Column(db.Date)
    Sex = db.Column(db.String(2))
    Height = db.Column(db.Integer)
    Weight = db.Column(db.Integer)
    Address = db.Column(db.String(100))
    PhoneN = db.Column(db.String(50))
    Email = db.Column(db.String(50))
    Diagnosis = db.Column(db.String(50))
    NSessionDiagn = db.Column(db.Integer)
    NSessionTreat = db.Column(db.Integer)
    NGroup = db.Column(db.Integer, db.ForeignKey('tgroup.NGroup'))

    def serialize(self):
        return {
            'Nmedcard' : self.Nmedcard,
            'Surname' : self.Surname,
            'FirstName' : self.FirstName,
            'Patronymic' : self.Patronymic,
            'DataOfBirth' : self.DataOfBirth,
            'Sex' : self.Sex,
            'Height' : self.Height,
            'Weight' : self.Weight,
            'Adress' : self.Address,
            'PhoneN' : self.PhoneN,
            'Email' : self.Email,
            'Diagnosis' : self.Diagnosis,
            'NSessionDiagn' : self.NSessionDiagn,
            'NSessionTreat' : self.NSessionTreat,
            'NGroup' : self.NGroup
        }

class TSession(db.Model):
    __tablename__ = 'tsession'
    Nmedcard = db.Column(db.Integer, db.ForeignKey('tpatien.Nmedcard'))
    Namesession = db.Column(db.String(45))
    DateOfSession = db.Column(db.DateTime)
    DurationOfSession = db.Column(db.Integer)
    DurationOfPause = db.Column(db.Integer)
    IdDataSession = db.Column(db.Integer, primary_key=True)
    Note = db.Column(db.String(45))
    SessionPatternNum = db.Column(db.Integer)
    
# Create tables
with app.app_context():
    db.create_all()

# Flask-Admin
admin = Admin(app)
admin.add_view(ModelView(TDataSession, db.session))
admin.add_view(ModelView(TGroup, db.session))
admin.add_view(ModelView(TPatien, db.session))
admin.add_view(ModelView(TSession, db.session))

@app.route('/api/patients', methods=['GET'])
def get_all_patients():
    patients = TPatien.query.all()
    return jsonify([patient.serialize() for patient in patients])

# Редактирование пациента
@app.route('/api/patients/<int:nmedcard>', methods=['PUT'])
def update_patient(nmedcard):
    patient = TPatien.query.get(nmedcard)
    if patient:
        data = request.json
        for key, value in data.items():
            setattr(patient, key, value)
        db.session.commit()
        return jsonify(patient.serialize())
    else:
        return jsonify({"error": "Patient not found"}), 404

# Удаление пациента
@app.route('/api/patients/<int:nmedcard>', methods=['DELETE'])
def delete_patient(nmedcard):
    patient = TPatien.query.get(nmedcard)
    if patient:
        db.session.delete(patient)
        db.session.commit()
        return jsonify({"message": "Patient deleted"})
    else:
        return jsonify({"error": "Patient not found"}), 404

# Добавление пациента
@app.route('/api/patients', methods=['POST'])
def add_patient():
    data = request.json
    new_patient = TPatien(**data)
    db.session.add(new_patient)
    db.session.commit()
    return jsonify(new_patient.serialize()), 201

# Получение списка всех групп
@app.route('/api/groups', methods=['GET'])
def get_all_groups():
    groups = TGroup.query.all()
    return jsonify([group.serialize() for group in groups])

# Удаление группы
@app.route('/api/groups/<int:ngroup>', methods=['DELETE'])
def delete_group(ngroup):
    group = TGroup.query.get(ngroup)
    if group:
        db.session.delete(group)
        db.session.commit()
        return jsonify({"message": "Group deleted"})
    else:
        return jsonify({"error": "Group not found"}), 404

# Изменение названия группы
@app.route('/api/groups/<int:ngroup>', methods=['PUT'])
def update_group(ngroup):
    group = TGroup.query.get(ngroup)
    if group:
        data = request.json
        group.Name = data['Name']
        db.session.commit()
        return jsonify(group.serialize())
    else:
        return jsonify({"error": "Group not found"}), 404

# Добавление группы
@app.route('/api/groups', methods=['POST'])
def add_group():
    data = request.json
    new_group = TGroup(**data)
    db.session.add(new_group)
    db.session.commit()
    return jsonify(new_group.serialize()), 201
    


if __name__ == '__main__':
    app.run()
