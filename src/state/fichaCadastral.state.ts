export interface FichaCadastralState {
  informacoesPessoais: {
    sobrenome: string;
    nome: string;
    nomeAlfabetoNativo: string;
    outrosNomes: string;
    sexo: string;
    estadoCivil: string;
    dataNascimento: string;
    cidadeNascimento: string;
    estadoNascimento: string;
    paisNascimento: string;
    nacionalidade: string;
    outraNacionalidade: string;
    cpf: string;
    socialSecurityUSA: string;
    identificacaoFiscalUSA: string;
    redesSociais: {
      facebook: string;
      instagram: string;
      youtube: string;
      twitter: string;
      googlePlus: string;
      snapchat: string;
    };
  };
  enderecoContatos: {
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    pais: string;
    enderecoEnvio: {
      endereco: string;
      bairro: string;
      cidade: string;
      estado: string;
      cep: string;
      pais: string;
    };
    telefones: {
      map(arg0: (telefone: any) => any[]): unknown;
      residencial: string;
      trabalho: string;
      escola: string;
      celular: string;
    };
    email: string;
  };
  informacoesPassaporte: {
    numero: string;
    numeroControle: string;
    paisEmissor: string;
    cidadeEmissao: string;
    estadoEmissao: string;
    dataEmissao: string;
  };
  informacoesViagem: {
    motivoViagem: string;
    dataChegada: string;
    dataSaida: string;
    cidadeEstadoVisita: string;
    pagadorViagem: string;
    detalhesCompanheirosViagem: string[];
  };
  informacoesFamiliares: {
    pai: {
      nomeCompleto: string;
      dataNascimento: string;
      estaEUA: boolean;
      situacaoEUA: string;
    };
    mae: {
      nomeCompleto: string;
      dataNascimento: string;
      estaEUA: boolean;
      situacaoEUA: string;
    };
    outrosParentesEUA: string[];
    conjugeAtual: {
      nomeCompleto: string;
      dataNascimento: string;
      nacionalidade: string;
      cidadeNascimento: string;
      endereco: string;
    };
  };
  ocupacaoAtual: {
    ocupacao: string;
    dataInicio: string;
    nomeEmpresa: string;
    enderecoEmpresa: string;
    salarioMensal: string;
    descricaoFuncoes: string;
    trabalhosAnteriores: string[];
    formacaoAcademica: {
      nomeInstituicao: string;
      endereco: string;
      cursoEstudo: string;
      dataInicio: string;
      dataTermino: string;
    };
  };
  informacoesMedicasCriminais: {
    doencaTransmissivel: boolean;
    disturbioMentalFisico: boolean;
    viciadoDrogas: boolean;
    condenacaoCrime: boolean;
    violacaoSubstanciasControladas: boolean;
    prostituicao: boolean;
    lavagemDinheiro: boolean;
    atividadesIlegais: boolean;
    atividadesTerroristas: boolean;
    assistenciaFinanceiraTerrorismo: boolean;
    membroOrganizacaoTerrorista: boolean;
    genocidio: boolean;
    tortura: boolean;
    assassinatosPoliticos: boolean;
    violacoesLiberdadeReligiosa: boolean;
    deportacao: boolean;
    fraudeVisto: boolean;
    permanenciaIlegal: boolean;
    custodiaIlegalMenor: boolean;
    votacaoIlegal: boolean;
    renunciaCidadaniaImpostos: boolean;
    estudoSemReembolso: boolean;
  };
}
