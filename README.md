# Geonet-CLI

Command line tool written in node/typescript that fetches information on earthquakes from [GeoNet](https://api.geonet.org.nz/)

## Run
Requires [Node](https://nodejs.org/en/) LTS or current.
``` 
git clone https://github.com/Zainrax/Geonet-CLI.git && cd Geonet-CLI
npm install
npm start
```
### Runtime Dependencies
- [node-fetch](https://www.npmjs.com/package/node-fetch)

## Task List

- [x] fetch API to geonet for earthquakes
- [x] parse promise for time, depth, magnitude, MMI, locality in 365
- [x] Calculate Avg depth & magnitude
- [x] accept MMI cli arg, defaults to MMI of 3
- [x] filter deleted out of earthquakes
