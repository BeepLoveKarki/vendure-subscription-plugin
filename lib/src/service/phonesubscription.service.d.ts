import { ListQueryBuilder, TransactionalConnection } from '@vendure/core';
import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';
import { PhoneSubscriptionEntity } from '../entities/phonesubscription.entity';
import { PluginInitOptions } from '../types';
export declare class PhoneSubscriptionService {
    private connection;
    private options;
    private listQueryBuilder;
    constructor(connection: TransactionalConnection, options: PluginInitOptions, listQueryBuilder: ListQueryBuilder);
    getAllPhones(ctx: any, options?: ListQueryOptions<PhoneSubscriptionEntity>): Promise<{
        items: PhoneSubscriptionEntity[];
        totalItems: number;
    }>;
    getPhoneById(ctx: any, data: any): Promise<PhoneSubscriptionEntity>;
    addSinglePhone(ctx: any, data: any): Promise<any>;
    updateSinglePhone(ctx: any, data: any): Promise<any>;
    addPhone(ctx: any, input: any): Promise<PhoneSubscriptionEntity[]>;
    updatePhone(ctx: any, input: any): Promise<PhoneSubscriptionEntity[]>;
    deletePhone(ctx: any, ids: any): Promise<PhoneSubscriptionEntity[]>;
    deleteAllPhones(ctx: any): boolean;
}
