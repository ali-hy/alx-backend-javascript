const fs = require('fs');

const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
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

      const totalStudents = Object
        .values(studentGroups)
        .reduce((pre, cur) => (pre || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      for (const [field, group] of Object.entries(studentGroups)) {
        const studentNames = group.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
