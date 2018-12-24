const fs = require('fs');

// Asynchronous Form:
fs.readFile(__filename, (err, data) => {
  if (err) throw err;

  // do something with data
});

// Synchronous Form:
// use try catch to handle errors
const data = fs.readFileSync(__filename);
// exeptions are immediately thrown
// do something with data

// TASK 1
// files got duplicated
// Truncate each file in half
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

const files = fs.readdirSync(dirname);

files.forEach(file => {
  const filePath = path.join(dirname, file);
  // asynchronous as we have many files to consider
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;
    // divide by 2
    fs.truncate(filePath, stats.size / 2, err => {
      if (err) throw err;
    });
  });
});

// TASK 2
// Script to clean old files in a directory
// Anything older than 7 days should be deleted
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

const files = fs.readdirSync(dirname);
const ms1Day = 24 * 60 * 60 * 1000;

files.forEach(file => {
  const filePath = path.join(dirname, file);
  fs.state(filePath, (err, stats) => {
    if (err) throw err;
  });

  if (Date.now() - stats.mtime.getTime() > 7 * ms1Day) {
    fs.unlink(filePath, err => {
      if (err) throw err;
      console.log(`deleted ${filePath}`);
    });
  }
});

// Task 3:
// Watch a directory and report 3 events.
// file was added, removed, changed
const fs = require('fs');
const path = require('path');

const dirname = path.join(__dirname, 'files');
const currentFiles = fs.readdirSync(dirname);

const logWithTime = message => {
  console.log(`${new Date().toUTCString()}: ${message}`);
};

fs.watch(dirname, (eventType, filename) => {
  if (eventType === 'rename') {
    // add or delete
    const index = currentFiles.indexOf(filename);
    if (index >= 0) {
      currentFiles.splice(index, 1);
      logWithTime(`${filename} was removed`);
      return;
    }
    currentFiles.push(filename);
    logWithTime(`${filename} was added`);
    return;
  }
  logWithTime(`${filename} was changed`);
});
