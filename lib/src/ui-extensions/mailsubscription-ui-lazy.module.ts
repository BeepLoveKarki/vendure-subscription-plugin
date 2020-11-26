import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, createResolveData } from '@vendure/admin-ui/core';
import { AllMailsListComponent } from './components/all-mails-list/all-mails-list.component';
import { MailDetailComponent } from './components/mail-detail/mail-detail.component';

import MailDetailResolver from './providers/routing/mail-detail/mail-detail-resolver';
import { SubscribedEmailsFragment } from './generated-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
	{
      path: '',
      pathMatch: 'full',
      component: AllMailsListComponent ,
      data: { breadcrumb: 'Subscribed Mails' },
    },
	{
	  path: 'create',
      component: MailDetailComponent,
      data: {breadcrumb: [
             {
                label: 'Subscribed Mails',
                link: ['/extensions', 'subscribedmails'],
             },
             {
                label: 'Create Email',
                link: [],
             }
	       ]
	     } 
	},
    {
       path: ':id',
       component: MailDetailComponent,
       resolve: createResolveData(MailDetailResolver),
       data: { breadcrumb: mailDetailBreadcrumb },
    }
	]),
  ],
  declarations: [
    AllMailsListComponent,
	MailDetailComponent
  ],
  providers:[MailDetailResolver],
})
export class MailSubscriptionUIModule {}

export function mailDetailBreadcrumb(resolved: { entity: Observable<SubscribedEmailsFragment> }) {
	return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Subscribed Mails',
                link: ['/extensions', 'subscribedmails'],
            },
            {
                label: `${entity.email}`,
                link: [],
            },
        ]),
    );
}
