const kneX = require('../database/db.jsx');

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

module.exports = {
    getSchools,
    existSchool,
    addSchool,
    checkMail
};