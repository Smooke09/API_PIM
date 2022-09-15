// Schema de validacao do yup
import { date, number, object, SchemaOf, string } from "yup";
import { Client } from "../interfaces/client";

// Schema de validacao do yup esta usando a interface Client
export const userClientScheme: SchemaOf<Client> = object({
  name: string().required("Nome é obrigatório"),
  email: string().email("Email inválido").required("Email é obrigatório"),
  password: string().required("Senha é obrigatória"),
});
