import {inject} from 'aurelia-framework';
// pub-sub
/*we've imported Aurelia's EventAggregator and configured it to be injected into the constructor of our
 ContactDetail class. We've also imported the two messages we created. */
import {EventAggregator} from 'aurelia-event-aggregator';
import {ContactUpdated, ContactViewed} from './messages';
import {WebAPI} from './web-api';
import {areEqual} from './utility';

@inject(WebAPI, EventAggregator)
export class ContactDetail {
  constructor(api, ea) {
    this.api = api;
    this.ea = ea;
  }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      // Whenever a contact is loaded, we publish the ContactViewed message.
      this.ea.publish(new ContactViewed(this.contact));
    });
  }

  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }


  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
      //  Whenever a contact is saved, we publish the ContactUpdated message.
      this.ea.publish(new ContactUpdated(this.contact));
    });
  }

  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)) {
      let result = confirm('You have unsaved changes. Are you sure you wish to leave?');

      if (!result) {
        /*  If the user attempts to navigate away, but cancels, we reflect this by publishing another
        ContactViewed message, representing that they are returning to view the current contact. */
        this.ea.publish(new ContactViewed(this.contact));
      }
      return result;

    }

    return true;
  }
}

/* With these messages in place, we can now enable any other component in our system to loosely subscribe to the new information in our system and use that data as appropriate to its internal needs.The contact-list component needs changes to take advantage of this information to ensure that it is always in sync...*/
