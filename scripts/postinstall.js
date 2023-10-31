/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const envFile = path.resolve(__dirname, '../../../.env');
const GA_ENV_VAR = 'GA_TRACKING_ID';
const GTM_ENV_VAR = 'GTM_CONTAINER_ID';

fs.readFile(envFile, 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
  } else {
    // eslint-disable-next-line no-lonely-if
    if (data.toString().indexOf(ENV_VAR) === -1) {
      let newData = data;
      newData = `${newData}\n${GA_ENV_VAR}=UA-000000-01`;
      newData = `${newData}\n${GTM_ENV_VAR}=HTM-0000000`;
      fs.writeFile(envFile, newData, e => {
        if (e) console.log(e);
        console.log('Successfully Written to File.');
      });
    }
  }
});
