from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.prenotazione import (
    create_prenotazione,
    get_prenotazioni,
    get_prenotazione_per_barca,
    get_prenotazione_by_id,
    update_prenotazione,
    delete_prenotazione
)
from datetime import datetime
from werkzeug.exceptions import BadRequest, NotFound, InternalServerError

prenotazione_routes = Blueprint('prenotazione_routes', __name__)

# Creazione di una nuova prenotazione
@prenotazione_routes.route('/prenotazioni', methods=['POST'])
@jwt_required()
def crea_prenotazione():
    current_user_id = get_jwt_identity()
    data = request.json
    if not data:
        raise BadRequest("Nessun dato ricevuto")
    servizio = data.get('servizio')
    data_prenotazione = data.get('data')

    if not isinstance(servizio, str):
        raise BadRequest("Il campo 'servizio' deve essere una stringa")
    if not isinstance(data_prenotazione, str):
        raise BadRequest("Il campo 'data' deve essere una stringa")
    try:
        datetime.strptime(data_prenotazione, "%Y-%m-%d")
    except ValueError:
        raise BadRequest("Il formato della data non è valido. Usa il formato 'YYYY-MM-DD'.")

    try:
        create_prenotazione(current_user_id, servizio, data_prenotazione)
        return jsonify(message="Prenotazione creata"), 201
    except Exception as e:
        raise InternalServerError(f"Errore interno: {e}")

# Recupero delle prenotazioni dell'utente autenticato
@prenotazione_routes.route('/prenotazioni', methods=['GET'])
@jwt_required()
def ottieni_prenotazioni():
    current_user_id = get_jwt_identity()
    try:
        prenotazioni = get_prenotazioni(current_user_id)
        return jsonify(prenotazioni=[{
            "id": p["id"],
            "servizio": p["servizio"],
            "data": p["data"]
        } for p in prenotazioni]), 200
    except Exception:
        raise InternalServerError("Errore interno")

# Recupero delle prenotazioni per una barca specifica
@prenotazione_routes.route('/prenotazioni/<string:nome_barca>', methods=['GET'])
def ottieni_prenotazioni_per_barca(nome_barca):
    try:
        prenotazioni = get_prenotazione_per_barca(nome_barca)
        return jsonify(prenotazioni=prenotazioni), 200
    except Exception:
        raise InternalServerError("Errore interno")

# Recupero di una singola prenotazione
@prenotazione_routes.route('/prenotazioni/<int:prenotazione_id>', methods=['GET'])
@jwt_required()
def ottieni_prenotazione_singola(prenotazione_id):
    try:
        prenotazione = get_prenotazione_by_id(prenotazione_id)
        if not prenotazione:
            raise NotFound("Prenotazione non trovata")
        return jsonify(prenotazione), 200
    except NotFound as e:
        raise e
    except Exception:
        raise InternalServerError("Errore interno")

# Modifica di una prenotazione
@prenotazione_routes.route('/prenotazioni/<int:prenotazione_id>', methods=['PUT'])
@jwt_required()
def modifica_prenotazione(prenotazione_id):
    current_user_id = get_jwt_identity()
    data = request.json
    try:
        update_prenotazione(prenotazione_id, current_user_id, data)
        return jsonify(message="Prenotazione aggiornata"), 200
    except NotFound as e:
        raise e
    except Exception:
        raise InternalServerError("Errore interno")

# Eliminazione di una prenotazione
@prenotazione_routes.route('/prenotazioni/<int:prenotazione_id>', methods=['DELETE'])
@jwt_required()
def elimina_prenotazione(prenotazione_id):
    current_user_id = get_jwt_identity()
    try:
        delete_prenotazione(prenotazione_id, current_user_id)
        return jsonify(message="Prenotazione eliminata"), 200
    except NotFound as e:
        raise e
    except Exception:
        raise InternalServerError("Errore interno")
