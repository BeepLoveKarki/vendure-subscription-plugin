import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule, createResolveData } from '@vendure/admin-ui/core';
import { AllPhonesListComponent } from './components/all-phones-list/all-phones-list.component';
import { PhoneDetailComponent } from './components/phone-detail/phone-detail.component';

import PhoneDetailResolver from './providers/routing/phone-detail/phone-detail-resolver';
import { SubscribedPhonesFragment } from './generated-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
	{
      path: '',
      pathMatch: 'full',
      component: AllPhonesListComponent ,
      data: { breadcrumb: 'Subscribed Phones' },
    },
	{
	  path: 'create',
      component: PhoneDetailComponent,
      data: {breadcrumb: [
             {
                label: 'Subscribed Phones',
                link: ['/extensions', 'subscribedphones'],
             },
             {
                label: 'Create Phone',
                link: [],
             }
	       ]
	     } 
	},
    {
       path: ':id',
       component: PhoneDetailComponent,
       resolve: createResolveData(PhoneDetailResolver),
       data: { breadcrumb: phoneDetailBreadcrumb },
    }
	]),
  ],
  declarations: [
    AllPhonesListComponent,
	PhoneDetailComponent
  ],
  providers:[PhoneDetailResolver],
})
export class PhoneSubscriptionUIModule {}

export function phoneDetailBreadcrumb(resolved: { entity: Observable<SubscribedPhonesFragment> }) {
	return resolved.entity.pipe(
        map(entity => [
            {
                label: 'Subscribed Phones',
                link: ['/extensions', 'subscribedphones'],
            },
            {
                label: `${entity.phone}`,
                link: [],
            },
        ]),
    );
}
