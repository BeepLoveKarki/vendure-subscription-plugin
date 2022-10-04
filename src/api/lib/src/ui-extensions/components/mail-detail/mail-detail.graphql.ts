import gql from 'graphql-tag';

import { MAIL_SUBSCRIPTION_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_EMAIL = gql`
    mutation UpdateEmail($input: [EmailUpdateInput!]!) {
        updateSubscriptionEmail(input: $input) {
            ...SubscribedEmails
        }
    }
    ${MAIL_SUBSCRIPTION_FRAGMENT}
`;

export const CREATE_EMAIL = gql`
    mutation CreateEmail($input: [EmailAddInput!]!) {
        addSubscriptionEmail(input: $input) {
            ...SubscribedEmails
        }
    }
    ${MAIL_SUBSCRIPTION_FRAGMENT}
`;