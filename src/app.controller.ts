import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { AppService} from './app.service';
import { Empresa } from './empresa.entity';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async home() {
    return {
      json: ' empresa/json exemplo de empresa nova',
      empresa:
        '/empresas: retorna todas as empresas do banco com o padrao de Jsob do Dynamodb',
      buscaIntegracao:
        '/empresa/:nome retorna as empresas cadastradas a parti do nome da integração',
      novaEmpresa:"estabelecimento/new cria uma nova empresa no banco",
      novaUpdate:'empresa/update recebe Json com os parametos tipoIntegracao, nomeEstabelecimento, password',  
    };
  }

  @Get('empresa/json')
  exemploJson() {
    return { "Empresa":{
      startOperation: '18:00',
      isActive: true,
      password: 'carneFrangoFish5',
      endoperation: '00:00',
      nomeEstabelecimento: 'Empresa Exemplo',
      userName: 'empresaEx',
      tipoIntegracao: 'Cake'},
      "DadosUpdate":{
        "password": "atualizado",
        "nomeEstabelecimento": "Empresa Exemplo",
        "tipoIntegracao": "Cake"
      }
    }
  };
  @Get('empresas')
  public async getAll(): Promise<any> {
    return await this.appService.getAll();
  }

  @Get('empresa/:nome') //So tem Cake e Ifood o dynamodb e case sensitive
  public async buscaIntegracao(
    @Param('nome') nome: String,
    @Res() response,
  ): Promise<any> {
    return await this.appService
      .findIntegracao(nome)
      .then(mensagem => {
        response.status(HttpStatus.OK).json(mensagem);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensagem: 'Erro ao buscar Empresa' });
      });
  }

  @Post('estabelecimento/new')
  public async novoEstabelecimento(
    @Body() estabelecimento: Empresa,
    @Res() response,
  ): Promise<any> {
    const newEmpresa = new Empresa();
    newEmpresa.startOperation = estabelecimento.startOperation;
    newEmpresa.isActive = estabelecimento.isActive;
    newEmpresa.password = estabelecimento.password;
    newEmpresa.endoperation = estabelecimento.endoperation;
    newEmpresa.nomeEstabelecimento = estabelecimento.nomeEstabelecimento;
    newEmpresa.userName = estabelecimento.userName;
    newEmpresa.tipoIntegracao = estabelecimento.tipoIntegracao;

    return await this.appService
      .newClient(newEmpresa)
      .then(mensagem => {
        response.status(HttpStatus.OK).json(mensagem);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensagem: 'Erro ao criar usuario' });
      });
  }

  @Patch('empresa/update')
  public async atualizarSenha(
    @Body() estabelecimento: Empresa,
    @Res() response,
  ){
    return await this.appService
      .clienteUpdate(estabelecimento.tipoIntegracao, estabelecimento.nomeEstabelecimento, estabelecimento.password)
      .then(mensagem => {
        response.status(HttpStatus.OK).json(mensagem);
      })
      .catch(() => {
        response
          .status(HttpStatus.FORBIDDEN)
          .json({ mensagem: 'Erro ao atualizar Empresa' });
      });
  }
}

