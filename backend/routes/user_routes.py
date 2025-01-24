from flask import Blueprint, request, jsonify, current_app
from models.user import register_user, check_user_credentials, get_user_from_db
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.exceptions import BadRequest, Unauthorized, InternalServerError

user_routes = Blueprint('user_routes', __name__)

@user_routes.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data:
        current_app.logger.error("Dati JSON non validi o assenti")
        raise BadRequest("Dati JSON non validi")
    
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    
    if not username or not email or not password:
        current_app.logger.error("Dati mancanti nella registrazione")
        raise BadRequest("Tutti i campi (username, email, password) sono obbligatori")
    
    try:
        result = register_user(username, email, password)
        current_app.logger.info(f"Utente {username} registrato con successo")
        return jsonify(message="Registrazione avvenuta con successo"), 201
    except Exception as e:
        current_app.logger.error(f"Errore durante la registrazione: {e}")
        raise InternalServerError("Errore durante la registrazione. Riprova più tardi")

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.json
    if not data:
        current_app.logger.error("Nessun dato ricevuto nel login")
        raise BadRequest("Nessun dato ricevuto")
    
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        current_app.logger.error("Email o password mancanti")
        raise BadRequest("Email e password sono obbligatori")
    
    # Verifica delle credenziali dell'utente
    try:
        user = check_user_credentials(email, password)
        if user:
            # Generazione del token usando solo l'ID dell'utente come stringa
            token = create_access_token(identity=str(user[0]))  # user[0] è l'ID dell'utente
            current_app.logger.info(f"Token generato per l'utente con ID: {user[0]}")
            return jsonify(access_token=token)
        else:
            current_app.logger.error("Credenziali errate")
            raise Unauthorized("Credenziali errate")
    except Exception as e:
        current_app.logger.error(f"Errore durante il login: {e}")
        raise InternalServerError("Errore durante il login. Riprova più tardi")

# Endpoint per recuperare l'utente
@user_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        current_app.logger.info(f"Recupero dettagli per l'utente con ID: {user_id}")
        
        # Recupero dell'utente dal database
        user = get_user_from_db(user_id)
        
        if user:
            # Log dei dettagli dell'utente
            current_app.logger.info(f"Dettagli utente trovati: {user}")
            # Restituisci la risposta JSON con i dati dell'utente
            return jsonify(user), 200
        else:
            # Se l'utente non è stato trovato
            current_app.logger.error(f"Utente con ID {user_id} non trovato.")
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        # Gestione degli errori
        current_app.logger.error(f"Errore nel recupero dei dettagli utente: {e}")
        return jsonify({"error": "Errore nel recupero dei dettagli utente"}), 500
