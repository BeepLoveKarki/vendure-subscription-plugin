import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, BaseEntityResolver } from '@vendure/admin-ui/core';
import { take } from 'rxjs/operators';
import { GET_PHONE } from './phone-detail-resolver.graphql';

import { 
  GetPhoneQuery,
  SubscribedPhonesFragment,
  GetPhoneQueryVariables
} from '../../../generated-types';

@Injectable()
export default class PhoneDetailResolver extends BaseEntityResolver<
  SubscribedPhonesFragment
> {
  constructor(router: Router, dataService: DataService) {
    super(
      router,
      {
        __typename: 'Phone',
        id: '',
		phone:'',
		createdAt: '',
		updatedAt: ''
      },
      (id) =>
        dataService.query<GetPhoneQuery, GetPhoneQueryVariables>(GET_PHONE, {
            id: id
        })
        .mapStream((data) => data.SubscriptionPhone)
    );
  }
}

