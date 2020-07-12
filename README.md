# Vendure Subscription Plugin

This is a plugin for the [Vendure e-commerce framework](https://www.vendure.io/) designed for recording emails and phones for subscriptions/newsletter.

After setting of your vendure project, you can just use this plugin via npm install:

```npm install vendure-subscription-plugin```

and then include it to vendure-config file as below:

```

import { SubscriptionPlugin } from "vendure-subscription-plugin";
...
export const config: VendureConfig = {
  ...
  plugins: [
    ...,
	SubscriptionPlugin
  ]
}

```

Optionally for Admin UI extension, you may just add via following manner:

```
AdminUiPlugin.init({
 ...	
  app: compileUiExtensions({
    outputPath: path.join(__dirname, '....'),
	 extensions: [
		...
		SubscriptionPlugin.uiExtensions,
		...
     ]
  }),
 ...
})

```

The types, inputs and mutations updated after installing the plugin are:

# Main Type

```
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
```

#Inputs

```
input EmailAddInput{
  email: String!
}
	
input PhoneAddInput{
  phone: String!
}
  
input EmailUpdateInput{
  id: ID!
  email: String!
}
	
input PhoneUpdateInput{
  id: ID!
  phone: String!
}
  
input EmailListOptions

input PhoneListOptions
```

# Shop Mutation

```   
extend type Mutation {
 addSubscriptionEmail(input:[EmailAddInput!]!): [Email]!
}
	
extend type Mutation {
 addSubscriptionPhone(input:[PhoneAddInput!]!): [Phone]!
}	
```

#Admin Type, Query and Mutation

```
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
```
