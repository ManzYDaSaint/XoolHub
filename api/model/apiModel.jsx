const kneX = require('../database/db.jsx');

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
    const query = "DELETE FROM acyear WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating academic year
const updateYear = async(id, name, update) => {
    const query = "UPDATE acyear SET name = $1, updated_at = $2 WHERE id = $3";
    const values = [name, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single academic year
const editYear = async(id) => {
    const query = "SELECT id, name FROM acyear WHERE id = $1";
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
const checkClass = async(id, name) => {
    const query = "SELECT name FROM class WHERE name = $1 AND sid = $2";
    const value = [name, id];
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
    const query = "DELETE FROM class WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
}

// Updating object
const updateClass = async(id, name, denom, update) => {
    const query = "UPDATE class SET name = $1, denom = $2, updated_at = $3 WHERE id = $4";
    const values = [name, denom, update, id]
    const res = await kneX.query(query, values);
    return res.rows;
}

// Get Single object
const editClass = async(id) => {
    const query = "SELECT id, name FROM class WHERE id = $1";
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


// Delete object
const deleteTeacher = async(id) => {
    const query = "DELETE FROM teachers WHERE id = $1";
    const value = [id];
    const res = await kneX.query(query, value);
    return res.rows.length < 1;
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
    INNER JOIN class ON class.id=assignteacher.classid
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
    INNER JOIN class ON class.id=classteacher.classid
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








module.exports = {
    // ----- REGISTER SECTION -----
    checkSchool,
    insertSchool,
    editSchool,
    // ----- REGISTER SECTION -----

    checkMail,


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
};