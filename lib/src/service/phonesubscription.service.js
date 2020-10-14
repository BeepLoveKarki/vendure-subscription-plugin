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
exports.PhoneSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const phonesubscription_entity_1 = require("../entities/phonesubscription.entity");
const constants_1 = require("../constants");
let PhoneSubscriptionService = class PhoneSubscriptionService {
    constructor(connection, options, listQueryBuilder) {
        this.connection = connection;
        this.options = options;
        this.listQueryBuilder = listQueryBuilder;
    }
    async getAllPhones(ctx, options) {
        return this.listQueryBuilder
            .build(phonesubscription_entity_1.PhoneSubscriptionEntity, options)
            .getManyAndCount()
            .then(([phones, totalItems]) => {
            return {
                items: phones,
                totalItems
            };
        });
    }
    async getPhoneById(ctx, data) {
        return this.connection.getEntityOrThrow(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity, data);
    }
    async addSinglePhone(ctx, data) {
        const createdVariant = await this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).create(data);
        const savedVariant = await this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).save(createdVariant);
        return Object(savedVariant).id;
    }
    async updateSinglePhone(ctx, data) {
        const createdVariant = await this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).update(data.id, { phone: data.phone });
        return data.id;
    }
    async addPhone(ctx, input) {
        const ids = [];
        for (const phoneInput of input) {
            const id = await this.addSinglePhone(ctx, phoneInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).findByIds(ids);
        return createdVariants;
    }
    async updatePhone(ctx, input) {
        const ids = [];
        for (const phoneInput of input) {
            const id = await this.updateSinglePhone(ctx, phoneInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).findByIds(ids);
        return createdVariants;
    }
    async deletePhone(ctx, ids) {
        const Variants = await this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).findByIds(ids);
        this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).delete(ids);
        return Variants;
    }
    deleteAllPhones(ctx) {
        this.connection.getRepository(ctx, phonesubscription_entity_1.PhoneSubscriptionEntity).clear();
        return true;
    }
};
PhoneSubscriptionService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(constants_1.PLUGIN_INIT_OPTIONS)),
    __metadata("design:paramtypes", [core_1.TransactionalConnection, Object, core_1.ListQueryBuilder])
], PhoneSubscriptionService);
exports.PhoneSubscriptionService = PhoneSubscriptionService;
//# sourceMappingURL=phonesubscription.service.js.map