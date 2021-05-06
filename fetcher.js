const request = require('request');
const fs = require('fs');
const args = process.argv.slice(2);
const URL = args[0];
const pathToStore = args[1];

request(URL, (error, response, body) => {
  console.log('error:', error); 
  if (error) {
    return;
  }
  console.log('statusCode:', response && response.statusCode); 
  if(response.statusCode !== 200) {
    return;
  }
  // console.log('body:', body);
  fs.writeFile(pathToStore, body, () => {
    if (!error) {
      console.log("Successfully downloaded!");
    }
  });
});



/* fs.readFile(pathToStore, 'utf8', () => {
  const readline = require('readline');
  const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
  if (error) {
    rl.question("File aready exits, do you want to overwrite? (Y): ", (answer) => {
      if (answer !== 'Y' && answer !== 'y') {
        rl.cloce();
        return;
      }
    })
  }

  fs.writeFile(pathToStore, body, () => {
    if (!error) {
      console.log("Successfully downloaded!");
    }
  });
}) */