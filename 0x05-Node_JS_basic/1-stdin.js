process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', (data) => {
  const chunk = process.stdin.read();

  if (chunk) {
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

process.on('exit', () => {
  console.log('This important software is now closing');
});
