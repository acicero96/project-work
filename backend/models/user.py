import bcrypt
from db.database import DatabaseManager
from flask import jsonify, current_app
import sqlite3


db = DatabaseManager('db/database.db')

def register_user(username, email, password):
    """Registra un nuovo utente nel database."""
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    try:
        # Verifica se l'email è già presente nel database
        existing_user = db.fetch_one('SELECT * FROM user WHERE email = ?', (email,))
        if existing_user:
            return jsonify(message="Email già registrata"), 400
        
        # Se non esiste, registra l'utente
        db.execute_query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', 
                         (username, email, hashed_password))
        return jsonify(message="User registered"), 201

    except sqlite3.IntegrityError as e:
        # Gestisce l'errore nel caso in cui la constraint UNIQUE fallisca (ad esempio, email duplicata)
        return jsonify(message="Errore durante la registrazione: " + str(e)), 400

def check_user_credentials(email, password):
    """Verifica le credenziali di login dell'utente."""
    user = db.fetch_one('SELECT * FROM user WHERE email = ?', (email,))
    if user and bcrypt.checkpw(password.encode('utf-8'), user[3].encode('utf-8')):
        print("Password match successful")
        return user
    print("Password mismatch")
    return None


# Funzione per recuperare l'utente dal database
def get_user_from_db(user_id):
    # Esegui la query per recuperare un utente
    query = "SELECT * FROM user WHERE id = ?"
    
    # Recupera i dati dell'utente come tupla
    user = db.fetch_one(query, (user_id,))

    if user:
        # Se l'utente esiste, costruisci il dizionario con i dati dell'utente
        user_data = {
            "id": user[0],       # ID utente
            "username": user[1],     # Nome utente
            "email": user[2]     # Email utente
        }
        
        # Log dei dettagli dell'utente (prima di restituire la risposta)
        current_app.logger.info(f"Dettagli utente trovati: {user_data}")
        
        # Restituisci il dizionario dei dati (ma in realtà restituirai questa risposta come JSON dal controller)
        return user_data
    else:
        # Se l'utente non esiste, restituisci un errore con il codice 404
        current_app.logger.error(f"Utente con ID {user_id} non trovato")
        return None