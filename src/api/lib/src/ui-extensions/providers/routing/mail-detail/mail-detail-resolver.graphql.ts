import gql from 'graphql-tag';

import { MAIL_SUBSCRIPTION_FRAGMENT } from '../../../common/fragments.graphql';

export const GET_EMAIL = gql`
  query GetEmail($id: ID!) {
    SubscriptionEmail(id: $id) {
      ...SubscribedEmails
    }
  }
  ${MAIL_SUBSCRIPTION_FRAGMENT}
`;