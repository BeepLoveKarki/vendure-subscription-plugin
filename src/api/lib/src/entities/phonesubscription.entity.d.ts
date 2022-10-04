import { VendureEntity, DeepPartial } from '@vendure/core';
export declare class PhoneSubscriptionEntity extends VendureEntity {
    constructor(input?: DeepPartial<PhoneSubscriptionEntity>);
    phone: string;
}
