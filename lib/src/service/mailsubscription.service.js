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
exports.MailSubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@vendure/core");
const mailsubscription_entity_1 = require("../entities/mailsubscription.entity");
const constants_1 = require("../constants");
let MailSubscriptionService = class MailSubscriptionService {
    constructor(connection, options, listQueryBuilder) {
        this.connection = connection;
        this.options = options;
        this.listQueryBuilder = listQueryBuilder;
    }
    async getAllMails(ctx, options) {
        return this.listQueryBuilder
            .build(mailsubscription_entity_1.MailSubscriptionEntity, options)
            .getManyAndCount()
            .then(([emails, totalItems]) => {
            return {
                items: emails,
                totalItems
            };
        });
    }
    async getMailById(ctx, data) {
        return this.connection.getEntityOrThrow(ctx, mailsubscription_entity_1.MailSubscriptionEntity, data);
    }
    async addSingleMail(ctx, data) {
        const createdVariant = await this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).create(data);
        const savedVariant = await this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).save(createdVariant);
        return Object(savedVariant).id;
    }
    async updateSingleMail(ctx, data) {
        const createdVariant = await this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).update(data.id, { email: data.email });
        return data.id;
    }
    async addMail(ctx, input) {
        const ids = [];
        for (const emailInput of input) {
            const id = await this.addSingleMail(ctx, emailInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).findByIds(ids);
        return createdVariants;
    }
    async updateMail(ctx, input) {
        const ids = [];
        for (const emailInput of input) {
            const id = await this.updateSingleMail(ctx, emailInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).findByIds(ids);
        return createdVariants;
    }
    async deleteMail(ctx, ids) {
        const Variants = await this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).findByIds(ids);
        this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).delete(ids);
        return Variants;
    }
    deleteAllMails(ctx) {
        this.connection.getRepository(ctx, mailsubscription_entity_1.MailSubscriptionEntity).clear();
        return true;
    }
};
MailSubscriptionService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(constants_1.PLUGIN_INIT_OPTIONS)),
    __metadata("design:paramtypes", [core_1.TransactionalConnection, Object, core_1.ListQueryBuilder])
], MailSubscriptionService);
exports.MailSubscriptionService = MailSubscriptionService;
//# sourceMappingURL=mailsubscription.service.js.map