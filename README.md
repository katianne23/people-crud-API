## 📋 People CRUD API

API REST para gerenciamento de pessoas desenvolvida com Node.js, Express e TiDB Serverless.

### 🚀 Deploy em Produção
A API está hospedada no Render e pode ser acessada através da URL:
```https://people-crud-api.onrender.com```

### 📚 Documentação das Rotas
```https://people-crud-api.onrender.com/api/```

👤 Modelo de Dados (Pessoa)

Campo    	            Tipo	           Descrição	                        Obrigatório
nome	                String	         Nome completo	                    ✅ Sim
email	                String	         Email único	                      ✅ Sim
data_nascimento	      Date	           Data de nascimento (YYYY-MM-DD)	  ✅ Sim
telefone	            String	         Número de telefone	                ✅ Sim
endereco	            String	         Endereço completo	                ✅ Sim


#### 1. Criar uma nova pessoa
POST /api/pessoa
Cria um novo registro de pessoa no sistema com todos os campos.

Endpoint:
POST ```https://people-crud-api.onrender.com/api/pessoa```

Headers:
 ```
json
{
  "Content-Type": "application/json"
}
```

Body (JSON):
```
json
{
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua das Flores, 123 - São Paulo, SP"
}
```

### Validações:
- nome: mínimo 3 caracteres, máximo 100, obrigatório
- email: formato válido, único no sistema, obrigatório
- data_nascimento: formato ISO, não pode ser futura, obrigatório
- telefone: mínimo 10 caracteres, obrigatório
- endereco: mínimo 5 caracteres, máximo 255, obrigatório

Resposta de Sucesso (201):

```
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua das Flores, 123 - São Paulo, SP",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```

Exemplo com curl:
```
curl -X POST https://people-crud-api.onrender.com/api/pessoa \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "data_nascimento": "1990-05-15",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua das Flores, 123 - São Paulo, SP"
  }'
```

### 2. Buscar pessoa por ID
GET /api/pessoa/{id}
Retorna os dados completos de uma pessoa específica.

Endpoint:

GET ```https://people-crud-api.onrender.com/api/pessoa/1 ```
Resposta de Sucesso (200):
 ```
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 98765-4321",
  "endereco": "Rua das Flores, 123 - São Paulo, SP",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T10:30:00.000Z"
}
```
Exemplo com curl:
 ```curl https://people-crud-api.onrender.com/api/pessoa/1```


### 3. Atualizar pessoa
PUT /api/pessoa/{id}
Atualiza todos os dados de uma pessoa específica.

Endpoint: 
PUT  ```https://people-crud-api.onrender.com/api/pessoa/1```

Body (JSON):
```
{
  "nome": "João Silva Atualizado",
  "email": "joao.atualizado@email.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 91234-5678",
  "endereco": "Avenida Paulista, 1000 - São Paulo, SP"
}
```
Resposta de Sucesso (200):

```
{
  "id": 1,
  "nome": "João Silva Atualizado",
  "email": "joao.atualizado@email.com",
  "data_nascimento": "1990-05-15",
  "telefone": "(11) 91234-5678",
  "endereco": "Avenida Paulista, 1000 - São Paulo, SP",
  "created_at": "2024-01-15T10:30:00.000Z",
  "updated_at": "2024-01-15T11:45:00.000Z"
}
```
Exemplo com curl:
```
curl -X PUT https://people-crud-api.onrender.com/api/pessoa/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva Atualizado",
    "email": "joao.atualizado@email.com",
    "data_nascimento": "1990-05-15",
    "telefone": "(11) 91234-5678",
    "endereco": "Avenida Paulista, 1000 - São Paulo, SP"
  }'
  ```
### 4. Deletar pessoa
DELETE /api/pessoa/{id}
Remove uma pessoa do sistema.

Endpoint:
DELETE ```https://people-crud-api.onrender.com/api/pessoa/1```

Exemplo com curl:
```curl -X DELETE https://people-crud-api.onrender.com/api/pessoa/1```

