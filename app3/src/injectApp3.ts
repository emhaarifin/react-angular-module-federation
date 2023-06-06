import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import "zone.js";
declare const require: any;
const ngVersion = require('../package.json').dependencies['@angular/core'];


export default function injectApp3() {
  if (environment.production) {
    enableProdMode();
  }

  (window as any).platform = (window as any).platform || {};
  let platform = (window as any).platform[ngVersion];
  if (!platform) {
    platform = platformBrowserDynamic();
    (window as any).platform[ngVersion] = platform;
  }
  platform.bootstrapModule(AppModule)
    .catch((err: any) => console.error(err));
  // platformBrowserDynamic()
  //   .bootstrapModule(AppModule)
  //   .catch((err) => console.error(err));
}
