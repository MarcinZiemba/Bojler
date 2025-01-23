from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Konfiguracja bazy danych MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root_password@localhost:3306/saper_game'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modele bazy danych
class Player(db.Model):
    __tablename__ = 'Players'
    player_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    player_name = db.Column(db.String(255), unique=True, nullable=False)

class Board(db.Model):
    __tablename__ = 'Boards'
    board_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    size = db.Column(db.String(50), nullable=False)
    mines = db.Column(db.Integer, nullable=False)

class Result(db.Model):
    __tablename__ = 'Results'
    result_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    player_id = db.Column(db.Integer, db.ForeignKey('Players.player_id'), nullable=False)
    board_id = db.Column(db.Integer, db.ForeignKey('Boards.board_id'), nullable=False)
    time = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

# Dodawanie wyniku
@app.route('/results', methods=['POST'])
def add_result():
    data = request.get_json()
    player_name = data.get('player_name')
    size = data.get('size')
    mines = data.get('mines')
    time = data.get('time')

    if not all([player_name, size, mines, time]):
        return jsonify({'error': 'player_name, size, mines, and time are required'}), 400

    # Sprawdzanie czy gracz istnieje
    player = Player.query.filter_by(player_name=player_name).first()
    if not player:
        player = Player(player_name=player_name)
        db.session.add(player)
        db.session.commit()

    # Sprawdzanie czy plansza istnieje
    board = Board.query.filter_by(size=size, mines=mines).first()
    if not board:
        board = Board(size=size, mines=mines)
        db.session.add(board)
        db.session.commit()

    # Dodawanie wyniku
    new_result = Result(player_id=player.player_id, board_id=board.board_id, time=time, date=datetime.utcnow())
    db.session.add(new_result)
    db.session.commit()
    return jsonify({'message': 'Result added', 'result_id': new_result.result_id}), 201

# Pobieranie wyników
@app.route('/results', methods=['GET'])
def get_results():
    results = Result.query.order_by(Result.time.asc()).all()
    return jsonify([
        {
            'result_id': r.result_id,
            'player_name': Player.query.filter_by(player_id=r.player_id).first().player_name,
            'board_size': Board.query.filter_by(board_id=r.board_id).first().size,
            'mines': Board.query.filter_by(board_id=r.board_id).first().mines,
            'time': r.time,
            'date': r.date
        } for r in results
    ])

# Tworzenie struktur bazy danych
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=False)
