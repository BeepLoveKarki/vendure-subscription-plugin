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
   CreateEmail,
   SubscribedEmailsFragment,
   UpdateEmail,
   EmailAddInput,
   EmailUpdateInput
} from '../../generated-types';

import { CREATE_EMAIL,UPDATE_EMAIL } from './mail-detail.graphql';

@Component({
    selector: 'vdr-subscription-mail-detail',
    templateUrl: './mail-detail.component.html',
    styleUrls: ['./mail-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
})

export class MailDetailComponent extends BaseDetailComponent<SubscribedEmailsFragment>
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
            email: ['', Validators.required]
        });
		
    }
	
	ngOnInit() {
		if(this.router.url!='/extensions/subscribedmails/create'){
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
                        entity: 'Email',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-create-error', {
                        entity: 'Email',
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
                        entity: 'Email',
                    });
                },
                () => {
                    this.notificationService.error('common.notify-update-error', {
                        entity: 'Email',
                    });
                },
            );
    }
	
	private addNew(): Observable<boolean>{
	   if (this.detailForm.dirty) {
            const formValue = this.detailForm.value;
            const input: EmailAddInput[] = [{
                email: formValue.email,
            }];
            return this.dataService
                .mutate<CreateEmail.Mutation,CreateEmail.Variables>(CREATE_EMAIL, {
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
            const input: EmailUpdateInput[] = [{
                id: this.id,
                email: formValue.email,
            }];
            return this.dataService
                .mutate<UpdateEmail.Mutation,UpdateEmail.Variables>(UPDATE_EMAIL, {
                    input,
                })
                .pipe(mapTo(true));
        } else {
            return of(false);
        }
    }
	
	protected setFormValues(entity: SubscribedEmailsFragment) {
		
		  this.detailForm.patchValue({
            email: entity.email,
          });
	}
    
}
