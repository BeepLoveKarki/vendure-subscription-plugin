import gql from 'graphql-tag';

import { PHONE_SUBSCRIPTION_FRAGMENT } from '../../common/fragments.graphql';

export const UPDATE_PHONE = gql`
    mutation UpdatePhone($input: [PhoneUpdateInput!]!) {
        updateSubscriptionPhone(input: $input) {
            ...SubscribedPhones
        }
    }
    ${PHONE_SUBSCRIPTION_FRAGMENT}
`;

export const CREATE_PHONE = gql`
    mutation CreatePhone($input: [PhoneAddInput!]!) {
        addSubscriptionPhone(input: $input) {
            ...SubscribedPhones
        }
    }
    ${PHONE_SUBSCRIPTION_FRAGMENT}
`;