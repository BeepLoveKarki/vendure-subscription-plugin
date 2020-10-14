import { Injectable, Inject } from '@nestjs/common';

import { ListQueryBuilder,getEntityOrThrow, TransactionalConnection } from '@vendure/core';

import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';

import { MailSubscriptionEntity } from '../entities/mailsubscription.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';

@Injectable()
export class MailSubscriptionService {

    constructor(private connection: TransactionalConnection,
                @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
				private listQueryBuilder: ListQueryBuilder) {}

    async getAllMails(ctx,options?: ListQueryOptions<MailSubscriptionEntity>) {
        return this.listQueryBuilder
		.build(MailSubscriptionEntity, options)
		.getManyAndCount()
		.then(([emails, totalItems]) => {
			return {
				items: emails,
				totalItems
			 };
		 });
    }
	
	async getMailById(ctx,data){
	   return this.connection.getEntityOrThrow(ctx,MailSubscriptionEntity, data);
	}
	
	async addSingleMail(ctx,data){
	   const createdVariant = await this.connection.getRepository(ctx,MailSubscriptionEntity).create(data);
	   const savedVariant = await this.connection.getRepository(ctx,MailSubscriptionEntity).save(createdVariant);
	   return Object(savedVariant).id;
	}
	
	async updateSingleMail(ctx,data){
	   const createdVariant = await this.connection.getRepository(ctx,MailSubscriptionEntity).update(data.id,{email:data.email});
	   return data.id;
	}
	
	async addMail(ctx,input){
	    const ids:string[] = [];
        for (const emailInput of input) {
            const id = await this.addSingleMail(ctx, emailInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx,MailSubscriptionEntity).findByIds(ids);
		return createdVariants;
	}
	
	async updateMail(ctx,input){
	    const ids:string[] = [];
        for (const emailInput of input) {
            const id = await this.updateSingleMail(ctx, emailInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx,MailSubscriptionEntity).findByIds(ids);
		return createdVariants;
	}
	
	async deleteMail(ctx,ids){
	   const Variants = await this.connection.getRepository(ctx,MailSubscriptionEntity).findByIds(ids);
	   this.connection.getRepository(ctx,MailSubscriptionEntity).delete(ids);
	   return Variants;
	}
	
	deleteAllMails(ctx){
	   this.connection.getRepository(ctx,MailSubscriptionEntity).clear();
	   return true;
	}
	
}
