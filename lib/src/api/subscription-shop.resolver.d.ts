import { MailSubscriptionService } from '../service/mailsubscription.service';
import { PhoneSubscriptionService } from '../service/phonesubscription.service';
import { RequestContext } from '@vendure/core';
export declare class SubscriptionShopResolver {
    private mailsubscriptionService;
    private phonesubscriptionService;
    constructor(mailsubscriptionService: MailSubscriptionService, phonesubscriptionService: PhoneSubscriptionService);
    addSubscriptionEmail(ctx: RequestContext, args: any): Promise<import("../entities/mailsubscription.entity").MailSubscriptionEntity[]>;
    addSubscriptionPhone(ctx: RequestContext, args: any): Promise<import("../entities/phonesubscription.entity").PhoneSubscriptionEntity[]>;
}
