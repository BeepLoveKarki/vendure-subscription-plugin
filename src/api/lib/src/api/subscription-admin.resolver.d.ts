import { MailSubscriptionService } from '../service/mailsubscription.service';
import { PhoneSubscriptionService } from '../service/phonesubscription.service';
import { RequestContext } from '@vendure/core';
export declare class SubscriptionAdminResolver {
    private mailsubscriptionService;
    private phonesubscriptionService;
    constructor(mailsubscriptionService: MailSubscriptionService, phonesubscriptionService: PhoneSubscriptionService);
    SubscriptionEmails(ctx: RequestContext, args: any): Promise<{
        items: import("../entities/mailsubscription.entity").MailSubscriptionEntity[];
        totalItems: number;
    }>;
    SubscriptionPhones(ctx: RequestContext, args: any): Promise<{
        items: import("../entities/phonesubscription.entity").PhoneSubscriptionEntity[];
        totalItems: number;
    }>;
    SubscriptionEmail(ctx: RequestContext, args: any): Promise<import("../entities/mailsubscription.entity").MailSubscriptionEntity>;
    SubscriptionPhone(ctx: RequestContext, args: any): Promise<import("../entities/phonesubscription.entity").PhoneSubscriptionEntity>;
    addSubscriptionEmail(ctx: RequestContext, args: any): Promise<import("../entities/mailsubscription.entity").MailSubscriptionEntity[]>;
    addSubscriptionPhone(ctx: RequestContext, args: any): Promise<import("../entities/phonesubscription.entity").PhoneSubscriptionEntity[]>;
    updateSubscriptionEmail(ctx: RequestContext, args: any): Promise<import("../entities/mailsubscription.entity").MailSubscriptionEntity[]>;
    updateSubscriptionPhone(ctx: RequestContext, args: any): Promise<import("../entities/phonesubscription.entity").PhoneSubscriptionEntity[]>;
    deleteSubscriptionEmail(ctx: RequestContext, args: any): Promise<import("../entities/mailsubscription.entity").MailSubscriptionEntity[]>;
    deleteSubscriptionPhone(ctx: RequestContext, args: any): Promise<import("../entities/phonesubscription.entity").PhoneSubscriptionEntity[]>;
    deleteAllSubscriptionEmails(ctx: RequestContext): boolean;
    deleteAllSubscriptionPhones(ctx: RequestContext): boolean;
}
