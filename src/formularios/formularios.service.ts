import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase.config';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getCountFromServer,
} from 'firebase/firestore';
import { CONSTANTES } from '../common/constantes';
import { GoogleSheetsService } from '../services/google-sheets.service';
import { FichaCadastralState } from 'src/state/fichaCadastral.state';


@Injectable()
export class FormulariosService {
  constructor(private googleSheetsService: GoogleSheetsService) {}

  async create(createFormularioDto: FichaCadastralState) {
    const docRef = await addDoc(
      collection(firestore, CONSTANTES.FB_FORMULARIOS_COLLECTION),
      createFormularioDto,
    );
    await this.saveToGoogleSheets(createFormularioDto);
    return { id: docRef.id, ...createFormularioDto };
  }

  async findAll() {
    const querySnapshot = await getDocs(
      collection(firestore, CONSTANTES.FB_FORMULARIOS_COLLECTION),
    );
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const docRef = doc(firestore, CONSTANTES.FB_FORMULARIOS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error('Formulário não encontrado');
    }
    return { id: docSnap.id, ...docSnap.data() };
  }

  async update(id: string, updateFormularioDto: Partial<FichaCadastralState>) {
    const docRef = doc(firestore, CONSTANTES.FB_FORMULARIOS_COLLECTION, id);
    await updateDoc(docRef, updateFormularioDto);
    return { id, ...updateFormularioDto };
  }

  async remove(id: string) {
    const docRef = doc(firestore, CONSTANTES.FB_FORMULARIOS_COLLECTION, id);
    await deleteDoc(docRef);
    return { message: 'Formulário removido com sucesso' };
  }

  async getTotalFormularios(): Promise<number> {
    const collectionRef = collection(firestore, CONSTANTES.FB_FORMULARIOS_COLLECTION);
    const snapshot = await getCountFromServer(collectionRef);
    return snapshot.data().count;
  }

