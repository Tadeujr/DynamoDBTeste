import { AppService } from './app.service';
import { Empresa } from './empresa.entity';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    home(): Promise<{
        json: string;
        empresa: string;
        buscaIntegracao: string;
        novaEmpresa: string;
        novaUpdate: string;
    }>;
    exemploJson(): {
        Empresa: {
            startOperation: string;
            isActive: boolean;
            password: string;
            endoperation: string;
            nomeEstabelecimento: string;
            userName: string;
            tipoIntegracao: string;
        };
        DadosUpdate: {
            password: string;
            nomeEstabelecimento: string;
            tipoIntegracao: string;
        };
    };
    getAll(): Promise<any>;
    buscaIntegracao(nome: String, response: any): Promise<any>;
    novoEstabelecimento(estabelecimento: Empresa, response: any): Promise<any>;
    atualizarSenha(estabelecimento: Empresa, response: any): Promise<void>;
}
