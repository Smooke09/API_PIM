// Schema de validacao do yup
import { date, number, object, ref, SchemaOf, string } from "yup";
import { User } from "../interfaces/user";

// Schema de validacao do yup esta usando a interface Client
export const userClientScheme: SchemaOf<User> = object({
  id: number().optional(),
  usuario: string().required("Usuario é obrigatório"),
  senha: string().required("Senha é obrigatória"),
  confirmSenha: string()
    .oneOf([ref("senha"), null], "Senhas não são iguais")
    .required("Confirmação de senha é obrigatória"),
  email: string().required("Email é obrigatório"),
  // pessoa_key: number().optional(),
});
