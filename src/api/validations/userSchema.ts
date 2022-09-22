// Schema de validacao do yup
import { date, number, object, SchemaOf, string } from "yup";
import { User } from "../interfaces/user";

// Schema de validacao do yup esta usando a interface Client
export const userClientScheme: SchemaOf<User> = object({
  id: number().optional(),
  usuario: string().required("Nome é obrigatório"),
  password: string().required("Senha é obrigatória"),
  pessoa_key: number().optional(),
});
