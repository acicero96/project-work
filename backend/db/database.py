import sqlite3
import os

# Gestore del database
class DatabaseManager:
    def __init__(self, db_path):
        self.db_path = db_path
        self.create_db_if_not_exists()  # Crea il database se non esiste
        self.create_tables_if_not_exists()  # Crea le tabelle se non esistono

    def create_db_if_not_exists(self):
        """Crea il database se non esiste."""
        if not os.path.exists(self.db_path):
            try:
                with sqlite3.connect(self.db_path):
                    print(f"Database creato in {self.db_path}")
            except sqlite3.Error as e:
                print(f"Errore nella creazione del database: {e}")

    def create_tables_if_not_exists(self):
        """Crea le tabelle se non esistono."""
        create_user_table = """
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
        """
        
        create_prenotazioni_table = """
        CREATE TABLE IF NOT EXISTS prenotazioni (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            servizio TEXT NOT NULL,
            data TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES user (id)
        );
        """

        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                cursor.execute(create_user_table)  # Crea la tabella 'user'
                cursor.execute(create_prenotazioni_table)  # Crea la tabella 'prenotazioni'
                print("Tabelle create con successo!")
        except sqlite3.Error as e:
            print(f"Errore durante la creazione delle tabelle: {e}")

    def execute_query(self, query, params=None):
        """Esegue una query SQL con parametri opzionali."""
        try:
            with sqlite3.connect(self.db_path) as conn:
                cursor = conn.cursor()
                if params:
                    cursor.execute(query, params)
                else:
                    cursor.execute(query)
                conn.commit()
                return cursor
        except sqlite3.Error as e:
            print(f"Errore durante l'esecuzione della query: {e}")
            raise

    def fetch_all(self, query, params=None):
        """Esegue una query e restituisce tutti i risultati."""
        cursor = self.execute_query(query, params)
        return cursor.fetchall()

    def fetch_one(self, query, params=None):
        """Esegue una query e restituisce un solo risultato."""
        cursor = self.execute_query(query, params)
        return cursor.fetchone()
