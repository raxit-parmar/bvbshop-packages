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
    const dataArray = data.split('\n');
    const gaSearchKeyword = GA_ENV_VAR;
    const gtmSearchKeyword = GTM_ENV_VAR;
    let gaLastIndex = -1;
    let gtmLastIndex = -1;

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < dataArray.length; index++) {
      if (dataArray[index].includes(gaSearchKeyword)) {
        gaLastIndex = index;
        if (gtmLastIndex !== -1) {
          break;
        }
      }
      if (dataArray[index].includes(gtmSearchKeyword)) {
        gtmLastIndex = index;
        if (gaLastIndex !== -1) {
          break;
        }
      }
    }

    dataArray.splice(gaLastIndex, 1);
    dataArray.splice(gtmLastIndex, 1);
    const updatedData = dataArray.join('\n');
    fs.writeFile(envFile, updatedData, e => {
      if (e) console.log(err);
      console.log('Successfully updated the file data');
    });
  }
});
