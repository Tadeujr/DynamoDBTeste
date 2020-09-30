"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const DotEnv = require("dotenv");
DotEnv.config();
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
let AppService = class AppService {
    async getAll() {
        const params = {
            TableName: process.env.AWS_TABLE_NAME,
        };
        const dynamodb = new AWS.DynamoDB();
        const saida = await dynamodb
            .scan(params, function (err, data) {
            if (err) {
                console.log('Error', err);
            }
            else {
                data.Items.forEach(function (item) {
                    console.log(item);
                });
            }
        })
            .promise();
        return saida.Items;
    }
    async findIntegracao(tipoIntegracao) {
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: process.env.AWS_TABLE_NAME,
            KeyConditionExpression: 'tipoIntegracao =:integracao',
            ExpressionAttributeValues: { ':integracao': tipoIntegracao },
        };
        const saida = await docClient
            .query(params, function (err) {
            if (err) {
                console.log('Erro');
                console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
            }
        })
            .promise();
        return saida.Items;
    }
    async newClient(newCliente) {
        const docClient = new AWS.DynamoDB.DocumentClient();
        var params = {
            TableName: 'Integracao',
            Item: newCliente,
            ReturnValues: "ALL_OLD"
        };
        await docClient.put(params, function (err, data) {
            if (err) {
                console.error('Unable to add Cliente', params.Item, '. Error JSON:', JSON.stringify(err, null, 2));
            }
            else {
                console.log('PutItem succeeded in table: ', params.TableName);
            }
        });
    }
    async clienteUpdate(tipoIntegracao, nomeEstabelecimento, newPassword) {
        const docClient = new AWS.DynamoDB.DocumentClient();
        const params = {
            TableName: process.env.AWS_TABLE_NAME,
            Key: {
                tipoIntegracao: tipoIntegracao,
                nomeEstabelecimento: nomeEstabelecimento,
            },
            UpdateExpression: 'set password = :p',
            ExpressionAttributeValues: {
                ':p': newPassword,
            },
            ReturnValues: 'UPDATED_NEW',
        };
        await docClient.update(params, function (err, data) {
            if (err) {
                console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
            }
            else {
                console.log('UpdateItem succeeded:');
            }
        });
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map