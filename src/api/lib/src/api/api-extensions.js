"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminApiExtensions = exports.shopApiExtensions = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const commonExtensions = apollo_server_core_1.gql `
  type Email implements Node {
        id: ID!
		email: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
  type Phone implements Node {
        id: ID!
		phone: String!
        createdAt: DateTime!
        updatedAt: DateTime!
    }
  input EmailAddInput{
	  email: String!
	}
	
  input PhoneAddInput{
	  phone: String!
   }
`;
exports.shopApiExtensions = apollo_server_core_1.gql `
    ${commonExtensions}
	
	extend type Mutation {
        addSubscriptionEmail(input:[EmailAddInput!]!): [Email]!
    }
	
	extend type Mutation {
        addSubscriptionPhone(input:[PhoneAddInput!]!): [Phone]!
    }
	
`;
exports.adminApiExtensions = apollo_server_core_1.gql `
	${commonExtensions}
    
	input EmailUpdateInput{
	  id: ID!
	  email: String!
	}
	
	input PhoneUpdateInput{
	  id: ID!
	  phone: String!
	}
	
	type EmailList implements PaginatedList {
     items: [Email!]!
     totalItems: Int!
    }
	
	type PhoneList implements PaginatedList {
     items: [Phone!]!
     totalItems: Int!
    }
	
    extend type Query {
        SubscriptionEmails(options: EmailListOptions): EmailList!
		SubscriptionEmail(id:ID!):Email
		
		SubscriptionPhones(options: PhoneListOptions): PhoneList!
		SubscriptionPhone(id:ID!):Phone
    }
	
	extend type Mutation {
        addSubscriptionEmail(input:[EmailAddInput!]!): [Email]!
		updateSubscriptionEmail(input:[EmailUpdateInput!]!): [Email]!
		deleteSubscriptionEmail(id:[ID!]!): [Email]!
		deleteAllSubscriptionEmails: Boolean!
		
		addSubscriptionPhone(input:[PhoneAddInput!]!): [Phone]!
		updateSubscriptionPhone(input:[PhoneUpdateInput!]!): [Phone]!
		deleteSubscriptionPhone(id:[ID!]!): [Phone]!
		deleteAllSubscriptionPhones: Boolean!
    }
	input EmailListOptions
	input PhoneListOptions
`;
//# sourceMappingURL=api-extensions.js.map