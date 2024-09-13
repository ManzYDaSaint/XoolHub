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
    insertSchool, 
    checkClass,
    insertClass,
    getClass,
    deleteClass,
    editClass,
    updateClass,
    checkTerm,
    insertTerm,
    getTerm,
    deleteTerm,
    editTerm,
    updateTerm,
    checkGrade,
    insertGrade,
    getGrade,
    deleteGrade,
    editGrade,
    updateGrade,
    checkJCE,
    insertJCE,
    getJCE,
    deleteJCE,
    editJCE,
    updateJCE,
    updateMSCE,
    checkMSCE,
    editMSCE,
    deleteMSCE,
    getMSCE,
    insertMSCE
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
        const checker = await checkExam(id, namer);
        if(checker) {
            return res.json({
                success: false,
                message: "Exam already exists..."
            });
        }
        else {
            // Add new exam
            const newExam = await insertExam(id, namer, percentage);
            if(newExam) {
                return res.json({ 
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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const exam = await getExam(sid);
        if(exam) {
            return res.json({
                success: true,
                exam,
            });
        }
        else {
            return res.json({
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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkExam(sid, namer);
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
        const checker = await checkYear(id, yearName);
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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const year = await getYear(sid);
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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkYear(sid, yearName);
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
        const checker = await checkSubject(id, subjectName);
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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const subject = await getSubject(sid);
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
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkSubject(sid, subjectName);
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





// ----------------------- CLASS CONTROLLER -----------------------

const addClass = async (req, res) => {
    const { className, denom } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!className || !denom) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkClass(id, className)
        if(checker) {
            res.json({
                success: false,
                message: "Class already exists..."
            });
        }
        else {
            // Add new subject
            const newClass = await insertClass(id, className, denom);
            if(newClass) {
                res.json({ 
                    success: true,
                    message: "Class added successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Class adding failed..",
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

const getClasses = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const classs = await getClass(sid);
        if(classs) {
            res.json({
                success: true,
                classs,
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

const deleteClasses = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteClass(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Class deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Class deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editClasses = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editClass(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving class data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateClasses = async(req, res) => {
    const { id } = req.params;
    const { className, denom } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkClass(sid, className);
        if(checker) {
            res.json({
                success: false,
                message: "Class already exists..."
            });
        }
        else {
            const update = await updateClass(id, className, denom, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Class updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Class updating failed..",
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

// ----------------------- CLASS CONTROLLER -----------------------





// ----------------------- TERM CONTROLLER -----------------------

const addTerm = async (req, res) => {
    const { termName } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!termName) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkTerm(id, termName)
        if(checker) {
            res.json({
                success: false,
                message: "Term already exists..."
            });
        }
        else {
            // Add new subject
            const newTerm = await insertTerm(id, termName);
            if(newTerm) {
                res.json({ 
                    success: true,
                    message: "Term added successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Term adding failed..",
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

const getTerms = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const term = await getTerm(sid);
        if(term) {
            res.json({
                success: true,
                term,
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

const deleteTerms = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteTerm(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Term deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Term deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editTerms = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editTerm(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving term data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateTerms = async(req, res) => {
    const { id } = req.params;
    const { termName } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkTerm(sid, termName);
        if(checker) {
            res.json({
                success: false,
                message: "Term already exists..."
            });
        }
        else {
            const update = await updateTerm(id, termName, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Term updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Term updating failed..",
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

// ----------------------- TERM CONTROLLER -----------------------






// ----------------------- GRADE CONTROLLER -----------------------

const addGrade = async (req, res) => {
    const { denom, roof, floor, grade, remark } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!denom || !roof || !floor || !grade || !remark) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkGrade(id, denom, grade)
        if(checker) {
            res.json({
                success: false,
                message: "Grade already exists..."
            });
        }
        else {
            // Add new grade
            const newGrade = await insertGrade(id, denom, roof, floor, grade, remark);
            if(newGrade) {
                res.json({ 
                    success: true,
                    message: "Grade added successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Grade adding failed..",
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

const getGrades = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const grade = await getGrade(sid);
        if(grade) {
            res.json({
                success: true,
                grade,
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

const deleteGrades = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteGrade(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Grade deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Grade deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editGrades = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editGrade(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving grade data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateGrades = async(req, res) => {
    const { id } = req.params;
    const { denom, roof, floor, grade, remark } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkGrade(sid, denom, grade);
        if(checker) {
            res.json({
                success: false,
                message: "Grade already exists..."
            });
        }
        else {
            const update = await updateGrade(id, denom, roof, floor, grade, remark, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Grade updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Grade updating failed..",
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

// ----------------------- GRADE CONTROLLER -----------------------







// ----------------------- JCE CONTROLLER -----------------------

const addJCE = async (req, res) => {
    const { denom, roof, floor, remark } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!denom || !roof || !floor || !remark) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkJCE(id, denom, roof, floor)
        if(checker) {
            res.json({
                success: false,
                message: "Remark already exists..."
            });
        }
        else {
            // Add new grade
            const newJCE = await insertJCE(id, denom, roof, floor, remark);
            if(newJCE) {
                res.json({ 
                    success: true,
                    message: "Remark added successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Remark adding failed..",
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

const getJCEs = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const jce = await getJCE(sid);
        if(jce) {
            res.json({
                success: true,
                jce,
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

const deleteJCEs = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteJCE(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Remark deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Remark deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editJCEs = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editJCE(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving remark data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateJCEs = async(req, res) => {
    const { id } = req.params;
    const { denom, roof, floor, remark } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkJCE(sid, denom, roof, floor);
        if(checker) {
            res.json({
                success: false,
                message: "Remark already exists..."
            });
        }
        else {
            const update = await updateJCE(id, denom, roof, floor, remark, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Remark updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Remark updating failed..",
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

// ----------------------- JCE CONTROLLER -----------------------





// ----------------------- MSCE CONTROLLER -----------------------

const addMSCE = async (req, res) => {
    const { denom, roof, floor, remark } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!denom || !roof || !floor || !remark) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkMSCE(id, denom, roof, floor)
        if(checker) {
            res.json({
                success: false,
                message: "Remark already exists..."
            });
        }
        else {
            // Add new grade
            const newMSCE = await insertMSCE(id, denom, roof, floor, remark);
            if(newMSCE) {
                res.json({ 
                    success: true,
                    message: "Remark added successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Remark adding failed..",
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

const getMSCEs = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const msce = await getMSCE(sid);
        if(msce) {
            res.json({
                success: true,
                msce,
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

const deleteMSCEs = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteMSCE(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Remark deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Remark deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editMSCEs = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editMSCE(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving remark data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateMSCEs = async(req, res) => {
    const { id } = req.params;
    const { denom, roof, floor, remark } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkMSCE(sid, denom, roof, floor);
        if(checker) {
            res.json({
                success: false,
                message: "Remark already exists..."
            });
        }
        else {
            const update = await updateMSCE(id, denom, roof, floor, remark, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Remark updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Remark updating failed..",
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

// ----------------------- MSCE CONTROLLER -----------------------




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



    // ----- CLASS EXPORTS ------
    addClass,
    getClasses,
    deleteClasses,
    editClasses,
    updateClasses,
    // ----- CLASS EXPORTS ------


    // ----- TERM EXPORTS ------
    addTerm,
    getTerms,
    deleteTerms,
    editTerms,
    updateTerms,
    // ----- TERM EXPORTS ------



    // ----- GRADE EXPORTS ------
    addGrade,
    getGrades,
    deleteGrades,
    editGrades,
    updateGrades,
    // ----- GRADE EXPORTS ------




    // ----- JCE EXPORTS ------
    addJCE,
    getJCEs,
    deleteJCEs,
    editJCEs,
    updateJCEs,
    // ----- JCE EXPORTS ------





    // ----- MSCE EXPORTS ------
    addMSCE,
    getMSCEs,
    deleteMSCEs,
    editMSCEs,
    updateMSCEs,
    // ----- MSCE EXPORTS ------
};