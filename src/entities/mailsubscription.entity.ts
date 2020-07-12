import { Entity, Column } from 'typeorm';
import { VendureEntity, DeepPartial } from '@vendure/core';

@Entity()
export class MailSubscriptionEntity extends VendureEntity {

    constructor(input?: DeepPartial<MailSubscriptionEntity>) {
        super(input);
    }

    @Column({unique: true})
    email: string;
}
