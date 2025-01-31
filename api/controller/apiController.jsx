const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
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
    insertMSCE,
    checkTeacher,
    insertTeacher,
    getTeacher,
    deleteTeacher,
    editTeacher,
    updateTeacher,
    checkAssignTeacher,
    insertAssignTeacher,
    getAssignTeacher,
    deleteAssignTeacher,
    checkClassTeacher,
    insertClassTeacher,
    getClassTeacher,
    deleteClassTeacher,
    getSingleTeacher,
    getTeacherClass,
    getTeacherSubject,
    checkStudent,
    insertStudent,
    getStudent,
    deleteStudent,
    getSingleStudent,
    updateStudent,
    checkFee,
    insertFee,
    getFee,
    deleteFee,
    editFee,
    updateFee,
    getPay,
    getPayee,
    checkPay,
    insertPay,
    editPay,
    updatePay,
    deletePay,
    checkTeacherMail,
    getClassByTeacherID,
    getSubjectByTeacherID,
    getExamByTeacherID,
    getYearByTeacherID,
    getTermByTeacherID,
    getStudentForEntry,
    checkResult,
    insertResult,
    getClassById,
    getGradeByDenom,
    getX,
    getScore,
    updateScore,
    getClassStudent,
    getClassNSubject,
    dashboardClassTeacher,
    getStudentByGender,
    getTopStudent,
    getAggScoreBySUbject,
    countStudentByAssign,
    editSchool,
    updateSchool,
    getReportByStudent,
    getStudentCard,
    getClassTeacher4Report,
    countResult,
    getSubjectPosition,
    realPos,
    getTeacherBySubject,
    getRemarks,
    getMSCEGrade,
    getJCEGrade,
    deleteReport,
    deleteResult,
    insertStudentHistory,
    countStudents,
    countMale,
    countFemale,
    countGenderAndClass,
    genderPercentage,
    countTeachers,
    countMaleTeachers,
    countFemaleTeachers,
    teacherGenderPercentage,
    sumPayment,
    sumPaymentThisMonth,
    getTuition,
    getOutstanding,
    PaidByDays,
    PaidByClass,
    countReports,
    OTPGeneration,
    checkPassword,
    updatePassword,
    updateSchoolWithoutLogo,
    checkAdminMail,
    checkSuperPassword,
    updateSuperPassword,
    countSchools,
    getSchools,
    insertFeatures,
    getSubscriptions,
    deleteSubscription,
    editPlan,
    updatePlan,
    getSubs,
    addSubscription,
    addBilling,
    checkSubscription,
    checkSubscriptionStatus,
    checkPaid,
    updateSubscriptionStatus,
    getSubscriptionPayments,
    updateSubStatus,
    updateBillingStatus,
    updateSchoolStatus,
    countPrivateSchools,
    countPublicSchools,
    countSubscribedSchools,
    sumAmount,
    paymentChart,
    getOTPCode,
    checkEvent,
    addEvent,
    getEvents,
    editEvent,
    updateEvent,
    deleteEvent,
    getReportByStudentMSCE,
    getStudentCardMSCE,
    addPromote,
    checkPromote,
    updatePromote,
    countSubjects,
    getStudentForPromotion,
} = require('../model/apiModel.jsx');
const jwt = require('jsonwebtoken')
const OTPgen = require('otp-generator')
require('dotenv').config()

// Supabase Configuration
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ----------------------- RANDOM PASSWORD CONTROLLER -----------------------
function generatePassword(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}
// ----------------------- RANDOM PASSWORD CONTROLLER -----------------------




// ----------------------- SCHOOL CONTROLLER -----------------------

