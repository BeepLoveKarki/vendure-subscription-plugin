import { VendureEntity, DeepPartial } from '@vendure/core';
export declare class MailSubscriptionEntity extends VendureEntity {
    constructor(input?: DeepPartial<MailSubscriptionEntity>);
    email: string;
}
