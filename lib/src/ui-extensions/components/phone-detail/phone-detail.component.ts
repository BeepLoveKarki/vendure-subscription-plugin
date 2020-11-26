import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
    BaseDetailComponent,
    DataService,
    NotificationService,
    ServerConfigService,
} from '@vendure/admin-ui/core';
import { Observable, of } from 'rxjs';
import { filter, map, mapTo, switchMap } from 'rxjs/operators';

import { 
   CreatePhone,
   SubscribedPhonesFragment,
   UpdatePhone,
   PhoneAddInput,
   PhoneUpdateInput
} from '../../generated-types';

import { CREATE_PHONE,UPDATE_PHONE } from './phone-detail.graphql';

@Component({
    selector: 'vdr-subscription-phone-detail',
    templateUrl: './phone-detail.component.html',
    styleUrls: ['./phone-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})

export class PhoneDetailComponent extends BaseDetailComponent<SubscribedPhonesFragment>
    implements OnInit, OnDestroy {
    detailForm: FormGroup;
	which = false;
	
	constructor(
        route: ActivatedRoute,
        router: Router,
        serverConfigService: ServerConfigService,
        private formBuilder: FormBuilder,
        protected dataService: DataService,
        private changeDetector: ChangeDetectorRef,
        private notificationService: NotificationService,
    ) {
        super(route, router, serverConfigService, dataService);
        
		this.detailForm = this.formBuilder.group({
            phone: ['', Validators.required]
        });
		
    }
	
	ngOnInit() {
		if(this.router.url!='/extensions/subscribedphones/create'){
		  this.which=false;
		  this.init();
		}else{
		   this.which=true;
		}
    }
	
	ngOnDestroy() {
      this.destroy();
    }
	
	create(){
	   this.addNew()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-create-success', {
                        entity: 'Phone',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-create-error', {
                        entity: 'Phone',
                    });
                },
            );
	}
	
	save() {
        this.saveChanges()
            .pipe(filter(result => !!result))
            .subscribe(
                () => {
                    this.detailForm.markAsPristine();
                    this.changeDetector.markForCheck();
                    this.notificationService.success('common.notify-update-success', {
                        entity: 'Phone',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Phone',
                    });
                },
            );
    }
	
	private addNew(): Observable<boolean>{
	   if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
			const num = formValue.phone.toString();
            const input: PhoneAddInput[] = [{
                phone: num,
            }];
            return this.dataService
                .mutate<CreatePhone.Mutation,CreatePhone.Variables>(CREATE_PHONE, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
	}
	
	private saveChanges(): Observable<boolean> {
        if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
			const num = formValue.phone.toString();
            const input: PhoneUpdateInput[] = [{
                id: this.id,
                phone: num,
            }];
            return this.dataService
                .mutate<UpdatePhone.Mutation,UpdatePhone.Variables>(UPDATE_PHONE, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }
	
	protected setFormValues(entity: SubscribedPhonesFragment) {
		  
		  this.detailForm.patchValue({
            phone: parseInt(entity.phone),
          });
	}
    
}
