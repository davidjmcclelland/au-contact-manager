import {PLATFORM} from 'aurelia-framework';

export function configure(config) {
  config.globalResources([PLATFORM.moduleName('./elements/loading-indicator')]);
}

/*
With this registration in place, we can now use our indicator in our app.html.

Before we do that, we want to make one more change to our app.js. We would like to be able to bind the indicator to the request state of our API, so we need to make that available in our App class...
*/
