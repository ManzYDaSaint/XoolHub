const bcrypt = require('bcryptjs');
const {
    checkMail, 
    checkExam, 
    insertExam, 
    getExam, 
    deleteExam, 
    updateExam, 
    editExam, 
    checkYear, 
    insertYear, 
    getYear, 
    deleteYear, 
    editYear, 
    updateYear, 
    checkSubject, 
    insertSubject, 
    getSubject, 
    deleteSubject, 
    editSubject, 
    updateSubject, 
    checkSchool, 
    insertSchool 
} = require('../model/apiModel.jsx');
const jwt = require('jsonwebtoken')
const OTPgen = require('otp-generator')
require('dotenv').config()




// ----------------------- REGISTER CONTROLLER -----------------------


const signup = async (req, res) => {
    const { schoolName, schoolEmail, schoolContact, schoolPassword, confirm } = req.body;
        try {
            if(!schoolName || !schoolEmail || !schoolContact || !schoolPassword || !confirm) {
                return res.json({
                    success: false,
                    message: "Please fill up all the fields",
                });
            }
            else if(schoolPassword !== confirm) {
                return res.json({
                    success: false,
                    message: "Password does not match..",
                });
            }

            // Check if the school already exists
            const exist = await checkSchool(schoolName);
            if (exist) {
                return res.json({
                    success: false,
                    message: "School already exists..."
                });
            }
            else {
                // Hash the password
                const hashedPassword = await bcrypt.hash(schoolPassword, 10);

                // Add the new school
                const newSchool = await insertSchool( schoolName, schoolEmail, schoolContact, hashedPassword );
                if(newSchool) {
                    res.json({
                        success: true,
                        message: "School registered successfully",
                    });
                }
                else {
                    res.json({
                        success: false,
                        message: "School registration failed",
                    });
                }
            }  
        } catch (error) {
            res.json({
                success: false,
                message: "Internal Server Error. Please try again later.",
            });
        }
};


// ----------------------- REGISTER CONTROLLER -----------------------




// ----------------------- LOGIN CONTROLLER -----------------------

const login = async(req, res) => {
    const { schoolEmail, schoolPassword } = req.body;

    try {
        if(!schoolEmail || !schoolPassword) {
            return res.json({
                success: false,
                message: "Please fill in up the fields"
            })
        }

        // Find the school by email
        const school = await checkMail(schoolEmail);
        if (!school) {
            return res.json({
                success: false,
                message: "Invalid email or password 1",
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(schoolPassword, school.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password 2",
            });
        }

        // Create a JWT
        const token = jwt.sign(
            { id: school.sid },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set the token as an HTTP-only cookie
        res.cookie('schoolToken', token, {
            httpOnly: true,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000, // 1 hour
        });

        res.json({
            success: true,
            message: "Login successfully..",
        });
    } catch (error) {
        res.status(500).send({
            error: "Internal Server Error"
        });
    }
}

// Endpoint to verify authentication
const verify = (req, res) => {
    const token = req.cookies.schoolToken;
    if (!token) {
      return res.json({ 
        success: false,
        message: 'Not authenticated. Access denied!' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded) {
          res.json({ 
              success: true,
              message: 'Authenticated', 
              school: decoded,
            });
            return;
        }
        res.json({ 
            success: false,
            message: 'Access denied', 
          });
    } 
    catch (err) {
      res.json({ 
        success: false,
        message: 'Invalid token' 
        });
    }
};

const Logout = async(req, res) => {
    res.clearCookie('schoolToken');
    res.json({ 
        success: true,
        message: 'Logged out successfully' 
    });
}

// ----------------------- LOGIN CONTROLLER -----------------------





// Verify User
const verifyUser = async(req, res) => {
    const { schoolEmail } = req.body;

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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

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
            const newExam = await insertExam(id, namer, percentage);
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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

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
            const newYear = await insertYear(id, yearName);
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




// ----------------------- SUBJECT CONTROLLER -----------------------

const addSubject = async (req, res) => {
    const { subjectName, code } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!subjectName || !code) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if subject exists
        const checker = await checkSubject(subjectName);
        if(checker) {
            res.json({
                success: false,
                message: "Subject already exists..."
            });
        }
        else {
            // Add new subject
            const newSubject = await insertSubject(id, subjectName, code);
            if(newSubject) {
                res.json({ 
                    success: true,
                    message: "Subject added successfully",
                    newSubject,
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Subject adding failed..",
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

const getSubjects = async (req, res) => {
    try {
        const subject = await getSubject();
        if(subject) {
            res.json({
                success: true,
                subject,
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

const deleteSubjects = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteSubject(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Subject deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Subject deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editSubjects = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editSubject(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving subject data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateSubjects = async(req, res) => {
    const { id } = req.params;
    const { subjectName, code } = req.body;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkSubject(subjectName);
        if(checker) {
            res.json({
                success: false,
                message: "Subject already exists..."
            });
        }
        else {
            const update = await updateSubject(id, subjectName, code, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Subject updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Subject updating failed..",
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

// ----------------------- SUBJECT CONTROLLER -----------------------



module.exports = { 
    // ----- LOGIN EXPORTS ------
    login, 
    verify,
    Logout,
    // ----- LOGIN EXPORTS ------

    // ----- REGISTER EXPORTS ------
    signup, 
    getAllSchools, 
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



    // ----- SUBJECT EXPORTS ------
    addSubject,
    getSubjects,
    deleteSubjects,
    editSubjects,
    updateSubjects,
    // ----- SUBJECT EXPORTS ------
};