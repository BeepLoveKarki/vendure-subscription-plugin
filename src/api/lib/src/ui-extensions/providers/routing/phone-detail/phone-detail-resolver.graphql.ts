import gql from 'graphql-tag';

import { PHONE_SUBSCRIPTION_FRAGMENT } from '../../../common/fragments.graphql';

export const GET_PHONE = gql`
  query GetPhone($id: ID!) {
    SubscriptionPhone(id: $id) {
      ...SubscribedPhones
    }
  }
  ${PHONE_SUBSCRIPTION_FRAGMENT}
`;