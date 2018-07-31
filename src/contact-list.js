import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactUpdated, ContactViewed} from './messages';

@inject(WebAPI, EventAggregator)
export class ContactList {
  constructor(api, ea) {
    this.api = api;
    this.ea = ea;
    this.contacts = [];

    ea.subscribe(ContactViewed, msg=> this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.conteact.id;
      let found = this.contacts.find(x => x.id == id);
      Object.assign(found, msg.contact);
    });
  }

  created() {
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact) {
    this.selectedId = contact.id;
    return true;
  }
}

/*
We've imported and injected our EventAggregator. Call the subscribe method and pass it the message type and a callback. When the message is published, your callback is fired and passed the instance of the message type. In this case, we use these messages to update our selection as well as the details of the contact that are relevant to our list.

If you run the application now, you should see that everything is working as expected.
 */
