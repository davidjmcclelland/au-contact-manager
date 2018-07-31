/*
Whenever the contact detail screen successfully saves a contact, we'll publish the ContactUpdated message and whenever the end user begins viewing a new contact, we'll publish the ContactViewed message. */

export class ContactUpdated {
  constructor(contact) {
    this.contact = contact;
  }
}

export class ContactViewed {
  constructor(contact) {
    this.contact = contact;
  }
}

/*
Each of these messages will carry the contact data along with it so that subscribers have contextual data related to the event.

Next, let's update our contact-detail code to incorporate Aurelia's EventAggregator and publish the messages at the appropriate time in contact-detail.js...*/
