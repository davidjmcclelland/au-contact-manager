import {inject} from 'aurelia-framework';
/*
Once again, we are using dependency injection to get an instance of our WebAPI. We need this to load the contact detail data. Next, we implement a method named activate. Remember when we mentioned that all components have a life-cycle? Well, there are additional life-cycle methods for routed components. activate is one such method and it gets invoked right before the router is about to activate the component. This is also how the router passes the component its route parameters.
 */
import {WebAPI} from './web-api';
import {areEqual} from './utility';

@inject(WebAPI)
export class ContactDetail {
  constructor(api){
    this.api = api;
  }

  /*
  The first argument passed to activate is the params object. This object will have one property for every route param that was parsed as well as a property for each query string parameter. If you recall, our route pattern for the contact details screen was contacts/:id. So, our params object will have an id property with the requested contact's id. Using this id we call our WebAPI to retrieve the contact data. This API returns a Promise which we wait on and then store the loaded contact in a contact property so it's easy to bind to. We also make a copy of this object and store it in the originalContact property, so we can do some rudimentary checking to see if the data has been edited by the user at a later point.

  The second argument passed to activate is the routeConfig. This is the same configuration object that you created to configure the router itself. You can get access to that here so that you can access any of its properties. The router generates a navModel for each routeConfig. Using the navModel you can dynamically set the title of the document for this route. So, we call navModel.setTitle() in order to set up the document's title with the name of the contact that we just loaded.
   */
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
    });
  }

  /*
  we have a canSave computed property which we'll use in the view. This will help us show some simple feedback to the user to indicate whether the UI and data are in a state that allows for saving.
   */
  get canSave() {
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  /*
  If we take a brief look at the save method, we can see that this is just a brief call to the WebAPI's saveContact method. After that succeeds, we update our originalContact to the latest version and then we update the document's title with the potentially new contact name.
   */
  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
    });
  }

  /*
  This screen demonstrates another part of the navigation lifecycle available to routed components: the canDeactivate hook. If present, this method is called before navigating away from the current component. It gives your component an opportunity to cancel navigation, if it desires. In the case of the contact detail screen, we are comparing our originalContact to the current contact, using our areEqual helper method, in order to determine whether or not the user has made any changes to the data. If they have, we show a confirmation dialog to make sure they want to navigate away, since they would lose their changes. If the canDeactivate hook returns true, navigation is allowed; if false is returned, it is prevented and the route state is reverted.
   */
  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)){
      return confirm('You have unsaved changes. Are you sure you wish to leave?');
    }

    return true;
  }
}
