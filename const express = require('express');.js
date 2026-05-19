const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Conexión MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api_clientes'
});

db.connect((err) => {
    if (err) {
        console.log('Error de conexión');
    } else {
        console.log('Base de datos conectada');
    }
});


// GET - Obtener clientes
app.get('/clientes', (req, res) => {

    const sql = 'SELECT * FROM cliente';

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                mensaje: 'Error del servidor'
            });
        }

        res.status(200).json(result);
    });
});


// POST - Crear cliente
app.post('/clientes', (req, res) => {

    const { nombre, email, telefono } = req.body;

    const verificar = 'SELECT * FROM cliente WHERE email = ?';

    db.query(verificar, [email], (err, result) => {

        if (result.length > 0) {
            return res.status(409).json({
                mensaje: 'El correo ya existe'
            });
        }

        const sql = `
        INSERT INTO cliente(nombre, email, telefono)
        VALUES (?, ?, ?)
        `;

        db.query(sql, [nombre, email, telefono], (err, result) => {

            if (err) {
                return res.status(500).json({
                    mensaje: 'Error al crear cliente'
                });
            }

            res.status(201).json({
                mensaje: 'Cliente creado correctamente'
            });
        });
    });
});


// PUT - Actualizar cliente
app.put('/clientes/:id', (req, res) => {

    const { id } = req.params;
    const { nombre, email, telefono } = req.body;

    const sql = `
    UPDATE cliente
    SET nombre=?, email=?, telefono=?
    WHERE id_cliente=?
    `;

    db.query(sql, [nombre, email, telefono, id], (err, result) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al actualizar'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Cliente actualizado'
        });
    });
});


// DELETE - Eliminar cliente
app.delete('/clientes/:id', (req, res) => {

    const { id } = req.params;

    const sql = 'DELETE FROM cliente WHERE id_cliente=?';

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                mensaje: 'Error al eliminar'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Cliente eliminado'
        });
    });
});


app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000');
});
db.query(sql, [nombre, email, telefono], ...)