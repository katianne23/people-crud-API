const Joi = require("joi");

const pessoaSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required().messages({
    "string.min": "Nome deve ter no mínimo 3 caracteres",
    "string.max": "Nome deve ter no máximo 100 caracteres",
    "any.required": "Nome é obrigatório",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email inválido",
    "any.required": "Email é obrigatório",
  }),

  data_nascimento: Joi.date().iso().max("now").required().messages({
    "date.base": "Data de nascimento inválida",
    "date.max": "Data de nascimento não pode ser no futuro",
    "any.required": "Data de nascimento é obrigatória",
  }),

  telefone: Joi.string()
    .pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Telefone deve conter apenas números (10 ou 11 dígitos)",
      "any.required": "Telefone é obrigatório",
    }),
  endereco: Joi.string().min(10).max(255).required().messages({
    "string.min": "Endereço muito curto",
    "string.max": "Endereço muito longo",
    "any.required": "Endereço é obrigatório",
  }),
});
function validatePessoa(data) {
  return pessoaSchema.validate(data);
}

module.exports = { validatePessoa };
