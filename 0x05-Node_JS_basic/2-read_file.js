module.exports = function countStudents(filePath) {
  try {
    const data = fs.readFileSync
    (filePath, { encoding: 'utf8' }).split('\n');
    let students = data.slice(1, data.length - 1);
    let fields = {};
    for (const student of students) {
      if (student in fields) {
        fields[student] += 1;
      } else {
        fields[student] = 1;
      }
    }
    console.log(`Number of students: ${students.length}`);

    for (const field in fields) {
      if (field) {
        console.log(`Number of students in ${field}: ${fields[field]}. List: ${students.filter((student) => student === field).join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
