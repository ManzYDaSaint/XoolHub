const kneX = require('../database/db.jsx');

// --------------------------------------- SCHOOL CRUD ------------------------------------------------
// add a new school
const addSchool = async ({ schoolName, schoolEmail, schoolPhone, schoolPassword }) => {
    const query = `
    INSERT INTO Schools (schoolName, schoolEmail, schoolPhone, schoolPassword)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;
    const values = [schoolName, schoolEmail, schoolPhone, schoolPassword];
    const res = await kneX.query(query, values);
    return res.rows[0];
};


// Check if a school already exists in the database
const existSchool = async(schoolName) => {
    const query = 'SELECT schoolName FROM Schools WHERE schoolName = $1';
    const values = [schoolName];
    const res = await kneX.query(query, values);
    return res.rows.length > 0;
}


// Login
const checkMail = async(schoolEmail) => {
    const query = 'SELECT * FROM Schools WHERE schoolEmail = $1';
    const values = [schoolEmail];
    const res = await kneX.query(query, values);
    return res.rows[0];
}


// Getiing all the schools
const getSchools = async() => {
    const query = 'SELECT * FROM Schools';
    const res = await kneX.query(query);
    return res.rows;
}
// --------------------------------------- SCHOOL CRUD ------------------------------------------------







// --------------------------------------- EXAM CRUD ------------------------------------------------

// Check if Examination Type exists
const checkExam = async(name) => {
    const query = "SELECT name FROM exam WHERE name = $1";
    const value = [name];
    const res = await kneX.query(query, value);
    return res.rows[0];
}

// Add new examination type
const insertExam = async(name, percentage) => {
    const query = "INSERT INTO exam(name, percentage) VALUES ($1, $2) RETURNING *";
    const values = [name, percentage];
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
const insertYear = async(name) => {
    const query = "INSERT INTO acyear(name) VALUES ($1) RETURNING *";
    const values = [name];
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

module.exports = {
    getSchools,
    existSchool,
    addSchool,
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
};