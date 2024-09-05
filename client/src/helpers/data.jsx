const studentData = [
    {
      id: 1,
      name: 'John Doe',
      age: 20,
      grade: 'A',
      major: 'Computer Science',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 22,
      grade: 'B+',
      major: 'Biology',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      age: 21,
      grade: 'A-',
      major: 'Chemistry',
    },
];

const studentColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'grade', label: 'Grade' },
    { key: 'major', label: 'Major' },
];

module.exports = {
    studentColumns,
    studentData
}