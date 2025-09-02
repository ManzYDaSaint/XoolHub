// buildStudentContent.js
function buildStudentContent(students) {
  if (!Array.isArray(students) || students.length === 0) {
    return "No student data found for this school.";
  }

  const safe = (v, fallback = "N/A") => (v === undefined || v === null || v === "" ? fallback : String(v));

  const studentSummaries = students
    .map((st) => {
      const name = safe(st.name);
      const klass = safe(st.class);
      const year = safe(st.year);
      const school = safe(st.school);
      const contact = safe(st.contact);
      const age = safe(st.age);
      const gender = safe(st.gender);
      const address = safe(st.address);

      return [
        `Name: ${name}`,
        `Class: ${klass}`,
        `Academic Year: ${year}`,
        `School: ${school}`,
        `Contact/Phone: ${contact}`,
        `Age: ${age}`,
        `Gender: ${gender}`,
        `Address: ${address}`,
      ].join("\n");
    })
    .join("\n\n");

  return `Student Data\n\n${studentSummaries}`;
}

module.exports = buildStudentContent;
