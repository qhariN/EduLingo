import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,
  appVersion: require('../../../../package.json').version,
  url: 'https://localhost:8090/api',
  api: {
    auth: '/security/oauth',
  },
  basicAuth: {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('us:pass')
    })
  }
};
