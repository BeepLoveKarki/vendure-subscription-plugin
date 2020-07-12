import gql from 'graphql-tag';

import { MAIL_SUBSCRIPTION_FRAGMENT } from '../../common/fragments.graphql';

export const GET_ALL_EMAILS = gql`
    query GetAllEmails($options: EmailListOptions){
		SubscriptionEmails(options: $options){
			items{
			...SubscribedEmails
			}
			totalItems
       }
    }
	${MAIL_SUBSCRIPTION_FRAGMENT}
`;


export const DELETE_EMAIL = gql`
   mutation DeleteEmail($input:[ID!]!){
      deleteSubscriptionEmail(id:$input){
	     ...SubscribedEmails 
	  }
   }
   ${MAIL_SUBSCRIPTION_FRAGMENT}
`;