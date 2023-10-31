# BVBSHOP Packages

### How to use env variable from parent project?

Wrong way 
```
const ENV = process.env || {};
console.log(ENV.ENDPOINT);
```

Correct way
```
console.log(process.env.ENDPOINT);
```

Use env variable directly don't copy it in any variable(s).