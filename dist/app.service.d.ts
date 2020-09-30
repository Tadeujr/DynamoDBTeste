import * as AWS from 'aws-sdk';
import { Empresa } from './empresa.entity';
export declare class AppService {
    getAll(): Promise<AWS.DynamoDB.ItemList>;
    findIntegracao(tipoIntegracao: String): Promise<AWS.DynamoDB.DocumentClient.ItemList>;
    newClient(newCliente: Empresa): Promise<void>;
    clienteUpdate(tipoIntegracao: String, nomeEstabelecimento: String, newPassword: String): Promise<void>;
}
