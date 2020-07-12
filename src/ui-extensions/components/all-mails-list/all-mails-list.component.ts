import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';
import { BaseListComponent, DataService, NotificationService, ModalService  } from '@vendure/admin-ui/core';
import { merge, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { SortOrder } from '../../generated-types';
import { EMPTY, Observable } from 'rxjs';
import { debounceTime, takeUntil, switchMap } from 'rxjs/operators';
import { CsvDataService } from '../../common/export-as-csv';

import { 
  GetAllEmailsQuery,
  SubscribedEmails,
  GetAllEmailsQueryVariables,
  DeleteEmail
} from '../../generated-types';

import { GET_ALL_EMAILS, DELETE_EMAIL } from './all-mails-list.graphql';

@Component({
    selector: 'vdr-all-mails-list',
    templateUrl: './all-mails-list.component.html',
    styleUrls: ['./all-mails-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AllMailsListComponent extends BaseListComponent<
    GetAllEmailsQuery,
	SubscribedEmails.Fragment,
    GetAllEmailsQueryVariables
> implements OnInit {
    searchTerm = new FormControl('');
	SubscriptionEmails: any;
	private querySubscription: Subscription;

    constructor(
	   private dataService: DataService,
       private modalService: ModalService,
       private notificationService: NotificationService,
       private apollo: Apollo,	   
	   router: Router, 
	   route: ActivatedRoute,
	) {
        super(router, route);
        super.setQueryFn(
            (...args: any[]) => this.dataService.query(GET_ALL_EMAILS,args),
            (data) => data.SubscriptionEmails,
			(skip, take) => ({
                options: {
                    skip,
                    take,
                    filter: {
                        email: {
                            contains: this.searchTerm.value,
                        },
                    },
					sort: {
                        updatedAt: SortOrder.Desc,
                    },
                },
            }),
        );
    }
	
	ngOnInit() {
        super.ngOnInit();
        this.searchTerm.valueChanges
            .pipe(
                debounceTime(250),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
				this.refresh();
			});
    }
	
	
	downloadcsv(){
	  let args: any[] = [];
	  this.apollo.watchQuery<any>({
         query: GET_ALL_EMAILS,
		 variables: args
      }).valueChanges.subscribe((data) => {
		  CsvDataService.exportToCsv('danfe-subscribed-emails.csv', data.data.SubscriptionEmails.items);
      });
	  
	   
	}
	
	deleteEmail(id: string) {
		let ids:string[] =[id];
        this.modalService
            .dialog({
                title: _('vdr-subscription-plugin.confirm-delete-email'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response => (response ? this.dataService.mutate<DeleteEmail.Mutation,DeleteEmail.Variables>(DELETE_EMAIL,{"input":ids}) : EMPTY)),
            )
            .subscribe(
                () => {
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'Email',
                    });
                    this.refresh();
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'Email',
                    });
                },
            );
    }
}
