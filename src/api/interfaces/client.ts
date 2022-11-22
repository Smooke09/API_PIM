// criando interface para receber os dados do usuario

export interface Client {
  id?: number;
  nm_pessoa: string;
  num_rg?: string;
  num_cpf_cnpj?: string;
  dt_nascimento: Date;
  genero?: string | null;
  num_contato?: string;
  estado_civil?: string | null;
  nacionalidade: string;
  reside_brasil: boolean;
}
