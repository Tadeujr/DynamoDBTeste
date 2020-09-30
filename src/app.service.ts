import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as DotEnv from 'dotenv';
import { Empresa } from './empresa.entity';
DotEnv.config();

//cria novo cliente ok
//atualizar senha ok
//buscar por Integracao ok
// buscar todos os clientes ok
//Configurações do banco ok
// converter retorno para json ok
//npm install dotenv
//npm install aws-sdk



//Inicializando as configurações do AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

@Injectable()
export class AppService {
  //buscando todos os dados da tabela Integracao, retorna o Json padrão da aws
  //Acho que não nos atende em nada.
  public async getAll() {
    const params = {
      TableName: process.env.AWS_TABLE_NAME,
    };

    const dynamodb = new AWS.DynamoDB();
    // Scan busca todos os elementos do banco de dados
    const saida = await dynamodb
      .scan(params, function(err, data) {
        if (err) {
          console.log('Error', err);
        } else {
          data.Items.forEach(function(item) {
            console.log(item);
          });
        }
      })
      .promise();

    return saida.Items;
  }

  //buscando dados especificos do banco de dados
  //Esse metodo busca todos os estababelecimento a parti de uma integração( Ifood, Cake, ...)
  public async findIntegracao(tipoIntegracao: String) {
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
      TableName: process.env.AWS_TABLE_NAME,
      KeyConditionExpression: 'tipoIntegracao =:integracao', //recebe as condições de busca
      ExpressionAttributeValues: { ':integracao': tipoIntegracao }, //necessario para que a busca seja passada como estring para o banco
    };

    const saida = await docClient
      .query(params, function(err) {
        if (err) {
          console.log('Erro');
          console.error(
            'Unable to query. Error:',
            JSON.stringify(err, null, 2),
          );
        }
      })
      .promise();

    return saida.Items;
  }

  //O metodo put sobreponhe o cliente existente no banco
  //Pesquisar como travar os atributos e a sobreposiçao
  //Inserindo um novo cliente(Estabelecimento)
  public async newClient(newCliente: Empresa){
    const docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: 'Integracao',
      Item: newCliente,
      ReturnValues: "ALL_OLD"
    };
    
    await docClient.put(params, function(err, data) {
      
      if (err) {
        console.error(
          'Unable to add Cliente',
          params.Item,
          '. Error JSON:',
          JSON.stringify(err, null, 2),
        );
      } else {
        console.log('PutItem succeeded in table: ', params.TableName);
      }
      
    });

     
  }

  //Update de senha do Cliente
  public async clienteUpdate(
    tipoIntegracao: String,
    nomeEstabelecimento: String,
    newPassword: String,
  ) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: process.env.AWS_TABLE_NAME,
      Key: {
        tipoIntegracao: tipoIntegracao,
        nomeEstabelecimento: nomeEstabelecimento,
      },
      UpdateExpression: 'set password = :p', //atributo(s)que sera(o) mudado(s)
      ExpressionAttributeValues: {
        ':p': newPassword,
      },
      ReturnValues: 'UPDATED_NEW',
    };

  await docClient.update(params, function(err, data) {
      if (err) {
        console.error(
          'Unable to update item. Error JSON:',
          JSON.stringify(err, null, 2),
        );
      } else {
        console.log('UpdateItem succeeded:');
      }
    });
  }
}
