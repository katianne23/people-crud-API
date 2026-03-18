const Pessoa = require("../models/Pessoa");
const { validatePessoa } = require("../validators/pessoaValidator");

class PessoaController {
  async create(req, res) {
    try {
      const { error, value } = validatePessoa(req.body);
      if (error) {
        return res.status(400).json({
          errors: error.details.map((err) => err.message),
        });
      }

      const { email, telefone } = value;

      const pessoaEmail = await Pessoa.findByEmail(email);
      if (pessoaEmail) {
        return res.status(400).json({
          error: "Email já cadastrado",
        });
      }

      const pessoaTelefone = await Pessoa.findByTelefone(telefone);
      if (pessoaTelefone) {
        return res.status(400).json({
          error: "Telefone já cadastrado",
        });
      }

      const pessoaData = {
        nome: value.nome,
        email: value.email,
        data_nascimento: value.data_nascimento,
        telefone: value.telefone,
        endereco: value.endereco,
      };

      const id = await Pessoa.create(pessoaData);
      const novaPessoa = await Pessoa.findById(id);
      return res.status(201).json(novaPessoa);
    } catch (error) {
      console.error("Erro ao criar pessoa:", error);

      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async findById(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await Pessoa.findById(id);

      if (!pessoa) {
        return res.status(404).json({ error: "Pessoa não encontrada" });
      }

      res.json(pessoa);
    } catch (error) {
      console.log("Erro ao buscar pessoa:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const pessoaExistente = await Pessoa.findById(id);
      if (!pessoaExistente) {
        return res.status(404).json({ error: "Pessoa não encontrada" });
      }

      const { error } = validatePessoa(req.body);
      if (error) {
        return res.status(400).json({
          error: error.details[0].message,
        });
      }

      const { email } = req.body;
      if (email !== pessoaExistente.email) {
        const emailExistente = await Pessoa.findByEmail(email);
        if (emailExistente) {
          return res.status(400).json({
            error: "Email já está em uso",
          });
        }
      }

      await Pessoa.update(id, req.body);
      const pessoaAtualizada = await Pessoa.findById(id);

      res.json(pessoaAtualizada);
    } catch (error) {
      console.error("Erro ao atualizar pessoa:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const pessoaExistente = await Pessoa.findById(id);
      if (!pessoaExistente) {
        return res.status(404).json({ error: "Pessoa não encontrada" });
      }

      await Pessoa.delete(id);
      res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar pessoa:", error);
      res.status(500).json({ error: "Erro interno do servidor " });
    }
  }

  async findAll(req, res) {
    try {
      const pessoas = await Pessoa.findAll();
      res.status(200).json(pessoas);
    } catch (error) {
      console.error("Erro ao listar pessoas:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

module.exports = new PessoaController();
