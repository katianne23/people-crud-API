const request = require('supertest');
const app = require('../app');
const pool = require('../database/connection');

describe('Testes do CRUD de Pessoas', () => {

    beforeAll(async () => {
        await pool.execute('DELETE FROM pessoas');
    });

    afterAll(async () => {
        await pool.end();
    });

    test('POST /api/pessoa - Criar nova pessoa', async () => {
        const response = await request(app)
            .post('/api/pessoa')
            .send({
                nome: 'João Silva',
                email: 'joao@email.com',
                data_nascimento: '1990-01-01',
                telefone: '88999999999',
                endereco: 'Rua A, 123'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.nome).toBe('João Silva');
        expect(response.body.telefone).toBe('88999999999');
    });

    test('POST /api/pessoa - Validar email duplicado', async () => {
        const response = await request(app)
            .post('/api/pessoa')
            .send({
                nome: 'Maria Souza',
                email: 'joao@email.com',
                data_nascimento: '1995-01-01',
                telefone: '88888888888',
                endereco: 'Rua B, 456'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email já cadastrado');
    });

    test('GET /api/pessoa/:id - Buscar pessoa por ID', async () => {
        const createResponse = await request(app)
            .post('/api/pessoa')
            .send({
                nome: 'Pedro Santos',
                email: 'pedro@email.com',
                data_nascimento: '1985-01-01',
                telefone: '88777777777',
                endereco: 'Rua C, 789'
            });

        const response = await request(app)
            .get(`/api/pessoa/${createResponse.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Pedro Santos');
        expect(response.body.telefone).toBe('88777777777');
    });

    test('PUT /api/pessoa/:id - Atualizar pessoa', async () => {
        const createResponse = await request(app)
            .post('/api/pessoa')
            .send({
                nome: 'Ana Oliveira',
                email: 'ana@email.com',
                data_nascimento: '1992-01-01',
                telefone: '88666666666',
                endereco: 'Rua D, 321'
            });

        const response = await request(app)
            .put(`/api/pessoa/${createResponse.body.id}`)
            .send({
                nome: 'Ana Oliveira Atualizada',
                email: 'ana.nova@email.com',
                data_nascimento: '1992-01-01',
                telefone: '88666666666',
                endereco: 'Rua D, 321'
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Ana Oliveira Atualizada');
        expect(response.body.email).toBe('ana.nova@email.com');
    });

    test('DELETE /api/pessoa/:id - Deletar pessoa', async () => {
        const createResponse = await request(app)
            .post('/api/pessoa')
            .send({
                nome: 'Carlos Lima',
                email: 'carlos@email.com',
                data_nascimento: '1988-01-01',
                telefone: '88555555555',
                endereco: 'Rua E, 654'
            });

        const response = await request(app)
            .delete(`/api/pessoa/${createResponse.body.id}`);

        expect(response.status).toBe(204);
    });

    test('GET /api/pessoa - Listar todas pessoas', async () => {
        const response = await request(app)
            .get('/api/pessoa');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

});

