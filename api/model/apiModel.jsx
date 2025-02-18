const conn = require('../database/mysql.jsx');



// // --------------------------------------- SCHOOL ------------------------------------------------

const countSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM schools';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countPrivateSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM schools WHERE type = "Private"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countPublicSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM schools WHERE type = "Public"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countSubscribedSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const sumAmount = async () => {
  const sql = 'SELECT SUM(amount) as sum FROM billing WHERE status = "successful"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const paymentChart = async (year) => {
  const sql = `SELECT
    DATE_FORMAT(created_at, '%M') AS month,
    MONTH(created_at) AS month_number,
    SUM(amount) AS total_amount
    FROM
        billing
    WHERE
        status = 'successful'
        AND YEAR(created_at) = 2025
    GROUP BY
        month, month_number
    ORDER BY
        month_number`;
        const values = [year];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res;
}

const getSchools = async () => {
  const sql = 'SELECT * FROM schools ORDER BY name ASC';
  const [res] = await conn.query(sql); // Changed to async/await
  return res;
}

const getOTPCode = async (email) => {
  const sql = 'SELECT otp_code, otp_expires_at FROM schools WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res;
}

const updateOTPStatus = async (status) => {
  const sql = 'UPDATE schools SET status = ?';
  const values = [status];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res;
}  

// // --------------------------------------- SCHOOL ------------------------------------------------




// // --------------------------------------- REGISTER CRUD ------------------------------------------------

