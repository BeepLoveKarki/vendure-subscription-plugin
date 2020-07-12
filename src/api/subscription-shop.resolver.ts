import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { MailSubscriptionService } from '../service/mailsubscription.service';
import { PhoneSubscriptionService } from '../service/phonesubscription.service';
import { RequestContext, Ctx } from '@vendure/core';

@Resolver()
export class SubscriptionShopResolver {
    constructor(private mailsubscriptionService: MailSubscriptionService, private phonesubscriptionService: PhoneSubscriptionService) {
    }

	@Mutation()
	addSubscriptionEmail(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.mailsubscriptionService.addMail(ctx,input);
	}
	
	@Mutation()
	addSubscriptionPhone(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.phonesubscriptionService.addPhone(ctx,input);
	}
	
}
