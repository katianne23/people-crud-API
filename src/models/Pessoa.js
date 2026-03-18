
const pool = require('../database/connection');

class Pessoa {
    static async create(pessoaData) {
        const { nome, email, data_nascimento, endereco, telefone } = pessoaData;
        const [result] = await pool.execute(
            'INSERT INTO pessoas (nome, email, data_nascimento, endereco, telefone) VALUES (?, ?, ?, ?, ?)',
            [nome, email, data_nascimento, endereco, telefone]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await pool.execute (
            'SELECT * FROM pessoas WHERE id = ?',
            [id]
        );
        return rows[0];
    }

    static async update(id, pessoaData)  {
        const { nome, email, data_nascimento, endereco, telefone } = pessoaData;
        const [result] = await pool.execute(
            'UPDATE pessoas SET nome = ?, email = ?, data_nascimento = ?, endereco = ?, telefone = ? WHERE id = ?',
            [nome, email, data_nascimento, endereco, telefone, id]
        );

        return result.affectedRows  > 0;
    }

    static async delete(id) {
        const [result] = await pool.execute(
            'DELETE FROM pessoas WHERE id = ?',
            [id]
        );

        return result.affectedRows > 0;
    }

    static async findAll() {
        const [rows] = await pool.execute (
            'SELECT * FROM pessoas ORDER BY nome'
        );
        return rows;
    }

    static async findByEmail(email) {
        const [rows] = await pool.execute(
            'SELECT * FROM pessoas WHERE email = ?',
            [email]
        );

        return rows[0];
    }

     static async findByTelefone(telefone) {
        const [rows] = await pool.execute(
            'SELECT * FROM pessoas WHERE telefone = ?',
            [telefone]
        );

        return rows[0];
    }
}

module.exports = Pessoa;