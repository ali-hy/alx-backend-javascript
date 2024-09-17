const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }
  if (filePath) {
    fs.readFile(filePath, (error, loadedData) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (loadedData) {
        const reportChunks = [];
        const lines = loadedData.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        const dbFields = lines[0].split(',');
        const studentPropNames = dbFields.slice(
          0,
          dbFields.length - 1,
        );

        for (const line of lines.slice(1)) {
          const studentRow = line.split(',');
          const studentPropValues = studentRow.slice(
            0,
            studentRow.length - 1,
          );
          const field = studentRow[studentRow.length - 1];
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          const studentEntries = studentPropNames.map((propName, idx) => [
            propName,
            studentPropValues[idx],
          ]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentGroups).reduce(
          (pre, cur) => (pre || []).length + cur.length,
        );
        reportChunks.push(`Number of students: ${totalStudents}`);
        for (const [field, group] of Object.entries(studentGroups)) {
          reportChunks.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportChunks.join('\n'));
      }
    });
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const responseParts = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    })
    .catch((error) => {
      responseParts.push(error instanceof Error ? error.message : error.toString());
      const responseText = responseParts.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
