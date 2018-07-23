/*
We've got the basic visual structure of our application in place and routing is now working. We've even created our first screen. However, it's not very interesting. We've got a div placeholder for the actual contact list at present. Let's go ahead and build that out, as a contact-list custom element.

Aurelia strives to be a self-consistent framework. As such, building a custom element is the same as creating your App component and your routed components. To create the contact-list custom element, start by creating a new file named contact-list.js and add the following code:
 */

import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

@inject(WebAPI)
export class ContactList {
  constructor(api) {
    this.api = api;
    this.contacts = [];
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
We use a dashed naming convention to separate the words contact-list as our custom element name. The name of the class instead should be defined by using the UpperCamelCase version ContactList.

The view-model for our custom element has a few notable characteristics. First, we're using dependency injection. Aurelia has its own dependency injection container, which it uses to instantiate classes in your app. Classes can declare constructor dependencies through inject metadata. This looks a bit different depending on what language you are using. In ES 2015, you can declare an inject static method that returns an array of constructor dependencies while in ES Next and TypeScript, you can use an inject decorator to declare those dependencies. As you can see here, our ContactList class has a dependency on our WebAPI class. When Aurelia instantiates the contact list, it will first instantiate (or locate) an instance of the web API and "inject" that into the contact list's constructor.

The second thing to notice is the created method. All Aurelia components follow a component life-cycle. A developer can opt into any stage of the life-cycle by implementing the appropriate methods. In this case, we're implementing the created hook which gets called after both the view-model and the view are created. We're using this as an opportunity to call our API and get back the list of contacts, which we then store in our contacts property so we can bind it in the view.

Finally, we have a select method for selecting a contact. We'll revisit this shortly, after we take a look at how it's used in the view.

 */
