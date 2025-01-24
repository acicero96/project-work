from db.database import DatabaseManager

db = DatabaseManager('db/database.db')

def create_prenotazione(user_id, servizio, data):
    """Crea una nuova prenotazione nel database."""
    db.execute_query('INSERT INTO prenotazioni (user_id, servizio, data) VALUES (?, ?, ?)', 
                     (user_id, servizio, data))

def get_prenotazioni(user_id):
    """Recupera tutte le prenotazioni di un utente."""
    rows = db.fetch_all('SELECT id, servizio, data FROM prenotazioni WHERE user_id = ?', (user_id,))
    return [{"id": row[0], "servizio": row[1], "data": row[2]} for row in rows]

def get_prenotazione_per_barca(nome_barca):
    """Recupera le prenotazioni per una barca specifica."""
    rows = db.fetch_all('SELECT id, data FROM prenotazioni WHERE servizio = ?', (nome_barca,))
    return [{"id": row[0], "data": row[1]} for row in rows]

def get_prenotazione_by_id(prenotazione_id):
    """Recupera una singola prenotazione per ID."""
    row = db.fetch_one('SELECT id, servizio, data, user_id FROM prenotazioni WHERE id = ?', (prenotazione_id,))
    if row:
        return {"id": row[0], "servizio": row[1], "data": row[2], "user_id": row[3]}
    return None

def update_prenotazione(prenotazione_id, user_id, data):
    """Modifica una prenotazione esistente."""
    prenotazione = db.fetch_one(
        'SELECT id FROM prenotazioni WHERE id = ? AND user_id = ?', 
        (prenotazione_id, user_id)
    )
    if not prenotazione:
        raise NotFound("Prenotazione non trovata o accesso negato")
    db.execute_query(
        'UPDATE prenotazioni SET data = ?, servizio = ? WHERE id = ?', 
        (data.get("data"), data.get("servizio"), prenotazione_id)
    )

def delete_prenotazione(prenotazione_id, user_id):
    """Elimina una prenotazione."""
    prenotazione = db.fetch_one(
        'SELECT id FROM prenotazioni WHERE id = ? AND user_id = ?', 
        (prenotazione_id, user_id)
    )
    if not prenotazione:
        raise NotFound("Prenotazione non trovata o accesso negato")
    db.execute_query('DELETE FROM prenotazioni WHERE id = ?', (prenotazione_id,))
