// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiServerURL: 'http://localhost:8000',
  serverTiledGeoserver: 'http://192.168.56.103:8080/geoserver/wms',
  serverTiledMapServer: 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoibmF0YXNpZ3VpIiwiYSI6ImNsMTB1bG1iYjJja3EzbG11NG94dHA4MDkifQ.h6yseMwoU1s1NBiqQ5RPIQ',
  tileLayer: 'sigui.server:Regiao_Sul',
};

/*
  *  apiServerURL: 'http://localhost:3000',
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
