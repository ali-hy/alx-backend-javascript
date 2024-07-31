interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "John",
  lastName: "Doe",
  age: 20,
  location: "New York"
};

const student2: Student = {
  firstName: "Jane",
  lastName: "Smith",
  age: 22,
  location: "Los Angeles"
};

const studentsList: Student[] = [student1, student2];

// Create the table and append it to the body
const table = document.createElement('table');
document.body.appendChild(table);

// Create the table header
const headerRow = document.createElement('tr');
const headerFirstName = document.createElement('th');
headerFirstName.textContent = 'First Name';
const headerLocation = document.createElement('th');
headerLocation.textContent = 'Location';
headerRow.appendChild(headerFirstName);
headerRow.appendChild(headerLocation);
table.appendChild(headerRow);

// Append rows for each student
studentsList.forEach(student => {
    const row = document.createElement('tr');
    const cellFirstName = document.createElement('td');
    cellFirstName.textContent = student.firstName;
    const cellLocation = document.createElement('td');
    cellLocation.textContent = student.location;
    row.appendChild(cellFirstName);
    row.appendChild(cellLocation);
    table.appendChild(row);
});
