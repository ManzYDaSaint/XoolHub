const bcrypt = require('bcryptjs');
const { addSchool, getSchools, existSchool, checkMail } = require('../model/authModel.jsx');
const jwt = require('jsonwebtoken')
const OTPgen = require('otp-generator')
require('dotenv').config()

// Regitser new school at localhost:5000/api/auth/signup
const signup = async (req, res) => {
    const { schoolName, schoolEmail, schoolPhone, schoolPassword } = req.body;

        try {
            // Check if the school already exists
            const schoolExists = await existSchool(schoolName);
            if (schoolExists) {
                return res.status(400).send({
                    msg: "School already exists..."
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(schoolPassword, 10);

            // Add the new school
            const newSchool = await addSchool({
                schoolName,
                schoolEmail,
                schoolPhone,
                schoolPassword: hashedPassword
            });

            res.status(201).send({
                msg: "School registered successfully",
                school: newSchool
            });
        } catch (error) {
            res.status(500).send({
                error: "Internal Server Error"
            });
        }
    };


// Verify User
const verifyUser = async(req, res) => {
    const { schoolEmail } = req.body;

    console.log(schoolEmail);
    try {
        const checker = await checkMail({schoolEmail});
        if (!checker) {
            return res.status(400).send({
                msg: "Authentication failed",
                checker
            });
        }
        res.status(200).send({
            msg: "User verified successfully..",
            email: checker.schoolemail,
        });
    } catch (error) {
        res.status(500).send({
            error: "Verify User Internal Server Error"
        });
    }
}


// Login at localhost:5000/api/auth/login
const login = async(req, res) => {
    const { schoolEmail, schoolPassword } = req.body;

    try {
        // Find the school by email
        const school = await checkMail(schoolEmail);
        if (!school) {
            return res.status(400).send({
                msg: "Invalid email or password",
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(schoolPassword, school.schoolpassword);
        if (!isMatch) {
            return res.status(400).send({
                msg: "Invalid email or password 2",
            });
        }

        // Create a JWT
        const token = jwt.sign(
            { schoolId: school.id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).send({
            msg: "Login successfully..",
            email: school.schoolemail,
            token,
        });
    } catch (error) {
        res.status(500).send({
            error: "Internal Server Error"
        });
    }
}

// GET all the schools through localhost:5000/api/auth/schools
const getAllSchools = async (req, res, next) => {
    try {
        const Schools = await getSchools();
        res.status(201).json({
            success: true,
            data: Schools,
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            error: error.message
        })
    }
}

// Update individual school at localhost:5000/api/auth/updateschool
const updateSchool = async (req, res, next) => {
    res.json('Update school');
}

// Generate OTP at localhost:5000/api/auth/generateOTP
const generateOTP = async (req, res, next) => {
    req.app.locals.OTP = OTPgen.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false});
    res.status(201).send({ code: req.app.locals.OTP })
}

// Verify OTP at localhost:5000/api/auth/verifyOTP
const verifyOTP = async (req, res, next) => {
    const { code } = req.query;
    if(parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;
        req.app.locals.resetSession = true;
        return res.status(201).send({
            msg: "Verify Successfully..."
        });
    }
}

// Create Reset Session at localhost:5000/api/auth/createSession
const createResetSession = async (req, res, next) => {
    res.json('Create Reset Session');
}


// Reset Password at localhost:5000/api/auth/resetPassword
const resetPassword = async (req, res, next) => {
    res.json('Reset Password');
}



module.exports = { signup, getAllSchools, login, updateSchool, generateOTP, verifyOTP, createResetSession, resetPassword, verifyUser };