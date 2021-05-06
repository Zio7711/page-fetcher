const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const URL = args[0];
const pathToStore = args[1];
const sizeOf = require('object-sizeof')

request(URL, (error, response, body) => {
  if (error) {
    return  console.log('error:', error); 
  }
  console.log('statusCode:', response && response.statusCode); 
  if(response.statusCode !== 200) {
    return;
  }

  fs.readFile(pathToStore, 'utf8', (error) => {
    console.log("error", error);
    if (error){
      fs.writeFile(pathToStore, body, () => {
        console.log(`Successfully downloaded! File size: ${sizeOf(body)} bytes to ${pathToStore}!`); 
    });
    } else {
      const readline = require('readline');
      const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
      rl.question("File aready exits, do you want to overwrite? (Y): ", (answer) => {
        if (answer !== 'Y' && answer !== 'y') {
          rl.close();
          return console.log("Did nothing!");
        } else {
          fs.writeFile(pathToStore, body, (error) => {
            if (!error) {
              console.log(`Successfully downloaded! File size: ${sizeOf(body)} bytes to ${pathToStore}!`);
            }
          });
        }
        rl.close();
      })
    } 
  })
});



