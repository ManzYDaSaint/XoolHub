const kneX = require("../database/db.jsx");
// const conn = require('../database/mysql.jsx');



// --------------------------------------- SCHOOL ------------------------------------------------

const countSchools = async () => {
  const query = "SELECT COUNT(*) as count FROM schools";
  const res = await kneX.query(query);
  return res.rows[0];
}

const getSchools = async () => {
  const query = "SELECT * FROM schools ORDER BY name ASC";
  const res = await kneX.query(query);
  return res.rows;
}

// --------------------------------------- SCHOOL ------------------------------------------------




// --------------------------------------- REGISTER CRUD ------------------------------------------------

const checkSchool = async (name) => {
  const query = "SELECT email FROM schools WHERE email = $1";
  const value = [name];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

const checkPassword = async (sid) => {
  const query = "SELECT password FROM schools WHERE sid = $1";
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

const checkSuperPassword = async () => {
  const query = "SELECT password FROM administrator";
  const res = await kneX.query(query);
  return res.rows[0];
};

const insertSchool = async (email, password) => {
  const query =
    "INSERT INTO schools(email, password) VALUES ($1, $2) RETURNING *";
  const values = [email, password];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

const editSchool = async (id) => {
  const query = "SELECT * FROM schools WHERE sid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

const updateSchool = async (
  id,
  name,
  address,
  city,
  country,
  email,
  contact,
  logo,
  slogan,
  type,
  update
) => {
  const query =
    "UPDATE schools SET name = $1, address = $2, city = $3, country = $4, email = $5, contact = $6, logo = $7, updated_at = $8, slogan = $9, type = $10 WHERE sid = $11";
  const values = [
    name,
    address,
    city,
    country,
    email,
    contact,
    logo,
    update,
    slogan,
    type,
    id,
  ];
  const res = await kneX.query(query, values);
  return res.rows;
};

const updateSchoolWithoutLogo = async (
  id,
  name,
  address,
  city,
  country,
  email,
  contact,
  slogan,
  type,
  update
) => {
  const query =
    "UPDATE schools SET name = $1, address = $2, city = $3, country = $4, email = $5, contact = $6, updated_at = $7, slogan = $8, type = $9 WHERE sid = $10";
  const values = [
    name,
    address,
    city,
    country,
    email,
    contact,
    update,
    slogan,
    type,
    id,
  ];
  const res = await kneX.query(query, values);
  return res.rows;
};

const OTPGeneration = async(otpCode, otpExpire, email) => {
  const query = "UPDATE schools SET otp_code = $1, otp_expires_at = $2 WHERE email = $3";
  const value = [otpCode, otpExpire, email];
  const res = await kneX.query(query, value);
  return res.rows;
}

const updatePassword = async(newPassword, sid) => {
  const query = "UPDATE schools SET password = $1 WHERE sid = $2";
  const value = [newPassword, sid];
  const res = await kneX.query(query, value);
  return res.rows;
}
const updateSuperPassword = async(newPassword) => {
  const query = "UPDATE administrator SET password = $1";
  const value = [newPassword];
  const res = await kneX.query(query, value);
  return res.rows;
}

// --------------------------------------- REGISTER CRUD ------------------------------------------------

// --------------------------------------- LOGIN ------------------------------------------------

const checkMail = async (email) => {
  const query = "SELECT * FROM schools WHERE email = $1";
  const values = [email];
  const res = await kneX.query(query, values);
  return res.rows[0];
};

const checkTeacherMail = async (email) => {
  const query = "SELECT * FROM teachers WHERE email = $1";
  const values = [email];
  const res = await kneX.query(query, values);
  return res.rows[0];
};

const checkAdminMail = async (email) => {
  const query = "SELECT * FROM administrator WHERE email = $1";
  const values = [email];
  const res = await kneX.query(query, values);
  return res.rows[0];
};



// --------------------------------------- LOGIN ------------------------------------------------

// --------------------------------------- EXAM CRUD ------------------------------------------------

// Check if Examination Type exists
const checkExam = async (name) => {
  const query = "SELECT name FROM exam WHERE name = $1";
  const value = [name];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new examination type
const insertExam = async (name, percentage) => {
  const query =
    "INSERT INTO exam(name, percentage) VALUES ($1, $2) RETURNING *";
  const values = [name, percentage];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all examination types
const getExam = async () => {
  const query = "SELECT * FROM exam";
  const res = await kneX.query(query);
  return res.rows;
};

// Delete Examination Type
const deleteExam = async (id) => {
  const query = "DELETE FROM exam WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating Examination Type
const updateExam = async (id, name, percentage, update) => {
  const query =
    "UPDATE exam SET name = $1, percentage = $2, updated_at = $3 WHERE id = $4";
  const values = [name, percentage, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single Exam
const editExam = async (id) => {
  const query = "SELECT id, name, percentage FROM exam WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- EXAM CRUD ------------------------------------------------

// --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------

// Check if academic year exists
const checkYear = async (name, startDate, endDate) => {
  const query =
    "SELECT name FROM acyear WHERE name = $1 AND start_date = $2 AND end_date = $3";
  const value = [name, startDate, endDate];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new academic year
const insertYear = async (name, startDate, endDate) => {
  const query = "INSERT INTO acyear(name, start_date, end_date) VALUES ($1, $2, $3) RETURNING *";
  const values = [name, startDate, endDate];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all academic year
const getYear = async () => {
  const query = "SELECT * FROM acyear";
  const res = await kneX.query(query);
  return res.rows;
};

// Delete academic year
const deleteYear = async (id) => {
  const query = "DELETE FROM acyear WHERE yearid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating academic year
const updateYear = async (id, name, startDate, endDate, update) => {
  const query =
    "UPDATE acyear SET name = $1, start_date = $2, end_date = $3, updated_at = $4 WHERE yearid = $5";
  const values = [name, startDate, endDate, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single academic year
const editYear = async (id) => {
  const query = "SELECT * FROM acyear WHERE yearid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------

// --------------------------------------- SUBJECT CRUD ------------------------------------------------

// Check if subject exists
const checkSubject = async (name, code) => {
  const query =
    "SELECT name FROM subject WHERE name = $1 AND code = $2";
  const value = [name, code];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new subject
const insertSubject = async (name, code) => {
  const query =
    "INSERT INTO subject(name, code) VALUES ($1, $2) RETURNING *";
  const values = [name, code];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all subject
const getSubject = async () => {
  const query = "SELECT * FROM subject";
  const res = await kneX.query(query);
  return res.rows;
};

// Delete subject
const deleteSubject = async (id) => {
  const query = "DELETE FROM subject WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating subject
const updateSubject = async (id, name, code, update) => {
  const query =
    "UPDATE subject SET name = $1, code = $2, updated_at = $3 WHERE id = $4";
  const values = [name, code, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single subject
const editSubject = async (id) => {
  const query = "SELECT id, name, code FROM subject WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- SUBJECT CRUD ------------------------------------------------

// --------------------------------------- CLASS CRUD ------------------------------------------------

// Check if object exists
const checkClass = async (name, denom) => {
  const query =
    "SELECT name FROM class WHERE name = $1 AND denom = $2";
  const value = [name, denom];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertClass = async (name, denom) => {
  const query =
    "INSERT INTO class(name, denom) VALUES ($1, $2) RETURNING *";
  const values = [name, denom];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getClass = async () => {
  const query = "SELECT * FROM class ORDER BY name ASC";
  const res = await kneX.query(query);
  return res.rows;
};

// Delete object
const deleteClass = async (id) => {
  const query = "DELETE FROM class WHERE classid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating object
const updateClass = async (id, name, denom, update) => {
  const query =
    "UPDATE class SET name = $1, denom = $2, updated_at = $3 WHERE classid = $4";
  const values = [name, denom, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single object
const editClass = async (id) => {
  const query = "SELECT classid, denom, name FROM class WHERE classid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- CLASS CRUD ------------------------------------------------

// --------------------------------------- TERM CRUD ------------------------------------------------

// Check if object exists
const checkTerm = async (name, startDate, endDate) => {
  const query =
    "SELECT name FROM term WHERE name = $1 AND start_date = $2 AND end_date = $3";
  const value = [name, startDate, endDate];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertTerm = async (name, year, startDate, endDate) => {
  const query =
    "INSERT INTO term(name, yearid, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [name, year, startDate, endDate];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getTerm = async () => {
  const query = `SELECT term.*, acyear.name AS year
FROM term 
INNER JOIN acyear ON acyear.yearid = term.yearid`;
  const res = await kneX.query(query);
  return res.rows;
};

// Delete object
const deleteTerm = async (id) => {
  const query = "DELETE FROM term WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating object
const updateTerm = async (id, name, year, startDate, endDate, update) => {
  const query =
    "UPDATE term SET name = $1, yearid = $2, start_date = $3, end_date = $4, updated_at = $5 WHERE id = $6";
  const values = [name, year, startDate, endDate, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single object
const editTerm = async (id) => {
  const query = "SELECT id, name, yearid, start_date, end_date FROM term WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- TERM CRUD ------------------------------------------------

// --------------------------------------- GRADING CRUD ------------------------------------------------

// Check if object exists
const checkGrade = async (denom, grade) => {
  const query =
    "SELECT denom, grade FROM grading WHERE denom = $1 AND grade = $2";
  const value = [denom, grade];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertGrade = async (denom, roof, floor, grade, remark) => {
  const query =
    "INSERT INTO grading(denom, roof, floor, grade, remark) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [denom, roof, floor, grade, remark];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getGrade = async () => {
  const query = "SELECT * FROM grading";
  const res = await kneX.query(query);
  return res.rows;
};

const getMSCEGrade = async () => {
  const query = "SELECT * FROM grading WHERE denom = 'MSCE'";
  const res = await kneX.query(query);
  return res.rows;
};

const getJCEGrade = async () => {
  const query = "SELECT * FROM grading WHERE denom = 'JCE'";
  const res = await kneX.query(query);
  return res.rows;
};

// Delete object
const deleteGrade = async (id) => {
  const query = "DELETE FROM grading WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating object
const updateGrade = async (id, denom, roof, floor, grade, remark, update) => {
  const query =
    "UPDATE grading SET denom = $1, roof = $2, floor = $3, grade = $4, remark = $5, updated_at = $6 WHERE id = $7";
  const values = [denom, roof, floor, grade, remark, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single object
const editGrade = async (id) => {
  const query = "SELECT * FROM grading WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- GRADING CRUD ------------------------------------------------

// --------------------------------------- JCE CRUD ------------------------------------------------

// Check if object exists
const checkJCE = async (denom, roof, floor) => {
  const query =
    "SELECT denom, roof, floor FROM remarks WHERE denom = $1 AND roof = $2 AND floor = $3";
  const value = [denom, roof, floor];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertJCE = async (denom, roof, floor, remark) => {
  const query =
    "INSERT INTO remarks(denom, roof, floor, remark) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [denom, roof, floor, remark];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getJCE = async () => {
  const query = "SELECT * FROM remarks WHERE denom = 'JCE'";
  const res = await kneX.query(query);
  return res.rows;
};

// Delete object
const deleteJCE = async (id) => {
  const query = "DELETE FROM remarks WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating object
const updateJCE = async (id, denom, roof, floor, remark, update) => {
  const query =
    "UPDATE remarks SET denom = $1, roof = $2, floor = $3, remark = $4, updated_at = $5 WHERE id = $6";
  const values = [denom, roof, floor, remark, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single object
const editJCE = async (id) => {
  const query = "SELECT * FROM remarks WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- JCE CRUD ------------------------------------------------

// --------------------------------------- MSCE CRUD ------------------------------------------------

// Check if object exists
const checkMSCE = async (denom, roof, floor) => {
  const query =
    "SELECT denom, roof, floor FROM remarks WHERE denom = $1 AND roof = $2 AND floor = $3";
  const value = [denom, roof, floor];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertMSCE = async (denom, roof, floor, remark) => {
  const query =
    "INSERT INTO remarks(denom, roof, floor, remark) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [denom, roof, floor, remark];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getMSCE = async () => {
  const query = "SELECT * FROM remarks WHERE denom = 'MSCE'";
  const res = await kneX.query(query);
  return res.rows;
};

// Delete object
const deleteMSCE = async (id) => {
  const query = "DELETE FROM remarks WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating object
const updateMSCE = async (id, denom, roof, floor, remark, update) => {
  const query =
    "UPDATE remarks SET denom = $1, roof = $2, floor = $3, remark = $4, updated_at = $5 WHERE id = $6";
  const values = [denom, roof, floor, remark, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single object
const editMSCE = async (id) => {
  const query = "SELECT * FROM remarks WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- MSCE CRUD ------------------------------------------------

// --------------------------------------- TEACHER CRUD ------------------------------------------------

// Check if object exists
const checkTeacher = async (sid, email, contact) => {
  const query =
    "SELECT sid, email, contact FROM teachers WHERE sid = $1 AND email = $2 AND contact = $3";
  const value = [sid, email, contact];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertTeacher = async (sid, name, contact, email, address, gender, password) => {
  const query =
    "INSERT INTO teachers(sid, name, contact, email, address, gender, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [sid, name, contact, email, address, gender, password];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getTeacher = async (sid) => {
  const query = "SELECT * FROM teachers WHERE sid = $1";
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getSingleTeacher = async (sid, id) => {
  const query = "SELECT * FROM teachers WHERE sid = $1 AND id=$2";
  const value = [sid, id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

const getTeacherClass = async (sid, id) => {
  const query = `SELECT class.name FROM assignteacher 
    INNER JOIN class ON class.id=assignteacher.classid
    WHERE assignteacher.sid = $1 AND assignteacher.id=$2`;
  const value = [sid, id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

const getTeacherSubject = async (sid, id) => {
  const query = `SELECT subject.name FROM assignteacher 
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = $1 AND assignteacher.id=$2`;
  const value = [sid, id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Delete object
const deleteTeacher = async (id) => {
  const query = "DELETE FROM teachers WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows;
};

// Updating object
const updateTeacher = async (id, name, contact, email, address, gender, update) => {
  const query =
    "UPDATE teachers SET name = $1, contact = $2, email = $3, address = $4, gender = $5, updated_at = $6 WHERE id = $7";
  const values = [name, contact, email, address, gender, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Get Single object
const editTeacher = async (id) => {
  const query = "SELECT * FROM teachers WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

const countTeachers = async (sid) => {
  const query = "SELECT COUNT(*) as Count FROM teachers WHERE sid = $1";
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
}


const countMaleTeachers = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM teachers 
    WHERE sid = $1 AND gender = 'Male'`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

const countFemaleTeachers = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM teachers 
    WHERE sid = $1 AND gender = 'Female'`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

const teacherGenderPercentage = async (sid) => {
  const query = `SELECT 
    gender,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 0) AS percentage
FROM 
    teachers
WHERE sid = $1
GROUP BY 
    gender
ORDER BY 
    gender;
`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
}

// --------------------------------------- TEACHER CRUD ------------------------------------------------

// --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------

// Check if object exists
const checkAssignTeacher = async (sid, classid, subjectid) => {
  const query =
    "SELECT sid, classid, subjectid FROM assignteacher WHERE sid = $1 AND classid = $2 AND subjectid = $3";
  const value = [sid, classid, subjectid];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertAssignTeacher = async (sid, teacherid, classid, subjectid) => {
  const query =
    "INSERT INTO assignteacher(sid, teacherid, classid, subjectid) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [sid, teacherid, classid, subjectid];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getAssignTeacher = async (sid) => {
  const query = `SELECT assignteacher.id, teachers.name AS teacher, class.name AS classs, subject.name AS subject FROM assignteacher
    INNER JOIN teachers ON teachers.id=assignteacher.teacherid
    INNER JOIN class ON class.classid=assignteacher.classid
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = $1`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

// Delete object
const deleteAssignTeacher = async (id) => {
  const query = "DELETE FROM assignteacher WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------

// --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------

// Check if object exists
const checkClassTeacher = async (sid, classid) => {
  const query =
    "SELECT sid, classid FROM classteacher WHERE sid = $1 AND classid = $2";
  const value = [sid, classid];
  const res = await kneX.query(query, value);
  return res.rows[1];
};

// Add new object
const insertClassTeacher = async (sid, teacherid, classid) => {
  const query =
    "INSERT INTO classteacher(sid, teacherid, classid) VALUES ($1, $2, $3) RETURNING *";
  const values = [sid, teacherid, classid];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getClassTeacher = async (sid) => {
  const query = `SELECT classteacher.id, teachers.name AS teacher, class.name AS classs FROM classteacher
    INNER JOIN teachers ON teachers.id=classteacher.teacherid
    INNER JOIN class ON class.classid=classteacher.classid
    WHERE classteacher.sid = $1`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

// Delete object
const deleteClassTeacher = async (id) => {
  const query = "DELETE FROM classteacher WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------

// --------------------------------------- STUDENT CRUD ------------------------------------------------

// Check if object exists
const checkStudent = async (sid, students) => {
  const query = `SELECT EXISTS (
        SELECT 1 FROM students
        WHERE sid = $1 AND name = ANY ($2::text[]))`;
  const value = [sid, students];
  const res = await kneX.query(query, value);
  if (res.rows && res.rows[0]) {
    const exists = res.rows[0].exists;
    return [exists, res.rows.map((row) => row.id)];
  } else {
    throw new Error("No result returned from query.");
  }
};

// Add new object
const insertStudent = async (sid, studentNames) => {
  const insertedStudents = [];
  const query = "INSERT INTO students(sid, name) VALUES ($1, $2) RETURNING id";

  // Insert each student one by one
  for (const name of studentNames) {
    const result = await kneX.query(query, [sid, name]);
    insertedStudents.push(result.rows[0].id);
  }

  return insertedStudents;
};

const insertStudentHistory = async (sid, yearid, classid, studentIDs) => {
  const insertHistory = [];
  const query =
    "INSERT INTO history(sid, yearid, classid, studentid) VALUES ($1, $2, $3, $4) RETURNING *";

  // Insert each student one by one
  for (const id of studentIDs) {
    const result = await kneX.query(query, [sid, yearid, classid, id]);
    insertHistory.push(result.rows[0]);
  }
  return insertHistory;
};

// Get all object
const getStudent = async (sid) => {
  const query = `SELECT s.id, s.name, class.name AS class, s.dob, s.gender, s.address FROM history
    INNER JOIN students AS s ON s.id = history.studentid
    INNER JOIN acyear ON acyear.yearid=history.yearid
    INNER JOIN class ON class.classid=history.classid
    WHERE s.sid = $1 AND status != 'Graduated'`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

// Get single object
const getSingleStudent = async (sid, id) => {
  const query = `SELECT s.*, TO_CHAR(s.created_at, 'Month DD, YYYY') AS admission, class.name AS class 
FROM history
INNER JOIN class ON class.classid=history.classid
INNER JOIN students s ON s.id = history.studentid
WHERE s.sid = $1 AND s.id = $2`;
  const value = [sid, id];
  const res = await kneX.query(query, value);
  return res.rows;
};

// Delete object
const deleteStudent = async (id) => {
  const query = "DELETE FROM students WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Updating object
const updateStudent = async (
  id,
  name,
  contact,
  email,
  address,
  gender,
  dob,
  update
) => {
  const query =
    "UPDATE students SET name = $1, contact = $2, email = $3, address = $4, gender = $5, dob = $6, updated_at = $7 WHERE id = $8";
  const values = [name, contact, email, address, gender, dob, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

const countStudents = async (sid) => {
  const query = "SELECT COUNT(*) as Count FROM history WHERE sid = $1 AND status != 'Graduated'";
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
}


const countMale = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM history 
    INNER JOIN students s ON s.id = history.studentid
    WHERE history.sid = $1 AND status != 'Graduated' AND s.gender = 'Male'`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

const countFemale = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM history 
    INNER JOIN students s ON s.id = history.studentid
    WHERE history.sid = $1 AND status != 'Graduated' AND s.gender = 'Female'`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
}


const countGenderAndClass = async (sid) => {
  const query = `SELECT 
    c.name as class,
    s.gender,
    COUNT(*) AS count
FROM 
    history
INNER JOIN students s ON s.id = history.studentid
INNER JOIN class c ON c.classid = history.classid
WHERE s.sid = $1 and status != 'Graduated'
GROUP BY 
    c.name, s.gender
ORDER BY 
    c.name, s.gender`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
}

const genderPercentage = async (sid) => {
  const query = `SELECT 
    s.gender,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 0) AS percentage
FROM 
    history
INNER JOIN students s ON s.id = history.studentid
WHERE s.sid = $1 AND status != 'Graduated'
GROUP BY 
    s.gender
ORDER BY 
    s.gender;
`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
}

// --------------------------------------- STUDENT CRUD ------------------------------------------------

// --------------------------------------- FEES CRUD ------------------------------------------------

// Check if object exists
const checkFee = async (sid, name) => {
  const query = `SELECT name FROM fees WHERE sid = $1 AND name = $2`;
  const value = [sid, name];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Add new object
const insertFee = async (sid, name, amount, description) => {
  const query =
    "INSERT INTO fees(sid, name, amount,description) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [sid, name, amount, description];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

// Get all object
const getFee = async (sid) => {
  const query = `SELECT * FROM fees WHERE sid = $1`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

// Delete object
const deleteFee = async (id) => {
  const query = "DELETE FROM fees WHERE feeid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

// Get Single object
const editFee = async (id) => {
  const query = "SELECT * FROM fees WHERE feeid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Updating object
const updateFee = async (id, name, amount, description, update) => {
  const query =
    "UPDATE fees SET name = $1, amount = $2, description = $3, updated_at = $4 WHERE feeid = $5";
  const values = [name, amount, description, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// --------------------------------------- FEES CRUD ------------------------------------------------

// --------------------------------------- PAYMENT CRUD ------------------------------------------------

// Get all object
const getPay = async (sid) => {
  const query = `SELECT pid, payment.paid, payment.updated_at, students.id, 
students.name AS student, class.name as class, 
fees.name AS fee, payment.status, term.name AS term, acyear.name AS year
FROM payment
INNER JOIN students ON payment.id = students.id
INNER JOIN history ON students.id = history.studentid
INNER JOIN fees ON fees.feeid = payment.feeid
INNER JOIN term ON term.id = payment.termid
INNER JOIN acyear ON acyear.yearid = term.yearid
INNER JOIN class ON history.classid = class.classid
                    WHERE payment.sid = $1`;
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getPayee = async (sid, id) => {
  const query = `SELECT payment.pid, TO_CHAR(payment.updated_at, 'Month DD, YYYY') AS date, fees.name, 
fees.amount, payment.paid, payment.balance, payment.status, term.name AS term, acyear.name AS year
FROM payment
INNER JOIN fees ON fees.feeid = payment.feeid
INNER JOIN term ON term.id = payment.termid
INNER JOIN acyear ON acyear.yearid = term.yearid
                    WHERE payment.sid =  $1 AND payment.id = $2`;
  const value = [sid, id];
  const res = await kneX.query(query, value);
  return res.rows;
};

const insertPay = async (sid, id, feeid, paid, balance, status, term) => {
  const query =
    "INSERT INTO payment(sid, id, feeid, paid, balance, status, termid) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [sid, id, feeid, paid, balance, status, term];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

const checkPay = async (sid, feeid, id, term) => {
  const query = `SELECT * FROM payment WHERE sid = $1 AND feeid = $2 AND id = $3 AND termid = $4`;
  const value = [sid, feeid, id, term];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Get Single object
const editPay = async (id) => {
  const query = `SELECT payment.*, fees.amount 
                    FROM payment 
                    INNER JOIN fees ON fees.feeid = payment.feeid
                    WHERE pid = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Updating object
const updatePay = async (id, paid, balance, status, update, term) => {
  const query =
    "UPDATE payment SET paid = $1, balance = $2, status = $3, updated_at = $4, termid = $5 WHERE pid = $6";
  const values = [paid, balance, status, update, term, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// Delete object
const deletePay = async (id) => {
  const query = "DELETE FROM payment WHERE pid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows.length < 1;
};

const sumPayment = async (id) => {
  const query = `WITH CurrentTerm AS (
        SELECT 
            id AS termid
        FROM 
            term
        WHERE 
            CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
    )
    SELECT 
        COALESCE(SUM(paid::NUMERIC), 0) AS count
    FROM 
        payment
    WHERE 
        termid = (SELECT termid FROM CurrentTerm) AND payment.sid = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

const sumPaymentThisMonth = async (id) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
)
SELECT 
    COALESCE(SUM(paid::NUMERIC), 0) AS count
FROM 
    payment
WHERE 
    termid = (SELECT termid FROM CurrentTerm)
    AND DATE_PART('month', payment.created_at::DATE) = DATE_PART('month', CURRENT_DATE)
    AND DATE_PART('year', payment.created_at::DATE) = DATE_PART('year', CURRENT_DATE)
 AND payment.sid = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

const getTuition = async(id) => {
  const query = `SELECT amount 
  FROM fees
  WHERE sid = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

const getOutstanding = async(id) => {
  const query = `WITH CurrentTerm AS (
        SELECT 
            id AS termid
        FROM 
            term
        WHERE 
            CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
    )
    SELECT 
        COUNT(*) AS count
    FROM 
        payment
    WHERE 
        termid = (SELECT termid FROM CurrentTerm) AND payment.sid = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

const PaidByDays = async(id) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
)
SELECT 
    TO_CHAR(created_at::DATE, 'Day') AS day,
    COALESCE(SUM(paid::NUMERIC), 0) AS amount
FROM 
    payment
WHERE 
    termid = (SELECT termid FROM CurrentTerm) AND payment.sid = $1
GROUP BY 
    TO_CHAR(created_at::DATE, 'Day')
ORDER BY 
    TO_CHAR(created_at::DATE, 'Day') DESC`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows;
}

const PaidByClass = async(id) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
),
ClassPaymentStats AS (
    SELECT 
       	history.classid,
        COUNT(DISTINCT fp.id) AS StudentsPaid
    FROM 
        payment fp
	INNER JOIN history ON history.studentid=fp.id
    WHERE 
        fp.termid = (SELECT termid FROM CurrentTerm)
    GROUP BY 
        history.classid
),
ClassTotals AS (
    SELECT 
        c.classid, c.name AS class,
        COUNT(s.studentid) AS TotalStudents
    FROM 
        class c
    LEFT JOIN 
        history s ON c.classid = s.classid
	WHERE c.sid = $1
    GROUP BY 
        c.classid
)
SELECT 
    ct.classid, ct.class,
    COALESCE(cp.StudentsPaid, 0) AS StudentsPaid,
    ct.TotalStudents,
    CASE 
        WHEN ct.TotalStudents > 0 THEN ROUND((cp.StudentsPaid::NUMERIC / ct.TotalStudents) * 100, 0)
        ELSE 0
    END AS Percentage
FROM 
    ClassTotals ct
LEFT JOIN 
    ClassPaymentStats cp ON ct.classid = cp.classid
ORDER BY 
    Percentage DESC
`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows;
}

// --------------------------------------- PAYMENT CRUD ------------------------------------------------

// --------------------------------------- ENTRY CRUD ------------------------------------------------

const getYearByTeacherID = async (id) => {
  const query = "SELECT * FROM acyear WHERE sid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getTermByTeacherID = async (sid) => {
  const query = "SELECT * FROM term WHERE sid = $1";
  const value = [sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getExamByTeacherID = async (id) => {
  const query = "SELECT * FROM exam WHERE sid = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getClassByTeacherID = async (sid, id) => {
  const query = `SELECT DISTINCT(class.name), class.classid FROM assignteacher
                    INNER JOIN class ON  class.classid = assignteacher.classid
                    WHERE assignteacher.sid = $1 AND assignteacher.teacherid = $2`;
  const value = [sid, id];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getSubjectByTeacherID = async (sid, id, classid) => {
  const query = `SELECT DISTINCT(subject.name), subject.id as subjectid FROM assignteacher
                    INNER JOIN subject ON  subject.id = assignteacher.subjectid
                    WHERE assignteacher.sid = $1 AND assignteacher.teacherid = $2 AND assignteacher.classid = $3`;
  const value = [sid, id, classid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getStudentForEntry = async (sid, classid) => {
  const query = `SELECT id, name FROM students WHERE sid = $1 AND classid = $2 ORDER BY name ASC`;
  const values = [sid, classid];
  const res = await kneX.query(query, values);
  return res.rows;
};

const checkResult = async (sid, data) => {
  const query = `SELECT EXISTS (
        SELECT 1 FROM results
        WHERE classid = $1 AND sid = $2 AND typeid = $3 AND studentid = $4 AND subjectid = $5 AND termid = $6)`;
  const values = [
    data.selectedClass,
    sid,
    data.typeid,
    data.id,
    data.selectedSubject,
    data.termid,
  ];
  try {
    const res = await kneX.query(query, values);
    return res.rows[0].exists;
  } catch (error) {
    console.error("Error checking record existence:", error);
  }
};

const insertResult = async (sid, grade, remarks, data) => {
  const query = `INSERT INTO results(sid, studentid, termid, typeid, classid, subjectid, score, remarks, grade) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
  const values = [
    sid,
    data.id,
    data.termid,
    data.typeid,
    data.selectedClass,
    data.selectedSubject,
    data.score,
    remarks,
    grade,
  ];
  const res = await kneX.query(query, values);
  return res.rows.length > 0;
};

const getClassById = async (sid, data) => {
  const query = "SELECT denom FROM class WHERE classid = $1 AND sid = $2";
  const value = [data, sid];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

const getGradeByDenom = async (sid, denom) => {
  const query = "SELECT * FROM grading WHERE sid = $1 AND denom = $2";
  const value = [sid, denom];
  const res = await kneX.query(query, value);
  return res.rows;
};

// --------------------------------------- ENTRY CRUD ------------------------------------------------

// --------------------------------------- FILTER CRUD ------------------------------------------------

const getX = async (sid, termid, typeid, classid, subjectid) => {
  const query = `SELECT results.id as resultid, students.name as student, class.name as class, subject.name as subject, results.score, results.grade, results.remarks
        FROM results
        INNER JOIN students ON students.id = results.studentid
        INNER JOIN class ON class.classid = results.classid
        INNER JOIN subject ON subject.id = results.subjectid
        WHERE results.yearid = $1 AND results.termid = $2 AND results.typeid = $3
        AND results.classid = $4 AND results.subjectid = $5 AND results.sid = $6`;
  const value = [termid, typeid, classid, subjectid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const deleteResult = async (
  yearid,
  termid,
  typeid,
  classid,
  subjectid,
  sid
) => {
  const query =
    "DELETE FROM results WHERE yearid = $1 AND termid = $2 AND typeid = $3 AND classid = $4 AND subjectid = $5 AND sid = $6";
  const value = [yearid, termid, typeid, classid, subjectid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getScore = async (id) => {
  const query = `SELECT *
        FROM results
        WHERE id = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Updating object
const updateScore = async (id, score, grade, remark, update) => {
  const query =
    "UPDATE results SET score = $1, grade = $2, remarks = $3, updated_at = $4 WHERE id = $5";
  const values = [score, grade, remark, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// --------------------------------------- FILTER CRUD ------------------------------------------------

// --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------

const getClassStudent = async (sid, teacherid) => {
  const query = `SELECT students.id, students.name, EXTRACT(YEAR FROM AGE(CAST(students.dob AS DATE))) AS age, class.name as class, students.gender, students.address, students.contact
        FROM classteacher
        INNER JOIN history ON history.classid = classteacher.classid
		INNER JOIN students ON students.id = history.studentid
        INNER JOIN class ON class.classid = classteacher.classid
        WHERE classteacher.sid = $1 AND classteacher.teacherid = $2 AND history.status = 'Active'`;
  const value = [sid, teacherid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getClassNSubject = async (sid, teacherid) => {
  const query = `SELECT class.classid, class.name AS class, subject.name AS subject FROM assignteacher
        INNER JOIN class ON class.classid = assignteacher.classid
        INNER JOIN subject ON subject.id = assignteacher.subjectid
        WHERE assignteacher.sid = $1 AND assignteacher.teacherid = $2`;
  const value = [sid, teacherid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const dashboardClassTeacher = async (sid, teacherid) => {
  const query = `SELECT class.name AS class FROM classteacher
        INNER JOIN class ON class.classid = classteacher.classid
        WHERE classteacher.sid = $1 AND classteacher.teacherid = $2`;
  const value = [sid, teacherid];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------

// --------------------------------------- CHART CRUD ------------------------------------------------

const getStudentByGender = async (sid, classid) => {
  const query = `SELECT COALESCE(gender, 'Other') as gender, COUNT(*) as count
      FROM students
	  WHERE classid = $1 AND sid = $2
      GROUP BY COALESCE(gender, 'Other')`;
  const values = [classid, sid];
  const res = await kneX.query(query, values);
  return res.rows;
};

const getTopStudent = async (sid, teacherid, classid) => {
  const query = `SELECT DISTINCT ON (classid, subjectid) 
	    students.name, subject.name AS subject, score, results.classid, results.subjectid
        FROM results
        INNER JOIN students ON students.id = results.studentid
        INNER JOIN subject ON subject.id = results.subjectid
        INNER JOIN assignteacher ON assignteacher.classid = results.classid
        WHERE assignteacher.classid = $1 AND assignteacher.teacherid = $2 AND assignteacher.sid = $3
        ORDER BY classid, subjectid, score DESC, results.created_at DESC`;
  const value = [classid, teacherid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getAggScoreBySUbject = async (sid, teacherid, classid) => {
  const query = `SELECT subject.name AS subject, ROUND(AVG(CAST(score AS BIGINT))) AS average, acyear.name AS year, term.name AS term, exam.name AS exam, class.name AS class
        FROM results
        INNER JOIN subject ON subject.id = results.subjectid
        INNER JOIN acyear ON acyear.yearid = results.yearid
        INNER JOIN term ON term.id = results.termid
        INNER JOIN exam ON exam.id = results.typeid
        INNER JOIN class ON class.classid = results.classid
        INNER JOIN assignteacher ON assignteacher.classid = results.classid
        WHERE assignteacher.classid = $1 AND assignteacher.teacherid = $2 AND results.sid = $3
        GROUP BY subject.name, acyear.name, term.name, exam.name, class.name
        ORDER BY average DESC`;
  const value = [classid, teacherid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const countStudentByAssign = async (sid, teacherid, classid) => {
  const query = `SELECT COUNT(DISTINCT(students.id))
        FROM students
        INNER JOIN history ON history.studentid = students.id
		    INNER JOIN assignteacher ON assignteacher.classid = history.classid
        WHERE assignteacher.classid = $1 AND assignteacher.teacherid = $2 AND students.sid = $3`;
  const value = [classid, teacherid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

// --------------------------------------- CHART CRUD ------------------------------------------------

// --------------------------------------- REPORT CRUD ------------------------------------------------

// JCE
const getReportByStudent = async (sid, yearid, termid, typeid, classid) => {
  const query = `WITH student_scores AS (
    SELECT 
        studentid,
        classid,
        subjectid,
        CAST(score AS BIGINT) AS score,
        ROW_NUMBER() OVER (PARTITION BY studentid, classid ORDER BY CAST(score AS BIGINT) DESC) AS subject_rank
    FROM results
    WHERE results.yearid = $1
        AND results.termid = $2
        AND results.typeid = $3
        AND results.classid = $4 
        AND results.sid = $5
),
top_6_subjects AS (
    SELECT 
        studentid,
        classid,
        SUM(score) AS total_score
    FROM student_scores
    WHERE subject_rank <= 6  -- Only consider the top 6 subjects
    GROUP BY studentid, classid
),
ranked_students AS (
    SELECT 
        studentid, 
        classid, 
        total_score,
        RANK() OVER (PARTITION BY classid ORDER BY total_score DESC) AS rank
    FROM top_6_subjects
)
SELECT 
    DISTINCT r.studentid,
    rs.rank, 
    st.name AS studentname,  
    rs.total_score AS aggregate,
    r.classid,
    subject.id AS subject_id, 
    subject.code AS subject_name, 
    r.score,
    r.grade, 
	r.remarks
FROM ranked_students rs
JOIN results r ON r.studentid = rs.studentid AND r.classid = rs.classid
JOIN students st ON st.id = r.studentid
LEFT JOIN subject ON subject.id = r.subjectid
ORDER BY r.classid, rs.rank, st.name;
`;
  const value = [yearid, termid, typeid, classid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getStudentCard = async (
  sid,
  yearid,
  termid,
  typeid,
  classid,
  studentid
) => {
  const query = `WITH student_scores AS (
    SELECT 
        studentid,
        CAST(score AS BIGINT) AS score,
        ROW_NUMBER() OVER (PARTITION BY studentid ORDER BY CAST(score AS BIGINT) DESC) AS subject_rank
    FROM results
    WHERE results.yearid = $1
        AND results.termid = $2
        AND results.typeid = $3
        AND results.classid = $4
        AND results.sid = $5
		AND results.studentid = $6
),
top_6_subjects AS (
    SELECT 
        studentid,
        SUM(score) AS total_score
    FROM student_scores
    WHERE subject_rank <= 6  -- Only consider the top 6 subjects
    GROUP BY studentid
),
ranked_students AS (
    SELECT 
        studentid, 
        total_score,
        RANK() OVER (ORDER BY total_score DESC) AS rank
    FROM top_6_subjects
)
SELECT 
    DISTINCT(st.name) AS studentname,  
    rs.total_score AS aggregate,
	ac.name AS year,
	t.name AS term,
	e.name AS exam,
	c.name AS class,
    c.classid
FROM ranked_students rs
JOIN results r ON r.studentid = rs.studentid
JOIN students st ON st.id = r.studentid
JOIN acyear ac ON ac.yearid = r.yearid
JOIN term t ON t.id = r.termid
JOIN exam e ON e.id = r.typeid
JOIN class c ON c.classid = r.classid
ORDER BY st.name;
`;
  const value = [yearid, termid, typeid, classid, sid, studentid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const countResult = async (sid, yearid, termid, typeid, classid) => {
  const query = `SELECT COUNT(DISTINCT(studentid)) AS count
    FROM results
    WHERE results.yearid = $1
        AND results.termid = $2
        AND results.typeid = $3
        AND results.classid = $4
        AND results.sid = $5`;
  const value = [yearid, termid, typeid, classid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};
// JCE

// Class Teacher
const getClassTeacher4Report = async (classid, sid) => {
  const query = `SELECT teachers.name
    FROM classteacher
    INNER JOIN teachers ON teachers.id = classteacher.teacherid
    WHERE classteacher.classid = $1 AND classteacher.sid = $2`;
  const value = [classid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getSubjectPosition = async (
  yearid,
  termid,
  typeid,
  classid,
  sid,
  studentid
) => {
  const query = `SELECT 
            results.studentid,
            subject.name AS subject,
            score,
            grade,
            remarks,
            subjectid
        FROM 
            results
        INNER JOIN subject On subject.id = results.subjectid
        WHERE 
        results.yearid = $1 AND
        results.termid = $2 AND
        results.typeid = $3 AND
        results.classid = $4 AND
        results.sid = $5 AND
        results.studentid = $6
        ORDER BY 
            studentid, subject ASC
        `;
  const value = [yearid, termid, typeid, classid, sid, studentid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const realPos = async (yearid, termid, typeid, classid, sid, subjectid) => {
  const query = `SELECT studentid, subjectid, score, 
        RANK() OVER(ORDER BY CAST(score AS BIGINT) DESC, 
        score DESC) as rank 
        FROM (
        SELECT results.studentid, results.subjectid, score 
        FROM results
        WHERE results.yearid = $1
        AND results.termid = $2
        AND results.typeid = $3
        AND results.classid = $4
        AND results.subjectid = $5
        AND results.sid = $6
        GROUP BY results.studentid, results.subjectid, score)
        `;
  const value = [yearid, termid, typeid, classid, subjectid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const getTeacherBySubject = async (subjectid, sid) => {
  const query = `SELECT subjectid, teachers.name 
        FROM assignteacher
        INNER JOIN teachers ON teachers.id = assignteacher.teacherid
        WHERE assignteacher.subjectid = $1 AND assignteacher.sid = $2`;
  const value = [subjectid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};
// Class Teacher

const getRemarks = async (denom, sid) => {
  const query = `SELECT * FROM remarks WHERE denom = $1 AND sid = $2`;
  const value = [denom, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};

const deleteReport = async (yearid, termid, typeid, classid, sid) => {
  const query = `DELETE FROM results WHERE yearid = $1 AND termid = $2 AND typeid = $3 AND classid = $4 AND sid = $5`;
  const value = [yearid, termid, typeid, classid, sid];
  const res = await kneX.query(query, value);
  return res.rows;
};


const countReports = async (id) => {
  const query = `WITH CurrentTerm AS (
      SELECT 
          id AS termid
      FROM 
          term
      WHERE 
          CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
  )
  SELECT 
      COUNT(*) AS Count
  FROM 
      results
  WHERE 
      results.termid = (SELECT termid FROM CurrentTerm) AND results.sid = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
}

// --------------------------------------- REPORT CRUD ------------------------------------------------




// --------------------------------------- SUPER ADMIN CRUD ------------------------------------------------

const insertFeatures = async (name, price, features) => {
  const query = `INSERT INTO subscription_plans (name, price, features) 
             VALUES ($1, $2, $3) RETURNING *`;
  const value = [name, price, features];
  const res = await kneX.query(query, value);
  return res.rows.length > 0;
}


const getSubscriptions = async() => {
  const query = 'SELECT * FROM subscription_plans ORDER BY name ASC';
  const res = await kneX.query(query);
  return res.rows;
}

const deleteSubscription = async (id) => {
  const query = `DELETE FROM subscription_plans WHERE id = $1`;
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows;
}

const editPlan = async (id) => {
  const query = "SELECT * FROM subscription_plans WHERE id = $1";
  const value = [id];
  const res = await kneX.query(query, value);
  return res.rows[0];
};

// Updating object
const updatePlan = async (id, name, price, features, update) => {
  const query =
    "UPDATE subscription_plans SET name = $1, price = $2, features = $3, created_at = $4 WHERE id = $5";
  const values = [name, price, features, update, id];
  const res = await kneX.query(query, values);
  return res.rows;
};

// --------------------------------------- SUPER ADMIN CRUD ------------------------------------------------

module.exports = {
  // ----- SCHOOLS SECTION -----
  countSchools,
  getSchools,
  // ----- SCHOOLS SECTION -----


  // ----- REGISTER SECTION -----
  checkSchool,
  checkSuperPassword,
  checkPassword,
  insertSchool,
  editSchool,
  updateSchool,
  updateSchoolWithoutLogo,
  OTPGeneration,
  updatePassword,
  updateSuperPassword,
  // ----- REGISTER SECTION -----

  checkMail,
  checkTeacherMail,
  checkAdminMail,

  // ----- EXAM SECTION -----
  checkExam,
  insertExam,
  getExam,
  deleteExam,
  updateExam,
  editExam,
  // ----- EXAM SECTION -----

  // ----- YEAR SECTION -----
  checkYear,
  insertYear,
  getYear,
  deleteYear,
  updateYear,
  editYear,
  // ----- YEAR SECTION -----

  // ----- SUBJECT SECTION -----
  checkSubject,
  insertSubject,
  getSubject,
  deleteSubject,
  updateSubject,
  editSubject,
  // ----- SUBJECT SECTION -----

  // ----- CLASS SECTION -----
  checkClass,
  insertClass,
  getClass,
  deleteClass,
  updateClass,
  editClass,
  // ----- CLASS SECTION -----

  // ----- TERM SECTION -----
  checkTerm,
  insertTerm,
  getTerm,
  deleteTerm,
  updateTerm,
  editTerm,
  // ----- TERM SECTION -----

  // ----- GRADE SECTION -----
  checkGrade,
  insertGrade,
  getGrade,
  deleteGrade,
  updateGrade,
  editGrade,
  getMSCEGrade,
  getJCEGrade,
  // ----- GRADE SECTION -----

  // ----- JCE SECTION -----
  checkJCE,
  insertJCE,
  getJCE,
  deleteJCE,
  updateJCE,
  editJCE,
  // ----- JCE SECTION -----

  // ----- MSCE SECTION -----
  checkMSCE,
  insertMSCE,
  getMSCE,
  deleteMSCE,
  updateMSCE,
  editMSCE,
  // ----- MSCE SECTION -----

  // ----- TEACHER SECTION -----
  checkTeacher,
  insertTeacher,
  getTeacher,
  getSingleTeacher,
  getTeacherClass,
  getTeacherSubject,
  deleteTeacher,
  updateTeacher,
  editTeacher,
  countTeachers,
  countMaleTeachers,
  countFemaleTeachers,
  teacherGenderPercentage,
  // ----- TEACHER SECTION -----

  // ----- ASSIGN TEACHER SECTION -----
  checkAssignTeacher,
  insertAssignTeacher,
  getAssignTeacher,
  deleteAssignTeacher,
  // ----- ASSIGN TEACHER SECTION -----

  // ----- CLASS TEACHER SECTION -----
  checkClassTeacher,
  insertClassTeacher,
  getClassTeacher,
  deleteClassTeacher,
  // ----- CLASS TEACHER SECTION -----

  // ----- STUDENT SECTION -----
  checkStudent,
  insertStudent,
  getStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
  insertStudentHistory,
  countStudents,
  countMale,
  countFemale,
  countGenderAndClass,
  genderPercentage,
  // ----- STUDENT SECTION -----

  // ----- FEE SECTION -----
  checkFee,
  insertFee,
  getFee,
  deleteFee,
  updateFee,
  editFee,
  // ----- FEE SECTION -----

  // ----- PAYMENT SECTION -----
  getPay,
  getPayee,
  insertPay,
  checkPay,
  editPay,
  updatePay,
  deletePay,
  sumPayment,
  sumPaymentThisMonth,
  getTuition,
  getOutstanding,
  PaidByDays,
  PaidByClass,
  // ----- PAYMENT SECTION -----


  
  // ----- ENTRY SECTION -----
  getClassByTeacherID,
  getSubjectByTeacherID,
  getYearByTeacherID,
  getTermByTeacherID,
  getExamByTeacherID,
  getStudentForEntry,
  checkResult,
  insertResult,
  getClassById,
  getGradeByDenom,
  // ----- ENTRY SECTION -----

  // ----- FILTER SECTION -----
  getX,
  getScore,
  updateScore,
  deleteResult,
  // ----- FILTER SECTION -----

  // ----- TEACHER CLASS SECTION -----
  getClassStudent,
  getClassNSubject,
  dashboardClassTeacher,
  // ----- TEACHER CLASS SECTION -----

  // ----- CHART SECTION -----
  getStudentByGender,
  getTopStudent,
  getAggScoreBySUbject,
  countStudentByAssign,
  // ----- CHART SECTION -----

  // ----- REPORT SECTION -----
  getReportByStudent,
  getStudentCard,
  getClassTeacher4Report,
  countResult,
  getSubjectPosition,
  realPos,
  getTeacherBySubject,
  getRemarks,
  deleteReport,
  countReports,
  // ----- REPORT SECTION -----




  // ----- SUPER ADMIN SECTION -----
  insertFeatures,
  getSubscriptions,
  deleteSubscription,
  editPlan, 
  updatePlan,
  // ----- SUPER ADMIN SECTION -----
};
