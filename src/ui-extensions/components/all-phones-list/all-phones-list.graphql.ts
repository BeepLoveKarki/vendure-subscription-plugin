import gql from 'graphql-tag';

import { PHONE_SUBSCRIPTION_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_PHONES = gql`
    query GetAllPhones($options: PhoneListOptions){
		SubscriptionPhones(options: $options){
			items{
			...SubscribedPhones
			}
			totalItems
       }
    }
	${PHONE_SUBSCRIPTION_FRAGMENT}
`;


export const DELETE_PHONE = gql`
   mutation DeletePhone($input:[ID!]!){
      deleteSubscriptionPhone(id:$input){
	     ...SubscribedPhones 
	  }
   }
   ${PHONE_SUBSCRIPTION_FRAGMENT}
`;