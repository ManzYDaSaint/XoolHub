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
const checkExam = async(name) => {
    const query = "SELECT name FROM exam WHERE name = $1";
    const value = [name];
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
const getExam = async() => {
    const query = "SELECT * FROM exam";
    const res = await kneX.query(query);
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
const checkYear = async(name) => {
    const query = "SELECT name FROM acyear WHERE name = $1";
    const value = [name];
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
const getYear = async() => {
    const query = "SELECT * FROM acyear";
    const res = await kneX.query(query);
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
const checkSubject = async(name) => {
    const query = "SELECT name FROM subject WHERE name = $1";
    const value = [name];
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
const getSubject = async() => {
    const query = "SELECT * FROM subject";
    const res = await kneX.query(query);
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
};