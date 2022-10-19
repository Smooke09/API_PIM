"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientScheme = exports.userClientScheme = void 0;
// Schema de validacao do yup
const yup_1 = require("yup");
// Schema de validacao do yup esta usando a interface Client
exports.userClientScheme = (0, yup_1.object)({
    id: (0, yup_1.number)().optional(),
    email: (0, yup_1.string)().required("Email é obrigatório").email("Email inválido"),
    usuario: (0, yup_1.string)().required("Usuario é obrigatório"),
    senha: (0, yup_1.string)()
        .required("Senha é obrigatória")
        .min(6, "A senha dever ter no minimo 6 caracteres"),
    confirmSenha: (0, yup_1.string)()
        .oneOf([(0, yup_1.ref)("senha"), null], "Senhas não são iguais")
        .required("Confirmação de senha é obrigatória"),
    // pessoa_key: number().optional(),
});
exports.clientScheme = (0, yup_1.object)({
    id: (0, yup_1.number)().optional(),
    nm_pessoa: (0, yup_1.string)().required("Nome é obrigatório"),
    num_rg: (0, yup_1.string)().optional(),
    num_cpf_cnpj: (0, yup_1.string)().optional(),
    dt_nascimento: (0, yup_1.date)().required("Data de nascimento é obrigatória"),
    genero: (0, yup_1.string)().optional(),
    num_contato: (0, yup_1.string)().optional(),
    estado_civil: (0, yup_1.string)().optional(),
    nacionalidade: (0, yup_1.string)().required("Nacionalidade é obrigatória"),
    reside_brasil: (0, yup_1.boolean)().required("Reside no Brasil é obrigatório"),
});
//# sourceMappingURL=userSchema.js.map