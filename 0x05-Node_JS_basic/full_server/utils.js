import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }

  if (filePath) {
    fs.readFile(filePath, (error, loadedData) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }

      if (loadedData) {
        const fileLines = loadedData
          .toString('utf-8')
          .trim()
          .split('\n');

        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentPropNames = dbFieldNames
          .slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentRow = line.split(',');
          const studentPropValues = studentRow
            .slice(0, studentRow.length - 1);
          const field = studentRow[studentRow.length - 1];
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          const studentEntries = studentPropNames
            .map((propName, idx) => [propName, studentPropValues[idx]]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }
        resolve(studentGroups);
      }
    });
  }
});

export default readDatabase;
module.exports = readDatabase;
