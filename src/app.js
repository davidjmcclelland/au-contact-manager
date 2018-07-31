import {PLATFORM} from 'aurelia-pal';


/*  Our App class is configured with a router. We want our browser history to reflect which contact in our list is selected, so we'll introduce a client-side router to handle the navigation from screen to screen:*/

/*To add routing to your app, all you have to do is add a configureRouter method to your App class. The framework will call this method, passing it a RouterConfiguration and a Router. You can use the configuration object to get the router setup with the routes you want. Use the map method to map route patterns to the modules that should handle the patterns. Minimally, each route needs at least a route pattern and a moduleId.

  In this example, we are registering two routes: The first route is empty, indicated by route: ''. This will be the default route that is matched when there is no fragment. This route will cause the no-selection module to load. We'll use this to display a nice message to the user, if they haven't selected a contact to view. The second route has the pattern contacts/:id. This will match the literal contacts/ followed by a parameter, which we've named id. When this route is matched, the router will load the contact-detail module so that we can display the selected contact.*/

/*WEBPACK NOTE: Did you notice the calls to PLATFORM.moduleName(....)? This is a special API that is used in Aurelia Webpack projects to allow Webpack to identify strings that represent modules. This enables Webpack to include the referenced module in the built package.*/

export class App {
  configureRouter(config, router) {
/*    We've set the config.title property. This sets a base "title" to be used in the document's title for the browser. We can also set a title on each route.

 When we do that, the router's title and the matched route's title will be joined together to form the final document title. The second route has a name property. We'll be able to use
 this later to generate routes without needing to copy/paste the route pattern everywhere.
 Instead, we can just refer to the route by name.*/

    config.title = 'Contacts';
    config.map([
      {route: '', moduleId: PLATFORM.moduleName('no-selection'), title: 'Select'},
      {route: 'contacts/:id', moduleId: PLATFORM.moduleName('contact-detail'), name: 'contacts'}
    ]);

    this.router = router;
  }
}