### 5. Listar todas as pessoas
GET /api/pessoas
Retorna uma lista com todas as pessoas cadastradas com todos os campos.

Endpoint:
``` GET https://people-crud-api.onrender.com/api/pessoas ```

Resposta de Sucesso (200):
```
[
  {
    "id": 1,
    "nome": "João Silva",
    "email": "joao.silva@email.com",
    "data_nascimento": "1990-05-15",
    "telefone": "(11) 98765-4321",
    "endereco": "Rua das Flores, 123 - São Paulo, SP",
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": 2,
    "nome": "Maria Oliveira",
    "email": "maria.oliveira@email.com",
    "data_nascimento": "1985-08-22",
    "telefone": "(21) 99876-5432",
    "endereco": "Rua do Ouvidor, 50 - Rio de Janeiro, RJ",
    "created_at": "2024-01-15T11:00:00.000Z",
    "updated_at": "2024-01-15T11:00:00.000Z"
  }
]
```

Exemplo com curl:
```curl https://people-crud-api.onrender.com/api/pessoas```

### 6. Health Check
GET /health

Verifica se a API está funcionando e conectada ao banco de dados.

Endpoint:
GET ```https://people-crud-api.onrender.com/health```

Resposta de Sucesso (200):
```
{
  "status": "OK",
  "timestamp": "2024-01-15T12:00:00.000Z",
  "database": "connected",
  "dbTest": "passed"
}
```


### 📊 Tabela de Rotas Resumida
Método	Rota	Descrição
- POST	/api/pessoa	Criar nova pessoa (com telefone e endereço)
- GET	/api/pessoa/{id}	Buscar pessoa por ID
- PUT	/api/pessoa/{id}	Atualizar pessoa (todos os campos)
- DELETE	/api/pessoa/{id}	Deletar pessoa
- GET	/api/pessoas	Listar todas pessoas
- GET	/health	Verificar status da API

  
### 🛠️ Códigos de Resposta
- 200: Sucesso (GET, PUT)
- 201: Criado com sucesso (POST)
- 204: Sucesso sem conteúdo (DELETE)
- 400: Erro de validação (dados inválidos)
- 404: Recurso não encontrado
- 500: Erro interno do servidor

### 📝 Exemplos de Erros
Erro de validação - Campo obrigatório (400):
```
{
  "error": "telefone é obrigatório"
}
```

Erro de validação - Formato inválido (400):
```
{
  "error": "email inválido"
}
```
Erro de email duplicado (400):
```
{
  "error": "Email já cadastrado"
}
```
Pessoa não encontrada (404):
```
{
  "error": "Pessoa não encontrada"
}
```


### 🔧 Como Testar Rapidamente
Sequência completa de testes:
```
# 1. Criar uma pessoa
curl -X POST https://people-crud-api.onrender.com/api/pessoa \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Silva",
    "email": "teste.silva@email.com",
    "data_nascimento": "1990-05-15",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua Teste, 123 - São Paulo, SP"
  }'
# 2. Listar todas pessoas
curl https://people-crud-api.onrender.com/api/pessoas

# 3. Buscar por ID (substitua 1 pelo ID retornado)
curl https://people-crud-api.onrender.com/api/pessoa/1

# 4. Atualizar a pessoa
curl -X PUT https://people-crud-api.onrender.com/api/pessoa/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste Atualizado",
    "email": "teste.atualizado@email.com",
    "data_nascimento": "1990-05-15",
    "telefone": "(11) 98888-8888",
    "endereco": "Rua Nova, 456 - São Paulo, SP"
  }'

# 5. Deletar a pessoa
curl -X DELETE https://people-crud-api.onrender.com/api/pessoa/1
```


### 💻 Tecnologias Utilizadas
- Node.js com Express
- TiDB Serverless (MySQL compatível)
- Joi para validações
- Render para hospedagem
- Jest e Supertest para testes

## :memo: Licença

Esse projeto está sob a licença MIT.

Katianne Araújo

---

Feito com ♥ by  Katianne Araújo 
