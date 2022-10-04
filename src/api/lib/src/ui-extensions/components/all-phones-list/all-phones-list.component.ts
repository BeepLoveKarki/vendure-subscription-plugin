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
  GetAllPhonesQuery,
  SubscribedPhones,
  GetAllPhonesQueryVariables,
  DeletePhone
} from '../../generated-types';

import { GET_ALL_PHONES, DELETE_PHONE } from './all-phones-list.graphql';

@Component({
    selector: 'vdr-all-phones-list',
    templateUrl: './all-phones-list.component.html',
    styleUrls: ['./all-phones-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AllPhonesListComponent extends BaseListComponent<
    GetAllPhonesQuery,
	SubscribedPhones.Fragment,
    GetAllPhonesQueryVariables
> implements OnInit {
    searchTerm = new FormControl('');
	SubscriptionPhones: any;
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
            (...args: any[]) => this.dataService.query(GET_ALL_PHONES,args),
            (data) => data.SubscriptionPhones,
			(skip, take) => ({
                options: {
                    skip,
                    take,
                    filter: {
                        phone: {
                            contains: this.getfilter(),
                        },
                    },
					sort: {
                        updatedAt: SortOrder.Desc,
                    },
                },
            }),
        );
    }
	
	getfilter(){
	   if(this.searchTerm.value){
	      return this.searchTerm.value.toString();
	   }else{
	     return "" ;
	   }
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
         query: GET_ALL_PHONES,
		 variables: args
      }).valueChanges.subscribe((data) => {
		  CsvDataService.exportToCsv('subscribed-phones.csv', data.data.SubscriptionPhones.items);
      });
	  
	   
	}
	
	deletePhone(id: string) {
		let ids:string[] =[id];
        this.modalService
            .dialog({
                title: _('vdr-subscription-plugin.confirm-delete-phone'),
                buttons: [
                    { type: 'secondary', label: _('common.cancel') },
                    { type: 'danger', label: _('common.delete'), returnValue: true },
                ],
            })
            .pipe(
                switchMap(response => (response ? this.dataService.mutate<DeletePhone.Mutation,DeletePhone.Variables>(DELETE_PHONE,{"input":ids}) : EMPTY)),
            )
            .subscribe(
                () => {
                    this.notificationService.success(_('common.notify-delete-success'), {
                        entity: 'Phone',
                    });
                    this.refresh();
                },
                err => {
                    this.notificationService.error(_('common.notify-delete-error'), {
                        entity: 'Phone',
                    });
                },
            );
    }
}
