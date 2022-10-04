import { ListQueryBuilder, TransactionalConnection } from '@vendure/core';
import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';
import { MailSubscriptionEntity } from '../entities/mailsubscription.entity';
import { PluginInitOptions } from '../types';
export declare class MailSubscriptionService {
    private connection;
    private options;
    private listQueryBuilder;
    constructor(connection: TransactionalConnection, options: PluginInitOptions, listQueryBuilder: ListQueryBuilder);
    getAllMails(ctx: any, options?: ListQueryOptions<MailSubscriptionEntity>): Promise<{
        items: MailSubscriptionEntity[];
        totalItems: number;
    }>;
    getMailById(ctx: any, data: any): Promise<MailSubscriptionEntity>;
    addSingleMail(ctx: any, data: any): Promise<any>;
    updateSingleMail(ctx: any, data: any): Promise<any>;
    addMail(ctx: any, input: any): Promise<MailSubscriptionEntity[]>;
    updateMail(ctx: any, input: any): Promise<MailSubscriptionEntity[]>;
    deleteMail(ctx: any, ids: any): Promise<MailSubscriptionEntity[]>;
    deleteAllMails(ctx: any): boolean;
}
