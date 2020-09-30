"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const empresa_entity_1 = require("./empresa.entity");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async home() {
        return {
            json: ' empresa/json exemplo de empresa nova',
            empresa: '/empresas: retorna todas as empresas do banco com o padrao de Jsob do Dynamodb',
            buscaIntegracao: '/empresa/:nome retorna as empresas cadastradas a parti do nome da integração',
            novaEmpresa: "estabelecimento/new cria uma nova empresa no banco",
            novaUpdate: 'empresa/update recebe Json com os parametos tipoIntegracao, nomeEstabelecimento, password',
        };
    }
    exemploJson() {
        return { "Empresa": {
                startOperation: '18:00',
                isActive: true,
                password: 'carneFrangoFish5',
                endoperation: '00:00',
                nomeEstabelecimento: 'Empresa Exemplo',
                userName: 'empresaEx',
                tipoIntegracao: 'Cake'
            },
            "DadosUpdate": {
                "password": "atualizado",
                "nomeEstabelecimento": "Empresa Exemplo",
                "tipoIntegracao": "Cake"
            }
        };
    }
    ;
    async getAll() {
        return await this.appService.getAll();
    }
    async buscaIntegracao(nome, response) {
        return await this.appService
            .findIntegracao(nome)
            .then(mensagem => {
            response.status(common_1.HttpStatus.OK).json(mensagem);
        })
            .catch(() => {
            response
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ mensagem: 'Erro ao buscar Empresa' });
        });
    }
    async novoEstabelecimento(estabelecimento, response) {
        const newEmpresa = new empresa_entity_1.Empresa();
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
            response.status(common_1.HttpStatus.OK).json(mensagem);
        })
            .catch(() => {
            response
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ mensagem: 'Erro ao criar usuario' });
        });
    }
    async atualizarSenha(estabelecimento, response) {
        return await this.appService
            .clienteUpdate(estabelecimento.tipoIntegracao, estabelecimento.nomeEstabelecimento, estabelecimento.password)
            .then(mensagem => {
            response.status(common_1.HttpStatus.OK).json(mensagem);
        })
            .catch(() => {
            response
                .status(common_1.HttpStatus.FORBIDDEN)
                .json({ mensagem: 'Erro ao atualizar Empresa' });
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "home", null);
__decorate([
    common_1.Get('empresa/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "exemploJson", null);
__decorate([
    common_1.Get('empresas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAll", null);
__decorate([
    common_1.Get('empresa/:nome'),
    __param(0, common_1.Param('nome')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "buscaIntegracao", null);
__decorate([
    common_1.Post('estabelecimento/new'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empresa_entity_1.Empresa, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "novoEstabelecimento", null);
__decorate([
    common_1.Patch('empresa/update'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [empresa_entity_1.Empresa, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "atualizarSenha", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map