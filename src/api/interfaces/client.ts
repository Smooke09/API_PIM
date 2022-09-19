// criando interface para receber os dados do usuario

export interface Client {
  id: number;
  nm_name: string;
  num_rg: number;
  num_cpf_cnpj: number;
  dt_nascimento: Date;
  genero: string;
  num_contato: number;
  estado_civil: string;
  nacionalidade: string;
  reside_brasil: boolean;
  email: string;
}
