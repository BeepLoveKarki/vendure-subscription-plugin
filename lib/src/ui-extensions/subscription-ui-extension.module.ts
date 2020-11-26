import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection({
      id: 'subscriptions',
      label: 'Subscriptions',
      items: [{
        id: 'mails',
        label: 'Mails',
        routerLink: ['/extensions/subscribedmails'],
        // Icon can be any of https://clarity.design/icons
        icon: 'envelope',
      },{
	    id: 'phones',
        label: 'Phones',
        routerLink: ['/extensions/subscribedphones'],
        icon: 'phone-handset',
	  }],
    },
    // Add this section before the "settings" section
    'settings'),
  ]
})
export class SubscriptionExtensionModule {}