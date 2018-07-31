# au-contact-manager

3- [Contact Detail Screen + Pub-Sub](https://aurelia.io/docs/tutorials/creating-a-contact-manager#building-out-the-contact-detail-screen)



###Adding Pub/Sub Messaging
If you play around with the application for a bit, you'll notice a few "buggy" behaviors:

1. Refreshing the browser with a contact selected results in the correct contact being shown, but not in the correct contact list item being highlighted.
1. If you edit some data, try to navigate away and then cancel, the contact list item selection will go out of sync, highlighting the contact you were going to before you cancelled, but not the current contact.
1. If you edit some data and save, you will notice that changes in the name are not reflected in the list.

The reason for these issues is that we have two separate components, our contact-list and our contact-detail which both have their own internal data structures and behaviors, but which do have an affect on each other. 

The router is controlling the contact detail screen, so it's the ultimate source of truth and the contact list should sync with it. 

To handle this, we're going to increase the amount of information in our system by introducing pub/sub. Let's create a couple of messages that our contact-detail component can publish and then let the contact-list subscribe to those and respond appropriately.
