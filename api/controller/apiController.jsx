const bcrypt = require('bcryptjs');
const { addSchool, getSchools, existSchool, checkMail, checkExam, insertExam, getExam, deleteExam, updateExam, editExam, checkYear, insertYear, getYear, deleteYear, editYear, updateYear } = require('../model/apiModel.jsx');
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




// ----------------------- EXAM CONTROLLER -----------------------

const addExam = async (req, res) => {
    const { namer, percentage } = req.body.data;
    try {
        if(!namer || !percentage) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }else if(isNaN(percentage)) {
            return res.json({
                success: false,
                message: "Percentage field must contain a valid number"
            });
        }

        // Check if exam exists
        const checker = await checkExam(namer);
        if(checker) {
            res.json({
                success: false,
                message: "Exam already exists..."
            });
        }
        else {
            // Add new exam
            const newExam = await insertExam(namer, percentage);
            if(newExam) {
                res.json({ 
                    success: true,
                    message: "Exam added successfully",
                    newExam,
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Exam adding failed..",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const getExams = async (req, res) => {
    try {
        const exam = await getExam();
        if(exam) {
            res.json({
                success: true,
                exam,
            });
        }
        else {
            res.json({
                success: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const deleteExams = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteExam(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Exam deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Exam deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editExams = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editExam(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving examination data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateExams = async(req, res) => {
    const { id } = req.params;
    const { namer, percentage } = req.body;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkExam(namer);
        if(checker) {
            res.json({
                success: false,
                message: "Exam already exists..."
            });
        }
        else {
            const update = await updateExam(id, namer, percentage, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Exam updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Exam updating failed..",
                });
            }
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- EXAM CONTROLLER -----------------------




// ----------------------- YEAR CONTROLLER -----------------------

const addYear = async (req, res) => {
    const { yearName } = req.body.data;
    try {
        if(!yearName) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if exam exists
        const checker = await checkYear(yearName);
        if(checker) {
            res.json({
                success: false,
                message: "Academic year already exists..."
            });
        }
        else {
            // Add new exam
            const newYear = await insertYear(yearName);
            if(newYear) {
                res.json({ 
                    success: true,
                    message: "Academic year added successfully",
                    newYear,
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Academic year adding failed..",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const getYears = async (req, res) => {
    try {
        const year = await getYear();
        if(year) {
            res.json({
                success: true,
                year,
            });
        }
        else {
            res.json({
                success: false,
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

const deleteYears = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteYear(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Academic year deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Academic year deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editYears = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editYear(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving academic year data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateYears = async(req, res) => {
    const { id } = req.params;
    const { yearName } = req.body;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkYear(yearName);
        if(checker) {
            res.json({
                success: false,
                message: "Academic year already exists..."
            });
        }
        else {
            const update = await updateYear(id, yearName, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Academic year updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Academic year updating failed..",
                });
            }
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- YEAR CONTROLLER -----------------------



module.exports = { 
    signup, 
    getAllSchools, 
    login, 
    updateSchool, 
    generateOTP, 
    verifyOTP, 
    createResetSession, 
    resetPassword, 
    verifyUser,

    // ----- EXAM EXPORTS ------
    addExam,
    getExams,
    deleteExams,
    editExams,
    updateExams,
    // ----- EXAM EXPORTS ------


    // ----- YEAR EXPORTS ------
    addYear,
    getYears,
    deleteYears,
    editYears,
    updateYears,
    // ----- YEAR EXPORTS ------
};