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
exports.SubscriptionShopResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const mailsubscription_service_1 = require("../service/mailsubscription.service");
const phonesubscription_service_1 = require("../service/phonesubscription.service");
const core_1 = require("@vendure/core");
let SubscriptionShopResolver = class SubscriptionShopResolver {
    constructor(mailsubscriptionService, phonesubscriptionService) {
        this.mailsubscriptionService = mailsubscriptionService;
        this.phonesubscriptionService = phonesubscriptionService;
    }
    addSubscriptionEmail(ctx, args) {
        const { input } = args;
        return this.mailsubscriptionService.addMail(ctx, input);
    }
    addSubscriptionPhone(ctx, args) {
        const { input } = args;
        return this.phonesubscriptionService.addPhone(ctx, input);
    }
};
__decorate([
    graphql_1.Mutation(),
    __param(0, core_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionShopResolver.prototype, "addSubscriptionEmail", null);
__decorate([
    graphql_1.Mutation(),
    __param(0, core_1.Ctx()), __param(1, graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", void 0)
], SubscriptionShopResolver.prototype, "addSubscriptionPhone", null);
SubscriptionShopResolver = __decorate([
    graphql_1.Resolver(),
    __metadata("design:paramtypes", [mailsubscription_service_1.MailSubscriptionService, phonesubscription_service_1.PhoneSubscriptionService])
], SubscriptionShopResolver);
exports.SubscriptionShopResolver = SubscriptionShopResolver;
//# sourceMappingURL=subscription-shop.resolver.js.map