import { Entity, Column } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';

@Entity()
export class PhoneSubscriptionEntity extends VendureEntity {

    constructor(input?: DeepPartial<PhoneSubscriptionEntity>) {
        super(input);
    }

    @Column({unique: true})
    phone: string;
}
