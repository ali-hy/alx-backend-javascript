const displayMessage = require('./0-console');

displayMessage('Welcome to Holberton School, what is your name?');

process.stdin.on('data', (data) => {
  const name = data.toString().trim();

  if (name)
    displayMessage(`Your name is: ${name}`);
  process.exit();
});

process.on('exit', () => {
  displayMessage('This important software is now closing');
});
