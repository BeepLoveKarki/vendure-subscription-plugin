import { Args, Parent, Query, Resolver, Mutation } from '@nestjs/graphql';
import { MailSubscriptionService } from '../service/mailsubscription.service';
import { PhoneSubscriptionService } from '../service/phonesubscription.service';
import { RequestContext, Ctx, Allow, Permission } from '@vendure/core';

@Resolver()
export class SubscriptionAdminResolver {
    constructor(private mailsubscriptionService: MailSubscriptionService, private phonesubscriptionService: PhoneSubscriptionService) {
    }

    @Query()
	@Allow(Permission.ReadSettings)
    SubscriptionEmails(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {options} = args;
        return this.mailsubscriptionService.getAllMails(ctx,options || undefined);
    }
	
	@Query()
	@Allow(Permission.ReadSettings)
    SubscriptionPhones(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {options} = args;
        return this.phonesubscriptionService.getAllPhones(ctx,options || undefined);
    }
	
	
	
	@Query()
	@Allow(Permission.ReadSettings)
    SubscriptionEmail(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {id} = args;
        return this.mailsubscriptionService.getMailById(ctx,id);
    }
	
	@Query()
	@Allow(Permission.ReadSettings)
    SubscriptionPhone(@Ctx() ctx: RequestContext, @Args() args: any) {
		const {id} = args;
        return this.phonesubscriptionService.getPhoneById(ctx,id);
    }
	
	
	
	
	@Mutation()
	@Allow(Permission.CreateSettings)
	addSubscriptionEmail(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.mailsubscriptionService.addMail(ctx,input);
	}
	
	@Mutation()
	@Allow(Permission.CreateSettings)
	addSubscriptionPhone(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.phonesubscriptionService.addPhone(ctx,input);
	}
	
	
	
	
	@Mutation()
	@Allow(Permission.UpdateSettings)
	updateSubscriptionEmail(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.mailsubscriptionService.updateMail(ctx,input);
	}
	
	@Mutation()
	@Allow(Permission.UpdateSettings)
	updateSubscriptionPhone(@Ctx() ctx: RequestContext, @Args() args: any){
	   const {input} = args;
	   return this.phonesubscriptionService.updatePhone(ctx,input);
	}
	
	
	
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteSubscriptionEmail(@Ctx() ctx: RequestContext, @Args() args: any){
	   return this.mailsubscriptionService.deleteMail(ctx,args.id);
	}
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteSubscriptionPhone(@Ctx() ctx: RequestContext, @Args() args: any){
	   return this.phonesubscriptionService.deletePhone(ctx,args.id);
	}
	
	
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteAllSubscriptionEmails(@Ctx() ctx: RequestContext){
	   return this.mailsubscriptionService.deleteAllMails(ctx);
	}
	
	@Mutation()
	@Allow(Permission.DeleteSettings)
	deleteAllSubscriptionPhones(@Ctx() ctx: RequestContext){
	   return this.phonesubscriptionService.deleteAllPhones(ctx);
	}
	
}