const countXuls = async (req, res) => {
    try {
        const count = await countSchools();
        if(count) {
            res.json({
                success: true,
                count,
            });
            return;
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
const countPrivateXuls = async (req, res) => {
    try {
        const count = await countPrivateSchools();
        if(count) {
            res.json({
                success: true,
                count,
            });
            return;
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
const countPublicXuls = async (req, res) => {
    try {
        const count = await countPublicSchools();
        if(count) {
            res.json({
                success: true,
                count,
            });
            return;
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
const countSubscribedXuls = async (req, res) => {
    try {
        const count = await countSubscribedSchools();
        if(count) {
            res.json({
                success: true,
                count,
            });
            return;
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
const sumAmounts = async (req, res) => {
    try {
        const sum = await sumAmount();
        if(sum) {
            res.json({
                success: true,
                sum,
            });
            return;
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

const paymentLineChart = async (req, res) => {
    try {
        const data = await paymentChart();
        if(data) {
            res.json({
                success: true,
                data,
            });
            return;
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

const getXuls = async (req, res) => {
    try {
        const school = await getSchools();
        if(school) {
            res.json({
                success: true,
                school,
            });
            return;
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

const sendOTP = async (req, res) => {
    try {
        // Generate a test account
        let testAccount = await nodemailer.createTestAccount();

        // Create a transporter using the test account
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: testAccount.user, // Test account username
                pass: testAccount.pass, // Test account password
            },
        });

        // Message details
        let message = {
            from: '"Emmanuel Nyangazi" <ManzyN@outlook.com>',
            to: 'example@email.com',
            subject: "Account Verification",
            text: 'Test 1',
            html: "<b>Hello World</b>",
        };

        // Send the email
        let info = await transporter.sendMail(message);

        res.status(201).json({
            success: true,
            msg: 'You should receive an email',
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


const getOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await getOTPCode(email);
        if(result) {

        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        })
    }
}

// ----------------------- SCHOOL CONTROLLER -----------------------





// ----------------------- REGISTER CONTROLLER -----------------------


const signup = async (req, res) => {
    const { schoolEmail, schoolPassword, confirm } = req.body;
        try {
            if(!schoolEmail || !schoolPassword || !confirm) {
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
            const exist = await checkSchool(schoolEmail);
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
                const newSchool = await insertSchool( schoolEmail, hashedPassword );
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

const getSchool = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const details = await editSchool(sid);
        if(details) {
            res.json({
                success: true,
                details,
            });
            return;
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


const updateSchools = async (req, res) => {
    const { name, address, city, country, email, contact, slogan, type } = req.body;
    const token = req.cookies.schoolToken;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const sid = decoded.id;

        const now = new Date();
        const updatedAt = now.toLocaleString();

        // Check if a file is uploaded
        if (req.files && req.files.logo) {
            const logo = req.files.logo;

            // Retrieve the current logo URL from the database
            const currentSchool = await editSchool(sid);
            const currentLogoUrl = currentSchool.logo;

            // Delete the existing logo from Supabase if it exists
            if (currentLogoUrl) {
                const filePath = currentLogoUrl.split('/').slice(-2).join('/'); // Extract file path from URL
                const { error: deleteError } = await supabase.storage
                    .from('schoollogos')
                    .remove([filePath]);

                if (deleteError) {
                    return res.status(400).json({
                        success: false,
                        message: "Error deleting the old logo: " + deleteError.message,
                    });
                }
            }

            // Upload new logo to Supabase
            const { data, error } = await supabase.storage
                .from('schoollogos')
                .upload(`public/${logo.name}`, logo.data, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: logo.mimetype,
                });

            if (error) {
                return res.status(400).json({
                    success: false,
                    message: "Error uploading the new logo: " + error.message,
                });
            }

            // Get the public URL for the uploaded logo
            const { publicUrl } = supabase
                .storage
                .from('schoollogos')
                .getPublicUrl(data.path).data;

            // Update school with the new logo
            const update = await updateSchool(
                sid,
                name,
                address,
                city,
                country,
                email,
                contact,
                publicUrl,
                slogan,
                type,
                updatedAt
            );

            return res.json({
                success: true,
                message: update ? "School updated successfully" : "School updating failed.",
            });
        }

        // If no logo is uploaded, update the school without a logo
        const update = await updateSchoolWithoutLogo(
            sid,
            name,
            address,
            city,
            country,
            email,
            contact,
            slogan,
            type,
            updatedAt
        );

        return res.json({
            success: true,
            message: update ? "School updated successfully" : "School updating failed.",
        });
    } catch (error) {
        console.error('Error:', error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error: " + error.message,
        });
    }
};



const PasswordUpdates = async(req, res) => {
    const { current, newPassword, confirm } = req.body;
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!current || !newPassword || !confirm) {
            return res.json({
                success: false,
                message: "Please fill up all the fields",
            });
        }
        else if(newPassword !== confirm) {
            return res.json({
                success: false,
                message: "Password does not match..",
            });
        }

        const checkPass = await checkPassword(sid);
        const isMatch = await bcrypt.compare(current, checkPass.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password..",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const update = await updatePassword(hashedPassword, sid);
        if(update) {
            res.json({
                success: true,
                message: "Password updated successfully",
            });
        }
        else {
            res.json({
                success: false,
                message: "Password updating failed..",
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Internal Server Error. Please try again later.",
        });
    }
}


const PasswordSuper = async(req, res) => {
    const { current, newPassword, confirm } = req.body;

    try {
        if(!current || !newPassword || !confirm) {
            return res.json({
                success: false,
                message: "Please fill up all the fields",
            });
        }
        else if(newPassword !== confirm) {
            return res.json({
                success: false,
                message: "Password does not match..",
            });
        }

        const checkPass = await checkSuperPassword();
        const isMatch = await bcrypt.compare(current, checkPass.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password..",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const update = await updateSuperPassword(hashedPassword);
        if(update) {
            res.json({
                success: true,
                message: "Password updated successfully",
            });
        }
        else {
            res.json({
                success: false,
                message: "Password updating failed..",
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: "Internal Server Error. Please try again later.",
        });
    }
}


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
            const teacher = await checkTeacherMail(schoolEmail);
            if(!teacher) {
                // Getting ADMINISTRATOR
                const superAdmin = await checkAdminMail(schoolEmail);
                if(!superAdmin) {
                    return res.json({
                        success: false,
                        message: "Invalid email or password",
                    });
                }

                // Compare the password
                const isMatch = await bcrypt.compare(schoolPassword, superAdmin.password);
                if (!isMatch) {
                    return res.json({
                        success: false,
                        message: "Invalid email or password here",
                    });
                }

                // Create a JWT
                const superToken = jwt.sign(
                    { 
                        aid: superAdmin.aid,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' }
                );

                // Set the token as an HTTP-only cookie
                res.cookie('administratorToken', superToken, {
                    httpOnly: true,
                    sameSite: 'Lax',
                    maxAge: 60 * 60 * 1000, // 1 hour
                });

                return res.json({
                    ssuccess: true,
                    smessage: "Super administrator access granted...",
                });
            }

            // Compare the password
            if (schoolPassword !== teacher.password) {
                return res.json({
                    tsuccess: false,
                    tmessage: "Invalid email or password",
                });
            }

            const get = editSchool(teacher.sid);
            if(get.status === "Deactivated") {
                return res.json({
                    success: false,
                    message: "Please consult your admin to activate your system.",
                });
            }

            // Create a JWT
            const token = jwt.sign(
                { 
                    sid: teacher.sid,
                    id: teacher.id 
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            // Set the token as an HTTP-only cookie
            res.cookie('teacherToken', token, {
                httpOnly: true,
                sameSite: 'Lax',
                maxAge: 60 * 60 * 1000, // 1 hour
            });

            return res.json({
                tsuccess: true,
                tmessage: "Teacher logged successfully..",
            });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(schoolPassword, school.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password",
            });
        }
        else if(school.status === 'Deactivated') {
            
            // Generate OTP and save to the database
            const otpCode = (Math.floor(100000 + Math.random() * 900000)).toString();
            const otpExpiresAt = new Date(Date.now() + 10 * 60000); // Expires in 10 minutes

            const otpcheck = await OTPGeneration(otpCode, otpExpiresAt, school.email);
            if(otpcheck) {
                return res.json({
                    osuccess: true,
                    email: school.email
                });
            } else {
                return res.json({
                    success: false,
                    message: "Failed to sent your OTP code to activate account.",
                });
            }
            
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

        return res.json({
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
            //   school: decoded,
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

// Endpoint to verify authentication
const tverify = (req, res) => {
    const token = req.cookies.teacherToken;
    if (!token) {
      return res.json({ 
        success: false,
        message: 'Not authenticated. Access denied!' });
    }

    try {
      const decoder = jwt.verify(token, process.env.JWT_SECRET);
      if(decoder) {
          res.json({ 
              success: true,
              message: 'Authenticated', 
              teacher: decoder,
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

// Endpoint to verify authentication
const superVerify = (req, res) => {
    const token = req.cookies.administratorToken;
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
              administrator: decoded,
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

const tLogout = async(req, res) => {
    res.clearCookie('teacherToken');
    return res.json({ 
        success: true,
        message: 'Logged out successfully' 
    });
}

const superLogout = async(req, res) => {
    res.clearCookie('administratorToken');
    return res.json({ 
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
            return res.json({
                success: false,
                message: "Exam already exists..."
            });
        }
        else {
            // Add new exam
            const newExam = await insertExam(namer, percentage);
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
    try {
        const exam = await getExam();
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
    const { yearName, startDate, endDate } = req.body.data;

    try {
        if(!yearName || !startDate || !endDate) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        // Check if exam exists
        const checker = await checkYear(yearName, startDate, endDate);
        if(checker) {
            res.json({
                success: false,
                message: "Academic year already exists..."
            });
        }
        else {
            // Add new exam
            const newYear = await insertYear(yearName, startDate, endDate);
            if(newYear) {
                res.json({ 
                    success: true,
                    message: "Academic year added successfully",
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
    const { yearName, startDate, endDate } = req.body;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkYear(yearName, startDate, endDate);
        if(checker) {
            res.json({
                success: false,
                message: "Academic year already exists..."
            });
        }
        else {
            const update = await updateYear(id, yearName, startDate, endDate, updateAt);
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
    
    try {
        if(!subjectName || !code) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if subject exists
        const checker = await checkSubject(subjectName, code);
        if(checker) {
            res.json({
                success: false,
                message: "Subject already exists..."
            });
        }
        else {
            // Add new subject
            const newSubject = await insertSubject(subjectName, code);
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





// ----------------------- CLASS CONTROLLER -----------------------

const addClass = async (req, res) => {
    const { className, denom } = req.body.data;
    
    try {
        if(!className || !denom) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkClass(className, denom)
        if(checker) {
            res.json({
                success: false,
                message: "Class already exists..."
            });
        }
        else {
            // Add new subject
            const newClass = await insertClass(className, denom);
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
    try {
        const classs = await getClass();
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

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkClass(className, denom);
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
    const { termName, year, startDate, endDate } = req.body.data;
    
    try {
        if(!termName || !year || !startDate || !endDate) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkTerm(termName, startDate, endDate)
        if(checker) {
            res.json({
                success: false,
                message: "Term already exists..."
            });
        }
        else {
            // Add new subject
            const newTerm = await insertTerm(termName, year, startDate, endDate);
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
    try {
        const term = await getTerm();
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
    const { termName, year, startDate, endDate } = req.body;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkTerm(termName);
        if(checker) {
            res.json({
                success: false,
                message: "Term already exists..."
            });
        }
        else {
            const update = await updateTerm(id, termName, year, startDate, endDate, updateAt);
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
    
    try {
        if(!denom || !roof || !floor || !grade || !remark) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }
        else if(isNaN(roof) || isNaN(floor)) {
            return res.json({
                success: false,
                message: "'Roof' or 'Floor' must be a number"
            });
        }
        else if(Number(roof) < Number(floor)) {
            return res.json({
                success: false,
                message: "'Roof' must be a higher value than 'Floor'"
            });
        }
        else if(Number(roof) > 100 || Number(floor) > 100) {
            return res.json({
                success: false,
                message: "'Roof' or 'Floor' must not be over 100"
            });
        }

        // Check if class exists
        const checker = await checkGrade(denom, grade)
        if(checker) {
            res.json({
                success: false,
                message: "Grade already exists..."
            });
        }
        else {
            // Add new grade
            const newGrade = await insertGrade(denom, roof, floor, grade, remark);
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
    try {
        const grade = await getGrade();
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

const getMSCEGrades = async (req, res) => {
    try {
        const grade = await getMSCEGrade();
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

const getJCEGrades = async (req, res) => {
    try {
        const grade = await getJCEGrade();
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

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkGrade(denom, grade);
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
    
    try {
        if(!denom || !roof || !floor || !remark) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkJCE(denom, roof, floor)
        if(checker) {
            res.json({
                success: false,
                message: "Remark already exists..."
            });
        }
        else {
            // Add new grade
            const newJCE = await insertJCE(denom, roof, floor, remark);
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
    try {
        const jce = await getJCE();
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

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkJCE(denom, roof, floor);
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
    
    try {
        if(!denom || !roof || !floor || !remark) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkMSCE(denom, roof, floor)
        if(checker) {
            res.json({
                success: false,
                message: "Remark already exists..."
            });
        }
        else {
            // Add new grade
            const newMSCE = await insertMSCE(denom, roof, floor, remark);
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

    try {
        const msce = await getMSCE();
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

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkMSCE(denom, roof, floor);
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







// ----------------------- TEACHER CONTROLLER -----------------------

const addTeacher = async (req, res) => {
    const { name, contact, email, address, gender } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    const password = generatePassword();
    
    try {
        if(!name || !contact || !email || !address || !gender) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkTeacher(id, email, contact)
        if(checker) {
            res.json({
                success: false,
                message: "Teacher already exists..."
            });
        }
        else {
            // Add new grade
            const newTeacher = await insertTeacher(id, name, contact, email, address, gender, password);
            if(newTeacher) {
                res.json({ 
                    success: true,
                    message: "Teacher added successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Teacher adding failed..",
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

const getTeachers = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const teacher = await getTeacher(sid);
        if(teacher) {
            res.json({
                success: true,
                teacher,
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

const getSingleTeachers = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const teacherid = await getSingleTeacher(sid, id);
        if(teacherid) {
            res.json({
                success: true,
                teacherid,
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

const getTeacherClasses = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const classes = await getTeacherClass(sid, id);
        if(classes) {
            res.json({
                success: true,
                classes,
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

const getTeacherSubjects = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const subs = await getTeacherSubject(sid, id);
        if(subs) {
            res.json({
                success: true,
                subs,
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

const deleteTeachers = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteTeacher(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Teacher deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Teacher deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editTeachers = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editTeacher(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving teacher data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateTeachers = async(req, res) => {
    const { id } = req.params;
    const { name, contact, email, address, gender } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();

        const update = await updateTeacher(id, name, contact, email, address, gender, updateAt);
        if(update) {
            res.json({
                success: true,
                message: "Teacher updated successfully",
            });
        }
        else {
            res.json({
                success: false,
                message: "Teacher updating failed..",
            });
        }
        
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const TeacherCounter = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countTeachers(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const countMalesTeacher = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countMaleTeachers(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const countFemalesTeacher = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countFemaleTeachers(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const genderTeacherPercentage = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await teacherGenderPercentage(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- TEACHER CONTROLLER -----------------------






// ----------------------- ASSIGN TEACHER CONTROLLER -----------------------

const addAssignTeacher = async (req, res) => {
    const { teacherid, classid, subjectid } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!teacherid || !classid || !subjectid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkAssignTeacher(id, classid, subjectid)
        if(checker) {
            res.json({
                success: false,
                message: "Teacher already assigned..."
            });
        }
        else {
            // Add new grade
            const newTeacher = await insertAssignTeacher(id, teacherid, classid, subjectid);
            if(newTeacher) {
                res.json({ 
                    success: true,
                    message: "Teacher assigned successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Teacher assigning failed..",
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

const getAssignTeachers = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const assign = await getAssignTeacher(sid);
        if(assign) {
            res.json({
                success: true,
                assign,
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

const deleteAssignTeachers = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteAssignTeacher(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Teacher unassigned successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Teacher unassigning failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- ASSIGN TEACHER CONTROLLER -----------------------






// ----------------------- CLASS TEACHER CONTROLLER -----------------------

const addClassTeacher = async (req, res) => {
    const { teacherid, classid } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!teacherid || !classid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }

        // Check if class exists
        const checker = await checkClassTeacher(id, classid)
        if(checker) {
            res.json({
                success: false,
                message: "Teacher already assigned..."
            });
        }
        else {
            // Add new grade
            const newTeacher = await insertClassTeacher(id, teacherid, classid);
            if(newTeacher) {
                res.json({ 
                    success: true,
                    message: "Teacher assigned successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Teacher assigning failed..",
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

const getClassTeachers = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const classt = await getClassTeacher(sid);
        if(classt) {
            res.json({
                success: true,
                classt,
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

const deleteClassTeachers = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteClassTeacher(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Teacher unassigned successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Teacher unassigning failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- CLASS TEACHER CONTROLLER -----------------------






// ----------------------- STUDENT CONTROLLER -----------------------

const addStudent = async (req, res) => {
    const { studentNames, classid, yearid } = req.body.data;
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    try {
        // Validate the inputs
        if (!Array.isArray(studentNames) ||studentNames.length === 0 || !classid || !yearid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields",
            });
        }
        
        // Call the function
        const result = await checkStudent(id, studentNames);

        // Check the result
        if (result[0] === true) {
            return res.json({
                success: false,
                message: `Students are already in the database...`,
            });
        } else {
            // Insert into Student table
            const newStudent = await insertStudent(studentNames);
            if(newStudent) {
                const newHistory = await insertStudentHistory(id, yearid, classid, newStudent);
                return res.json({
                    success: true,
                    message: 'Students added succesfully...!',
                    newHistory,
                })
            }
            else {
                return res.json({
                    success: false,
                    message: 'An unknown error occurred...'
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
};

const getSingleStudents = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const studentid = await getSingleStudent(sid, id);
        if(studentid) {
            res.json({
                success: true,
                studentid,
            });
            return;
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


const getStudents = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const student = await getStudent(sid);
        if(student) {
            res.json({
                success: true,
                student,
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

const deleteStudents = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteStudent(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Student deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Student deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const updateStudents = async(req, res) => {
    const { id } = req.params;
    const { student, contact, email, address, gender, dob } = req.body;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();

        const update = await updateStudent(id, student, contact, email, address, gender, dob, updateAt);
        if(update) {
            res.json({
                success: true,
                message: "Information updated successfully",
            });
        }
        else {
            res.json({
                success: false,
                message: "Information updating failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const StudentCounter = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countStudents(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const countMales = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countMale(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const countFemales = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countFemale(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const countGenderForClass = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countGenderAndClass(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const genderByPercentage = async(req, res) => { 
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await genderPercentage(sid);
        if(counter) {
            res.json({
                success: true,
                counter,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An unknown error occurred...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}
// ----------------------- STUDENT CONTROLLER -----------------------





// ----------------------- FEE CONTROLLER -----------------------

const addFee = async (req, res) => {
    const { name, amount, description} = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    try {
        if(!name || !amount || !description) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }
        else if(isNaN(amount)) {
            return res.json({
                success: false,
                message: "Amount must be a number.."
            });
        }

        // Check if class exists
        const checker = await checkFee(id, name)
        if(checker) {
            res.json({
                success: false,
                message: "Fee already exists..."
            });
        }
        else {
            // Add new grade
            const newFee = await insertFee(id, name, amount, description);
            if(newFee) {
                res.json({ 
                    success: true,
                    message: "Fee added successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Fee adding failed..",
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

const getFees = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const fee = await getFee(sid);
        if(fee) {
            res.json({
                success: true,
                fee,
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

const deleteFees = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteFee(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Fee deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Fee deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editFees = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editFee(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving fee data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateFees = async(req, res) => {
    const { id } = req.params;
    const { name, amount, description } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists
        const checker = await checkFee(sid, name);
        if(checker) {
            res.json({
                success: false,
                message: "Fee already exists..."
            });
        }
        else {
            const update = await updateFee(id, name, amount, description, updateAt);
            if(update) {
                res.json({
                    success: true,
                    message: "Fee updated successfully",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Fee updating failed..",
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

// ----------------------- FEE CONTROLLER -----------------------





// ----------------------- PAYMENT CONTROLLER -----------------------

const getPays = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const pay = await getPay(sid);
        if(pay) {
            res.json({
                success: true,
                pay,
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

const getPayees = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const payee = await getPayee(sid, id);
        if(payee) {
            res.json({
                success: true,
                payee,
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

const addPay = async (req, res) => {
    const { feeid, id, feeamount } = req.body;
    const { paid, term } = req.body.data;

    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    
    try {
        if(!feeid || !feeamount || !id || !paid || !term) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });

        }
        else if(isNaN(paid)) {
            return res.json({
                success: false,
                message: "Amount must be a number.."
            });
        }
        else if(Number(paid) > Number(feeamount)) {
            return res.json({
                success: false,
                message: "You have paid more than what is required.."
            });
        }

        const balance = Number(feeamount) - Number(paid);
        const status = Number(paid) < Number(feeamount) ? 'ongoing' : 'complete';

        // Check if class exists
        const checker = await checkPay(sid, feeid, id, term);
        if(checker) {
            res.json({
                success: false,
                message: "Payment was already made..."
            });
        }
        else {
            // Add new grade
            const newPay = await insertPay(sid, id, feeid, paid, balance, status, term);
            if(newPay) {
                res.json({ 
                    success: true,
                    message: "Payment of "+ paid +" was successful",
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Payment has failed..",
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

const editPays = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editPay(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving pay data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updatePays = async(req, res) => {
    const { id } = req.params;
    const { paid, amount, term } = req.body;

    const balance = Number(amount) - Number(paid);
    const status = Number(paid) < Number(amount) ? 'ongoing' : 'complete';

    if(!amount || !id || !paid || !term) {
        return res.json({
            success: false,
            message: "Please fill up all the fields"
        });

    }
    else if(isNaN(paid)) {
        return res.json({
            success: false,
            message: "Amount must be a number.."
        });
    }
    else if(Number(paid) > Number(amount)) {
        return res.json({
            success: false,
            message: "You have paid more than what is required.."
        });
    }

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        // Check if exam exists

        const update = await updatePay(id, paid, balance, status, updateAt, term);
        if(update) {
            res.json({
                success: true,
                message: "Payment has been updated successfully",
            });
        }
        else {
            res.json({
                success: false,
                message: "Payment updating failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const deletePays = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deletePay(id);
        if(del) {
            res.json({ 
                success: true,
                message: "Payment deleted successfully",
            });
        }
        else {
            res.json({
                successs: false,
                message: "Payment deletion failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const sumPayments = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const sum = await sumPayment(sid);
        if(sum) {
            return res.json({
                success: true,
                sum,
            });
        }
        else {
            return res.json({
                success: false,
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const sumPayDisMonth = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const sum = await sumPaymentThisMonth(sid);
        if(sum) {
            return res.json({
                success: true,
                sum,
            });
        }
        else {
            return res.json({
                success: false,
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const getTuitions = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const tuition = await getTuition(sid);
        if(tuition) {
            return res.json({
                success: true,
                tuition,
            });
        }
        else {
            return res.json({
                success: false,
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const getOutstandings = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const outstand = await getOutstanding(sid);
        if(outstand) {
            return res.json({
                success: true,
                outstand,
            });
        }
        else {
            return res.json({
                success: false,
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const PaidByDaysPerTerm = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const paid = await PaidByDays(sid);
        if(paid) {
            return res.json({
                success: true,
                paid,
            });
        }
        else {
            return res.json({
                success: false,
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const PaidByClasses = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const paid = await PaidByClass(sid);
        if(paid) {
            return res.json({
                success: true,
                paid,
            });
        }
        else {
            return res.json({
                success: false,
                message: 'No records found...'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- PAYMENT CONTROLLER -----------------------







// ----------------------- ENTRY CONTROLLER -----------------------

const getExamsTeacher = async (req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        const exam = await getExamByTeacherID(sid);
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

const getYearsTeacher = async (req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        const yt = await getYearByTeacherID(sid);
        if(yt) {
            return res.json({
                success: true,
                yt,
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

const getTermsTeacher = async (req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        const tt = await getTermByTeacherID(sid);
        if(tt) {
            return res.json({
                success: true,
                tt,
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

const getClassesTeacher = async (req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const teacherID = decoded.id;
    try {
        const ct = await getClassByTeacherID(sid, teacherID);
        if(ct) {
            res.json({
                success: true,
                ct,
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

const getSubjectsTeacher = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const teacherID = decoded.id;
    try {
        const st = await getSubjectByTeacherID(sid, teacherID, id);
        if(st) {
            res.json({
                success: true,
                st,
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

const getStudentFilter = async (req, res) => {
    const { selectedClass } = req.body;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        if(!selectedClass) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }
        const filter = await getStudentForEntry(sid, selectedClass);
        if(filter) {
            if(filter.length === 0) {
                return res.json({
                    success: false,
                    message: 'Students not found!'
                });
            }
            res.json({
                success: true,
                filter,
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

const insertResults = async(req, res) => {
    const studentData = req.body;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;

    // Get Today's Date
    const todayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Get the Term as of today
    const term = await getTerm();
    if (term && term.length > 0) {
        const start = new Date(term[0].start_date); // Convert to Date object
        const end = new Date(term[0].end_date);    // Convert to Date object
        const tdate = new Date(todayDate());              // Ensure todayDate is a Date object

        if (tdate >= start && tdate <= end) {
            const termid = term[0].id;

            let allResults = [];
            try {
                for (const entry of studentData) {
                    if(!entry.selectedClass || !entry.typeid || !entry.id || !entry.selectedSubject) {
                        return res.json({
                            success: false,
                            message: "Please fill up all the fields"
                        });
                    }
                    else if(Number(entry.score) > 100) {
                        return res.json({
                            success: false,
                            message: "Score can not be over 100.."
                        });
                    }
                    else {
                        const check = await checkResult(sid, termid, entry);
                        if(check) {
                            allResults.push({
                                success: false,
                                message: `Result for student ${entry.id} already exists.`,
                            });
                        }
                        else {
                            const venom = 'JCE';
                            const carnage = 'MSCE';
                            const getClass = await getClassById(entry.selectedClass);
                            if(getClass) {
                                if(getClass.denom === venom) {
                                    const getDenom = await getGradeByDenom(venom);
                                    if(getDenom) {
                                        let grade = '';  // Declare grade and remarks outside the loop
                                        let remarks = '';

                                        for(const gr of getDenom) {
                                            if(Number(entry.score) >= gr.floor && Number(entry.score) <= gr.roof) {
                                                grade = gr.grade;  // Assign values to grade and remarks
                                                remarks = gr.remark;
                                                break;  // Break the loop once the grade is found
                                            }
                                        }

                                        if (grade && remarks) {
                                            // Insert Results
                                            const add = await insertResult(sid, termid, grade, remarks, entry);
                                            if(add) {
                                                allResults.push({
                                                    success: true,
                                                    message: `Result for student ${entry.id} inserted successfully.`,
                                                });
                                            }
                                            else {
                                                allResults.push({
                                                    success: false,
                                                    message: `Failed to insert result for student ${entry.id}.`,
                                                });
                                            }
                                        } else {
                                            allResults.push({
                                                success: false,
                                                message: `No valid grade found for score of student ${entry.id}.`,
                                            });
                                        }
                                    }
                                }
                                else {
                                    const getDenom = await getGradeByDenom(carnage);
                                    if(getDenom) {
                                        let grade = '';  // Declare grade and remarks outside the loop
                                        let remarks = '';

                                        for(const gr of getDenom) {
                                            if(Number(entry.score) >= gr.floor && Number(entry.score) <= gr.roof) {
                                                grade = gr.grade;  // Assign values to grade and remarks
                                                remarks = gr.remark;
                                                break;  // Break the loop once the grade is found
                                            }
                                        }

                                        if (grade && remarks) {
                                            // Insert Results
                                            const add = await insertResult(sid, termid, grade, remarks, entry);
                                            if(add) {
                                                allResults.push({
                                                    success: true,
                                                    message: `Result for student ${entry.id} inserted successfully.`,
                                                });
                                            }
                                            else {
                                                allResults.push({
                                                    success: false,
                                                    message: `Failed to insert result for student ${entry.id}.`,
                                                });
                                            }
                                        } else {
                                            allResults.push({
                                                success: false,
                                                message: `No valid grade found for score of student ${entry.id}.`,
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (allResults.length > 0) {
                    const anySuccess = allResults.some(result => result.success === true);

                    if (anySuccess) {
                        return res.json({
                            success: true,
                            message: `Results for ${allResults.length} students inserted successfully.`,
                        });
                    } else {
                        return res.json({
                            success: false,
                            message: `Results for ${allResults.length} students already exist or failed.`,
                        });
                    }
                } else {
                    // If no entries were processed
                    return res.json({
                        success: false,
                        message: "No results were processed.",
                    });
                }
            } catch (error) {
                return res.status(500).json({
                    message: "Internal Server Error. Please try again later.",
                    error: error.message,
                });
            }
        }
    } else {
        console.error("No term data available");
    }
}

// ----------------------- ENTRY CONTROLLER -----------------------




// ----------------------- FILTER CONTROLLER -----------------------

const getXs = async(req, res) => {
    const { yearid, termid, typeid, selectedClass, selectedSubject } = req.body;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        if(!yearid || !termid || !typeid || !selectedSubject || !selectedClass) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }
        const x = await getX(sid, yearid, termid, typeid, selectedClass, selectedSubject);
        if(x) {
            if(x.length === 0) {
                return res.json({
                    success: false,
                    message: 'Students not found!'
                });
            }
            res.json({
                success: true,
                x,
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

const getScores = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await getScore(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving score data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const deleteResults = async(req, res) => {
    const { yearid, termid, typeid, selectedClass, selectedSubject } = req.body;
    const token = req.cookies.teacherToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;

    try {
        if(!yearid || !termid || !typeid || !selectedClass || !selectedSubject) {
            return res.json({
                success: false,
                message: "Please filter first then delete the result"
            });
        }

        // Fecthing data
        const deleteRep = await deleteResult(yearid, termid, typeid, selectedClass, selectedSubject, sid);
        if(deleteRep) {
            return res.json({
                success: true,
                message: 'Result deleted successfully'
            });
        }
        return res.json({
            success: false,
            message: 'No records found'
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateScores = async(req, res) => {
    const { id } = req.params;
    const { score } = req.body.data;
    const { classID } = req.body;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;

    const now = new Date();
    const updateAt = now.toLocaleString();

    try {
        if(!score) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }
        else if(Number(score) > 100) {
            return res.json({
                success: false,
                message: "Score can not be over 100.."
            });
        }
        else {
            const venom = 'JCE';
            const carnage = 'MSCE';
            const getClass = await getClassById(sid, classID);
            if(getClass) {
                if(getClass.denom === venom) {
                    const getDenom = await getGradeByDenom(sid, venom);
                    if(getDenom) {
                        let grade = ''; 
                        let remarks = '';

                        for(const gr of getDenom) {
                            if(Number(score) >= gr.floor && Number(score) <= gr.roof) {
                                grade = gr.grade;
                                remarks = gr.remark;
                                break;
                            }
                        }

                        if (grade && remarks) {
                            // Insert Results
                            const add = await updateScore(id, score, grade, remarks, updateAt);
                            if(add) {
                                return res.json({
                                    success: true,
                                    message: `Result for student update successfully.`,
                                });
                            }
                            else {
                                return res.json({
                                    success: false,
                                    message: `Failed to update result for student.`,
                                });
                            }
                        } else {
                            return res.json({
                                success: false,
                                message: `No valid grade found for score of student.`,
                            });
                        }
                    }
                }
                else {
                    const getDenom = await getGradeByDenom(sid, carnage);
                    if(getDenom) {
                        let grade = '';
                        let remarks = '';

                        for(const gr of getDenom) {
                            if(Number(score) >= gr.floor && Number(score) <= gr.roof) {
                                grade = gr.grade;  // Assign values to grade and remarks
                                remarks = gr.remark;
                                break;  // Break the loop once the grade is found
                            }
                        }

                        if (grade && remarks) {
                            // Insert Results
                            const add = await updateScore(sid, score, grade, remarks, updateAt);
                            if(add) {
                                return res.json({
                                    success: true,
                                    message: `Result for student update successfully.`,
                                });
                            }
                            else {
                                return res.json({
                                    success: false,
                                    message: `Failed to update result for student .`,
                                });
                            }
                        } else {
                            return res.json({
                                success: false,
                                message: `No valid grade found for score of student ${id}.`,
                            });
                        }
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- FILTER CONTROLLER -----------------------






// ----------------------- TEACHER CLASS CONTROLLER -----------------------
const getClassStudents = async(req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const teacherid = decoded.id;
    try {
        const cs = await getClassStudent(sid, teacherid)
        if(cs) {
            if(cs.length === 0) {
                return res.json({
                    success: false,
                    message: 'Students not found!'
                });
            }
            res.json({
                success: true,
                cs,
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

const getSingleStud = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        const studentid = await getSingleStudent(sid, id);
        if(studentid) {
            res.json({
                success: true,
                studentid,
            });
            return;
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

const getFinancial = async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        const payee = await getPayee(sid, id);
        if(payee) {
            res.json({
                success: true,
                payee,
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
// ----------------------- TEACHER CLASS CONTROLLER -----------------------






// ----------------------- TEACHER DASHBOARD CONTROLLER -----------------------
const getSingleTeacher4Dashboard = async (req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const id = decoded.id;
    try {
        const teacher = await getSingleTeacher(sid, id);
        if(teacher) {
            res.json({
                success: true,
                teacher,
            });
            return;
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

const getClassNSubjects = async (req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const id = decoded.id;
    try {
        const CnS = await getClassNSubject(sid, id);
        if(CnS) {
            res.json({
                success: true,
                CnS,
            });
            return;
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

const dashboardClassTeachers = async (req, res) => {
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const id = decoded.id;
    try {
        const dct = await dashboardClassTeacher(sid, id);
        if(dct) {
            res.json({
                success: true,
                dct,
            });
            return;
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
// ----------------------- TEACHER DASHBOARD CONTROLLER -----------------------





// ----------------------- CHART CONTROLLER -----------------------

const getGenderPieTeacher = async (req, res) => {
    const {id} = req.params;
    const token = req.cookies.teacherToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    try {
        const gender = await getStudentByGender(sid, id);
        if(gender) {
            res.json({
                success: true,
                gender,
            });
            return;
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

const getTopStudents = async (req, res) => {
    const token = req.cookies.teacherToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const teacherid = decoded.id;

    try {
        const CnS = await getClassNSubject(sid, teacherid);
        const topStudents = []; // Collect top students here
        
        if (CnS) {
            for (const item of CnS) {
                const classid = item.classid;
                const top = await getTopStudent(sid, teacherid, classid); // Make sure to await if it's async
                
                topStudents.push({
                    top: top || 'No top student' // Handle no top student case
                });
            }

            // Send the response once after collecting all data
            res.json({
                success: true,
                topStudents
            });
        } else {
            res.json({
                success: false,
                message: "No classes or subjects found"
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
};

const getAverageScoreBySubject = async (req, res) => {
    const token = req.cookies.teacherToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const teacherid = decoded.id;

    try {
        const CnS = await getClassNSubject(sid, teacherid);
        const topSubject = [];
        
        if (CnS) {
            for (const item of CnS) {
                const classid = item.classid;
                const subject = await getAggScoreBySUbject(sid, teacherid, classid); // Make sure to await if it's async
                
                topSubject.push({
                    subject: subject || 'No subject found' // Handle no top student case
                });
            }

            // Send the response once after collecting all data
            res.json({
                success: true,
                topSubject
            });
        } else {
            res.json({
                success: false,
                message: "No classes or subjects found"
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
}

const countStudentByTeacher = async (req, res) => {
    const token = req.cookies.teacherToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.sid;
    const teacherid = decoded.id;

    try {
        const CnS = await getClassNSubject(sid, teacherid);
        const counter = [];
        
        if (CnS) {
            for (const item of CnS) {
                const classid = item.classid;
                const count = await countStudentByAssign(sid, teacherid, classid);
                
                counter.push({
                    count: count || 'No subject found' // Handle no top student case
                });
            }

            // Send the response once after collecting all data
            res.json({
                success: true,
                counter
            });
        } else {
            res.json({
                success: false,
                message: "No classes or subjects found"
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
            error: error.message
        });
    }
}


// ----------------------- CHART CONTROLLER -----------------------





// ----------------------- REPORT CONTROLLER -----------------------

const getReport = async (req, res) => {
    const { termid, typeid, classid} = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!termid || !typeid || !classid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        const venom = 'JCE';
        const getClass = await getClassById(classid);

        if(getClass) {
            if(getClass.denom === venom) {
                const codes = await getReportByStudent(sid, termid, typeid, classid);
                if(codes) {
                    // Transform data to be used in frontend
                    const subjectsSet = new Set();
                    const studentsMap = new Map();

                    codes.forEach(row => {
                        // Collect unique subjects
                        subjectsSet.add(row.subject_name);

                        // Collect student data with scores
                        if (!studentsMap.has(row.studentid)) {
                            studentsMap.set(row.studentid, {
                                student_id: row.studentid,
                                rank: row.rank,
                                agg: row.aggregate,
                                student_name: row.studentname,
                                grade: row.grade,
                                remarks: row.remarks,
                                score: {},
                            });
                        }
                        studentsMap.get(row.studentid).score[row.subject_name] = row.score;
                    });

                    const subjects = Array.from(subjectsSet); // Convert to array for easier use on frontend
                    const students = Array.from(studentsMap.values());

                    return res.json({ subjects, students });
                }
                return res.json({
                    success: false,
                    message: 'No records found'
                });
            }
            else {
                const codes = await getReportByStudentMSCE(sid, termid, typeid, classid);
                if(codes) {
                    // Transform data to be used in frontend
                    const subjectsSet = new Set();
                    const studentsMap = new Map();

                    codes.forEach(row => {
                        // Collect unique subjects
                        subjectsSet.add(row.subject_name);

                        // Collect student data with scores
                        if (!studentsMap.has(row.studentid)) {
                            studentsMap.set(row.studentid, {
                                student_id: row.studentid,
                                rank: row.rank,
                                agg: row.aggregate,
                                student_name: row.studentname,
                                grade: row.grade,
                                remarks: row.remarks,
                                score: {},
                            });
                        }
                        studentsMap.get(row.studentid).score[row.subject_name] = row.score;
                    });

                    const subjects = Array.from(subjectsSet); // Convert to array for easier use on frontend
                    const students = Array.from(studentsMap.values());

                    return res.json({ subjects, students });
                }
                return res.json({
                    success: false,
                    message: 'No records found'
                });
            }
        }
        
        return res.json({
            success: false,
            message: 'No records found'
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const insertPromotion = async (req, res) => {
    const { termid, typeid, classid } = req.body.data;
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    if (!termid || !typeid || !classid) {
        return res.json({
            success: false,
            message: 'Please fill in the blank fields',
        });
    }

    try {
        // Get End Of Term

        const venom = 'JCE';
        const getClass = await getClassById(classid);

        if (!getClass) {
            return res.json({ success: false, message: 'No records found' });
        }

        const getReport = getClass.denom === venom ? getReportByStudent : getReportByStudentMSCE;
        const codes = await getReport(sid, termid, typeid, classid);

        if (!codes || codes.length === 0) {
            return res.json({ success: false, message: 'No records found' });
        }

        // Transform data to be used in frontend
        const studentsMap = new Map();
        codes.forEach(row => {
            if (!studentsMap.has(row.studentid)) {
                studentsMap.set(row.studentid, {
                    student_id: row.studentid,
                    rank: row.rank,
                    agg: row.aggregate,
                });
            }
        });

        const students = Array.from(studentsMap.values());

        if (!students.length) {
            return res.status(400).json({ message: 'Invalid students array' });
        }

        let remark = '';
        const studentIDs = students.map(student => student.student_id);
        const aggregate = students.map(student => student.agg);
        const count = await countSubjects(termid, typeid, classid, studentIDs, sid);
        
        if (count[0].count < 6) {
            remark = 'Failed';
        } else {
            if(getClass.denom === venom ? count[0].count >= 6 : Math.max(...aggregate.map(Number)) <= 48) {
                remark = 'Passed';
            }
            else {
                remark = 'Failed'
            }
        }

        const exists = await checkPromote(sid, termid, typeid, classid, studentIDs);
        
        if (exists[0] === true) {
            const updatePromises = students.map(student =>
                updatePromote(
                    sid,
                    termid,
                    typeid,
                    classid,
                    parseInt(student.student_id, 10),
                    parseInt(student.agg, 10),
                    remark,
                    parseInt(student.rank, 10)
                )
            );

            await Promise.all(updatePromises);
            return res.status(201).json({ message: 'Students promotion updated successfully' });
        } else {
            const insertPromises = students.map(student =>
                addPromote(
                    sid,
                    termid,
                    typeid,
                    classid,
                    parseInt(student.student_id, 10),
                    parseInt(student.agg, 10),
                    remark,
                    parseInt(student.rank, 10)
                )
            );
    
            await Promise.all(insertPromises);
            return res.status(201).json({ message: 'Students promoted successfully' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error. Please try again later.',
            error: error.message,
        });
    }
};

const getStudentPromos = async (req, res) => {
    const { data } = req.body;
    
    if(!data) {
        res.json({
            success: false,
            message: 'Please select a valid class',
        })
    }

    try {
        const info = await getStudentForPromotion(data);
        if(info) {
            res.json({
                success: true,
                info,
            })
        }
    } catch (error) {
        res.json({
            success: false,
            message: 'Internal Server Error. Please try again later.',
            error: error.message,
        })
    }
}

const getStudentReport = async (req, res) => {
    const { termid, typeid, classid, id} = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!termid || !typeid || !classid || !id) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        const venom = 'JCE';
        const getClass = await getClassById(classid);

        if(getClass) {
            if(getClass.denom === venom) {
                // Fecthing data
                const studentInfo = await getStudentCard(sid, termid, typeid, classid, id);
                if(studentInfo) {
                    return res.json({
                        success: true,
                        studentInfo
                    });
                }
                return res.json({
                    success: false,
                    message: 'No records found'
                });
            }
            else {
                // Fecthing data
                const studentInfo = await getStudentCardMSCE(sid, termid, typeid, classid, id);
                if(studentInfo) {
                    return res.json({
                        success: true,
                        studentInfo
                    });
                }
                return res.json({
                    success: false,
                    message: 'No records found'
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

const getCount = async (req, res) => {
    const { termid, typeid, classid} = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!termid || !typeid || !classid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        // Fecthing data
        const count = await countResult(sid, termid, typeid, classid);
        if(count) {
            return res.json({
                success: true,
                count
            });
        }
        return res.json({
            success: false,
            message: 'No records found'
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const getCT4Report = async (req, res) => {
    const { classid} = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!classid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        // Fecthing data
        const ct = await getClassTeacher4Report(classid, sid);
        if(ct) {
            return res.json({
                success: true,
                ct
            });
        }
        return res.json({
            success: false,
            message: 'No records found'
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const getSubjectPos = async (req, res) => {
    const { termid, typeid, classid, id } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!termid || !typeid || !classid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        // Fecthing data
        const pos = await getSubjectPosition(termid, typeid, classid, sid, id);
        if(pos) {
            return res.json({
                success: true,
                pos
            });
        }
        return res.json({
            success: false,
            message: 'No records found'
        });
    } catch (error) {
        res.status(500).json({    
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const realPosition = async (req, res) => {
    const { termid, typeid, classid, id } = req.body;
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if (!termid || !typeid || !classid) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        // Fetch data for each subjectid
        const positions = await Promise.all(
            id.map(async (subjectId) => {
                const result = await realPos(termid, typeid, classid, sid, subjectId);
                return result;
            })
        );

        const validPositions = positions.filter(Boolean);

        if (validPositions.length > 0) {
            return res.json({
                success: true,
                position: validPositions
            });
        }

        return res.json({
            success: false,
            message: 'No records found'
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const getTByS = async (req, res) => {
    const { id } = req.body;
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {

        // Fetch data for each subjectid
        const teacher = await Promise.all(
            id.map(async (subjectId) => {
                const result = await getTeacherBySubject(subjectId, sid);
                return result;
            })
        );

        const teacherName = teacher.filter(Boolean);

        if (teacherName.length > 0) {
            return res.json({
                success: true,
                info: teacherName
            });
        }

        return res.json({
            success: false,
            message: 'No records found'
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const getRemarksByClassID = async (req, res) => {
    const { id } = req.body;
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    const classid = Number(id);
    try {
        if(!id) {
            return res.json({        
                success: false,
                message: "Please fill up all the fields"
            });
        }

        // Fecthing data
        const getDenom = await getClassById(sid, classid);
        if(getDenom) {
            const denom = getDenom.denom;
            const remarks = await getRemarks(denom, sid);
            if(remarks) {
                return res.json({
                    success: true,
                    remarks
                });
            }
            return res.json({
                success: false,
                message: 'No records found'
            });
        }
    } catch (error) {
        res.status(500).json({    
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const deleteReports = async(req, res) => {
    const { yearid, termid, typeid, classid } = req.body;
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!yearid || !termid || !typeid || !classid) {
            return res.json({
                success: false,
                message: "Please filter first then delete the report"
            });
        }

        // Fecthing data
        const deleteRep = await deleteReport(yearid, termid, typeid, classid, sid);
        if(deleteRep) {
            return res.json({
                success: true,
                message: 'Report deleted successfully'
            });
        }
        return res.json({
            success: false,
            message: 'No records found'
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}


const countTermlyReports = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const counter = await countReports(sid);
        if(counter) {
            return res.json({
                success: true,
                counter,
            });
        }
        else {
            return res.json({
                success: false,
                message: 'No records found'
            })
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- REPORT CONTROLLER -----------------------





// ----------------------- EVENT CONTROLLER -----------------------

const insertEvent = async (req, res) => {
    const { title, date, time, location, description } = req.body.data;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        if(!title || !date || !time || !location || !description) {
            return res.json({
                success: false,
                message: 'Please fill in the required fields'
            });
        }

        // Check Event if exists
        const checker = await checkEvent(sid, title, date);
        if(checker) {
            res.json({
                success: false,
                message: 'Event already exists in the system'
            });
        }

        // Insert New Event
        const insert = await addEvent(sid, title, date, time, location, description);
        if(insert) {
            res.json({
                success: true,
                message: 'Event added succesfully'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.',
            error: error.message,
        });
    }
}

const getEvent = async(req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        const event = await getEvents(sid);
        if(event) {
            return res.json({
                event,
            })
        }
        else {
            return res.json({
                success: false,
                message: 'Failed fetching events'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.',
            error: error.message,
        });
    }
}

const editEvents = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editEvent(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving event data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateEvents = async(req, res) => {
    const { id } = req.params;
    const { title, date, time, location, description } = req.body;

    try {
        // Check if events exists
        const update = await updateEvent(id, title, date, time, location, description);
        if(update) {
            res.json({
                success: true,
                message: "Event updated successfully",
            });
        }
        else {
            res.json({
                success: false,
                message: "Event updating failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const deleteEvents = async(req, res) => {
    const { id } = req.params;
    try {
        const del = await deleteEvent(id);
        if(del) {
            res.json({
                success: true,
                message: 'Deleted successfully'
            })
        }
        else {
            res.json({
                success: false,
                message: 'Deletion failed'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.',
            error: error.message,
        });
    }
}

// ----------------------- EVENT CONTROLLER -----------------------






// ----------------------- SUPER ADMIN CONTROLLER -----------------------

const addSubscriptions = async(req, res) => {
    const { name, price, features} = req.body;

    try { 
        if(!name || !price || !features) {
            return res.json({
                success: false,
                message: "Please fill up all the fields"
            });
        }

        const feature = JSON.stringify(features)

        const insert = await insertFeatures(name, price, feature);
        if(insert) {
            return res.json({
                success: true,
                message: 'Subscription added successfully'
            });
        }
        else {
            return res.json({
                success: false,
                message: 'Failed to add subscription'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: 'Internal Server Error. Please try again later.'
        })
    }
}

const gotSubscriptions = async(req, res) => {
    try {
        const plan = await getSubscriptions();
        if(plan) {
            return res.json({
                success: true,
                plan,
            });
        }
        else {
            return res.json({
                success: false,
                message: 'No records found'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            error: 'Internal Server Error. Please try again later.'
        })
    }
}

const deletePlan = async(req, res) => {
    const { id } = req.params;

    try {
        const del = await deleteSubscription(id);
        if(del) {
            res.json({
                success: true,
                message: 'Subscription deleted successfully'
            });
        }
        else {
            res.json({
                success: false,
                message: 'Deletion failed'
            });
        }
    }
    catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const editPlans = async(req, res) => {
    const { id } = req.params;
    try {
        const edit = await editPlan(id);
        if(edit) {
            res.json({ 
                success: true,
                edit,
            });
        }
        else {
            res.json({
                success: false,
                message: "Retrieving subscription data failed..",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updatePlans = async(req, res) => {
    const { id } = req.params;
    const { name, price, features } = req.body;

    try {
        const now = new Date();
        const updateAt = now.toLocaleString();
        
        const feature = JSON.stringify(features)
        console.log(feature);

        const update = await updatePlan(id, name, price, feature, updateAt);
        if(update) {
            res.json({
                success: true,
                message: "Subscription Plan updated successfully",
            });
        }
        else {
            res.json({
                success: false,
                message: "Subscription plan updating failed..",
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

// ----------------------- SUPER ADMIN CONTROLLER -----------------------



// ----------------------- SUBSCRIPTION CONTROLLER -----------------------

const gotSubs = async (req, res) => {
    try {
        const { plan } = req.params; // Extract 'plan' from req.params

        const data = await getSubs(plan); // Fetch data from the model
        if (data.length === 0) {
            return res.status(404).json({ message: 'No subscription plan found.' });
        }

        res.status(200).json(data); // Send the data as a JSON response
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const insertSubscription = async (req, res) => {
    const { subscriptionName, grandTotal, billingCycle } = req.body;
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    const status = 'inactive';
    const billing_status = 'pending';
    const amount = Number(parseFloat(grandTotal).toFixed(0));

    // Calculate expiry time (24 hours from now)
    const expiryTime = new Date();
    expiryTime.setHours(expiryTime.getHours() + 24);

    const response = await getSubs(subscriptionName);
    if(response) {
        const planID = response[0].id;

        // Check Subscription 
        const checker = await checkSubscription(sid);
        if(checker) {
            res.json({
                success: false,
                message: 'You already have an active subscription'
            })
        }
        else {

            // Insert Subscription
            const result = await addSubscription(sid, planID, status, billingCycle);
            if(result) {
                const subscriptionID = result[0].id;

            //     // Insert Billing
                const billing = await addBilling(subscriptionID, amount, billing_status, expiryTime);
                if(billing) {
                    return res.json({
                        success: true,
                        message: 'Your subscription is set to Pending waiting for confirmation.'
                    });
                }
                else {
                    return res.json({
                        success: false,
                        message: 'Failed to add subscription'
                    });
                }
            }
        }
    }
}

const checkSubStatus = async (req, res) => {
    const token = req.cookies.schoolToken
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    try {
        const status = await checkSubscriptionStatus(sid);
        if(status) {
            return res.json({
                success: true,
                status,
            });
        }
        else {
            return res.json({
                success: false,
                message: 'No records found'
            });
        }
    } catch (error) {
        res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const checkPaidStatus = async (req, res) => {
    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    const status = 'active'

    try {
        const checker = await checkPaid(sid, status);
        if(checker) {
            res.json({
                success: true,
            });
        }
        else {
            res.json({
                success: false,
                message: 'No active subscription found'
            });
        }
    } catch (error) {
        return res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateSuspended = async (req, res) => {
    const { status } = req.body;

    const token = req.cookies.schoolToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    try {
        const update = await updateSubscriptionStatus(status, sid);
        if(update) {
            res.json({
                success: true,
            });
        }
        else {
            res.json({
                success: false,
            })
        }
    } catch (error) {
        return res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const gotSubscriptionPayments = async (req, res) => {
    try {
        const result = await getSubscriptionPayments();
        if(result) {
            res.json({
                success: true,
                result,
            });
        }
        else {
            res.json({
                success: false,
                message: 'Failed to fetch payments',
            })
        }
    } catch (error) {
        return res.json({
            message: "Internal Server Error. Please try again later.",
            error: error.message,
        });
    }
}

const updateStatuses = async (req, res) => {
    const { status, bill } = req.body;
    const { id } = req.params;

    try {
        // Validate input
        if (!id || !status || !bill) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: id, status, or bill',
            });
        }

        // Update subscription status
        const resultOne = await updateSubStatus(id, bill);
        if (!resultOne) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update subscription status',
            });
        }

        // Update billing status
        const resultTwo = await updateBillingStatus(id, status);
        if (!resultTwo) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update billing status',
            });
        }

        // Success response
        return res.json({
            success: true,
            message: 'Payment was successful',
        });

    } catch (error) {
        console.error('Error updating statuses:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.',
            error: error.message,
        });
    }
};

const updateSchoolStatuses = async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        // Validate input
        if (!id || !status) {
            return res.status(400).json({
                success: false,
                message: 'Missing required parameters: id, status',
            });
        }

        // Update subscription status
        const resultOne = await updateSchoolStatus(id, status);
        if (!resultOne) {
            return res.status(500).json({
                success: false,
                message: 'Failed to update school status',
            });
        }

        // Success response
        return res.json({
            success: true,
            message: 'School has been activated successfully',
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error. Please try again later.',
            error: error.message,
        });
    }
};


// ----------------------- SUBSCRIPTION CONTROLLER -----------------------




module.exports = { 
    // ----- SCHOOL EXPORTS ------
    countXuls,
    countPrivateXuls,
    countPublicXuls,
    countSubscribedXuls,
    sumAmounts,
    paymentLineChart,
    getXuls,
    sendOTP,
    // ----- SCHOOL EXPORTS ------

    // ----- LOGIN EXPORTS ------
    login, 
    verify,
    tverify,
    superVerify,
    tLogout,
    superLogout,
    Logout,
    // ----- LOGIN EXPORTS ------

    // ----- REGISTER EXPORTS ------
    signup, 
    generateOTP, 
    verifyOTP, 
    createResetSession, 
    resetPassword, 
    verifyUser,
    updateSchools,
    PasswordUpdates,
    PasswordSuper,
    // ----- REGISTER EXPORTS ------

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
    getJCEGrades,
    getMSCEGrades,
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




     // ----- TEACHER EXPORTS ------
     addTeacher,
     getTeachers,
     getSingleTeachers,
     getTeacherClasses,
     getTeacherSubjects,
     deleteTeachers,
     editTeachers,
     updateTeachers,
     TeacherCounter,
     countMalesTeacher,
     countFemalesTeacher,
     genderTeacherPercentage,
     // ----- TEACHER EXPORTS ------




    // ----- ASSIGN TEACHER EXPORTS ------
    addAssignTeacher,
    getAssignTeachers,
    deleteAssignTeachers,
    // ----- ASSIGN TEACHER EXPORTS ------





    // ----- CLASS TEACHER EXPORTS ------
    addClassTeacher,
    getClassTeachers,
    deleteClassTeachers,
    // ----- CLASS TEACHER EXPORTS ------



    // ----- STUDENT EXPORTS ------
    addStudent,
    getStudents,
    getSingleStudents,
    deleteStudents,
    updateStudents,
    StudentCounter,
    countMales,
    countFemales,
    countGenderForClass,
    genderByPercentage,
    // ----- STUDENT EXPORTS ------




    // ----- FEE EXPORTS ------
    addFee,
    getFees,
    deleteFees,
    editFees,
    updateFees,
    // ----- FEE EXPORTS ------





    // ----- PAYMENT EXPORTS ------
    getPays,
    getPayees,
    addPay,
    editPays,
    updatePays,
    deletePays,
    sumPayments,
    sumPayDisMonth,
    getTuitions,
    getOutstandings,
    PaidByDaysPerTerm,
    PaidByClasses,
    // ----- PAYMENT EXPORTS ------




    // ----- ENTRY EXPORTS ------
    getClassesTeacher,
    getSubjectsTeacher,
    getExamsTeacher,
    getTermsTeacher,
    getStudentFilter,
    getYearsTeacher,
    insertResults,
    // ----- ENTRY EXPORTS ------




    // ----- FILTER EXPORTS ------
    getXs,
    getScores,
    updateScores,
    deleteResults,
    // ----- FILTER EXPORTS ------



    // ----- TEACHER STUDENT EXPORTS ------
    getClassStudents,
    getSingleStud,
    getFinancial,
    // ----- TEACHER STUDENT EXPORTS ------



    // ----- TEACHER DASHBOARD EXPORTS ------
    getSingleTeacher4Dashboard,
    getClassNSubjects,
    dashboardClassTeachers,
    // ----- TEACHER DASHBOARD EXPORTS ------


    // ----- CHART EXPORTS ------
    getGenderPieTeacher,
    getTopStudents,
    getAverageScoreBySubject,
    countStudentByTeacher,
    // ----- CHART EXPORTS ------
 
 
    // ----- ADMIN PROFILE EXPORTS ------
    getSchool,
    // ----- ADMIN PROFILE EXPORTS ------



    // ----- REPORT EXPORTS ------
    getReport,
    insertPromotion,
    getStudentPromos,
    getStudentReport,
    getCT4Report,
    getCount,
    getSubjectPos,
    realPosition,
    getTByS,
    getRemarksByClassID,
    deleteReports,
    countTermlyReports,
    // ----- REPORT EXPORTS ------




    // ----- EVENTS EXPORTS ------
    insertEvent,
    getEvent,
    editEvents,
    updateEvents,
    deleteEvents,
    // ----- EVENTS EXPORTS ------



    // ----- SUPER ADMIN EXPORTS ------
    addSubscriptions,
    gotSubscriptions,
    deletePlan,
    editPlans,
    updatePlans,
    // ----- SUPER ADMIN EXPORTS ------



    // ----- SUBSCRIPTION EXPORTS ------
    gotSubs,
    insertSubscription,
    checkSubStatus,
    checkPaidStatus,
    updateSuspended,
    gotSubscriptionPayments,
    updateStatuses,
    updateSchoolStatuses,
    // ----- SUBSCRIPTION EXPORTS ------
};