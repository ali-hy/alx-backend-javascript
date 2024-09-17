import readDatabase from '../utils';

const VALID_MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(request, response) {
    const filePath = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(filePath)
      .then((groupsOfStudents) => {
        const responseChunks = ['This is the list of our students'];

        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        for (const [field, group] of Object.entries(groupsOfStudents).sort(cmpFxn)) {
          responseChunks.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        response.status(200).send(responseChunks.join('\n'));
      })
      .catch((error) => {
        response
          .status(500)
          .send(error instanceof Error ? error.message : error.toString());
      });
  }

  static getAllStudentsByMajor(request, response) {
    const filePath = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;

    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(filePath)
      .then((studentGroups) => {
        let responseText = '';

        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }
        response.status(200).send(responseText);
      })
      .catch((error) => {
        response
          .status(500)
          .send(error instanceof Error ? error.message : error.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
