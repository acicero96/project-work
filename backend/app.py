import logging
from flask import Flask
from flask_jwt_extended import JWTManager
from routes.user_routes import user_routes
from routes.prenotazione_routes import prenotazione_routes
from db.database import DatabaseManager
from flask_cors import CORS


# Configurazione del logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s %(message)s')

# Crea l'app Flask
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'chiave-segreta'  # Configura la chiave segreta per JWT
CORS(app)  # Abilita le CORS per tutte le rotte

# Inizializza il gestore JWT
jwt = JWTManager(app)

# Inizializza il database
db = DatabaseManager('db/database.db')

# Registra le rotte
app.register_blueprint(prenotazione_routes)
app.register_blueprint(user_routes)

if __name__ == '__main__':
    app.run(debug=True)
