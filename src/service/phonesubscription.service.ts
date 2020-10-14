import { Injectable, Inject } from '@nestjs/common';

import { ListQueryBuilder,getEntityOrThrow, TransactionalConnection } from '@vendure/core';

import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';

import { PhoneSubscriptionEntity } from '../entities/phonesubscription.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';

@Injectable()
export class PhoneSubscriptionService {

    constructor(private connection: TransactionalConnection,
                @Inject(PLUGIN_INIT_OPTIONS) private options: PluginInitOptions,
				private listQueryBuilder: ListQueryBuilder) {}

    async getAllPhones(ctx,options?: ListQueryOptions<PhoneSubscriptionEntity>) {
        return this.listQueryBuilder
		.build(PhoneSubscriptionEntity, options)
		.getManyAndCount()
		.then(([phones, totalItems]) => {
			return {
				items: phones,
				totalItems
			 };
		 });
    }
	
	async getPhoneById(ctx,data){
	   return this.connection.getEntityOrThrow(ctx,PhoneSubscriptionEntity, data);
	}
	
	async addSinglePhone(ctx,data){
	   const createdVariant = await this.connection.getRepository(ctx,PhoneSubscriptionEntity).create(data);
	   const savedVariant = await this.connection.getRepository(ctx,PhoneSubscriptionEntity).save(createdVariant);
	   return Object(savedVariant).id;
	}
	
	async updateSinglePhone(ctx,data){
	   const createdVariant = await this.connection.getRepository(ctx,PhoneSubscriptionEntity).update(data.id,{phone:data.phone});
	   return data.id;
	}
	
	async addPhone(ctx,input){
	    const ids:string[] = [];
        for (const phoneInput of input) {
            const id = await this.addSinglePhone(ctx, phoneInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx,PhoneSubscriptionEntity).findByIds(ids);
		return createdVariants;
	}
	
	async updatePhone(ctx,input){
	    const ids:string[] = [];
        for (const phoneInput of input) {
            const id = await this.updateSinglePhone(ctx, phoneInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(ctx,PhoneSubscriptionEntity).findByIds(ids);
		return createdVariants;
	}
	
	async deletePhone(ctx,ids){
	   const Variants = await this.connection.getRepository(ctx,PhoneSubscriptionEntity).findByIds(ids);
	   this.connection.getRepository(ctx,PhoneSubscriptionEntity).delete(ids);
	   return Variants;
	}
	
	deleteAllPhones(ctx){
	   this.connection.getRepository(ctx,PhoneSubscriptionEntity).clear();
	   return true;
	}
	
}
