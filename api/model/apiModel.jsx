const kneX = require('../database/db.jsx');
// const conn = require('../database/mysql.jsx');

// --------------------------------------- REGISTER CRUD ------------------------------------------------

const checkSchool = async(name) => {
    const query = "SELECT name FROM schools WHERE name = $1";
    const value = [name];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

const insertSchool = async(name, email, contact, password) => {
    const query = "INSERT INTO schools(name, email, contact, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [name, email, contact, password];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

const editSchool = async(id) => {
    const query = "SELECT * FROM Schools WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// --------------------------------------- REGISTER CRUD ------------------------------------------------




// --------------------------------------- LOGIN ------------------------------------------------

const checkMail = async(email) => {
    const query = 'SELECT * FROM schools WHERE email = $1';
    const values = [email];
    const res = await kneX.query(query, values);
    return res.rows[0];
}

const checkTeacherMail = async(email) => {
    const query = 'SELECT * FROM teachers WHERE email = $1';
    const values = [email];
    const res = await kneX.query(query, values);
    return res.rows[0];
}

// --------------------------------------- LOGIN ------------------------------------------------




// --------------------------------------- EXAM CRUD ------------------------------------------------

// Check if Examination Type exists
const checkExam = async(id, name) => {
    const query = "SELECT name FROM exam WHERE name = $1 AND sid = $2";
    const value = [name, id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new examination type
const insertExam = async(id, name, percentage) => {
    const query = "INSERT INTO exam(sid, name, percentage) VALUES ($1, $2, $3) RETURNING *";
    const values = [id, name, percentage];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all examination types
const getExam = async(id) => {
    const query = "SELECT * FROM exam WHERE sid = $1";
    const value = [id]
    const res = await kneX.query(query, value);
    return res.rows;
}

// Delete Examination Type
const deleteExam = async(id) => {
    const query = "DELETE FROM exam WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating Examination Type
const updateExam = async(id, name, percentage, update) => {
    const query = "UPDATE exam SET name = $1, percentage = $2, updated_at = $3 WHERE id = $4";
    const values = [name, percentage, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single Exam
const editExam = async(id) => {
    const query = "SELECT id, name, percentage FROM exam WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// --------------------------------------- EXAM CRUD ------------------------------------------------





// --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------

// Check if academic year exists
const checkYear = async(id, name) => {
    const query = "SELECT name FROM acyear WHERE name = $1 AND sid = $2";
    const value = [name, id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new academic year
const insertYear = async(id, name) => {
    const query = "INSERT INTO acyear(sid, name) VALUES ($1, $2) RETURNING *";
    const values = [id, name];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all academic year
const getYear = async(id) => {
    const query = "SELECT * FROM acyear WHERE sid = $1";
    const value = [id]
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete academic year
const deleteYear = async(id) => {
    const query = "DELETE FROM acyear WHERE yearid = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating academic year
const updateYear = async(id, name, update) => {
    const query = "UPDATE acyear SET name = $1, updated_at = $2 WHERE yearid = $3";
    const values = [name, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single academic year
const editYear = async(id) => {
    const query = "SELECT yearid, name FROM acyear WHERE yearid = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------




// --------------------------------------- SUBJECT CRUD ------------------------------------------------

// Check if subject exists
const checkSubject = async(id, name) => {
    const query = "SELECT name FROM subject WHERE name = $1 AND sid = $2";
    const value = [name, id ];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new subject
const insertSubject = async(sid, name, code) => {
    const query = "INSERT INTO subject(sid, name, code) VALUES ($1, $2, $3) RETURNING *";
    const values = [sid, name, code];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all subject
const getSubject = async(id) => {
    const query = "SELECT * FROM subject WHERE sid = $1";
    const value = [id]
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete subject
const deleteSubject = async(id) => {
    const query = "DELETE FROM subject WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating subject
const updateSubject = async(id, name, code, update) => {
    const query = "UPDATE subject SET name = $1, code = $2, updated_at = $3 WHERE id = $4";
    const values = [name, code, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single subject
const editSubject = async(id) => {
    const query = "SELECT id, name, code FROM subject WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// --------------------------------------- SUBJECT CRUD ------------------------------------------------





// --------------------------------------- CLASS CRUD ------------------------------------------------

// Check if object exists
const checkClass = async(id, name, denom) => {
    const query = "SELECT name FROM class WHERE name = $1 AND sid = $2 AND denom = $3";
    const value = [name, id, denom];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertClass = async(sid, name, denom) => {
    const query = "INSERT INTO class(sid, name, denom) VALUES ($1, $2, $3) RETURNING *";
    const values = [sid, name, denom];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getClass = async(id) => {
    const query = "SELECT * FROM class WHERE sid = $1";
    const value = [id]
    const res = await kneX.query(query, value);
    return res.rows;
}

// Delete object
const deleteClass = async(id) => {
    const query = "DELETE FROM class WHERE classid = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating object
const updateClass = async(id, name, denom, update) => {
    const query = "UPDATE class SET name = $1, denom = $2, updated_at = $3 WHERE classid = $4";
    const values = [name, denom, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single object
const editClass = async(id) => {
    const query = "SELECT classid, denom, name FROM class WHERE classid = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// --------------------------------------- CLASS CRUD ------------------------------------------------







// --------------------------------------- TERM CRUD ------------------------------------------------

// Check if object exists
const checkTerm = async(id, name) => {
    const query = "SELECT name FROM term WHERE name = $1 AND sid = $2";
    const value = [name, id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertTerm = async(sid, name) => {
    const query = "INSERT INTO term(sid, name) VALUES ($1, $2) RETURNING *";
    const values = [sid, name];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getTerm = async(sid) => {
    const query = "SELECT * FROM term WHERE sid = $1";
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteTerm = async(id) => {
    const query = "DELETE FROM term WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating object
const updateTerm = async(id, name, update) => {
    const query = "UPDATE term SET name = $1, updated_at = $2 WHERE id = $3";
    const values = [name, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single object
const editTerm = async(id) => {
    const query = "SELECT id, name FROM term WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// --------------------------------------- TERM CRUD ------------------------------------------------







// --------------------------------------- GRADING CRUD ------------------------------------------------

// Check if object exists
const checkGrade = async(sid, denom, grade) => {
    const query = "SELECT sid, denom, grade FROM grading WHERE sid = $1 AND denom = $2 AND grade = $3";
    const value = [sid, denom, grade];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertGrade = async(sid, denom, roof, floor, grade, remark) => {
    const query = "INSERT INTO grading(sid, denom, roof, floor, grade, remark) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [sid, denom, roof, floor, grade, remark];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getGrade = async(sid) => {
    const query = "SELECT * FROM grading WHERE sid = $1";
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteGrade = async(id) => {
    const query = "DELETE FROM grading WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating object
const updateGrade = async(id, denom, roof, floor, grade, remark, update) => {
    const query = "UPDATE grading SET denom = $1, roof = $2, floor = $3, grade = $4, remark = $5, updated_at = $6 WHERE id = $7";
    const values = [denom, roof, floor, grade, remark, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single object
const editGrade = async(id) => {
    const query = "SELECT * FROM grading WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// --------------------------------------- GRADING CRUD ------------------------------------------------







// --------------------------------------- JCE CRUD ------------------------------------------------

// Check if object exists
const checkJCE = async(sid, denom, roof, floor) => {
    const query = "SELECT sid, denom, roof, floor FROM remarks WHERE sid = $1 AND denom = $2 AND roof = $3 AND floor = $4";
    const value = [sid, denom, roof, floor];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertJCE = async(sid, denom, roof, floor, remark) => {
    const query = "INSERT INTO remarks(sid, denom, roof, floor, remark) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [sid, denom, roof, floor, remark];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getJCE = async(sid) => {
    const query = "SELECT * FROM remarks WHERE sid = $1 AND denom = 'JCE'";
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteJCE = async(id) => {
    const query = "DELETE FROM remarks WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating object
const updateJCE = async(id, denom, roof, floor, remark, update) => {
    const query = "UPDATE remarks SET denom = $1, roof = $2, floor = $3, remark = $4, updated_at = $5 WHERE id = $6";
    const values = [denom, roof, floor, remark, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single object
const editJCE = async(id) => {
    const query = "SELECT * FROM remarks WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// --------------------------------------- JCE CRUD ------------------------------------------------







// --------------------------------------- MSCE CRUD ------------------------------------------------

// Check if object exists
const checkMSCE = async(sid, denom, roof, floor) => {
    const query = "SELECT sid, denom, roof, floor FROM remarks WHERE sid = $1 AND denom = $2 AND roof = $3 AND floor = $4";
    const value = [sid, denom, roof, floor];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertMSCE = async(sid, denom, roof, floor, remark) => {
    const query = "INSERT INTO remarks(sid, denom, roof, floor, remark) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [sid, denom, roof, floor, remark];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getMSCE = async(sid) => {
    const query = "SELECT * FROM remarks WHERE sid = $1 AND denom = 'MSCE'";
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteMSCE = async(id) => {
    const query = "DELETE FROM remarks WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating object
const updateMSCE = async(id, denom, roof, floor, remark, update) => {
    const query = "UPDATE remarks SET denom = $1, roof = $2, floor = $3, remark = $4, updated_at = $5 WHERE id = $6";
    const values = [denom, roof, floor, remark, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single object
const editMSCE = async(id) => {
    const query = "SELECT * FROM remarks WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// --------------------------------------- MSCE CRUD ------------------------------------------------






// --------------------------------------- TEACHER CRUD ------------------------------------------------

// Check if object exists
const checkTeacher = async(sid, email, contact) => {
    const query = "SELECT sid, email, contact FROM teachers WHERE sid = $1 AND email = $2 AND contact = $3";
    const value = [sid, email, contact];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertTeacher = async(sid, name, contact, email, address, password) => {
    const query = "INSERT INTO teachers(sid, name, contact, email, address, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [sid, name, contact, email, address, password];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getTeacher = async(sid) => {
    const query = "SELECT * FROM teachers WHERE sid = $1";
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}

const getSingleTeacher = async(sid, id) => {
    const query = "SELECT * FROM teachers WHERE sid = $1 AND id=$2";
    const value = [sid, id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

const getTeacherClass = async(sid, id) => {
    const query = `SELECT class.name FROM assignteacher 
    INNER JOIN class ON class.id=assignteacher.classid
    WHERE assignteacher.sid = $1 AND assignteacher.id=$2`;
    const value = [sid, id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

const getTeacherSubject = async(sid, id) => {
    const query = `SELECT subject.name FROM assignteacher 
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = $1 AND assignteacher.id=$2`;
    const value = [sid, id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// Delete object
const deleteTeacher = async(id) => {
    const query = "DELETE FROM teachers WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows;
}

// Updating object
const updateTeacher = async(id, name, contact, email, address, update) => {
    const query = "UPDATE teachers SET name = $1, contact = $2, email = $3, address = $4, updated_at = $5 WHERE id = $6";
    const values = [name, contact, email, address, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single object
const editTeacher = async(id) => {
    const query = "SELECT * FROM teachers WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// --------------------------------------- TEACHER CRUD ------------------------------------------------








// --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------

// Check if object exists
const checkAssignTeacher = async(sid, classid, subjectid) => {
    const query = "SELECT sid, classid, subjectid FROM assignteacher WHERE sid = $1 AND classid = $2 AND subjectid = $3";
    const value = [sid, classid, subjectid];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertAssignTeacher = async(sid, teacherid, classid, subjectid) => {
    const query = "INSERT INTO assignteacher(sid, teacherid, classid, subjectid) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [sid, teacherid, classid, subjectid];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getAssignTeacher = async(sid) => {
    const query = `SELECT assignteacher.id, teachers.name AS teacher, class.name AS classs, subject.name AS subject FROM assignteacher
    INNER JOIN teachers ON teachers.id=assignteacher.teacherid
    INNER JOIN class ON class.classid=assignteacher.classid
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = $1`;
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteAssignTeacher = async(id) => {
    const query = "DELETE FROM assignteacher WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}


// --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------









// --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------

// Check if object exists
const checkClassTeacher = async(sid, classid) => {
    const query = "SELECT sid, classid FROM classteacher WHERE sid = $1 AND classid = $2";
    const value = [sid, classid];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new object
const insertClassTeacher = async(sid, teacherid, classid) => {
    const query = "INSERT INTO classteacher(sid, teacherid, classid) VALUES ($1, $2, $3) RETURNING *";
    const values = [sid, teacherid, classid];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getClassTeacher = async(sid) => {
    const query = `SELECT classteacher.id, teachers.name AS teacher, class.name AS classs FROM classteacher
    INNER JOIN teachers ON teachers.id=classteacher.teacherid
    INNER JOIN class ON class.classid=classteacher.classid
    WHERE classteacher.sid = $1`;
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteClassTeacher = async(id) => {
    const query = "DELETE FROM classteacher WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}


// --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------










// --------------------------------------- STUDENT CRUD ------------------------------------------------

// Check if object exists
const checkStudent = async(sid, classid, yearid, students) => {
    const query = `SELECT EXISTS (
        SELECT 1 FROM students
        WHERE classid = $1 AND yearid = $2 AND sid = $3 AND name = ANY ($4::text[]))`;
    const value = [classid, yearid, sid, students];
    const res = await kneX.query(query, value);
    if (res.rows && res.rows[0]) {
        const exists = res.rows[0].exists;
        return exists;
    } else {
        throw new Error("No result returned from query.");
    }
    
}


// Add new object
const insertStudent = async(sid, studentNames, classid, yearid) => {
    const insertedStudents = [];
    const query = "INSERT INTO students(sid, name, classid, yearid) VALUES ($1, $2, $3, $4) RETURNING *";


    // Insert each student one by one
    for (const name of studentNames) {
        const result = await kneX.query(query, [sid, name, classid, yearid]);
        insertedStudents.push(result.rows[0]);
    }

    return insertedStudents.length > 0;
}

// Get all object
const getStudent = async(sid) => {
    const query = `SELECT students.*, acyear.name AS year, class.name AS class FROM students
    INNER JOIN acyear ON acyear.yearid=students.yearid
    INNER JOIN class ON class.classid=students.classid
    WHERE students.sid = $1`;
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Get single object
const getSingleStudent = async(sid, id) => {
    const query = `SELECT students.*, TO_CHAR(students.created_at, 'Month DD, YYYY') AS admission, class.name AS class FROM students
    INNER JOIN class ON class.classid=students.classid
    WHERE students.sid = $1 AND students.id = $2`;
    const value = [sid, id];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteStudent = async(id) => {
    const query = "DELETE FROM students WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}



// Updating object
const updateStudent = async(id, name, contact, email, address, gender, dob, update) => {
    const query = "UPDATE students SET name = $1, contact = $2, email = $3, address = $4, gender = $5, dob = $6, updated_at = $7 WHERE id = $8";
    const values = [name, contact, email, address, gender, dob, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}


// --------------------------------------- STUDENT TEACHER CRUD ------------------------------------------------












// --------------------------------------- FEES CRUD ------------------------------------------------

// Check if object exists
const checkFee = async(sid, name) => {
    const query = `SELECT name FROM fees WHERE sid = $1 AND name = $2`;
    const value = [sid, name];
    const res = await kneX.query(query, value);
    return res.rows[0];
    
}


// Add new object
const insertFee = async(sid, name, amount, description, start, end) => {
    const query = "INSERT INTO fees(sid, name, amount,description, startDate, endDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [sid, name, amount, description, start, end];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

// Get all object
const getFee = async(sid) => {
    const query = `SELECT * FROM fees WHERE sid = $1`;
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}


// Delete object
const deleteFee = async(id) => {
    const query = "DELETE FROM fees WHERE feeid = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}


// Get Single object
const editFee = async(id) => {
    const query = "SELECT * FROM fees WHERE feeid = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}


// Updating object
const updateFee = async(id, name, amount, description, start, end, update) => {
    const query = "UPDATE fees SET name = $1, amount = $2, description = $3, startDate = $4, endDate = $5, updated_at = $6 WHERE feeid = $7";
    const values = [name, amount, description, start, end, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}


// --------------------------------------- FEES CRUD ------------------------------------------------







// --------------------------------------- PAYMENT CRUD ------------------------------------------------

// Get all object
const getPay = async(sid) => {
    const query = `SELECT pid, payment.paid, payment.updated_at, students.id, students.name AS student, class.name as class, 
                    fees.name AS fee, payment.status
                    FROM payment
                    INNER JOIN students ON payment.id = students.id
                    INNER JOIN fees ON fees.feeid = payment.feeid
                    INNER JOIN class ON students.classid = class.classid
                    WHERE payment.sid = $1`;
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}

const getPayee = async(sid, id) => {
    const query = `SELECT payment.pid, TO_CHAR(payment.updated_at, 'Month DD, YYYY') AS date, fees.name, fees.amount, payment.paid, payment.balance, payment.status
                    FROM payment
                    INNER JOIN fees ON fees.feeid = payment.feeid
                    WHERE payment.sid =  $1 AND id = $2`;
    const value = [sid, id];
    const res = await kneX.query(query, value);
    return res.rows;
}

const insertPay = async(sid, id, feeid, paid, balance, status) => {
    const query = "INSERT INTO payment(sid, id, feeid, paid, balance, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [sid, id, feeid, paid, balance, status];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

const checkPay = async(sid, feeid, id) => {
    const query = `SELECT * FROM payment WHERE sid = $1 AND feeid = $2 AND id = $3`;
    const value = [sid, feeid, id];
    const res = await kneX.query(query, value);
    return res.rows[0];
    
}

// Get Single object
const editPay = async(id) => {
    const query = `SELECT payment.*, fees.amount 
                    FROM payment 
                    INNER JOIN fees ON fees.feeid = payment.feeid
                    WHERE pid = $1`;
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Updating object
const updatePay = async(id, paid, balance, status, update) => {
    const query = "UPDATE payment SET paid = $1, balance = $2, status = $3, updated_at = $4 WHERE pid = $5";
    const values = [paid, balance, status, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Delete object
const deletePay = async(id) => {
    const query = "DELETE FROM payment WHERE pid = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// --------------------------------------- PAYMENT CRUD ------------------------------------------------







// --------------------------------------- ENTRY CRUD ------------------------------------------------

const getYearByTeacherID = async(id) => {
    const query = "SELECT * FROM acyear WHERE sid = $1";
    const value = [id]
    const res = await kneX.query(query, value);
    return res.rows;
}

const getTermByTeacherID = async(sid) => {
    const query = "SELECT * FROM term WHERE sid = $1";
    const value = [sid];
    const res = await kneX.query(query, value);
    return res.rows;
}

const getExamByTeacherID = async(id) => {
    const query = "SELECT * FROM exam WHERE sid = $1";
    const value = [id]
    const res = await kneX.query(query, value);
    return res.rows;
}

const getClassByTeacherID = async(sid, id) => {
    const query = `SELECT DISTINCT(class.name), class.classid FROM assignteacher
                    INNER JOIN class ON  class.classid = assignteacher.classid
                    WHERE assignteacher.sid = $1 AND assignteacher.teacherid = $2`;
    const value = [sid, id];
    const res = await kneX.query(query, value);
    return res.rows;
}

const getSubjectByTeacherID = async(sid, id, classid) => {
    const query = `SELECT DISTINCT(subject.name), subject.id as subjectid FROM assignteacher
                    INNER JOIN subject ON  subject.id = assignteacher.subjectid
                    WHERE assignteacher.sid = $1 AND assignteacher.teacherid = $2 AND assignteacher.classid = $3`;
    const value = [sid, id, classid];
    const res = await kneX.query(query, value);
    return res.rows;
}

const getStudentForEntry = async(sid, yearid, classid) => {
    const query = `SELECT id, name FROM students WHERE sid = $1 AND yearid = $2 AND classid = $3 ORDER BY name ASC`;
    const values = [sid, yearid, classid];
    const res = await kneX.query(query, values);
    return res.rows;
}


const checkResult = async(sid, data) => {
    const query = `SELECT EXISTS (
        SELECT 1 FROM results
        WHERE classid = $1 AND yearid = $2 AND sid = $3 AND termid = $4 AND typeid = $5 AND studentid = $6 AND subjectid = $7)`;
    const values = [data.selectedClass, data.yearid, sid, data.termid, data.typeid, data.id, data.selectedSubject]; // Updated classid to selectedClass
    try {
        const res = await kneX.query(query, values);
        return res.rows[0].exists;
    } catch (error) {
        console.error('Error checking record existence:', error);
    }
}

const insertResult = async(sid, grade, remarks, data) => {
    const query = `INSERT INTO results(sid, studentid, yearid, termid, typeid, classid, subjectid, score, remarks, grade) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const values = [sid, data.id, data.yearid, data.termid, data.typeid, data.selectedClass, data.selectedSubject, data.score, remarks, grade];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}

const getClassById = async(sid, data) => {
    const query = "SELECT denom FROM class WHERE classid = $1 AND sid = $2";
    const value = [data, sid];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

const getGradeByDenom = async(sid, denom) => {
    const query = "SELECT * FROM grading WHERE sid = $1 AND denom = $2";
    const value = [sid, denom];
    const res = await kneX.query(query, value);
    return res.rows;
}

// --------------------------------------- ENTRY CRUD ------------------------------------------------






// --------------------------------------- FILTER CRUD ------------------------------------------------

const getX = async(sid, yearid, termid, typeid, classid, subjectid) => {
    const query = `SELECT results.id as resultid, students.name as student, class.name as class, subject.name as subject, results.score, results.grade, results.remarks
        FROM results
        INNER JOIN students ON students.id = results.studentid
        INNER JOIN class ON class.classid = results.classid
        INNER JOIN subject ON subject.id = results.subjectid
        WHERE results.yearid = $1 AND results.termid = $2 AND results.typeid = $3
        AND results.classid = $4 AND results.subjectid = $5 AND results.sid = $6`;
    const value = [yearid, termid, typeid, classid, subjectid, sid];
    const res = await kneX.query(query, value);
    return res.rows;
}

const getScore = async(id) => {
    const query = `SELECT *
        FROM results
        WHERE id = $1`;
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Updating object
const updateScore = async(id, score, grade, remark, update) => {
    const query = "UPDATE results SET score = $1, grade = $2, remarks = $3, updated_at = $4 WHERE id = $5";
    const values = [score, grade, remark, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// --------------------------------------- FILTER CRUD ------------------------------------------------






// --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------

const getClassStudent = async(sid, teacherid) => {
    const query = `SELECT students.id, students.name, EXTRACT(YEAR FROM AGE(CAST(students.dob AS DATE))) AS age, class.name as class, students.gender, students.address, students.contact
        FROM classteacher
        INNER JOIN students ON students.classid = classteacher.classid
        INNER JOIN class ON class.classid = classteacher.classid
        WHERE classteacher.sid = $1 AND classteacher.teacherid = $2`;
    const value = [sid, teacherid];
    const res = await kneX.query(query, value);
    return res.rows;
}

const getClassNSubject = async(sid, teacherid) => {
    const query = `SELECT class.classid, class.name AS class, subject.name AS subject FROM assignteacher
        INNER JOIN class ON class.classid = assignteacher.classid
        INNER JOIN subject ON subject.id = assignteacher.subjectid
        WHERE assignteacher.sid = $1 AND assignteacher.teacherid = $2`;
    const value = [sid, teacherid];
    const res = await kneX.query(query, value);
    return res.rows;
}

const dashboardClassTeacher = async(sid, teacherid) => {
    const query = `SELECT class.name AS class FROM classteacher
        INNER JOIN class ON class.classid = classteacher.classid
        WHERE classteacher.sid = $1 AND classteacher.teacherid = $2`;
    const value = [sid, teacherid];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------






// --------------------------------------- CHART CRUD ------------------------------------------------

const getStudentByGender = async(sid, classid) => {
    const query = `SELECT COALESCE(gender, 'Other') as gender, COUNT(*) as count
      FROM students
	  WHERE classid = $1 AND sid = $2
      GROUP BY COALESCE(gender, 'Other')`;
    const values = [classid, sid];
    const res = await kneX.query(query, values);
    return res.rows;
}

const getTopStudent = async(sid, teacherid, classid) => {
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
}

const getAggScoreBySUbject = async(sid, teacherid, classid) => {
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
}

const countStudentByAssign = async(sid, teacherid, classid) => {
    const query = `SELECT COUNT(DISTINCT(students.id))
        FROM students
        INNER JOIN assignteacher ON assignteacher.classid = students.classid
        WHERE assignteacher.classid = $1 AND assignteacher.teacherid = $2 AND students.sid = $3`;
    const value = [classid, teacherid, sid];
    const res = await kneX.query(query, value);
    return res.rows;
}

// --------------------------------------- CHART CRUD ------------------------------------------------









module.exports = {
    // ----- REGISTER SECTION -----
    checkSchool,
    insertSchool,
    editSchool,
    // ----- REGISTER SECTION -----

    checkMail,
    checkTeacherMail,


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
};