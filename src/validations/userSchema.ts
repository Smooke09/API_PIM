// Schema de validacao do yup
import { boolean, date, number, object, ref, SchemaOf, string } from "yup";
import { User } from "../interfaces/user";
import { Client } from "../interfaces/client";

// Schema de validacao do yup esta usando a interface Client
export const userClientScheme: SchemaOf<User> = object({
  id: number().optional(),
  email: string().required("Email é obrigatório").email("Email inválido"),
  usuario: string().required("Usuario é obrigatório"),
  senha: string()
    .required("Senha é obrigatória")
    .min(6, "A senha dever ter no minimo 6 caracteres"),
  confirmSenha: string()
    .oneOf([ref("senha"), null], "Senhas não são iguais")
    .required("Confirmação de senha é obrigatória"),
  // pessoa_key: number().optional(),
});

export const clientScheme: SchemaOf<Client> = object({
  id: number().optional(),
  nm_pessoa: string().required("Nome é obrigatório"),
  num_rg: string().optional(),
  num_cpf_cnpj: string().optional(),
  dt_nascimento: date().required("Data de nascimento é obrigatória"),
  genero: string().optional(),
  num_contato: string().optional(),
  estado_civil: string().optional(),
  nacionalidade: string().required("Nacionalidade é obrigatória"),
  reside_brasil: boolean().required("Reside no Brasil é obrigatório"),
});
