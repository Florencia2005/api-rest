CREATE DATABASE api_clientes;

USE api_clientes;

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
npm init -y
npm install express mysql2 cors dotenv
