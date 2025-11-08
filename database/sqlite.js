const sqlite3 = require('sqlite3').verbose();
const { selectAllItems, selectById, insertData, updateData } = require('./querysets');

// Abre conexión a base de datos SQLite (archivo local)
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar con SQLite:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

function listAll(table) {
    return new Promise((resolve, reject) => {
        const query = selectAllItems(table);
        db.all(query, [], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        });
    });
}

function listById(table, id) {
    return new Promise((resolve, reject) => {
        const query = selectById(table, id);
        db.get(query, [], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

function insertItem(table, data) {
    return new Promise((resolve, reject) => {
        const query = insertData(table, data);
        db.run(query, function (err) {
            if (err) return reject(err);
            resolve({ id: this.lastID });
        });
    });
}

function updateItem(table, data) {
    return new Promise((resolve, reject) => {
        const query = updateData(table, data);
        db.run(query, function (err) {
            if (err) return reject(err);
            resolve({ changes: this.changes });
        });
    });
}

module.exports = {
    listAll,
    listById,
    insertItem,
    updateItem
};