const checkSchool = async (email) => {
  try {
    const sql = 'SELECT * FROM schools WHERE email = ?';
    const values = [email];
    const [res] = await conn.query(sql, values);
    return res;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

const checkPassword = async (sid) => {
  const sql = 'SELECT password FROM schools WHERE id = ?';
  const values = [sid];
  const [res] = await conn.query(sql, values);
  return res[0];
};

const checkTeacherPassword = async (sid, id) => {
  const sql = 'SELECT password FROM teachers WHERE sid = ? AND id = ?';
  const values = [sid, id];
  const [res] = await conn.query(sql, values);
  return res[0];
};

const checkSuperPassword = async () => {
  const sql = "SELECT password FROM administrator";
  const [res] = await conn.query(sql);
  return res[0];
};

const insertSchool = async (email, password) => {
  const sql = `INSERT INTO schools(email, password) VALUES (?, ?)`;
  const values = [email, password];
  const [res] = await conn.query(sql, values);
  return res;
};


const editSchool = async (id) => {
  const sql = 'SELECT * FROM schools WHERE id = ?';
  const values = [id];
  const [res] = await conn.query(sql, values);
  return res[0];
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
) => {
  const sql = "UPDATE schools SET name = ?, address = ?, city = ?, country = ?, email = ?, contact = ?, logo = ?, slogan = ?, type = ? WHERE id = ?";
  const values = [name, address, city, country, email, contact, logo, slogan, type, id];
  const [res] = await conn.query(sql, values);
  return res;
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
  type
) => {
  const sql = "UPDATE schools SET name = ?, address = ?, city = ?, country = ?, email = ?, contact = ?, slogan = ?, type = ? WHERE id = ?";
  const values = [name, address, city, country, email, contact, slogan, type, id];
  const [res] = await conn.query(sql, values);
  return res;
};

const OTPGeneration = async(otpCode, otpExpire, email) => {
  const sql = "UPDATE schools SET otp_code = ?, otp_expires_at = ? WHERE email = ?";
  const values = [otpCode, otpExpire, email];
  const [res] = await conn.query(sql, values);
  return res;
};

const updatePassword = async(newPassword, sid) => {
  const sql = "UPDATE schools SET password = ? WHERE id = ?";
  const values = [newPassword, sid];
  const [res] = await conn.query(sql, values);
  return res;
};

const updateTeacherPassword = async(newPassword, sid, id) => {
  const sql = "UPDATE teachers SET password = ? WHERE sid = ? AND id = ?";
  const values = [newPassword, sid, id];
  const [res] = await conn.query(sql, values);
  return res;
};

const updateSuperPassword = async(newPassword) => {
  const sql = "UPDATE administrator SET password = ?";
  const values = [newPassword];
  const [res] = await conn.query(sql, values);
  return res;
};

// // --------------------------------------- REGISTER CRUD ------------------------------------------------

// // --------------------------------------- LOGIN ------------------------------------------------

const checkMail = async (email) => {
  const sql = 'SELECT * FROM schools WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values);
  return res;
};

const checkTeacherMail = async (email) => {
  const sql = 'SELECT * FROM teachers WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values);
  return res;
};

const checkAdminMail = async (email) => {
  const sql = 'SELECT * FROM administrator WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values);
  return res[0];
};



// // --------------------------------------- LOGIN ------------------------------------------------

// // --------------------------------------- EXAM CRUD ------------------------------------------------

// // Check if Examination Type exists
const checkExam = async (name) => {
  const query = "SELECT name FROM exam WHERE name = ?";
  const value = [name];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new examination type
const insertExam = async (name, percentage) => {
  const query =
    "INSERT INTO exam(name, percentage) VALUES (?, ?)"; // Changed to ?
  const values = [name, percentage];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all examination types
const getExam = async () => {
  const query = "SELECT * FROM exam";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete Examination Type
const deleteExam = async (id) => {
  const query = "DELETE FROM exam WHERE id = ?"; // Changed to ?
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Updating Examination Type
const updateExam = async (id, name, percentage) => {
  const query =
    "UPDATE exam SET name = ?, percentage = ? WHERE id = ?"; // Changed to ?
  const values = [name, percentage, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single Exam
const editExam = async (id) => {
  const query = "SELECT id, name, percentage FROM exam WHERE id = ?"; // Changed to ?
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- EXAM CRUD ------------------------------------------------

// // --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------

// // Check if academic year exists
const checkYear = async (name, startDate, endDate) => {
  const query =
    "SELECT name FROM acyear WHERE name = ? AND start_date = ? AND end_date = ?";
  const value = [name, startDate, endDate];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new academic year
const insertYear = async (name, startDate, endDate) => {
  const query = "INSERT INTO acyear(name, start_date, end_date) VALUES (?, ?, ?)";
  const values = [name, startDate, endDate];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all academic year
const getYear = async () => {
  const query = "SELECT * FROM acyear";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete academic year
const deleteYear = async (id) => {
  const query = "DELETE FROM acyear WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Updating academic year
const updateYear = async (id, name, startDate, endDate) => {
  const query =
    "UPDATE acyear SET name = ?, start_date = ?, end_date = ? WHERE id = ?";
  const values = [name, startDate, endDate, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single academic year
const editYear = async (id) => {
  const query = "SELECT * FROM acyear WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------

// // --------------------------------------- SUBJECT CRUD ------------------------------------------------

// // Check if subject exists
const checkSubject = async (name, code) => {
  const query = "SELECT name FROM subject WHERE name = ? AND code = ?";
  const value = [name, code];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new subject
const insertSubject = async (name, code) => {
  const query = "INSERT INTO subject(name, code) VALUES (?, ?)";
  const values = [name, code];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all subject
const getSubject = async () => {
  const query = "SELECT * FROM subject";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete subject
const deleteSubject = async (id) => {
  const query = "DELETE FROM subject WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Updating subject
const updateSubject = async (id, name, code) => {
  const query = "UPDATE subject SET name = ?, code = ? WHERE id = ?";
  const values = [name, code, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single subject
const editSubject = async (id) => {
  const query = "SELECT id, name, code FROM subject WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- SUBJECT CRUD ------------------------------------------------

// // --------------------------------------- CLASS CRUD ------------------------------------------------

// // Check if object exists
const checkClass = async (name, denom) => {
  const query = "SELECT name FROM class WHERE name = ? AND denom = ?";
  const value = [name, denom];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new object
const insertClass = async (name, denom) => {
  const query = "INSERT INTO class(name, denom) VALUES (?, ?)";
  const values = [name, denom];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all object
const getClass = async () => {
  const query = "SELECT * FROM class ORDER BY name ASC";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete object
const deleteClass = async (id) => {
  const query = "DELETE FROM class WHERE classid = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.length < 1;
};

// // Updating object
const updateClass = async (id, name, denom) => {
  const query =
    "UPDATE class SET name = ?, denom = ? WHERE id = ?";
  const values = [name, denom, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single object
const editClass = async (id) => {
  const query = "SELECT id, denom, name FROM class WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- CLASS CRUD ------------------------------------------------

// // --------------------------------------- TERM CRUD ------------------------------------------------

// // Check if object exists
const checkTerm = async (name, startDate, endDate) => {
  const query =
    "SELECT name FROM term WHERE name = ? AND start_date = ? AND end_date = ?";
  const value = [name, startDate, endDate];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new object
const insertTerm = async (name, year, startDate, endDate) => {
  const query = "INSERT INTO term(name, yearid, start_date, end_date) VALUES (?, ?, ?, ?)";
  const values = [name, year, startDate, endDate];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all object
const getTerm = async () => {
  const query = `SELECT term.*, acyear.name AS year
FROM term 
INNER JOIN acyear ON acyear.id = term.yearid`;
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete object
const deleteTerm = async (id) => {
  const query = "DELETE FROM term WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.length < 1;
};

// // Updating object
const updateTerm = async (id, name, year, startDate, endDate) => {
  const query =
    "UPDATE term SET name = ?, yearid = ?, start_date = ?, end_date = ? WHERE id = ?";
  const values = [name, year, startDate, endDate, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single object
const editTerm = async (id) => {
  const query = "SELECT id, name, yearid, start_date, end_date FROM term WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- TERM CRUD ------------------------------------------------

// // --------------------------------------- GRADING CRUD ------------------------------------------------

// // Check if object exists
const checkGrade = async (denom, grade) => {
  const query = "SELECT denom, grade FROM grading WHERE denom = ? AND grade = ?";
  const value = [denom, grade];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new object
const insertGrade = async (denom, roof, floor, grade, remark) => {
  const query = "INSERT INTO grading(denom, roof, floor, grade, remark) VALUES (?, ?, ?, ?, ?)";
  const values = [denom, roof, floor, grade, remark];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all object
const getGrade = async () => {
  const query = "SELECT * FROM grading";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

const getMSCEGrade = async () => {
  const query = "SELECT * FROM grading WHERE denom = 'MSCE'";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

const getJCEGrade = async () => {
  const query = "SELECT * FROM grading WHERE denom = 'JCE'";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// Delete object
const deleteGrade = async (id) => {
  const query = "DELETE FROM grading WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// Updating object
const updateGrade = async (id, denom, roof, floor, grade, remark) => {
  const query = "UPDATE grading SET denom = ?, roof = ?, floor = ?, grade = ?, remark = ? WHERE id = ?";
  const values = [denom, roof, floor, grade, remark, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single object
const editGrade = async (id) => {
  const query = "SELECT * FROM grading WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- GRADING CRUD ------------------------------------------------

// // --------------------------------------- JCE CRUD ------------------------------------------------

// // Check if object exists
const checkJCE = async (denom, roof, floor) => {
  const query = "SELECT denom, roof, floor FROM remarks WHERE denom = ? AND roof = ? AND floor = ?";
  const value = [denom, roof, floor];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertJCE = async (denom, roof, floor, remark) => {
  const query =
    "INSERT INTO remarks(denom, roof, floor, remark) VALUES (?, ?, ?, ?)";
  const values = [denom, roof, floor, remark];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getJCE = async () => {
  const query = "SELECT * FROM remarks WHERE denom = 'JCE'";
  const [res] = await conn.query(query);
  return res;
};

// // Delete object
const deleteJCE = async (id) => {
  const query = "DELETE FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Updating object
const updateJCE = async (id, denom, roof, floor, remark) => {
  const query =
    "UPDATE remarks SET denom = ?, roof = ?, floor = ?, remark = ? WHERE id = ?";
  const values = [denom, roof, floor, remark, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get Single object
const editJCE = async (id) => {
  const query = "SELECT * FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

// // --------------------------------------- JCE CRUD ------------------------------------------------

// // --------------------------------------- MSCE CRUD ------------------------------------------------

// // Check if object exists
const checkMSCE = async (denom, roof, floor) => {
  const query =
    "SELECT denom, roof, floor FROM remarks WHERE denom = ? AND roof = ? AND floor = ?";
  const value = [denom, roof, floor];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertMSCE = async (denom, roof, floor, remark) => {
  const query =
    "INSERT INTO remarks(denom, roof, floor, remark) VALUES (?, ?, ?, ?)";
  const values = [denom, roof, floor, remark];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getMSCE = async () => {
  const query = "SELECT * FROM remarks WHERE denom = 'MSCE'";
  const [res] = await conn.query(query);
  return res;
};

// // Delete object
const deleteMSCE = async (id) => {
  const query = "DELETE FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Updating object
const updateMSCE = async (id, denom, roof, floor, remark) => {
  const query =
    "UPDATE remarks SET denom = ?, roof = ?, floor = ?, remark = ? WHERE id = ?";
  const values = [denom, roof, floor, remark, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get Single object
const editMSCE = async (id) => {
  const query = "SELECT * FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

// // --------------------------------------- MSCE CRUD ------------------------------------------------

// // --------------------------------------- TEACHER CRUD ------------------------------------------------

// // Check if object exists
const checkTeacher = async (sid, email, contact) => {
  const query =
    "SELECT sid, email, contact FROM teachers WHERE sid = ? AND email = ? AND contact = ?";
  const value = [sid, email, contact];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertTeacher = async (sid, name, contact, email, address, gender, password) => {
  const query =
    "INSERT INTO teachers(sid, name, contact, email, address, gender, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [sid, name, contact, email, address, gender, password];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getTeacher = async (sid) => {
  const query = "SELECT * FROM teachers WHERE sid = ?";
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getSingleTeacher = async (sid, id) => {
  const query = "SELECT * FROM teachers WHERE sid = ? AND id=?";
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

const getTeacherClass = async (sid, id) => {
  const query = `SELECT class.name FROM assignteacher 
    INNER JOIN class ON class.id=assignteacher.classid
    WHERE assignteacher.sid = ? AND assignteacher.id=?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

const getTeacherSubject = async (sid, id) => {
  const query = `SELECT subject.name FROM assignteacher 
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = ? AND assignteacher.id=?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

// Delete object
const deleteTeacher = async (id) => {
  const query = "DELETE FROM teachers WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// Updating object
const updateTeacher = async (id, name, contact, email, address, gender, update) => {
  const query =
    "UPDATE teachers SET name = ?, contact = ?, email = ?, address = ?, gender = ?, updated_at = ? WHERE id = ?";
  const values = [name, contact, email, address, gender, update, id];
  const [res] = await conn.query(query, values);
  return res;
};

// Get Single object
const editTeacher = async (id) => {
  const query = "SELECT * FROM teachers WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

const countTeachers = async (sid) => {
  const query = "SELECT COUNT(*) as Count FROM teachers WHERE sid = ?";
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

const countMaleTeachers = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM teachers 
    WHERE sid = ? AND gender = 'Male'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

const countFemaleTeachers = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM teachers 
    WHERE sid = ? AND gender = 'Female'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

const teacherGenderPercentage = async (sid) => {
  const query = `SELECT 
    gender,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 0) AS percentage
FROM 
    teachers
WHERE sid = ?
GROUP BY 
    gender
ORDER BY 
    gender;`
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- TEACHER CRUD ------------------------------------------------

// // --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------

// // Check if object exists
const checkAssignTeacher = async (sid, classid, subjectid) => {
  const query =
    "SELECT sid, classid, subjectid FROM assignteacher WHERE sid = ? AND classid = ? AND subjectid = ?";
  const value = [sid, classid, subjectid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertAssignTeacher = async (sid, teacherid, classid, subjectid) => {
  const query =
    "INSERT INTO assignteacher(sid, teacherid, classid, subjectid) VALUES (?, ?, ?, ?)";
  const values = [sid, teacherid, classid, subjectid];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getAssignTeacher = async (sid) => {
  const query = `SELECT assignteacher.id, teachers.name AS teacher, class.name AS classs, subject.name AS subject FROM assignteacher
    INNER JOIN teachers ON teachers.id=assignteacher.teacherid
    INNER JOIN class ON class.classid=assignteacher.classid
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteAssignTeacher = async (id) => {
  const query = "DELETE FROM assignteacher WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res.length < 1;
};

// // --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------

// // --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------

// // Check if object exists
const checkClassTeacher = async (sid, classid) => {
  const query =
    "SELECT sid, classid FROM classteacher WHERE sid = ? AND classid = ?";
  const value = [sid, classid];
  const [res] = await conn.query(query, value);
  return res[1]; // Adjusted to return the correct row
};

// // Add new object
const insertClassTeacher = async (sid, teacherid, classid) => {
  const query =
    "INSERT INTO classteacher(sid, teacherid, classid) VALUES (?, ?, ?)";
  const values = [sid, teacherid, classid];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getClassTeacher = async (sid) => {
  const query = `SELECT classteacher.id, teachers.name AS teacher, class.name AS classs FROM classteacher
    INNER JOIN teachers ON teachers.id=classteacher.teacherid
    INNER JOIN class ON class.classid=classteacher.classid
    WHERE classteacher.sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteClassTeacher = async (id) => {
  const query = "DELETE FROM classteacher WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res.length < 1;
};

// // --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------

// // --------------------------------------- STUDENT CRUD ------------------------------------------------

// // Check if object exists
const checkStudent = async (sid, students) => {
  const query = `SELECT EXISTS (
      SELECT 1 FROM students
      INNER JOIN history ON history.studentid = students.id
      WHERE history.schoolid = ? 
      AND name IN (${students.map(() => '?').join(',')})
  ) AS existsCheck`; // Assign an alias for readability
  const values = [sid, ...students]; // Spread students array
  const [res] = await conn.query(query, values);
  
  // Extract value properly
  const exists = Object.values(res[0])[0]; // Get first column value (1 or 0)
  
  return exists === 1; // Return true or false
};


// // Add new object
const insertStudent = async (students) => {
  const studentIDs = [];
  const query = "INSERT INTO students (id, name) VALUES (?, ?)";
  try {
    // Assuming 'conn' is your MySQL connection or pool
    for (const { studentID, student } of students) {
      await conn.query(query, [studentID, student]);
      studentIDs.push(studentID);
    }
    return studentIDs;
  } catch (error) {
    throw error;
  }
};


const insertStudentHistory = async (sid, yearid, classid, studentIDs) => {
  const query = "INSERT INTO history (schoolid, yearid, classid, studentid) VALUES ?";
  
  const values = studentIDs.map(studentID => [sid, yearid, classid, studentID]); // Prepare bulk insert data
  
  try {
    const [result] = await conn.query(query, [values]); // Bulk insert into history
    return result; 
  } catch (error) {
    throw error; // Propagate the error
  }
};


// const insertStudentHistory = async (sid, yearid, classid, studentIDs) => {
//   const insertHistory = [];
//   const query =
//     "INSERT INTO history(sid, yearid, classid, studentid) VALUES ($1, $2, $3, $4)";

//   // Insert each student one by one
//   for (const id of studentIDs) {
//     const result = await conn.query(query, [sid, yearid, classid, id]);
//     insertHistory.push(result);
//   }
//   return insertHistory;
// };

// // Get all object
const getStudent = async (sid) => {
  const query = `SELECT s.id, s.name, class.name AS class, s.dob, s.gender, s.address FROM history
    INNER JOIN students AS s ON s.id = history.studentid
    INNER JOIN acyear ON acyear.id=history.yearid
    INNER JOIN class ON class.id=history.classid
    WHERE history.schoolid = ? AND status = 'Active'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Get single object
const getSingleStudent = async (sid, id) => {
  const query = `SELECT s.*, TO_CHAR(s.created_at, 'Month DD, YYYY') AS admission, class.name AS class
FROM students s
INNER JOIN history h ON h.studentid = s.id 
INNER JOIN class ON class.classid = h.classid
WHERE s.id = ? AND h.sid = ? AND h.status = 'Active'`;
  const value = [id, sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteStudent = async (id) => {
  const query = "DELETE FROM students WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res.length < 1;
};

// // Updating object
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
    "UPDATE students SET name = ?, contact = ?, email = ?, address = ?, gender = ?, dob = ?, updated_at = ? WHERE id = ?";
  const values = [name, contact, email, address, gender, dob, update, id];
  const [res] = await conn.query(query, values);
  return res;
};

const countStudents = async (sid) => {
  const query = "SELECT COUNT(*) as Count FROM history WHERE schoolid = ? AND status = 'Active'";
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countMale = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM history 
    INNER JOIN students s ON s.id = history.studentid
    WHERE history.schoolid = ? AND status = 'Active' AND s.gender = 'Male'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countFemale = async (sid) => {
  const query = `SELECT COUNT(*) as Count
    FROM history 
    INNER JOIN students s ON s.id = history.studentid
    WHERE history.schoolid = ? AND status = 'Active' AND s.gender = 'Female'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countGenderAndClass = async (sid) => {
  const query = `SELECT 
    c.name as class,
    s.gender,
    COUNT(*) AS count
FROM 
    history
INNER JOIN students s ON s.id = history.studentid
INNER JOIN class c ON c.id = history.classid
WHERE history.schoolid = ? AND status = 'Active'
GROUP BY 
    c.name, s.gender
ORDER BY 
    c.name, s.gender`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res.affectedRows > 0;
}

const genderPercentage = async (sid) => {
  const query = `SELECT 
    s.gender,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 0) AS percentage
FROM 
    history
INNER JOIN students s ON s.id = history.studentid
WHERE history.schoolid = ? AND status = 'Active'
GROUP BY 
    s.gender
ORDER BY 
    s.gender;`
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- STUDENT CRUD ------------------------------------------------

// // --------------------------------------- FEES CRUD ------------------------------------------------

// // Check if object exists
const checkFee = async (sid, name) => {
  const query = `SELECT name FROM fees WHERE sid = ? AND name = ?`;
  const value = [sid, name];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertFee = async (sid, name, amount, description) => {
  const query =
    "INSERT INTO fees(sid, name, amount, description) VALUES (?, ?, ?, ?)";
  const values = [sid, name, amount, description];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getFee = async (sid) => {
  const query = `SELECT * FROM fees WHERE sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteFee = async (id) => {
  const query = "DELETE FROM fees WHERE feeid = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Get Single object
const editFee = async (id) => {
  const query = "SELECT * FROM fees WHERE feeid = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Updating object
const updateFee = async (id, name, amount, description, update) => {
  const query =
    "UPDATE fees SET name = ?, amount = ?, description = ?, updated_at = ? WHERE feeid = ?";
  const values = [name, amount, description, update, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // --------------------------------------- FEES CRUD ------------------------------------------------

// // --------------------------------------- PAYMENT CRUD ------------------------------------------------

// // Get all object
const getPay = async (sid) => {
  const query = `SELECT 
      p.pid, 
      p.paid, 
      p.updated_at, 
      s.id, 
      s.name AS student, 
      c.name AS class, 
      f.name AS fee, 
      p.status, 
      t.name AS term, 
      ay.name AS year
  FROM payment p
  INNER JOIN students s ON p.id = s.id
  INNER JOIN history h ON s.id = h.studentid
      AND h.yearid = (SELECT yearid FROM term WHERE id = p.termid) -- Ensure the student was in this academic year
  INNER JOIN fees f ON f.feeid = p.feeid
  INNER JOIN term t ON t.id = p.termid
  INNER JOIN acyear ay ON ay.yearid = t.yearid
  INNER JOIN class c ON h.classid = c.classid
  WHERE p.sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getPayee = async (sid, id) => {
  const query = `SELECT payment.pid, TO_CHAR(payment.updated_at, 'Month DD, YYYY') AS date, fees.name, 
fees.amount, payment.paid, payment.balance, payment.status, term.name AS term, acyear.name AS year
FROM payment
INNER JOIN fees ON fees.feeid = payment.feeid
INNER JOIN term ON term.id = payment.termid
INNER JOIN acyear ON acyear.yearid = term.yearid
                    WHERE payment.sid =  ? AND payment.id = ?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

const insertPay = async (sid, id, feeid, paid, balance, status, term) => {
  const query =
    "INSERT INTO payment(sid, id, feeid, paid, balance, status, termid) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [sid, id, feeid, paid, balance, status, term];
  const [res] = await conn.query(query, values);
  return res;
};

const checkPay = async (sid, feeid, id, term) => {
  const query = `SELECT * FROM payment WHERE sid = ? AND feeid = ? AND id = ? AND termid = ?`;
  const value = [sid, feeid, id, term];
  const [res] = await conn.query(query, value);
  return res;
};

// // Get Single object
const editPay = async (id) => {
  const query = `SELECT payment.*, fees.amount 
                  FROM payment 
                  INNER JOIN fees ON fees.feeid = payment.feeid
                  WHERE pid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Updating object
const updatePay = async (id, paid, balance, status, update, term) => {
  const query =
    "UPDATE payment SET paid = ?, balance = ?, status = ?, updated_at = ?, termid = ? WHERE pid = ?";
  const values = [paid, balance, status, update, term, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // Delete object
const deletePay = async (id) => {
  const query = "DELETE FROM payment WHERE pid = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res.length < 1;
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
        termid = (SELECT termid FROM CurrentTerm) AND payment.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
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
     AND payment.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
}

const getTuition = async (id) => {
  const query = `SELECT amount FROM fees
    WHERE sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

const getOutstanding = async (id) => {
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
        termid = (SELECT termid FROM CurrentTerm) AND payment.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
}

const PaidByDays = async (id) => {
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
    termid = (SELECT termid FROM CurrentTerm) AND payment.sid = ?
GROUP BY 
    TO_CHAR(created_at::DATE, 'Day')
ORDER BY 
    TO_CHAR(created_at::DATE, 'Day') DESC`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
}

const PaidByClass = async (id) => {
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
    WHERE s.sid = ?
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
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- PAYMENT CRUD ------------------------------------------------

// // --------------------------------------- ENTRY CRUD ------------------------------------------------

const getYearByTeacherID = async () => {
  const query = "SELECT * FROM acyear";
  const [res] = await conn.query(query);
  return res;
};

const getTermByTeacherID = async () => {
  const query = "SELECT * FROM term";
  const [res] = await conn.query(query);
  return res;
};

const getExamByTeacherID = async () => {
  const query = "SELECT * FROM exam";
  const [res] = await conn.query(query);
  return res;
};

const getClassByTeacherID = async (sid, id) => {
  const query = `SELECT DISTINCT(class.name), class.classid FROM assignteacher
                  INNER JOIN class ON  class.classid = assignteacher.classid
                  WHERE assignteacher.sid = ? AND assignteacher.teacherid = ?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

const getSubjectByTeacherID = async (sid, id, classid) => {
  const query = `SELECT DISTINCT(subject.name), subject.id as subjectid FROM assignteacher
                  INNER JOIN subject ON  subject.id = assignteacher.subjectid
                  WHERE assignteacher.sid = ? AND assignteacher.teacherid = ? AND assignteacher.classid = ?`;
  const value = [sid, id, classid];
  const [res] = await conn.query(query, value);
  return res;
};

const getStudentForEntry = async (sid, classid) => {
  const query = `SELECT students.id, name FROM students 
  INNER JOIN history ON history.studentid = students.id
  WHERE history.sid = ? AND classid = ? AND status = 'Active'
  ORDER BY name ASC`;
  const values = [sid, classid];
  const [res] = await conn.query(query, values);
  return res;
};

const checkResult = async (sid, termid, data) => {
  const query = `SELECT EXISTS (
      SELECT 1 FROM results
      WHERE classid = ? AND sid = ? AND typeid = ? AND studentid = ? AND subjectid = ? AND termid = ?)`;
  const values = [
    data.selectedClass,
    sid,
    data.typeid,
    data.id,
    data.selectedSubject,
    termid,
  ];
  const [res] = await conn.query(query, values);
  return res.exists;
};

const insertResult = async (sid, termid, grade, remarks, data) => {
  const query = `INSERT INTO results(sid, studentid, termid, typeid, classid, subjectid, score, remarks, grade) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    sid,
    data.id,
    termid,
    data.typeid,
    data.selectedClass,
    data.selectedSubject,
    data.score,
    remarks,
    grade,
  ];
  const [res] = await conn.query(query, values);
  return res;
};

const getClassById = async (data) => {
  const query = "SELECT denom FROM class WHERE classid = ?";
  const value = [data];
  const [res] = await conn.query(query, value);
  return res;
};

const getGradeByDenom = async (denom) => {
  const query = "SELECT * FROM grading WHERE denom = ?";
  const value = [denom];
  const [res] = await conn.query(query, value);
  return res;
};

// // --------------------------------------- ENTRY CRUD ------------------------------------------------

// // --------------------------------------- FILTER CRUD ------------------------------------------------

const getX = async (sid, termid, typeid, classid, subjectid) => {
  const query = `SELECT results.id as resultid, students.name as student, class.name as class, subject.name as subject, results.score, results.grade, results.remarks
      FROM results
      INNER JOIN students ON students.id = results.studentid
      INNER JOIN class ON class.classid = results.classid
      INNER JOIN subject ON subject.id = results.subjectid
      WHERE results.termid = ? AND results.typeid = ?
      AND results.classid = ? AND results.subjectid = ? AND results.sid = ?`;
  const value = [termid, typeid, classid, subjectid, sid];
  const [res] = await conn.query(query, value);
  return res;
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
    "DELETE FROM results WHERE yearid = ? AND termid = ? AND typeid = ? AND classid = ? AND subjectid = ? AND sid = ?";
  const value = [yearid, termid, typeid, classid, subjectid, sid];
  const [res] = await conn.query(query, value);
  return res.length < 1;
};

const getScore = async (id) => {
  const query = `SELECT *
      FROM results
      WHERE id = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// Updating object
const updateScore = async (id, score, grade, remark, update) => {
  const query =
    "UPDATE results SET score = ?, grade = ?, remarks = ?, updated_at = ? WHERE id = ?";
  const values = [score, grade, remark, update, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // --------------------------------------- FILTER CRUD ------------------------------------------------

// // --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------

const getClassStudent = async (sid, teacherid) => {
  const query = `SELECT students.id, students.name, EXTRACT(YEAR FROM AGE(CAST(students.dob AS DATE))) AS age, class.name as class, students.gender, students.address, students.contact
      FROM classteacher
      INNER JOIN history ON history.classid = classteacher.classid
      INNER JOIN students ON students.id = history.studentid
      INNER JOIN class ON class.classid = classteacher.classid
      WHERE classteacher.sid = ? AND classteacher.teacherid = ? AND history.status = 'Active'`;
  const value = [sid, teacherid];
  const [res] = await conn.query(query, value);
  return res;
};

const getClassNSubject = async (sid, teacherid) => {
  const query = `SELECT class.classid, class.name AS class, subject.name AS subject FROM assignteacher
      INNER JOIN class ON class.classid = assignteacher.classid
      INNER JOIN subject ON subject.id = assignteacher.subjectid
      WHERE assignteacher.sid = ? AND assignteacher.teacherid = ?`;
  const value = [sid, teacherid];
  const [res] = await conn.query(query, value);
  return res;
};

const dashboardClassTeacher = async (sid, teacherid) => {
  const query = `SELECT class.name AS class FROM classteacher
      INNER JOIN class ON class.classid = classteacher.classid
      WHERE classteacher.sid = ? AND classteacher.teacherid = ?`;
  const value = [sid, teacherid];
  const [res] = await conn.query(query, value);
  return res;
};
// // --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------

// // --------------------------------------- CHART CRUD ------------------------------------------------

const getStudentByGender = async (sid, classid) => {
  const query = `SELECT COALESCE(gender, 'Other') as gender, COUNT(*) as count
    FROM students
    INNER JOIN history h ON h.studentid = students.id
    WHERE classid = ? AND h.sid = ?
    GROUP BY COALESCE(gender, 'Other')`;
  const values = [classid, sid];
  const [res] = await conn.query(query, values);
  return res;
};

const getTopStudent = async (sid, teacherid, classid) => {
  const query = `SELECT DISTINCT ON (classid, subjectid) 
    students.name, subject.name AS subject, score, results.classid, results.subjectid
    FROM results
    INNER JOIN students ON students.id = results.studentid
    INNER JOIN subject ON subject.id = results.subjectid
    INNER JOIN assignteacher ON assignteacher.classid = results.classid
    WHERE assignteacher.classid = ? AND assignteacher.teacherid = ? AND assignteacher.sid = ?
    ORDER BY classid, subjectid, score DESC, results.created_at DESC`;
  const value = [classid, teacherid, sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getAggScoreBySUbject = async (sid, teacherid, classid) => {
  const query = `SELECT subject.name AS subject, ROUND(AVG(CAST(score AS BIGINT))) AS average, term.name AS term, exam.name AS exam, class.name AS class
    FROM results
    INNER JOIN subject ON subject.id = results.subjectid
    INNER JOIN term ON term.id = results.termid
    INNER JOIN exam ON exam.id = results.typeid
    INNER JOIN class ON class.classid = results.classid
    INNER JOIN assignteacher ON assignteacher.classid = results.classid
    WHERE assignteacher.classid = ? AND assignteacher.teacherid = ? AND results.sid = ?
    GROUP BY subject.name, term.name, exam.name, class.name
    ORDER BY average DESC`;
  const value = [classid, teacherid, sid];
  const [res] = await conn.query(value);
  return res;
};

const countStudentByAssign = async (sid, teacherid, classid) => {
  const query = `SELECT COUNT(DISTINCT(students.id))
    FROM students
    INNER JOIN history ON history.studentid = students.id
    INNER JOIN assignteacher ON assignteacher.classid = history.classid
    WHERE assignteacher.classid = ? AND assignteacher.teacherid = ? AND history.sid = ? AND status = 'Active'`;
  const value = [classid, teacherid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // --------------------------------------- CHART CRUD ------------------------------------------------

// // --------------------------------------- REPORT CRUD ------------------------------------------------

// // JCE
const countSubjects = async (termid, typeid, classid, studentid, sid) => {
  const query = `SELECT COUNT(subjectid) AS count FROM results 
    WHERE termid = ? AND typeid = ? AND classid = ? AND studentid = ANY ($4::uuid[]) AND sid = ?`;
  const values = [termid, typeid, classid, studentid, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const addPromote = async (sid, termid, typeid, classid, studentid, agg, remarks, rank) => {
  const query = `INSERT INTO promotion(sid, termid, typeid, classid, studentid, agg, remarks, rank)
                  VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [sid, termid, typeid, classid, studentid, agg, remarks, rank];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const checkPromote = async (sid, termid, typeid, classid, studentid) => {
  const query = `SELECT EXISTS (
        SELECT true FROM promotion WHERE sid = ? AND termid = ? AND typeid = ? AND classid = ? AND studentid = ANY ($5::uuid[]))`;
  const values = [sid, termid, typeid, classid, studentid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res.exists;
}

const updatePromote = async (sid, termid, typeid, classid, studentid, agg, remarks, rank) => {
  const query = `UPDATE promotion SET agg = ?, remarks = ?, rank = ?
                WHERE sid = ? AND termid = ? AND typeid = ? AND classid = ? AND studentid = ?`;
  const values = [agg, remarks, rank, sid, termid, typeid, classid, studentid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const getReportByStudent = async (sid, termid, typeid, classid) => {
  const query = `WITH student_scores AS (
      SELECT 
          studentid,
          classid,
          subjectid,
          CAST(score AS BIGINT) AS score,
          ROW_NUMBER() OVER (PARTITION BY studentid, classid ORDER BY CAST(score AS BIGINT) DESC) AS subject_rank
      FROM results
      WHERE results.termid = ?
          AND results.typeid = ?
          AND results.classid = ? 
          AND results.sid = ?
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
  ORDER BY r.classid, rs.rank, st.name`;
  
  const value = [termid, typeid, classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

const getStudentCard = async (sid, termid, typeid, classid, studentid) => {
  const query = `WITH student_scores AS (
      SELECT 
          studentid,
          CAST(score AS BIGINT) AS score,
          ROW_NUMBER() OVER (PARTITION BY studentid ORDER BY CAST(score AS BIGINT) DESC) AS subject_rank
      FROM results
      WHERE results.termid = ?
          AND results.typeid = ?
          AND results.classid = ? 
          AND results.sid = ?
          AND results.studentid = ?
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
  JOIN term t ON t.id = r.termid
  JOIN acyear ac ON ac.yearid = t.yearid
  JOIN exam e ON e.id = r.typeid
  JOIN class c ON c.classid = r.classid
  ORDER BY st.name;`;
  
  const value = [termid, typeid, classid, sid, studentid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

const countResult = async (sid, termid, typeid, classid) => {
  const query = `SELECT COUNT(DISTINCT(studentid)) AS count
      FROM results
      WHERE results.termid = ?
          AND results.typeid = ?
          AND results.classid = ?
          AND results.sid = ?`;
  const value = [termid, typeid, classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
}

// JCE


// MSCE

const getReportByStudentMSCE = async (sid, termid, typeid, classid) => {
  const query = `WITH student_scores AS (
    SELECT 
        studentid,
        classid,
        subjectid,
        CAST(grade AS BIGINT) AS grade,
        ROW_NUMBER() OVER (PARTITION BY studentid, classid ORDER BY CAST(grade AS BIGINT) DESC) AS subject_rank
    FROM results
    WHERE results.termid = ?
        AND results.typeid = ?
        AND results.classid = ?
        AND results.sid = ?
),
top_6_subjects AS (
    SELECT 
        studentid,
        classid,
        SUM(grade) AS total_score
    FROM student_scores
    WHERE subject_rank <= 6
    GROUP BY studentid, classid
),
ranked_students AS (
    SELECT 
        studentid, 
        classid, 
        total_score,
        RANK() OVER (PARTITION BY classid ORDER BY total_score ASC) AS rank
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
ORDER BY r.classid, rs.rank, st.name
`;
  const value = [termid, typeid, classid, sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getStudentCardMSCE = async (sid, termid, typeid, classid, studentid) => {
  const query = `WITH student_scores AS (
    SELECT 
        studentid,
        CAST(grade AS BIGINT) AS grade,
        ROW_NUMBER() OVER (PARTITION BY studentid ORDER BY CAST(grade AS BIGINT) DESC) AS subject_rank
    FROM results
    WHERE results.termid = ?
        AND results.typeid = ?
        AND results.classid = ?
        AND results.sid = ?
        AND results.studentid = ?
),
top_6_subjects AS (
    SELECT 
        studentid,
        SUM(grade) AS total_score
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
JOIN term t ON t.id = r.termid
JOIN acyear ac ON ac.yearid = t.yearid
JOIN exam e ON e.id = r.typeid
JOIN class c ON c.classid = r.classid
ORDER BY st.name
`;
  const value = [termid, typeid, classid, sid, studentid];
  const [res] = await conn.query(query, value);
  return res;
};
// MSCE

// Class Teacher
const getClassTeacher4Report = async (classid, sid) => {
  const query = `SELECT teachers.name
    FROM classteacher
    INNER JOIN teachers ON teachers.id = classteacher.teacherid
    WHERE classteacher.classid = ? AND classteacher.sid = ?`;
  const value = [classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getSubjectPosition = async (
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
      results.termid = ? AND
      results.typeid = ? AND
      results.classid = ? AND
      results.sid = ? AND
      results.studentid = ?
      ORDER BY 
          studentid, subject ASC`;
  const value = [termid, typeid, classid, sid, studentid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const realPos = async (termid, typeid, classid, sid, subjectid) => {
  const query = `SELECT studentid, subjectid, score, 
        RANK() OVER(ORDER BY CAST(score AS BIGINT) DESC, 
        score DESC) as rank 
        FROM (
        SELECT results.studentid, results.subjectid, score 
        FROM results
        WHERE results.termid = ?
        AND results.typeid = ?
        AND results.classid = ?
        AND results.subjectid = ?
        AND results.sid = ?
        GROUP BY results.studentid, results.subjectid, score)`;
  const value = [termid, typeid, classid, subjectid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getTeacherBySubject = async (subjectid, sid) => {
  const query = `SELECT subjectid, teachers.name 
        FROM assignteacher
        INNER JOIN teachers ON teachers.id = assignteacher.teacherid
        WHERE assignteacher.subjectid = ? AND assignteacher.sid = ?`;
  const value = [subjectid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};
// Class Teacher

const getRemarks = async (denom, sid) => {
  const query = `SELECT * FROM remarks WHERE denom = ? AND sid = ?`;
  const value = [denom, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const deleteReport = async (yearid, termid, typeid, classid, sid) => {
  const query = `DELETE FROM results WHERE yearid = ? AND termid = ? AND typeid = ? AND classid = ? AND sid = ?`;
  const value = [yearid, termid, typeid, classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.length < 1; // Adjusted for MySQL
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
      results.termid = (SELECT termid FROM CurrentTerm) AND results.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getStudentForPromotion = async (classid, sid) => {
  const query = `WITH CurrentTerm AS (
        SELECT 
            id AS termid
        FROM 
            term
        WHERE 
            CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
        )
    SELECT p.studentid, students.name AS student, exam.name AS exam, p.agg, p.remarks, p.rank
    FROM promotion p
    INNER JOIN students ON students.id = p.studentid
    INNER JOIN exam ON exam.id = p.typeid
    WHERE p.classid = ? AND p.termid = (SELECT p.termid FROM CurrentTerm) AND p.sid = ?`;
  const values = [classid, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
};

const upperPromote = async (status, classid, studentid) => {
  const query = `UPDATE history SET status = ?
    WHERE classid = ? AND studentid = ?`;
  const values = [status, classid, studentid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

const bestStudents = async (sid) => {
  const query = `WITH CurrentTerm AS (
    SELECT id AS termid
    FROM term
    WHERE CURRENT_DATE BETWEEN CAST(start_date AS DATE) AND CAST(end_date AS DATE)
)
SELECT DISTINCT p.classid, 
       s.name AS student, 
       term.name AS term, 
       class.name AS class, 
       exam.name AS exam, 
       p.agg
FROM promotion p
INNER JOIN students s ON s.id = p.studentid 
INNER JOIN term ON term.id = p.termid
INNER JOIN class ON class.id = p.classid
INNER JOIN exam ON exam.id = p.typeid 
WHERE p.termid = (SELECT termid FROM CurrentTerm) AND sid = ?
ORDER BY p.classid, p.rank ASC
`;
  const value = [sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.affectedRows > 0;
}

const worstStudents = async (sid) => {
  const query = `WITH CurrentTerm AS (
    SELECT id AS termid
    FROM term
    WHERE CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
  )
  SELECT DISTINCT ON (p.classid) s.name AS student, term.name AS term, class.name AS class, exam.name AS exam, p.agg
  FROM promotion p
  INNER JOIN students s ON s.id = p.studentid 
  INNER JOIN term ON term.id= p.termid
  INNER JOIN class ON class.classid = p.classid
  INNER JOIN exam ON exam.id = p.typeid 
  WHERE p.termid = (SELECT termid FROM CurrentTerm) AND sid = ?
  ORDER BY p.classid, rank DESC;`;
  const value = [sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
}

const avSubByClass = async (sid, classid) => {
  const query =  `WITH CurrentTerm AS (
    SELECT id AS termid
    FROM term
    WHERE CURRENT_DATE BETWEEN start_date::DATE AND end_date::DATE
    )
  SELECT 
    subject.name AS subject,
    classid, 
    subjectid, 
    ROUND(AVG(score::NUMERIC)) AS average
  FROM results
  INNER JOIN subject ON subject.id = results.subjectid
  WHERE classid = ? AND results.sid = ? AND results.termid = (SELECT termid FROM CurrentTerm)
  GROUP BY classid, subjectid, subject
  ORDER BY classid, subjectid, subject ASC`;
  const values = [classid, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

// // --------------------------------------- REPORT CRUD ------------------------------------------------




// // --------------------------------------- EVENTS CRUD ------------------------------------------------

const addEvent = async (id, title, date, time, location, description) => {
  const query = 'INSERT INTO events (title, date, time, locations, description, sid) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [title, date, time, location, description, id];
  const [res] = await conn.query(query, values);
  return res.affectedRows > 0;
}

const checkEvent = async (id, title, date) => {
  const query = 'SELECT * FROM events WHERE sid = ? AND title = ? AND date = ?';
  const values = [id, title, date];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const getEvents = async (sid) => {
  const query = 'SELECT * FROM events WHERE sid = ? ORDER BY created_at DESC';
  const value = [sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
}

const editEvent = async (id) => {
  const query = 'SELECT * FROM events WHERE id = ?';
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

const updateEvent = async (id, title, date, time, location, description) => {
  const query = 'UPDATE events SET title = ?, date = ?, time = ?, locations = ?, description = ? WHERE id = ?';
  const values = [title, date, time, location, description, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

const deleteEvent = async (id) => {
  const query = 'DELETE FROM events WHERE id = ?';
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

// // --------------------------------------- EVENTS CRUD ------------------------------------------------




// // --------------------------------------- SUPER ADMIN CRUD ------------------------------------------------

const insertFeatures = async (name, price, features) => {
  const query = `INSERT INTO subscription_plans (name, price, features) VALUES (?, ?, ?)`;
  const value = [name, price, features];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.affectedRows > 0; // Adjusted for MySQL
};

const getSubscriptions = async () => {
  const sql = 'SELECT * FROM subscription_plans ORDER BY price ASC';
  const [res] = await conn.query(sql); // Changed to async/await
  return res;
};

const deleteSubscription = async (id) => {
  const query = `DELETE FROM subscription_plans WHERE id = ?`;
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const editPlan = async (id) => {
  const query = "SELECT * FROM subscription_plans WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0]; // Adjusted for MySQL
};

// Updating object
const updatePlan = async (id, name, price, features, update) => {
  const query =
    "UPDATE subscription_plans SET name = ?, price = ?, features = ?, created_at = ? WHERE id = ?";
  const values = [name, price, features, update, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
};

// // --------------------------------------- SUPER ADMIN CRUD ------------------------------------------------




// // --------------------------------------- SUBSCRIPTION CRUD ------------------------------------------------

const getSubs = async (plan) => {
  const query = 'SELECT * FROM subscription_plans WHERE name = ?'; // Changed to ?
  const values = [plan];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0]; // Adjusted for MySQL
} 

const addSubscription = async (id, sid, planid, strata, period) => {
  const query = `INSERT INTO subscriptions (id, sid, planid, status, period)
          VALUES (?, ?, ?, ?, ?)`;
  const values = [id, sid, planid, strata, period];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const addBilling = async (subscriptionid, amount, strata, expiry) => {
  const query = `INSERT INTO billing (subscriptionid, amount, status, expiry)
          VALUES (?, ?, ?, ?)`;
  const values = [subscriptionid, amount, strata, expiry];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res.affectedRows > 0;
}

const checkSubscription = async (sid) => {
  const query = `SELECT * FROM subscriptions WHERE sid = ? AND status = 'active'`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const checkSubscriptionStatus = async (sid) => {
  const query = `SELECT b.status, b.expiry FROM billing b
    INNER JOIN subscriptions s ON s.id = b.subscriptionid
    WHERE s.sid = ? AND b.status = 'Pending'`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0];
}

const checkSubsByID = async (sid) => {
  const query = `SELECT *, sp.name FROM subscriptions
    INNER JOIN subscription_plans sp ON sp.id = subscriptions.planid      
    WHERE sid = ? ORDER BY subscriptions.created_at ASC`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const updateSubscriptionStatus = async (status, sid) => {
  const query = `UPDATE billing b
SET status = ?
FROM subscriptions s
WHERE s.id = b.subscriptionid
  AND s.sid = ?`;
  const values = [status, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const checkPaid = async (sid, status) => {
  const query = `SELECT status FROM subscriptions WHERE sid = ? AND status = ?`;
  const values = [sid, status];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const getSubscriptionPayments = async () => {
  const query = `SELECT sub.id, schools.name, sp.name AS plan, sub.period, bill.amount, sub.created_at AS date, sub.status, bill.status AS bill FROM subscriptions sub
    INNER JOIN schools ON schools.id = sub.sid
    INNER JOIN billing bill ON bill.subscriptionid = sub.id
    INNER JOIN subscription_plans sp ON sp.id = sub.planid
    ORDER BY date DESC`;
  const [res] = await conn.query(query); // Changed to async/await
  return res;
}

const updateSubStatus = async (id, status) => {
  const query = `UPDATE subscriptions SET status = ? WHERE id = ?`;
  const values = [status, id];
  const [res] = await conn.query(query, values);
  return res;
}

const updateBillingStatus = async (id, status) => {
  const query = 'UPDATE billing SET status = ? WHERE subscriptionid = ?';
  const values = [status, id];
  const [res] = await conn.query(query, values);
  return res;
}

const updateSchoolStatus = async (id, status) => {
  const query = 'UPDATE schools SET status = ? WHERE id = ?';
  const values = [status, id];
  const [res] = await conn.query(query, values);
  return res;
}

// // --------------------------------------- SUBSCRIPTION CRUD ------------------------------------------------








// // --------------------------------------- SUBSCRIBE CRUD ------------------------------------------------

const checkSubscribe = async(email) => {
  const query = 'SELECT email FROM subscribe WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
}

const addSubscribe = async (email) => {
  const query = `INSERT INTO subscribe (email) VALUES (?)`; // Changed to ?
  const values = [email];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
}


// // --------------------------------------- SUBSCRIBE CRUD ------------------------------------------------




// // --------------------------------------- FEEDBACK CRUD ------------------------------------------------

const addFeedback = async (sid, rating, optioni, commenti) => {
  const query = `INSERT INTO feedback (sid, rating, optioni, commenti) VALUES (?, ?, ?, ?)`;
  const values = [sid, rating, optioni, commenti];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res.affectedRows > 0;
}

const getFeedbackByRating = async (rating) => {
  const sql = `
      SELECT feedback.*, schools.name
      FROM feedback 
      INNER JOIN schools ON schools.id = feedback.sid  
      WHERE rating = ?`;
  const values = [rating];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getFeedback = async () => {
  const query = `SELECT feedback.*, schools.name, feedback.created_at AS date FROM feedback 
  INNER JOIN schools ON schools.id = feedback.sid`;
  const [res] = await conn.query(query); // Changed to async/await
  return res; // Adjusted for MySQL
}

// // --------------------------------------- FEEDBACK CRUD ------------------------------------------------




module.exports = {
//   // ----- SCHOOLS SECTION -----
  countSchools,
  getSchools,
  getOTPCode,
  updateOTPStatus,
  countPrivateSchools,
  countPublicSchools,
  countSubscribedSchools,
  sumAmount,
  paymentChart,
//   // ----- SCHOOLS SECTION -----


//   // ----- REGISTER SECTION -----
  checkSchool,
  checkSuperPassword,
  checkPassword,
  checkTeacherPassword,
  insertSchool,
  editSchool,
  updateSchool,
  updateSchoolWithoutLogo,
  OTPGeneration,
  updatePassword,
  updateTeacherPassword,
  updateSuperPassword,
//   // ----- REGISTER SECTION -----

  checkMail,
  checkTeacherMail,
  checkAdminMail,

//   // ----- EXAM SECTION -----
  checkExam,
  insertExam,
  getExam,
  deleteExam,
  updateExam,
  editExam,
//   // ----- EXAM SECTION -----

//   // ----- YEAR SECTION -----
  checkYear,
  insertYear,
  getYear,
  deleteYear,
  updateYear,
  editYear,
//   // ----- YEAR SECTION -----

//   // ----- SUBJECT SECTION -----
  checkSubject,
  insertSubject,
  getSubject,
  deleteSubject,
  updateSubject,
  editSubject,
//   // ----- SUBJECT SECTION -----

//   // ----- CLASS SECTION -----
  checkClass,
  insertClass,
  getClass,
  deleteClass,
  updateClass,
  editClass,
//   // ----- CLASS SECTION -----

//   // ----- TERM SECTION -----
  checkTerm,
  insertTerm,
  getTerm,
  deleteTerm,
  updateTerm,
  editTerm,
//   // ----- TERM SECTION -----

//   // ----- GRADE SECTION -----
  checkGrade,
  insertGrade,
  getGrade,
  deleteGrade,
  updateGrade,
  editGrade,
  getMSCEGrade,
  getJCEGrade,
//   // ----- GRADE SECTION -----

//   // ----- JCE SECTION -----
  checkJCE,
  insertJCE,
  getJCE,
  deleteJCE,
  updateJCE,
  editJCE,
//   // ----- JCE SECTION -----

//   // ----- MSCE SECTION -----
  checkMSCE,
  insertMSCE,
  getMSCE,
  deleteMSCE,
  updateMSCE,
  editMSCE,
//   // ----- MSCE SECTION -----

//   // ----- TEACHER SECTION -----
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
//   // ----- TEACHER SECTION -----

//   // ----- STUDENT SECTION -----
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
//   // ----- STUDENT SECTION -----

//   // ----- FEE SECTION -----
  checkFee,
  insertFee,
  getFee,
  deleteFee,
  updateFee,
  editFee,
//   // ----- FEE SECTION -----

//   // ----- PAYMENT SECTION -----
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
//   // ----- PAYMENT SECTION -----


  
//   // ----- ENTRY SECTION -----
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
//   // ----- ENTRY SECTION -----

//   // ----- FILTER SECTION -----
  getX,
  getScore,
  updateScore,
  deleteResult,
//   // ----- FILTER SECTION -----

//   // ----- TEACHER CLASS SECTION -----
  getClassStudent,
  getClassNSubject,
  dashboardClassTeacher,
  checkAssignTeacher,
  insertAssignTeacher,
  getAssignTeacher,
  deleteAssignTeacher,
  checkClassTeacher,
  insertClassTeacher,
  getClassTeacher,
  deleteClassTeacher,
//   // ----- TEACHER CLASS SECTION -----

//   // ----- CHART SECTION -----
  getStudentByGender,
  getTopStudent,
  getAggScoreBySUbject,
  countStudentByAssign,
//   // ----- CHART SECTION -----

//   // ----- REPORT SECTION -----
  getReportByStudent,
  countSubjects,
  addPromote,
  checkPromote,
  updatePromote,
  getReportByStudentMSCE,
  getStudentCard,
  getStudentCardMSCE,
  getClassTeacher4Report,
  countResult,
  getSubjectPosition,
  realPos,
  getTeacherBySubject,
  getRemarks,
  deleteReport,
  countReports,
  getStudentForPromotion,
  upperPromote,
  bestStudents,
  worstStudents,
  avSubByClass,
//   // ----- REPORT SECTION -----




//   // ----- EVENTS SECTION -----
  checkEvent,
  addEvent,
  getEvents,
  editEvent,
  updateEvent,
  deleteEvent,
//   // ----- EVENTS SECTION -----




//   // ----- SUPER ADMIN SECTION -----
  insertFeatures,
  getSubscriptions,
  deleteSubscription,
  editPlan, 
  updatePlan,
//   // ----- SUPER ADMIN SECTION -----



//   // ----- SUBSCRIPTION SECTION -----
  getSubs,
  addSubscription,
  addBilling,
  checkSubscription,
  checkSubscriptionStatus,
  checkSubsByID,
  updateSubscriptionStatus,
  checkPaid,
  getSubscriptionPayments,
  updateSubStatus,
  updateBillingStatus,
  updateSchoolStatus,
//   // ----- SUBSCRIPTION SECTION -----




//   // ----- SUBSCRIBE SECTION -----
  checkSubscribe,
  addSubscribe,
//   // ----- SUBSCRIBE SECTION -----



//   // ----- FEEDBACK SECTION -----
  addFeedback,
  getFeedbackByRating,
  getFeedback,
//   // ----- FEEDBACK SECTION -----

};
