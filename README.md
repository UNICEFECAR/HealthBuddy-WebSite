# health-buddy-webapp

## Project setup
```
yarn install
```

### Compiles and minifies for production
```
yarn build
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Lints and fixes files
```
yarn lint
```

### Environment variables
There are several constants, which are used in project code, but set up via CI pipeline, such as:
```
VUE_APP_BASE_URL - base URL (endpoint) for connection to Drupal part
VUE_APP_CHANNEL_UUID - channel uuid for webchat
VUE_APP_HOST - host for webchat
``` 
These variables can be accessible in any place in the following way:
```
process.env.VUE_APP_*,
```
**Important note:** All environment variables should start with `'VUE_APP_'`


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
