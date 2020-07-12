import { Injectable, Inject } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { ListQueryBuilder,getEntityOrThrow } from '@vendure/core';

import { ListQueryOptions } from '@vendure/core/dist/common/types/common-types';

import { PhoneSubscriptionEntity } from '../entities/phonesubscription.entity';
import { PLUGIN_INIT_OPTIONS } from '../constants';
import { PluginInitOptions } from '../types';

@Injectable()
export class PhoneSubscriptionService {

    constructor(@InjectConnection() private connection: Connection,
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
	   return getEntityOrThrow(this.connection, PhoneSubscriptionEntity, data);
	}
	
	async addSinglePhone(ctx,data){
	   const createdVariant = this.connection.getRepository(PhoneSubscriptionEntity).create(data);
	   const savedVariant = await this.connection.getRepository(PhoneSubscriptionEntity).save(createdVariant);
	   return Object(savedVariant).id;
	}
	
	async updateSinglePhone(ctx,data){
	   const createdVariant = await this.connection.getRepository(PhoneSubscriptionEntity).update(data.id,{phone:data.phone});
	   return data.id;
	}
	
	async addPhone(ctx,input){
	    const ids:string[] = [];
        for (const phoneInput of input) {
            const id = await this.addSinglePhone(ctx, phoneInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(PhoneSubscriptionEntity).findByIds(ids);
		return createdVariants;
	}
	
	async updatePhone(ctx,input){
	    const ids:string[] = [];
        for (const phoneInput of input) {
            const id = await this.updateSinglePhone(ctx, phoneInput);
            ids.push(id);
        }
        const createdVariants = await this.connection.getRepository(PhoneSubscriptionEntity).findByIds(ids);
		return createdVariants;
	}
	
	async deletePhone(ctx,ids){
	   const Variants = await this.connection.getRepository(PhoneSubscriptionEntity).findByIds(ids);
	   this.connection.getRepository(PhoneSubscriptionEntity).delete(ids);
	   return Variants;
	}
	
	deleteAllPhones(ctx){
	   this.connection.getRepository(PhoneSubscriptionEntity).clear();
	   return true;
	}
	
}
