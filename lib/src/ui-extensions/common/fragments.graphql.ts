import gql from 'graphql-tag';

export const MAIL_SUBSCRIPTION_FRAGMENT = gql`
    fragment SubscribedEmails on Email {
        id
		email
        createdAt
        updatedAt
    }
`;

export const PHONE_SUBSCRIPTION_FRAGMENT = gql`
    fragment SubscribedPhones on Phone {
        id
		phone
        createdAt
        updatedAt
    }
`;
