import * as nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';
import 'nprogress/nprogress.css';

/*This code creates a custom element
*
* since the entire rendering job is handled by the NProgress library, we don't need Aurelia's templating engine to render this component at all.
*
* So, we use the noView() decorator to tell Aurelia not to load a loading-indicator.html, compile it or do any of that rendering work.
*
* Additionally, the NProgress library requires some CSS to work, so we make sure to import that above.*/

/*Next, we want our custom HTML element to have a loading property that we can bind to via an HTML
attribute in the DOM. So, we declare that by using the bindable decorator.

Whenever you have a bindable, by convention, you can optionally declare a propertyNameChanged method that
will be called whenever the binding system updates the property. So, we've added one of those so that we
 can toggle the NProgress indicator off and on, based on the value of that property.*/

/*Previously, when we created the contact-list component, we required that into the app.html view and used it, since all views are encapsulated. However, we're going to do something different in this case, as an example.

Aurelia gives you the ability to globalize view resources, such as custom elements. This is a convenience so that you don't have to require common resources repeatedly into every view. To do this, we need to register our element as a global resource.

Open up the resources/index.js file that's already in your solution, and change the code so that it has the registration...*/

@noView
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