  private async saveToGoogleSheets(formulario: FichaCadastralState) {
    const spreadsheetId = CONSTANTES.GOOGLE_SHEETS_SPREADSHEET_ID;
    const range = CONSTANTES.GOOGLE_SHEETS_RANGE;

    const values = [
      [
        // Informações Pessoais
        formulario.informacoesPessoais.nome,
        formulario.informacoesPessoais.sobrenome,
        formulario.informacoesPessoais.nomeAlfabetoNativo,
        formulario.informacoesPessoais.outrosNomes,
        formulario.informacoesPessoais.sexo,
        formulario.informacoesPessoais.estadoCivil,
        formulario.informacoesPessoais.dataNascimento,
        formulario.informacoesPessoais.cidadeNascimento,
        formulario.informacoesPessoais.estadoNascimento,
        formulario.informacoesPessoais.paisNascimento,
        formulario.informacoesPessoais.nacionalidade,
        formulario.informacoesPessoais.outraNacionalidade,
        formulario.informacoesPessoais.cpf,
        formulario.informacoesPessoais.socialSecurityUSA,
        formulario.informacoesPessoais.identificacaoFiscalUSA,
        formulario.informacoesPessoais.redesSociais.facebook,
        formulario.informacoesPessoais.redesSociais.instagram,
        formulario.informacoesPessoais.redesSociais.twitter,
        formulario.informacoesPessoais.redesSociais.youtube,
        formulario.informacoesPessoais.redesSociais.googlePlus,
        formulario.informacoesPessoais.redesSociais.snapchat,
        // Endereço e Contatos  
        formulario.enderecoContatos.endereco,
        formulario.enderecoContatos.bairro,
        formulario.enderecoContatos.cidade,
        formulario.enderecoContatos.estado,
        formulario.enderecoContatos.cep,
        formulario.enderecoContatos.pais,
        formulario.enderecoContatos.enderecoEnvio.estado,
        formulario.enderecoContatos.enderecoEnvio.pais,
        formulario.enderecoContatos.enderecoEnvio.cep,
        formulario.enderecoContatos.enderecoEnvio.bairro,
        formulario.enderecoContatos.enderecoEnvio.cidade,
        formulario.enderecoContatos.email,
        formulario.enderecoContatos.telefones.residencial,
        formulario.enderecoContatos.telefones.trabalho,
        formulario.enderecoContatos.telefones.celular,
        formulario.enderecoContatos.telefones.escola,
        // Informações do Passaporte
        formulario.informacoesPassaporte.numero,
        formulario.informacoesPassaporte.numeroControle,
        formulario.informacoesPassaporte.paisEmissor,
        formulario.informacoesPassaporte.cidadeEmissao,
        formulario.informacoesPassaporte.estadoEmissao,
        formulario.informacoesPassaporte.dataEmissao,
        // Informações de Viagem
        formulario.informacoesViagem.motivoViagem,
        formulario.informacoesViagem.cidadeEstadoVisita,
        formulario.informacoesViagem.dataChegada,
        formulario.informacoesViagem.dataSaida,
        formulario.informacoesViagem.pagadorViagem,
        formulario.informacoesViagem.detalhesCompanheirosViagem.join(', '),
        // Informações Familiares
        formulario.informacoesFamiliares.pai.nomeCompleto,
        formulario.informacoesFamiliares.pai.dataNascimento,
        formulario.informacoesFamiliares.pai.estaEUA,
        formulario.informacoesFamiliares.pai.situacaoEUA,
        formulario.informacoesFamiliares.mae.nomeCompleto,
        formulario.informacoesFamiliares.mae.dataNascimento,
        formulario.informacoesFamiliares.mae.estaEUA,
        formulario.informacoesFamiliares.mae.situacaoEUA,
        formulario.informacoesFamiliares.outrosParentesEUA.join(', '),
        formulario.informacoesFamiliares.conjugeAtual.nomeCompleto,
        formulario.informacoesFamiliares.conjugeAtual.cidadeNascimento,
        formulario.informacoesFamiliares.conjugeAtual.dataNascimento,
        formulario.informacoesFamiliares.conjugeAtual.nacionalidade,
        formulario.informacoesFamiliares.conjugeAtual.endereco,
        // Informações de Emprego
        formulario.ocupacaoAtual.ocupacao,
        formulario.ocupacaoAtual.dataInicio,
        formulario.ocupacaoAtual.nomeEmpresa,
        formulario.ocupacaoAtual.enderecoEmpresa,
        formulario.ocupacaoAtual.salarioMensal,
        formulario.ocupacaoAtual.descricaoFuncoes,
        formulario.ocupacaoAtual.trabalhosAnteriores.join(', '),
        formulario.ocupacaoAtual.formacaoAcademica.nomeInstituicao,
        formulario.ocupacaoAtual.formacaoAcademica.endereco,
        formulario.ocupacaoAtual.formacaoAcademica.cursoEstudo,
        formulario.ocupacaoAtual.formacaoAcademica.dataInicio,
        formulario.ocupacaoAtual.formacaoAcademica.dataTermino,
        // Informações de Médicas e Criminais
        formulario.informacoesMedicasCriminais.assassinatosPoliticos,
        formulario.informacoesMedicasCriminais.assistenciaFinanceiraTerrorismo,
        formulario.informacoesMedicasCriminais.atividadesIlegais,
        formulario.informacoesMedicasCriminais.atividadesTerroristas,
        formulario.informacoesMedicasCriminais.condenacaoCrime,
        formulario.informacoesMedicasCriminais.custodiaIlegalMenor,
        formulario.informacoesMedicasCriminais.deportacao,
        formulario.informacoesMedicasCriminais.disturbioMentalFisico,
        formulario.informacoesMedicasCriminais.doencaTransmissivel,
        formulario.informacoesMedicasCriminais.estudoSemReembolso,
        formulario.informacoesMedicasCriminais.fraudeVisto,
        formulario.informacoesMedicasCriminais.genocidio,
        formulario.informacoesMedicasCriminais.lavagemDinheiro,
        formulario.informacoesMedicasCriminais.membroOrganizacaoTerrorista,
        formulario.informacoesMedicasCriminais.permanenciaIlegal,
        formulario.informacoesMedicasCriminais.prostituicao,
        formulario.informacoesMedicasCriminais.renunciaCidadaniaImpostos,
        formulario.informacoesMedicasCriminais.tortura,
        formulario.informacoesMedicasCriminais.viciadoDrogas,
        formulario.informacoesMedicasCriminais.violacoesLiberdadeReligiosa,
        formulario.informacoesMedicasCriminais.violacaoSubstanciasControladas,
        formulario.informacoesMedicasCriminais.votacaoIlegal,
      ],
    ];

    await this.googleSheetsService.appendToSheet(spreadsheetId, range, values);
  }
}
