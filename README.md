# health-buddy-webapp

Re-design of existing site "HealthBuddy"

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Environment variables
There are several constants, which are used in project code, but set up via CI pipeline, such as:
```
VUE_APP_BASE_URL - base URL for connection to Drupal part
VUE_APP_USERNAME - username for connection to Drupal part
VUE_APP_PASSWORD - password for connection to Drupal part
``` 
These variables can be accessible in any place in the following way:
```
process.env.VUE_APP_*,
```
**Important note:** All environment variables should start with `'VUE_APP_'`


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
