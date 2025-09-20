// APi Controller start here

const bcrypt = require("bcryptjs");
require("dotenv").config();
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
const _ = require("lodash");
const { pipeline } = require("@xenova/transformers");
const { sendSuperAdminNotification, sendSchoolApprovalEmail } = require("../emails/paymentNotificationEmail");

const { v4: uuidv4 } = require("uuid");
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
  upperPromote,
  bestStudents,
  worstStudents,
  avSubByClass,
  checkTeacherPassword,
  updateTeacherPassword,
  checkSubscribe,
  addSubscribe,
  addFeedback,
  getFeedbackByRating,
  getFeedback,
  checkSubsByID,
  countAllTeachers,
  countAllStudents,
  getAdmin,
  updateAdmin,
  addContacts,
  OTPVerification,
  addExpense,
  updateExpense,
  getExpense,
  deleteExpense,
  editExpense,
  sumExpense,
  countExpense,
  monthlyAverage,
  getTransactions,
  getLineChart,
  getFeeBalance,
  getStudentNameByContact,
  updateStatusExpense,
  cancelSubscription,
  cancelBilling,
  checkSubToCancel,
  getPlanByID,
  checkAttendance,
  addAttendance,
  checkDisciplinary,
  insertDisciplinary,
  getoDisciplinary,
  getoDisciplinaryById,
  updatedDisciplinary,
  deletedDisciplinary,
  countDisciplinary,
  statusDisciplinary,
  severityDisciplinary,
  categoryDisciplinary,
  recent30DaysDisciplinary,
  statStudents,
  statCountry,
  // Password Reset Functions
  findUserByEmail,
  storePasswordResetToken,
  validatePasswordResetToken,
  updateUserPassword,
  storePasswordHistory,
  markPasswordResetTokenAsUsed,
  getPasswordResetTokenByEmail,
  cleanupExpiredTokens,
  getPasswordResetStats,
  getSubscriptionByID,
  checkResentSubscriptionStatus,
  getPilotProgramBySchoolId
} = require("../model/apiModel.js");
const jwt = require("jsonwebtoken");

// Supabase Configuration
const { createClient } = require("@supabase/supabase-js");
const buildStudentContent = require("./context/aiStudent.js");
// const { sendParentNotification } = require('./waNotify.js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);





// ---------------------------------- DISCIPLINARY CONTROLLER ----------------------------------

const addDisciplinary = async (req, res) => {
  try {
    const token = req.cookies.schoolToken || req.cookies.teacherToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id || decoded.sid;

    const {
      studentId,
      category,
      actionTaken,
      remarks,
      severityLevel,
      incidentDate,
      status,
      evidence,
      witnesses,
      parentNotified,
      followUpDate,
      followUpNotes
    } = req.body;

    // Validate required fields
    if (!studentId || !category || !actionTaken || !severityLevel || !remarks || !incidentDate || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
    }

    // Check if student exists and belongs to the school
    const studentCheck = await checkDisciplinary(studentId, schoolId);

    if (studentCheck.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student not found or not enrolled in this school"
      });
    }

    // Insert disciplinary record
    const result = await insertDisciplinary(studentId, category, actionTaken, severityLevel, incidentDate, status, remarks, evidence, witnesses, parentNotified, followUpDate, followUpNotes);

    res.status(201).json({
      success: true,
      message: "Disciplinary record added successfully",
      recordId: result.insertId
    });

  } catch (error) {
    console.error('Add disciplinary error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get all disciplinary records for a school
const getDisciplinary = async (req, res) => {
  try {
    const token = req.cookies.schoolToken || req.cookies.teacherToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id || decoded.sid;

    // Get disciplinary records with related information
    const records = await getoDisciplinary(schoolId);
    if (!records) {
      return res.status(404).json({
        success: false,
        message: "No disciplinary records found"
      });
    }

    res.json({
      success: true,
      disciplinary: records
    });

  } catch (error) {
    console.error('Get disciplinary error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get disciplinary record by ID
const getDisciplinaryById = async (req, res) => {
  try {
    const token = req.cookies.schoolToken || req.cookies.teacherToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id || decoded.sid;
    const { id } = req.params;

    const records = await getoDisciplinaryById(id, schoolId);

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Disciplinary record not found"
      });
    }

    res.json({
      success: true,
      record: records[0]
    });

  } catch (error) {
    console.error('Get disciplinary by ID error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Update disciplinary record
const updateDisciplinary = async (req, res) => {
  try {
    const token = req.cookies.schoolToken || req.cookies.teacherToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id || decoded.sid;
    const { id } = req.params;

    // Check if record exists and belongs to the school
    const existingRecord = await getoDisciplinaryById(id, schoolId);

    if (existingRecord.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Disciplinary record not found"
      });
    }

    const oldValues = existingRecord[0];
    const updateData = req.body;

    // Update the record
    const [result] = await updatedDisciplinary(updateData || oldValues, id, schoolId);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "failed to update disciplinary record"
      });
    }

    res.json({
      success: true,
      message: "Disciplinary record updated successfully"
    });

  } catch (error) {
    console.error('Update disciplinary error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Delete disciplinary record
const deleteDisciplinary = async (req, res) => {
  try {
    const token = req.cookies.schoolToken || req.cookies.teacherToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id || decoded.sid;
    const { id } = req.params;

    // Check if record exists and belongs to the school
    const existingRecord = await getoDisciplinaryById(id, schoolId);

    if (existingRecord.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Disciplinary record not found"
      });
    }

    // Delete the record (cascade will handle related records)
    const result = await deletedDisciplinary(id);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "failed to delete disciplinary record"
      });
    }

    res.json({
      success: true,
      message: "Disciplinary record deleted successfully"
    });

  } catch (error) {
    console.error('Delete disciplinary error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get disciplinary statistics
const getDisciplinaryStats = async (req, res) => {
  try {
    const token = req.cookies.schoolToken || req.cookies.teacherToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id || decoded.sid;

    // Get various statistics
    const totalRecords = await countDisciplinary(schoolId);

    const statusStats = await statusDisciplinary(schoolId);

    const severityStats = await severityDisciplinary(schoolId);

    const categoryStats = await categoryDisciplinary(schoolId);

    const recentRecords = await recent30DaysDisciplinary(schoolId);

    res.json({
      success: true,
      stats: {
        total: totalRecords[0].total,
        byStatus: statusStats,
        bySeverity: severityStats,
        byCategory: categoryStats,
        recent30Days: recentRecords[0].count
      }
    });

  } catch (error) {
    console.error('Get disciplinary stats error:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// ---------------------------------- DISCIPLINARY CONTROLLER ----------------------------------




// ---------------------------------- ATTENDANCE CONTROLLER ----------------------------------

const insertAttendance = async (req, res) => {
  const { date, attendance, absentReasons = {} } = req.body;
  const attendanceDate = new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD
  const studentIds = Object.keys(attendance);

  try {
    // 1. Check if attendance already exists for those students
    const existing = await checkAttendance(attendanceDate, studentIds);

    if (existing.length > 0) {
      res.json({
        success: false,
        message: `Attendance already exists for ${existing.length} student(s) on ${attendanceDate}`,
      });
      return;
    }

    // 2. Build values for bulk insert
    const values = studentIds.map(studentId => [
      studentId,
      attendanceDate,
      attendance[studentId],
      absentReasons[studentId] || null
    ]);

    const result = await addAttendance(values);
    if (result) {
      res.json({
        success: true,
        message: "Attendance inserted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "failed to insert attendance",
      });
    }
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ---------------------------------- ATTENDANCE CONTROLLER ----------------------------------



// ---------------------------------- TRANSFORMER CONTROLLER ----------------------------------


// ---------------------------------- TRANSFORMER CONTROLLER ----------------------------------


// ----------------------- RESEND CONTROLLER -----------------------
async function sendOtpEmail(to, otp) {
  try {
    const data = await resend.emails.send({
      from: "XoolHub <noreply@xoolhub.com>", // use a verified sender domain
      replyTo: "support@xoolhub.com", // Add reply-to for better deliverability
      to,
      subject: "Your XoolHub Verification Code",
      // Add headers for better deliverability
      headers: {
        'X-Mailer': 'XoolHub System v1.0',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'List-Unsubscribe': '<mailto:unsubscribe@xoolhub.com>',
        'X-Entity-Ref-ID': `xoolhub-otp-${Date.now()}`,
        'X-Email-Type': 'verification',
        'X-Security-Level': 'high'
      },
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification - XoolHub</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
              <div style="position: relative; z-index: 1;">
                <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 32px; color: white;">🔐</span>
                </div>
                <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Verify Your Email</h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 18px; font-weight: 400;">complete your account setup with this verification code</p>
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">Your Verification Code</h2>
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                  We've sent you a verification code to confirm your email address. 
                  Please enter this code in the verification form to complete your account setup.
                </p>
              </div>
              
              <!-- OTP Code Display -->
              <div style="background: #f8fafc; border-radius: 12px; padding: 40px; margin-bottom: 30px; border: 1px solid #e2e8f0; text-align: center;">
                <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center; justify-content: center;">
                  <span style="width: 4px; height: 24px; background: #667eea; border-radius: 2px; margin-right: 12px;"></span>
                  Verification Code
                </h3>
                <div style="background: white; border-radius: 12px; padding: 30px; border: 2px solid #667eea; box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.1);">
                  <div style="font-size: 48px; font-weight: 700; color: #667eea; letter-spacing: 8px; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; margin: 0;">${otp}</div>
                  <p style="color: #64748b; font-size: 14px; margin: 16px 0 0; font-weight: 500;">This code expires in 10 minutes</p>
                </div>
              </div>
              
              <!-- Instructions -->
              <div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
                <h3 style="color: #1e40af; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                  <span style="width: 4px; height: 24px; background: #3b82f6; border-radius: 2px; margin-right: 12px;"></span>
                  How to Use This Code
                </h3>
                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                      <span style="color: white; font-size: 12px; font-weight: bold;">1</span>
                    </div>
                    <div>
                      <p style="color: #1e40af; margin: 0; font-weight: 500; font-size: 15px;">Return to XoolHub</p>
                      <p style="color: #1d4ed8; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Go back to the verification page in your browser</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                      <span style="color: white; font-size: 12px; font-weight: bold;">2</span>
                    </div>
                    <div>
                      <p style="color: #1e40af; margin: 0; font-weight: 500; font-size: 15px;">Enter the Code</p>
                      <p style="color: #1d4ed8; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Type or paste the verification code above</p>
                    </div>
                  </div>
                  <div style="display: flex; align-items: flex-start; gap: 12px;">
                    <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                      <span style="color: white; font-size: 12px; font-weight: bold;">3</span>
                    </div>
                    <div>
                      <p style="color: #1e40af; margin: 0; font-weight: 500; font-size: 15px;">complete Verification</p>
                      <p style="color: #1d4ed8; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Click verify to complete your account setup</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Security Notice -->
              <div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: white; font-size: 14px;">⚠️</span>
                  </div>
                  <div>
                    <p style="color: #92400e; margin: 0; font-weight: 600; font-size: 15px;">Security Notice</p>
                    <p style="color: #a16207; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">
                      XoolHub will never ask you to share this code via email, phone, or any other method. 
                      Keep this code confidential and do not share it with anyone.
                    </p>
                  </div>
                </div>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL}/verify-email" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3); transition: all 0.2s;">
                  complete Verification
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
              <div style="margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: #667eea; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
                </div>
                <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub</h3>
                <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
              </div>
              <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
                <p style="margin: 0;">Questions? Contact us at <a href="mailto:support@xoolhub.com" style="color: #667eea; text-decoration: none;">support@xoolhub.com</a></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent:", data);
    return data;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
}
// ----------------------- RESEND CONTROLLER -----------------------

// ----------------------- RANDOM PASSWORD CONTROLLER -----------------------
function generatePassword(length = 8) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
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
    if (count) {
      res.json({
        success: true,
        count,
      });
      return;
    } else {
      res.json({
        success: false,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
    return;
  }
};

const countOTeachers = async (req, res) => {
  try {
    const count = await countAllTeachers();
    if (count) {
      res.json({
        success: true,
        count,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const countOStudents = async (req, res) => {
  try {
    const count = await countAllStudents();
    if (count) {
      res.json({
        success: true,
        count,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const countPrivateXuls = async (req, res) => {
  try {
    const count = await countPrivateSchools();
    if (count) {
      res.json({
        success: true,
        count,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const countPublicXuls = async (req, res) => {
  try {
    const count = await countPublicSchools();
    if (count) {
      res.json({
        success: true,
        count,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
const countSubscribedXuls = async (req, res) => {
  try {
    const count = await countSubscribedSchools();
    if (count) {
      res.json({
        success: true,
        count,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
const sumAmounts = async (req, res) => {
  try {
    const sum = await sumAmount();
    if (sum) {
      res.json({
        success: true,
        sum,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const paymentLineChart = async (req, res) => {
  try {
    const data = await paymentChart();
    if (data) {
      res.json({
        success: true,
        data,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getXuls = async (req, res) => {
  try {
    const school = await getSchools();
    if (school) {
      res.json({
        success: true,
        school,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};


// ----------------------- SCHOOL CONTROLLER -----------------------

// ----------------------- REGISTER CONTROLLER -----------------------

const signup = async (req, res) => {
  const { schoolEmail, schoolPassword, confirm, referralCode } = req.body;
  try {
    if (schoolEmail === "" || schoolPassword === "" || confirm === "") {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (schoolPassword !== confirm) {
      return res.json({
        success: false,
        message: "Password does not match..",
      });
    }

    // Check if the school already exists
    const exist = await checkSchool(schoolEmail);
    if (exist.length > 0) {
      return res.json({
        success: false,
        message: "School already exists...",
      });
    }

    // Validate referral code if provided
    let referrerSchoolId = null;
    if (referralCode) {
      const { validateReferralCode } = require('../model/apiModel.js');
      const referralValidation = await validateReferralCode(referralCode);

      if (!referralValidation) {
        return res.json({
          success: false,
          message: "Invalid referral code",
        });
      }

      referrerSchoolId = referralValidation.school_id;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(schoolPassword, 10);

    // Add the new school
    const newSchool = await insertSchool(schoolEmail, hashedPassword);
    if (newSchool) {
      // If referral code was used, track the referral
      if (referrerSchoolId && referralCode) {
        try {
          const { trackReferralUsage, createReferralCode } = require('../model/apiModel.js');

          // Get the new school ID
          const newSchoolData = await checkSchool(schoolEmail);
          const newSchoolId = newSchoolData[0].id;

          // Track the referral usage
          await trackReferralUsage(referrerSchoolId, newSchoolId, referralCode);

          // Create referral code for the new school
          await createReferralCode(newSchoolId);

          // Initialize analytics for both schools
          const { updateReferralAnalytics } = require('../model/apiModel.js');
          await updateReferralAnalytics(referrerSchoolId, {
            total_referrals: 1,
            last_referral_date: new Date()
          });

          await updateReferralAnalytics(newSchoolId, {
            total_referrals: 0,
            successful_referrals: 0,
            total_rewards_earned: 0,
            total_discounts_given: 0
          });

        } catch (referralError) {
          console.error('Error processing referral:', referralError);
          // Don't fail registration if referral processing fails
        }
      } else {
        // Create referral code for the new school even without referral
        try {
          const { createReferralCode, updateReferralAnalytics } = require('../model/apiModel.js');
          const newSchoolData = await checkSchool(schoolEmail);
          const newSchoolId = newSchoolData[0].id;

          await createReferralCode(newSchoolId);
          await updateReferralAnalytics(newSchoolId, {
            total_referrals: 0,
            successful_referrals: 0,
            total_rewards_earned: 0,
            total_discounts_given: 0
          });
        } catch (error) {
          console.error('Error creating referral code for new school:', error);
        }
      }

      res.json({
        success: true,
        message: referralCode ? "School registered successfully with referral bonus!" : "School registered successfully",
        referralApplied: !!referralCode
      });
    } else {
      res.json({
        success: false,
        message: "School registration failed",
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const getSchool = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;
  try {
    const details = await editSchool(sid);
    if (details) {
      res.json({
        success: true,
        details,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const updateSchools = async (req, res) => {
  const { name, address, city, country, email, contact, slogan, type } =
    req.body;
  const token = req.cookies.schoolToken;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;

    // Check if a file is uploaded
    if (req.files && req.files.logo) {
      const logo = req.files.logo;

      // Retrieve the current logo URL from the database
      const currentSchool = await editSchool(sid);
      const currentLogoUrl = currentSchool.logo;

      // Delete the existing logo from Supabase if it exists
      if (currentLogoUrl) {
        const filePath = currentLogoUrl.split("/").slice(-2).join("/"); // Extract file path from URL
        const { error: deleteError } = await supabase.storage
          .from("schoollogos")
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
        .from("schoollogos")
        .upload(`public/${logo.name}`, logo.data, {
          cacheControl: "3600",
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
      const { publicUrl } = supabase.storage
        .from("schoollogos")
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
        type
      );

      return res.json({
        success: true,
        message: update
          ? "School updated successfully"
          : "School updating failed.",
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
      type
    );

    return res.json({
      success: true,
      message: update
        ? "School updated successfully"
        : "School updating failed.",
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};

const TeacherPasswordUpdates = async (req, res) => {
  const { current, newPassword, confirm } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherid = decoded.teacherid;

  try {
    if (current === "" || newPassword === "" || confirm === "") {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (newPassword !== confirm) {
      return res.json({
        success: false,
        message: "Password does not match..",
      });
    }

    const checkPass = await checkTeacherPassword(sid, teacherid);
    if (current !== checkPass.password) {
      return res.json({
        success: false,
        message: "Invalid password..",
      });
    }

    const update = await updateTeacherPassword(newPassword, sid, teacherid);
    if (update) {
      res.json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
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
};

const PasswordUpdates = async (req, res) => {
  const { current, newPassword, confirm } = req.body;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  try {
    if (current === "" || newPassword === "" || confirm === "") {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (newPassword !== confirm) {
      return res.json({
        success: false,
        message: "Password does not match..",
      });
    }

    const checkPass = await checkPassword(sid);
    const isMatch = await bcrypt.compare(current, checkPass.password);
    if (isMatch === false) {
      return res.json({
        success: false,
        message: "Invalid password..",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const update = await updatePassword(hashedPassword, sid);
    if (update) {
      res.json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
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
};

const PasswordSuper = async (req, res) => {
  const { current, newPassword, confirm } = req.body;

  try {
    if (!current || !newPassword || !confirm) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (newPassword !== confirm) {
      return res.json({
        success: false,
        message: "Password does not match..",
      });
    }

    const checkPass = await checkSuperPassword();
    const isMatch = await bcrypt.compare(current, checkPass.password);
    if (isMatch === false) {
      return res.json({
        success: false,
        message: "Invalid password..",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const update = await updateSuperPassword(hashedPassword);
    if (update) {
      res.json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
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
};

const getAdministrator = async (req, res) => {
  try {
    const checker = await getAdmin();

    if (checker) {
      res.json({
        success: true,
        checker,
      });
    } else {
      res.json({
        success: false,
        message: "failed to get records",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

const updateAdministrator = async (req, res) => {
  const { email, phone, address, email_address, whatsapp } = req.body;
  const token = req.cookies.administratorToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const adminID = decoded.aid;

  try {
    const checker = await updateAdmin(
      email,
      phone,
      address,
      email_address,
      whatsapp,
      adminID
    );

    if (checker) {
      res.json({
        success: true,
        message: "System details updated successfully",
      });
    } else {
      res.json({
        success: false,
        message: "failed to update details",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// ----------------------- REGISTER CONTROLLER -----------------------

// ----------------------- CONTACTS CONTROLLER -----------------------

const insertContacts = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    if (!name || !email || !message) {
      res.json({
        success: false,
        message: "Please fill in the required fields",
      });
      return;
    } else {
      const insert = await addContacts(name, email, message);
      if (insert) {
        res.json({
          success: true,
          message: "Contacted successully",
        });
        return;
      } else {
        res.json({
          success: false,
          message: "failed to contact admin",
        });
        return;
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }
};

// ----------------------- CONTACTS CONTROLLER -----------------------

// ----------------------- LOGIN CONTROLLER -----------------------

const login = async (req, res) => {
  const { schoolEmail, schoolPassword } = req.body;
  // await sendParentNotification('265993533315', 'This is a test whatsApp notification');

  try {
    if (!schoolEmail || !schoolPassword) {
      return res.json({
        success: false,
        message: "Please fill in up the fields",
      });
    }

    // Find the school by email

    const school = await checkMail(schoolEmail);
    if (school.length === 0) {
      const teacher = await checkTeacherMail(schoolEmail);
      if (teacher.length === 0) {
        // Getting ADMINISTRATOR
        const superAdmin = await checkAdminMail(schoolEmail);
        if (!superAdmin) {
          return res.json({
            success: false,
            message: "Invalid email or password",
          });
        }

        // Compare the password'
        const isMatch = await bcrypt.compare(
          schoolPassword,
          superAdmin.password
        );
        if (isMatch.length === 0) {
          return res.json({
            success: false,
            message: "Invalid email or password here",
          });
        }
        // Create a JWT
        const superToken = jwt.sign(
          {
            aid: superAdmin.id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        // Set the token as an HTTP-only cookie
        res.cookie("administratorToken", superToken, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 60 * 60 * 1000, // 1 hour
        });

        return res.json({
          ssuccess: true,
          smessage: "Access granted...",
        });
      }

      // Compare the password - handle both plain text and encrypted passwords
      const isPlainTextMatch = schoolPassword === teacher[0].password;
      const isEncryptedMatch = await bcrypt.compare(schoolPassword, teacher[0].password);
      
      if (!isPlainTextMatch && !isEncryptedMatch) {
        return res.json({
          tsuccess: false,
          tmessage: "Invalid email or password 1",
        });
      }

      const get = editSchool(teacher[0].sid);
      if (get.status === "deactivated") {
        return res.json({
          success: false,
          message: "Please consult your admin to activate your system.",
        });
      }

      // Create a JWT
      const token = jwt.sign(
        {
          sid: teacher[0].sid,
          teacherid: teacher[0].id,
          role: teacher[0].role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Set the token as an HTTP-only cookie
      res.cookie("teacherToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return res.json({
        tsuccess: true,
        tmessage: "User logged successfully..",
        role: teacher[0].role,
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(schoolPassword, school[0].password);
    if (isMatch === false) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    } else if (school[0].status === "deactivated") {
      // Generate OTP and save to the database
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiresAt = new Date(Date.now() + 10 * 60000); // Expires in 10 minutes

      const otpcheck = await OTPGeneration(
        otpCode,
        otpExpiresAt,
        school[0].email
      );
      if (otpcheck) {
        try {
          // Send OTP via email
          const data = await sendOtpEmail(school[0].email, otpCode);
          // If email is sent successfully, return the email address
          if (data) {
            return res.json({
              osuccess: true,
              email: school[0].email,
            });
          }
        } catch (error) {
          console.error("Error sending OTP email:", error);
          return false;
        }
      } else {
        return res.json({
          success: false,
          message: "failed to sent your OTP code to activate account.",
        });
      }
    }

    // Create a JWT
    const token = jwt.sign({ id: school[0].id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set the token as an HTTP-only cookie
    res.cookie("schoolToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.json({
      success: true,
      message: "Login successfully..",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({
      error: "Internal Server Error",
    });
  }
};

// Endpoint to verify authentication
const verify = (req, res) => {
  const token = req.cookies.schoolToken;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authenticated. Access denied!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      res.json({
        success: true,
        message: "Authenticated",
        //   school: decoded,
      });
      return;
    }
    res.json({
      success: false,
      message: "Access denied",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Endpoint to verify authentication
const tverify = (req, res) => {
  const token = req.cookies.teacherToken;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authenticated. Access denied!",
    });
  }

  try {
    const decoder = jwt.verify(token, process.env.JWT_SECRET);
    if (decoder) {
      res.json({
        success: true,
        message: "Authenticated",
        teacher: decoder,
      });
      return;
    }
    res.json({
      success: false,
      message: "Access denied",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Endpoint to verify authentication
const superVerify = (req, res) => {
  const token = req.cookies.administratorToken;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authenticated. Access denied!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      res.json({
        success: true,
        message: "Authenticated",
        administrator: decoded,
      });
      return;
    }
    res.json({
      success: false,
      message: "Access denied",
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Invalid token",
    });
  }
};

const Logout = async (req, res) => {
  res.clearCookie("schoolToken");
  res.clearCookie("teacherToken");
  res.clearCookie("administratorToken");
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};

// ----------------------- LOGIN CONTROLLER -----------------------

// Verify User
const verifyUser = async (req, res) => {
  const { schoolEmail } = req.body;

  try {
    const checker = await checkMail({ schoolEmail });
    if (!checker) {
      return res.status(400).send({
        msg: "Authentication failed",
        checker,
      });
    }
    res.status(200).send({
      msg: "User verified successfully..",
      email: checker.schoolemail,
    });
  } catch (error) {
    res.status(500).send({
      error: "Verify User Internal Server Error",
    });
  }
};

// Login at localhost:5000/api/auth/login

// Verify OTP at localhost:5000/api/auth/verifyOTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const checker = await checkSchool(email);
    if (checker.length > 0) {
      if (checker[0].otp_code !== otp) {
        return res.json({
          success: false,
          message: "OTP verification failed..",
        });
      } else if (new Date(checker[0].otp_expires_at).getTime() < Date.now()) {
        return res.json({
          success: false,
          message: "OTP expired",
        });
      } else {
        const update = await OTPVerification(email);
        if (update) {
          return res.json({
            success: true,
            message: "OTP verified successfully",
          });
        } else {
          return res.json({
            success: false,
            message: "OTP verification failed",
          });
        }
      }
    }

    return res.json({
      success: false,
      message: "Authentication failed",
    });
  } catch (error) {
    res.json({
      error: "Verify User Internal Server Error",
    });
  }
};

const resendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    // Generate OTP and save to the database
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60000); // Expires in 10 minutes

    const otpcheck = await OTPGeneration(otpCode, otpExpiresAt, email);
    if (otpcheck) {
      try {
        // Send OTP via email
        const data = await sendOtpEmail(email, otpCode);
        if (data) {
          return res.json({
            success: true,
            message: "OTP resent successfully",
          });
        }
      } catch (error) {
        console.error("Error sending OTP email:", error);
        return false;
      }
    } else {
      return res.json({
        success: false,
        message: "failed to resend OTP",
      });
    }
  } catch (error) {
    res.json({
      error: "Resend OTP Internal Server Error",
    });
  }
};

// Enterprise Password Reset System Implementation
const { PasswordResetEmail } = require('../emails/passwordResetEmail');
const { securityUtils, securityMonitor } = require('../utils/security');
const { auditLogger, AUDIT_EVENTS } = require('../utils/audit');

// Advanced rate limiting with security monitoring
class AdvancedRateLimiter {
  constructor() {
    this.store = new Map();
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000); // Clean every minute
  }

  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.store.entries()) {
      if (now > data.expiresAt) {
        this.store.delete(key);
      }
    }
  }

  isAllowed(identifier, maxAttempts = 3, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const data = this.store.get(identifier) || { 
      count: 0, 
      firstAttempt: now, 
      expiresAt: now + windowMs,
      attempts: []
    };
    
    if (now > data.expiresAt) {
      data.count = 0;
      data.firstAttempt = now;
      data.expiresAt = now + windowMs;
      data.attempts = [];
    }
    
    if (data.count >= maxAttempts) {
      // Log suspicious activity
      securityMonitor.logSecurityEvent('RATE_LIMIT_EXCEEDED', {
        identifier,
        count: data.count,
        attempts: data.attempts
      });
      
      return {
        allowed: false,
        remaining: 0,
        resetTime: data.expiresAt,
        retryAfter: Math.ceil((data.expiresAt - now) / 1000)
      };
    }
    
    data.count++;
    data.attempts.push({ timestamp: now, ip: identifier.split(':')[1] });
    this.store.set(identifier, data);
    
    return {
      allowed: true,
      remaining: maxAttempts - data.count,
      resetTime: data.expiresAt,
      retryAfter: 0
    };
  }
}

const rateLimiter = new AdvancedRateLimiter();

// Create Reset Session at localhost:5000/api/auth/createResetSession
const createResetSession = async (req, res) => {
  const { email } = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const sessionId = securityUtils.generateSessionId();
  const correlationId = securityUtils.generateSecureToken(16);
  
  try {
    // Enhanced email validation
    if (!email || !email.includes('@')) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
        email,
        ip,
        userAgent,
        reason: 'Invalid email format',
        sessionId,
        correlationId
      });
      
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check rate limit with advanced monitoring
    const identifier = `${normalizedEmail}:${ip}`;
    const rateLimitResult = rateLimiter.isAllowed(identifier, 3, 15 * 60 * 1000);
    
    if (!rateLimitResult.allowed) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.RATE_LIMIT_EXCEEDED, {
        email: normalizedEmail,
        ip,
        userAgent,
        retryAfter: rateLimitResult.retryAfter,
        sessionId,
        correlationId
      });
      
      return res.status(429).json({
        success: false,
        message: "Too many reset requests. Please try again in 15 minutes.",
        retryAfter: rateLimitResult.retryAfter
      });
    }

    // Check if user exists in any of the user tables with enhanced security
    const { user, userType } = await findUserByEmail(normalizedEmail);

    // Log password reset request
    await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_REQUESTED, {
      email: normalizedEmail,
      ip,
      userAgent,
      userExists: !!user,
      userType,
      sessionId,
      correlationId
    });

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({
        success: true,
        message: "If an account with that email exists, we've sent a password reset link."
      });
    }

    // Generate secure reset token with metadata
    const tokenData = securityUtils.generateResetToken(normalizedEmail, ip);
    const resetToken = tokenData.token;
    const expiresAt = tokenData.expiresAt;

    // Store reset token in database with enhanced security
    await storePasswordResetToken(
      normalizedEmail,
      resetToken,
      expiresAt,
      ip,
      userAgent,
      sessionId,
      correlationId
    );

    // Generate secure reset link with additional security
    const resetLink = `${process.env.FRONTEND_URL}/reset?token=${resetToken}&session=${sessionId}`;

    // Prepare email data with enhanced security
    const userName = user.name || user.first_name || user.username || 'User';
    
    // Get email template
    const emailTemplate = PasswordResetEmail({
      resetLink,
      userName,
      expiresIn: "15 minutes"
    });

    // Send email using Resend with enhanced security
    const emailData = {
      from: 'XoolHub <noreply@xoolhub.com>',
      to: [normalizedEmail],
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'high',
        'X-Mailer': 'XoolHub Security System'
      }
    };

    try {
      await resend.emails.send(emailData);
      
      // Log successful email send
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_EMAIL_SENT, {
        email: normalizedEmail,
        ip,
        userAgent,
        userType,
        sessionId,
        correlationId,
        tokenExpiresAt: expiresAt
      });
      
    } catch (emailError) {
      // Log email failure
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
        email: normalizedEmail,
        ip,
        userAgent,
        reason: 'Email send failed',
        error: emailError.message,
        sessionId,
        correlationId
      });
      
      throw emailError;
    }

    res.json({
      success: true,
      message: "If an account with that email exists, we've sent a password reset link.",
      sessionId,
      correlationId
    });

  } catch (error) {
    console.error('Password reset error:', error);
    
    // Enhanced error logging with security monitoring
    await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
      email: req.body.email || 'unknown',
      ip,
      userAgent,
      reason: 'System error',
      error: error.message,
      stack: error.stack,
      sessionId,
      correlationId
    });
    
    // Log security event for monitoring
    securityMonitor.logSecurityEvent('SYSTEM_ERROR', {
      error: error.message,
      ip,
      userAgent,
      endpoint: 'createResetSession'
    });

    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
      correlationId
    });
  }
};

// Reset Password at localhost:5000/api/auth/resetPassword
const resetPassword = async (req, res) => {
  const { token, password, confirmPassword, session } = req.body;
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const sessionId = session || securityUtils.generateSessionId();
  const correlationId = securityUtils.generateSecureToken(16);
  
  try {
    // Enhanced input validation
    if (!token || !password || !confirmPassword) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
        token: token ? token.substring(0, 8) + '...' : 'missing',
        ip,
        userAgent,
        reason: 'Missing required fields',
        sessionId,
        correlationId
      });
      
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (password !== confirmPassword) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
        token: token.substring(0, 8) + '...',
        ip,
        userAgent,
        reason: 'Passwords do not match',
        sessionId,
        correlationId
      });
      
      return res.status(400).json({
        success: false,
        message: "Passwords do not match"
      });
    }

    // Enhanced password validation
    const passwordValidation = securityUtils.validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
        token: token.substring(0, 8) + '...',
        ip,
        userAgent,
        reason: 'Password does not meet security requirements',
        passwordStrength: passwordValidation.strength,
        sessionId,
        correlationId
      });
      
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
        requirements: passwordValidation.checks
      });
    }

    // Enhanced token validation with security checks
    const tokenData = await validatePasswordResetToken(token);
    
    if (!tokenData) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_TOKEN_INVALID, {
        token: token.substring(0, 8) + '...',
        ip,
        userAgent,
        reason: 'Invalid or expired token',
        sessionId,
        correlationId
      });
      
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    const email = tokenData.email;
    
    // Additional security checks
    if (tokenData.ip_address !== ip) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.SECURITY_VIOLATION, {
        token: token.substring(0, 8) + '...',
        ip,
        userAgent,
        reason: 'IP address mismatch',
        originalIP: tokenData.ip_address,
        sessionId,
        correlationId
      });
      
      return res.status(403).json({
        success: false,
        message: "Security violation detected"
      });
    }

    // Check if user exists with enhanced security
    const { user, userType } = await findUserByEmail(email);

    if (!user) {
      await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
        token: token.substring(0, 8) + '...',
        email,
        ip,
        userAgent,
        reason: 'User not found',
        sessionId,
        correlationId
      });
      
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    // Enhanced password hashing with security
    const hashedPassword = await securityUtils.hashPassword(password);

    // Update password in database with transaction
    await updateUserPassword(user.id, userType, hashedPassword);

    // Store password in history for security
    await storePasswordHistory(user.id, userType, hashedPassword);

    // Mark token as used with additional security
    await markPasswordResetTokenAsUsed(token);

    // Log successful password reset
    await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_SUCCESS, {
      token: token.substring(0, 8) + '...',
      email,
      ip,
      userAgent,
      userType,
      userId: user.id,
      sessionId,
      correlationId,
      passwordStrength: passwordValidation.strength
    });

    // Log security event for monitoring
    securityMonitor.logSecurityEvent('PASSWORD_RESET_SUCCESS', {
      email,
      ip,
      userType,
      userId: user.id
    });

    res.json({
      success: true,
      message: "Password reset successfully. You can now log in with your new password.",
      sessionId,
      correlationId
    });

  } catch (error) {
    console.error('Password reset error:', error);
    
    // Enhanced error logging with security monitoring
    await auditLogger.logPasswordResetEvent(AUDIT_EVENTS.PASSWORD_RESET_FAILED, {
      token: req.body.token ? req.body.token.substring(0, 8) + '...' : 'unknown',
      email: req.body.email || 'unknown',
      ip,
      userAgent,
      reason: 'System error',
      error: error.message,
      stack: error.stack,
      sessionId,
      correlationId
    });
    
    // Log security event for monitoring
    securityMonitor.logSecurityEvent('SYSTEM_ERROR', {
      error: error.message,
      ip,
      userAgent,
      endpoint: 'resetPassword'
    });

    res.status(500).json({
      success: false,
      message: "An error occurred. Please try again later.",
      correlationId
    });
  }
};

// ----------------------- EXAM CONTROLLER -----------------------

const addExam = async (req, res) => {
  const { namer, percentage } = req.body.data;

  try {
    if (!namer || !percentage) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (isNaN(percentage)) {
      return res.json({
        success: false,
        message: "Percentage field must contain a valid number",
      });
    }

    // Check if exam exists
    const checker = await checkExam(namer);
    if (checker.length > 0) {
      return res.json({
        success: false,
        message: "Exam already exists...",
      });
    } else {
      // Add new exam
      const newExam = await insertExam(namer, percentage);
      if (newExam) {
        return res.json({
          success: true,
          message: "Exam added successfully",
          newExam,
        });
      } else {
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
};

const getExams = async (req, res) => {
  try {
    const exam = await getExam();
    if (exam) {
      return res.json({
        success: true,
        exam,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteExams = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteExam(id);
    if (del) {
      res.json({
        success: true,
        message: "Exam deleted successfully",
      });
    } else {
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
};

const editExams = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editExam(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateExams = async (req, res) => {
  const { id } = req.params;
  const { namer, percentage } = req.body;

  try {
    // Check if exam exists
    const checker = await checkExam(namer);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Exam already exists...",
      });
    } else {
      const update = await updateExam(id, namer, percentage);
      if (update) {
        res.json({
          success: true,
          message: "Exam updated successfully",
        });
      } else {
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
};

// ----------------------- EXAM CONTROLLER -----------------------

// ----------------------- YEAR CONTROLLER -----------------------

const addYear = async (req, res) => {
  const { yearName, startDate, endDate } = req.body.data;

  try {
    if (!yearName || !startDate || !endDate) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if exam exists
    const checker = await checkYear(yearName, startDate, endDate);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Academic year already exists...",
      });
    } else {
      // Add new exam
      const newYear = await insertYear(yearName, startDate, endDate);
      if (newYear) {
        res.json({
          success: true,
          message: "Academic year added successfully",
        });
      } else {
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
};

const getYears = async (req, res) => {
  try {
    const year = await getYear();
    if (year) {
      res.json({
        success: true,
        year,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteYears = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteYear(id);
    if (del) {
      res.json({
        success: true,
        message: "Academic year deleted successfully",
      });
    } else {
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
};

const editYears = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editYear(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateYears = async (req, res) => {
  const { id } = req.params;
  const { yearName, startDate, endDate } = req.body;

  try {
    // Check if exam exists
    const checker = await checkYear(yearName, startDate, endDate);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Academic year already exists...",
      });
    } else {
      const update = await updateYear(id, yearName, startDate, endDate);
      if (update) {
        res.json({
          success: true,
          message: "Academic year updated successfully",
        });
      } else {
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
};

// ----------------------- YEAR CONTROLLER -----------------------

// ----------------------- SUBJECT CONTROLLER -----------------------

const addSubject = async (req, res) => {
  const { subjectName, code } = req.body.data;

  try {
    if (!subjectName || !code) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if subject exists
    const checker = await checkSubject(subjectName, code);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Subject already exists...",
      });
    } else {
      // Add new subject
      const newSubject = await insertSubject(subjectName, code);
      if (newSubject) {
        res.json({
          success: true,
          message: "Subject added successfully",
          newSubject,
        });
      } else {
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
};

const getSubjects = async (req, res) => {
  try {
    const subject = await getSubject();
    if (subject) {
      res.json({
        success: true,
        subject,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteSubjects = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteSubject(id);
    if (del) {
      res.json({
        success: true,
        message: "Subject deleted successfully",
      });
    } else {
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
};

const editSubjects = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editSubject(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateSubjects = async (req, res) => {
  const { id } = req.params;
  const { subjectName, code } = req.body;

  try {
    // Check if exam exists
    const checker = await checkSubject(subjectName);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Subject already exists...",
      });
    } else {
      const update = await updateSubject(id, subjectName, code);
      if (update) {
        res.json({
          success: true,
          message: "Subject updated successfully",
        });
      } else {
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
};

// ----------------------- SUBJECT CONTROLLER -----------------------

// ----------------------- CLASS CONTROLLER -----------------------

const addClass = async (req, res) => {
  const { className, denom } = req.body.data;

  try {
    if (!className || !denom) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if class exists
    const checker = await checkClass(className, denom);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Class already exists...",
      });
    } else {
      // Add new subject
      const newClass = await insertClass(className, denom);
      if (newClass) {
        res.json({
          success: true,
          message: "Class added successfully",
        });
      } else {
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
};

const getClasses = async (req, res) => {
  try {
    const classs = await getClass();
    if (classs) {
      res.json({
        success: true,
        classs,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteClasses = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteClass(id);
    if (del) {
      res.json({
        success: true,
        message: "Class deleted successfully",
      });
    } else {
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
};

const editClasses = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editClass(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateClasses = async (req, res) => {
  const { id } = req.params;
  const { className, denom } = req.body;

  try {
    // Check if exam exists
    const checker = await checkClass(className, denom);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Class already exists...",
      });
    } else {
      const update = await updateClass(id, className, denom);
      if (update) {
        res.json({
          success: true,
          message: "Class updated successfully",
        });
      } else {
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
};

// ----------------------- CLASS CONTROLLER -----------------------

// ----------------------- TERM CONTROLLER -----------------------

const addTerm = async (req, res) => {
  const { termName, year, startDate, endDate } = req.body.data;

  try {
    if (!termName || !year || !startDate || !endDate) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if class exists
    const checker = await checkTerm(termName, startDate, endDate);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Term already exists...",
      });
    } else {
      // Add new subject
      const newTerm = await insertTerm(termName, year, startDate, endDate);
      if (newTerm) {
        res.json({
          success: true,
          message: "Term added successfully",
        });
      } else {
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
};

const getTerms = async (req, res) => {
  try {
    const term = await getTerm();
    if (term) {
      res.json({
        success: true,
        term,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteTerms = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteTerm(id);
    if (del) {
      res.json({
        success: true,
        message: "Term deleted successfully",
      });
    } else {
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
};

const editTerms = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editTerm(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateTerms = async (req, res) => {
  const { id } = req.params;
  const { termName, year, startDate, endDate } = req.body;

  try {
    // Check if exam exists
    const checker = await checkTerm(termName);
    if (checker) {
      res.json({
        success: false,
        message: "Term already exists...",
      });
    } else {
      const update = await updateTerm(id, termName, year, startDate, endDate);
      if (update) {
        res.json({
          success: true,
          message: "Term updated successfully",
        });
      } else {
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
};

// ----------------------- TERM CONTROLLER -----------------------

// ----------------------- GRADE CONTROLLER -----------------------

const addGrade = async (req, res) => {
  const { denom, roof, floor, grade, remark } = req.body.data;

  try {
    if (!denom || !roof || !floor || !grade || !remark) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (isNaN(roof) || isNaN(floor)) {
      return res.json({
        success: false,
        message: "'Roof' or 'Floor' must be a number",
      });
    } else if (Number(roof) < Number(floor)) {
      return res.json({
        success: false,
        message: "'Roof' must be a higher value than 'Floor'",
      });
    } else if (Number(roof) > 100 || Number(floor) > 100) {
      return res.json({
        success: false,
        message: "'Roof' or 'Floor' must not be over 100",
      });
    }

    // Check if class exists
    const checker = await checkGrade(denom, grade);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Grade already exists...",
      });
    } else {
      // Add new grade
      const newGrade = await insertGrade(denom, roof, floor, grade, remark);
      if (newGrade) {
        res.json({
          success: true,
          message: "Grade added successfully",
        });
      } else {
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
};

const getGrades = async (req, res) => {
  try {
    const grade = await getGrade();
    if (grade) {
      res.json({
        success: true,
        grade,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getMSCEGrades = async (req, res) => {
  try {
    const grade = await getMSCEGrade();
    if (grade) {
      res.json({
        success: true,
        grade,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getJCEGrades = async (req, res) => {
  try {
    const grade = await getJCEGrade();
    if (grade) {
      res.json({
        success: true,
        grade,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteGrades = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteGrade(id);
    if (del) {
      res.json({
        success: true,
        message: "Grade deleted successfully",
      });
    } else {
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
};

const editGrades = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editGrade(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateGrades = async (req, res) => {
  const { id } = req.params;
  const { denom, roof, floor, grade, remark } = req.body;

  try {
    // Check if exam exists
    const checker = await checkGrade(denom, grade);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Grade already exists...",
      });
    } else {
      const update = await updateGrade(id, denom, roof, floor, grade, remark);
      if (update) {
        res.json({
          success: true,
          message: "Grade updated successfully",
        });
      } else {
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
};

// ----------------------- GRADE CONTROLLER -----------------------

// ----------------------- JCE CONTROLLER -----------------------

const addJCE = async (req, res) => {
  const { denom, roof, floor, remark } = req.body.data;

  try {
    if (!denom || !roof || !floor || !remark) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if class exists
    const checker = await checkJCE(denom, roof, floor);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Remark already exists...",
      });
    } else {
      // Add new grade
      const newJCE = await insertJCE(denom, roof, floor, remark);
      if (newJCE) {
        res.json({
          success: true,
          message: "Remark added successfully",
        });
      } else {
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
};

const getJCEs = async (req, res) => {
  try {
    const jce = await getJCE();
    if (jce) {
      res.json({
        success: true,
        jce,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteJCEs = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteJCE(id);
    if (del) {
      res.json({
        success: true,
        message: "Remark deleted successfully",
      });
    } else {
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
};

const editJCEs = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editJCE(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateJCEs = async (req, res) => {
  const { id } = req.params;
  const { denom, roof, floor, remark } = req.body;

  try {
    // Check if exam exists
    const checker = await checkJCE(denom, roof, floor);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Remark already exists...",
      });
    } else {
      const update = await updateJCE(id, denom, roof, floor, remark);
      if (update) {
        res.json({
          success: true,
          message: "Remark updated successfully",
        });
      } else {
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
};

// ----------------------- JCE CONTROLLER -----------------------

// ----------------------- MSCE CONTROLLER -----------------------

const addMSCE = async (req, res) => {
  const { denom, roof, floor, remark } = req.body.data;

  try {
    if (!denom || !roof || !floor || !remark) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if class exists
    const checker = await checkMSCE(denom, roof, floor);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Remark already exists...",
      });
    } else {
      // Add new grade
      const newMSCE = await insertMSCE(denom, roof, floor, remark);
      if (newMSCE) {
        res.json({
          success: true,
          message: "Remark added successfully",
        });
      } else {
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
};

const getMSCEs = async (req, res) => {
  try {
    const msce = await getMSCE();
    if (msce) {
      res.json({
        success: true,
        msce,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteMSCEs = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteMSCE(id);
    if (del) {
      res.json({
        success: true,
        message: "Remark deleted successfully",
      });
    } else {
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
};

const editMSCEs = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editMSCE(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateMSCEs = async (req, res) => {
  const { id } = req.params;
  const { denom, roof, floor, remark } = req.body;

  try {
    // Check if exam exists
    const checker = await checkMSCE(denom, roof, floor);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Remark already exists...",
      });
    } else {
      const update = await updateMSCE(id, denom, roof, floor, remark);
      if (update) {
        res.json({
          success: true,
          message: "Remark updated successfully",
        });
      } else {
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
};

// ----------------------- MSCE CONTROLLER -----------------------

// ----------------------- TEACHER CONTROLLER -----------------------

const addTeacher = async (req, res) => {
  const { name, contact, email, address, gender, role } = req.body.data;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;

  const password = generatePassword();

  try {
    if (!name || !contact || !email || !address || !gender || !role) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if class exists
    const checker = await checkTeacher(id, name);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "User already exists...",
      });
    } else {
      // Add new grade
      const newTeacher = await insertTeacher(
        id,
        name,
        contact,
        email,
        address,
        gender,
        role,
        password
      );
      if (newTeacher) {
        res.json({
          success: true,
          message: "User added successfully",
        });
      } else {
        res.json({
          success: false,
          message: "User adding failed..",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getTeachers = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const teacher = await getTeacher(sid);
    if (teacher) {
      res.json({
        success: true,
        teacher,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getSingleTeachers = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const teacherid = await getSingleTeacher(sid, id);
    if (teacherid) {
      res.json({
        success: true,
        teacherid,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getTeacherClasses = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const classes = await getTeacherClass(sid, id);
    if (classes) {
      res.json({
        success: true,
        classes,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getTeacherSubjects = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const subs = await getTeacherSubject(sid, id);
    if (subs) {
      res.json({
        success: true,
        subs,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteTeachers = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteTeacher(id);
    if (del) {
      res.json({
        success: true,
        message: "teacher deleted successfully",
      });
    } else {
      res.json({
        successs: false,
        message: "teacher deletion failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const editTeachers = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editTeacher(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateTeachers = async (req, res) => {
  const { id } = req.params;
  const { name, contact, email, address, gender, role } = req.body;

  try {
    const update = await updateTeacher(
      id,
      name,
      contact,
      email,
      address,
      gender,
      role
    );
    if (update) {
      res.json({
        success: true,
        message: "User updated successfully",
      });
    } else {
      res.json({
        success: false,
        message: "User updating failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const TeacherCounter = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const counter = await countTeachers(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const countMalesTeacher = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const counter = await countMaleTeachers(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const countFemalesTeacher = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const counter = await countFemaleTeachers(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const genderTeacherPercentage = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const counter = await teacherGenderPercentage(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- TEACHER CONTROLLER -----------------------

// ----------------------- ASSIGN TEACHER CONTROLLER -----------------------

const addAssignTeacher = async (req, res) => {
  const { teacherid, classid, subjectid } = req.body.data;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;

  try {
    if (!teacherid || !classid || !subjectid) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if class exists
    const checker = await checkAssignTeacher(id, classid, subjectid);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "teacher already assigned...",
      });
    } else {
      // Add new grade
      const newTeacher = await insertAssignTeacher(
        id,
        teacherid,
        classid,
        subjectid
      );
      if (newTeacher) {
        res.json({
          success: true,
          message: "teacher assigned successfully",
        });
      } else {
        res.json({
          success: false,
          message: "teacher assigning failed..",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getAssignTeachers = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const assign = await getAssignTeacher(sid);
    if (assign) {
      res.json({
        success: true,
        assign,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteAssignTeachers = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteAssignTeacher(id);
    if (del) {
      res.json({
        success: true,
        message: "teacher unassigned successfully",
      });
    } else {
      res.json({
        successs: false,
        message: "teacher unassigning failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- ASSIGN TEACHER CONTROLLER -----------------------

// ----------------------- CLASS TEACHER CONTROLLER -----------------------

const addClassTeacher = async (req, res) => {
  const { teacherid, classid } = req.body.data;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;

  try {
    if (!teacherid || !classid) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check if class exists
    const checker = await checkClassTeacher(id, classid);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "teacher already assigned...",
      });
    } else {
      // Add new grade
      const newTeacher = await insertClassTeacher(id, teacherid, classid);
      if (newTeacher) {
        res.json({
          success: true,
          message: "teacher assigned successfully",
        });
      } else {
        res.json({
          success: false,
          message: "teacher assigning failed..",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getClassTeachers = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const classt = await getClassTeacher(sid);
    if (classt) {
      res.json({
        success: true,
        classt,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteClassTeachers = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteClassTeacher(id);
    if (del) {
      res.json({
        success: true,
        message: "teacher unassigned successfully",
      });
    } else {
      res.json({
        successs: false,
        message: "teacher unassigning failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- CLASS TEACHER CONTROLLER -----------------------

// ----------------------- STUDENT CONTROLLER -----------------------

const gotStudents = async (req, res) => {
  try {
    const gotter = await statStudents();
    if (gotter) {
      // Use the best available count - prioritize active students, fallback to total students
      const studentCount = gotter.active_students || gotter.total_students || gotter.history_count || 0;
      return res.json({
        success: true,
        gotter: {
          ount: studentCount,
          history_count: gotter.history_count,
          total_students: gotter.total_students,
          active_students: gotter.active_students
        },
      })
    }
    else {
      res.json({
        success: false,
        message: "Student fetching failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
}


const gotCountry = async (req, res) => {
  try {
    const cott = await statCountry();
    if (cott) {
      return res.json({
        success: true,
        cott,
      })
    }
    else {
      res.json({
        successs: false,
        message: "Country fetching failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
}


const addStudent = async (req, res) => {
  const { studentNames, classid, yearid } = req.body.data;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.sid;

  try {
    // Validate the inputs
    if (
      !Array.isArray(studentNames) ||
      studentNames.length === 0 ||
      !classid ||
      !yearid
    ) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Check number of students
    const subscription = await checkSubscription(id);
    if (subscription) {
      const plan = subscription[0].planid;

      //  Get Subscription Plan
      const ploy = await getPlanByID(plan);
      if (ploy) {
        const countStud = ploy.features;

        const schoolStudents = await countStudents(id);
        if (schoolStudents) {
          const sysCount = schoolStudents.count;
          const totalStudents = sysCount + studentNames.length;

          if (totalStudents < countStud) {
            // Call the function
            const result = await checkStudent(id, studentNames);
            // Check the result
            if (result === true) {
              return res.json({
                success: false,
                message: `Student(s) are already in the system...`,
              });
            } else {
              // Map each student to include a generated UUID.
              const studentsWithId = studentNames.map((student) => ({
                student, // this sets the studentName property to the string value
                studentID: uuidv4(), // add the generated UUID
              }));

              const newStudent = await insertStudent(studentsWithId);
              if (newStudent.length > 0) {
                const newHistory = await insertStudentHistory(
                  id,
                  yearid,
                  classid,
                  newStudent
                );
                if (newHistory.affectedRows > 0) {
                  return res.json({
                    success: true,
                    message: "Students added succesfully...!",
                    newHistory,
                  });
                }
              } else {
                return res.json({
                  success: false,
                  message: "An unknown error occurred...",
                });
              }
            }
          } else {
            return res.json({
              success: false,
              message:
                "You have reached the maximum number of students for this plan. \n Please upgrade",
            });
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
};

const getSingleStudents = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const studentid = await getSingleStudent(sid, id);
    if (studentid) {
      res.json({
        success: true,
        studentid,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getStudents = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const student = await getStudent(sid);
    if (student) {
      res.json({
        success: true,
        student,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteStudents = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteStudent(id);

    if (del) {
      res.json({
        success: true,
        message: "Student deleted successfully",
      });
    } else {
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
};

const updateStudents = async (req, res) => {
  const { id } = req.params;
  const { student, contact, email, address, gender, dob } = req.body;

  try {
    const update = await updateStudent(
      id,
      student,
      contact,
      email,
      address,
      gender,
      dob
    );
    if (update) {
      res.json({
        success: true,
        message: "Information updated successfully",
      });
    } else {
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
};

const StudentCounter = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;
  try {
    const counter = await countStudents(sid);

    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const countMales = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;
  try {
    const counter = await countMale(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const countFemales = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    const counter = await countFemale(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const countGenderForClass = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;
  try {
    const counter = await countGenderAndClass(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const genderByPercentage = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;
  try {
    const counter = await genderPercentage(sid);
    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};
// ----------------------- STUDENT CONTROLLER -----------------------

// ----------------------- PAYMENT CONTROLLER -----------------------

const getPays = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const pay = await getPay(sid);
    if (pay) {
      res.json({
        success: true,
        pay,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getPayees = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const payee = await getPayee(sid, id);
    if (payee) {
      res.json({
        success: true,
        payee,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const addPay = async (req, res) => {
  const { feeid, feeamount } = req.body;
  const { paid, term, studentID } = req.body.data;

  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    if (!feeid || !feeamount || !studentID || !paid || !term) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (isNaN(paid)) {
      return res.json({
        success: false,
        message: "Amount must be a number..",
      });
    } else if (Number(paid) > Number(feeamount)) {
      return res.json({
        success: false,
        message: "You have paid more than what is required..",
      });
    }

    const balance = Number(feeamount) - Number(paid);
    const status = Number(paid) < Number(feeamount) ? "pending" : "complete";

    // Check if class exists
    const checker = await checkPay(sid, feeid, studentID, term);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Payment was already made...",
      });
    } else {
      // Add new grade

      const newPay = await insertPay(
        sid,
        studentID,
        feeid,
        paid,
        balance,
        status,
        term
      );
      if (newPay.affectedRows > 0) {
        res.json({
          success: true,
          message: "Payment of " + paid + " was successful",
        });
      } else {
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
};

const editPays = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editPay(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updatePays = async (req, res) => {
  const { paid } = req.body.data;
  const { amount } = req.body;
  const { id } = req.params;

  const balance = Number(amount) - Number(paid);
  const status = Number(paid) < Number(amount) ? "pending" : "complete";

  if (!amount || !id || !paid) {
    return res.json({
      success: false,
      message: "Please fill up all the fields",
    });
  } else if (isNaN(paid)) {
    return res.json({
      success: false,
      message: "Amount must be a number..",
    });
  } else if (Number(paid) > Number(amount)) {
    return res.json({
      success: false,
      message: "You have paid more than what is required..",
    });
  }

  try {
    // Check if exam exists
    const update = await updatePay(id, paid, balance, status);
    if (update) {
      res.json({
        success: true,
        message: "Payment has been updated successfully",
      });
    } else {
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
};

const deletePays = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deletePay(id);
    if (del) {
      res.json({
        success: true,
        message: "Payment deleted successfully",
      });
    } else {
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
};

// ----------------------- TEACHER SERVICE SECTION -----------------------

const tsumPayments = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const sum = await sumPayment(sid);
    if (sum) {
      return res.json({
        success: true,
        sum,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const sumtPayDisMonth = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const sum = await sumPaymentThisMonth(sid);
    if (sum) {
      return res.json({
        success: true,
        sum,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const gettTuitions = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const tuition = await getTuition(sid);
    if (tuition) {
      return res.json({
        success: true,
        tuition,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const gettOutstandings = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const outstand = await getOutstanding(sid);
    if (outstand) {
      return res.json({
        success: true,
        outstand,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const tStudentCounter = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const counter = await countStudents(sid);

    if (counter) {
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "An unknown error occurred...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const gettPays = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const pay = await getPay(sid);
    if (pay) {
      res.json({
        success: true,
        pay,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const gettFees = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const fee = await getFee(sid);
    if (fee) {
      res.json({
        success: true,
        fee,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const gettStudents = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const student = await getStudent(sid);
    if (student) {
      res.json({
        success: true,
        student,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

// ----------------------- FEE CONTROLLER -----------------------

const addFee = async (req, res) => {
  const { name, amount, description } = req.body.data;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.sid;

  try {
    if (!name || !amount || !description) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (isNaN(amount)) {
      return res.json({
        success: false,
        message: "Amount must be a number..",
      });
    }

    // Check if class exists
    const checker = await checkFee(id, name);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Fee already exists...",
      });
    } else {
      // Add new grade
      const newFee = await insertFee(id, name, amount, description);
      if (newFee) {
        res.json({
          success: true,
          message: "Fee added successfully",
        });
      } else {
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
};

const getFees = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const fee = await getFee(sid);
    if (fee) {
      res.json({
        success: true,
        fee,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const deleteFees = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteFee(id);
    if (del) {
      res.json({
        success: true,
        message: "Fee deleted successfully",
      });
    } else {
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
};

const editFees = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editFee(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateFees = async (req, res) => {
  const { id } = req.params;
  const { name, amount, description } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    // Check if exam exists
    const checker = await checkFee(sid, name);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Fee already exists...",
      });
    } else {
      const update = await updateFee(id, name, amount, description);
      if (update) {
        res.json({
          success: true,
          message: "Fee updated successfully",
        });
      } else {
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
};

const editPayment = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editPay(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
      res.json({
        success: false,
        message: "Retrieving payment data failed..",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- FEE CONTROLLER -----------------------

// ----------------------- TEACHER SERVICE SECTION -----------------------

const sumPayments = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const sum = await sumPayment(sid);
    if (sum) {
      return res.json({
        success: true,
        sum,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const sumPayDisMonth = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const sum = await sumPaymentThisMonth(sid);
    if (sum) {
      return res.json({
        success: true,
        sum,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getTuitions = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const tuition = await getTuition(sid);
    if (tuition) {
      return res.json({
        success: true,
        tuition,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getOutstandings = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const outstand = await getOutstanding(sid);
    if (outstand) {
      return res.json({
        success: true,
        outstand,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const PaidByDaysPerTerm = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const paid = await PaidByDays(sid);
    if (paid) {
      return res.json({
        success: true,
        paid,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const PaidByClasses = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const paid = await PaidByClass(sid);
    if (paid) {
      return res.json({
        success: true,
        paid,
      });
    } else {
      return res.json({
        success: false,
        message: "No records found...",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- PAYMENT CONTROLLER -----------------------

// ----------------------- ENTRY CONTROLLER -----------------------

const getExamsTeacher = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const exam = await getExamByTeacherID(sid);
    if (exam) {
      return res.json({
        success: true,
        exam,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getYearsTeacher = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const yt = await getYearByTeacherID(sid);
    if (yt) {
      return res.json({
        success: true,
        yt,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getTermsTeacher = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const tt = await getTermByTeacherID(sid);
    if (tt) {
      return res.json({
        success: true,
        tt,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getClassesTeacher = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherID = decoded.teacherid;
  try {
    const ct = await getClassByTeacherID(sid, teacherID);
    if (ct) {
      res.json({
        success: true,
        ct,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getSubjectsTeacher = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherID = decoded.teacherid;
  try {
    const st = await getSubjectByTeacherID(sid, teacherID, id);
    if (st) {
      res.json({
        success: true,
        st,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getStudentFilter = async (req, res) => {
  const { selectedClass } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    if (!selectedClass) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }
    const filter = await getStudentForEntry(sid, selectedClass);
    if (filter) {
      if (filter.length === 0) {
        return res.json({
          success: false,
          message: "Students not found!",
        });
      }
      res.json({
        success: true,
        filter,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

// Get Today's Date
const todayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const insertResults = async (req, res) => {
  const studentData = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  // Get the Term as of today
  const term = await getTerm();
  if (term && term.length > 0) {
    const tdate = new Date(todayDate()); // Ensure todayDate is a Date object

    for (const tr of term) {
      if (tdate >= new Date(tr.start_date) && tdate <= new Date(tr.end_date)) {
        const termid = tr.id;

        let allResults = [];
        try {
          for (const entry of studentData) {
            if (
              !entry.selectedClass ||
              !entry.typeid ||
              !entry.id ||
              !entry.selectedSubject
            ) {
              return res.json({
                success: false,
                message: "Please fill up all the fields",
              });
            } else if (Number(entry.score) > 100) {
              return res.json({
                success: false,
                message: "Score can not be over 100..",
              });
            } else {
              const check = await checkResult(sid, termid, entry);
              if (check) {
                allResults.push({
                  success: false,
                  message: `Result for student ${entry.id} already exists.`,
                });
                continue;
              } else {
                const venom = "JCE";
                const carnage = "MSCE";
                const getClass = await getClassById(entry.selectedClass);
                if (getClass) {
                  if (getClass.denom === venom) {
                    const getDenom = await getGradeByDenom(venom);
                    if (getDenom) {
                      let grade = ""; // Declare grade and remarks outside the loop
                      let remarks = "";

                      for (const gr of getDenom) {
                        if (
                          Number(entry.score) >= gr.floor &&
                          Number(entry.score) <= gr.roof
                        ) {
                          grade = gr.grade; // Assign values to grade and remarks
                          remarks = gr.remark;
                          break; // Break the loop once the grade is found
                        }
                      }

                      if (grade && remarks) {
                        // Insert Results
                        const add = await insertResult(
                          sid,
                          termid,
                          grade,
                          remarks,
                          entry
                        );
                        if (add) {
                          allResults.push({
                            success: true,
                            message: `Result for student ${entry.id} inserted successfully.`,
                          });
                        } else {
                          allResults.push({
                            success: false,
                            message: `failed to insert result for student ${entry.id}.`,
                          });
                        }
                      } else {
                        allResults.push({
                          success: false,
                          message: `No valid grade found for score of student ${entry.id}.`,
                        });
                      }
                    }
                  } else {
                    const getDenom = await getGradeByDenom(carnage);
                    if (getDenom) {
                      let grade = ""; // Declare grade and remarks outside the loop
                      let remarks = "";

                      for (const gr of getDenom) {
                        if (
                          Number(entry.score) >= gr.floor &&
                          Number(entry.score) <= gr.roof
                        ) {
                          grade = gr.grade; // Assign values to grade and remarks
                          remarks = gr.remark;
                          break; // Break the loop once the grade is found
                        }
                      }

                      if (grade && remarks) {
                        // Insert Results
                        const add = await insertResult(
                          sid,
                          termid,
                          grade,
                          remarks,
                          entry
                        );
                        if (add) {
                          allResults.push({
                            success: true,
                            message: `Result for student ${entry.id} inserted successfully.`,
                          });
                        } else {
                          allResults.push({
                            success: false,
                            message: `failed to insert result for student ${entry.id}.`,
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
            const anySuccess = allResults.some(
              (result) => result.success === true
            );

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
    }
  } else {
    console.error("No term data available");
  }
};

// ----------------------- ENTRY CONTROLLER -----------------------

// ----------------------- FILTER CONTROLLER -----------------------

const getXs = async (req, res) => {
  const { termid, typeid, selectedClass, selectedSubject } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    if (!termid || !typeid || !selectedSubject || !selectedClass) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }
    const x = await getX(sid, termid, typeid, selectedClass, selectedSubject);

    if (x) {
      if (x.length === 0) {
        return res.json({
          success: false,
          message: "Students not found!",
        });
      }
      res.json({
        success: true,
        x,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getScores = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await getScore(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const deleteResults = async (req, res) => {
  const { yearid, termid, typeid, selectedClass, selectedSubject } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    if (!yearid || !termid || !typeid || !selectedClass || !selectedSubject) {
      return res.json({
        success: false,
        message: "Please filter first then delete the result",
      });
    }

    // Fecthing data
    const deleteRep = await deleteResult(
      yearid,
      termid,
      typeid,
      selectedClass,
      selectedSubject,
      sid
    );
    if (deleteRep) {
      return res.json({
        success: true,
        message: "Result deleted successfully",
      });
    }
    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const updateScores = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body.data;
  const { classID } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    if (!score) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    } else if (Number(score) > 100) {
      return res.json({
        success: false,
        message: "Score can not be over 100..",
      });
    } else {
      const venom = "JCE";
      const carnage = "MSCE";
      const getClass = await getClassById(classID);
      if (getClass) {
        if (getClass.denom === venom) {
          const getDenom = await getGradeByDenom(venom);
          if (getDenom) {
            let grade = "";
            let remarks = "";

            for (const gr of getDenom) {
              if (Number(score) >= gr.floor && Number(score) <= gr.roof) {
                grade = gr.grade;
                remarks = gr.remark;
                break;
              }
            }

            if (grade && remarks) {
              // Insert Results
              const add = await updateScore(id, score, grade, remarks);
              if (add) {
                return res.json({
                  success: true,
                  message: `Result for student update successfully.`,
                });
              } else {
                return res.json({
                  success: false,
                  message: `failed to update result for student.`,
                });
              }
            } else {
              return res.json({
                success: false,
                message: `No valid grade found for score of student.`,
              });
            }
          }
        } else {
          const getDenom = await getGradeByDenom(sid, carnage);
          if (getDenom) {
            let grade = "";
            let remarks = "";

            for (const gr of getDenom) {
              if (Number(score) >= gr.floor && Number(score) <= gr.roof) {
                grade = gr.grade; // Assign values to grade and remarks
                remarks = gr.remark;
                break; // Break the loop once the grade is found
              }
            }

            if (grade && remarks) {
              // Insert Results
              const add = await updateScore(sid, score, grade, remarks);
              if (add) {
                return res.json({
                  success: true,
                  message: `Result for student update successfully.`,
                });
              } else {
                return res.json({
                  success: false,
                  message: `failed to update result for student .`,
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
};

// ----------------------- FILTER CONTROLLER -----------------------

// ----------------------- TEACHER CLASS CONTROLLER -----------------------
const getClassStudents = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherid = decoded.teacherid;
  try {
    const cs = await getClassStudent(sid, teacherid);
    if (cs) {
      if (cs.length === 0) {
        return res.json({
          success: false,
          message: "Students not found!",
        });
      }
      res.json({
        success: true,
        cs,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getSingleStud = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const studentid = await getSingleStudent(sid, id);
    if (studentid) {
      res.json({
        success: true,
        studentid,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getFinancial = async (req, res) => {
  const { id } = req.params;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const payee = await getPayee(sid, id);
    if (payee) {
      res.json({
        success: true,
        payee,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
// ----------------------- TEACHER CLASS CONTROLLER -----------------------

// ----------------------- TEACHER DASHBOARD CONTROLLER -----------------------
const getSingleTeacher4Dashboard = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const id = decoded.teacherid;
  try {
    const teacher = await getSingleTeacher(sid, id);
    if (teacher) {
      res.json({
        success: true,
        teacher,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getClassNSubjects = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const id = decoded.teacherid;
  try {
    const CnS = await getClassNSubject(sid, id);
    if (CnS) {
      res.json({
        success: true,
        CnS,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const dashboardClassTeachers = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const id = decoded.teacherid;
  try {
    const dct = await dashboardClassTeacher(sid, id);
    if (dct) {
      res.json({
        success: true,
        dct,
      });
      return;
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};
// ----------------------- TEACHER DASHBOARD CONTROLLER -----------------------

// ----------------------- CHART CONTROLLER -----------------------

const getGenderPieTeacher = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherid = decoded.teacherid;

  try {
    const CnS = await getClassNSubject(sid, teacherid);

    if (CnS) {
      for (const item of CnS) {
        const classid = item.id;
        const gender = await getStudentByGender(sid, classid);

        // Send the response once after collecting all data
        if (gender) {
          return res.json({
            success: true,
            gender,
          });
        }
      }
    } else {
      return res.json({
        success: false,
        message: "No classes or subjects found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getTopStudents = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherid = decoded.teacherid;

  try {
    const CnS = await getClassNSubject(sid, teacherid);
    const topStudents = []; // Collect top students here

    if (CnS) {
      for (const item of CnS) {
        const classid = item.id;
        const top = await getTopStudent(sid, teacherid, classid); // Make sure to await if it's async

        topStudents.push({
          top: top || "No top student", // Handle no top student case
        });
      }

      // Send the response once after collecting all data
      res.json({
        success: true,
        topStudents,
      });
    } else {
      res.json({
        success: false,
        message: "No classes or subjects found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const getAverageScoreBySubject = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherid = decoded.teacherid;

  try {
    const CnS = await getClassNSubject(sid, teacherid);
    const topSubject = [];

    if (CnS) {
      for (const item of CnS) {
        const classid = item.id;
        const subject = await getAggScoreBySUbject(sid, teacherid, classid); // Make sure to await if it's async

        topSubject.push({
          subject: subject || "No subject found", // Handle no top student case
        });
      }

      // Send the response once after collecting all data
      res.json({
        success: true,
        topSubject,
      });
    } else {
      res.json({
        success: false,
        message: "No classes or subjects found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

const countStudentByTeacher = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  const teacherid = decoded.teacherid;

  try {
    const CnS = await getClassNSubject(sid, teacherid);
    const counter = [];

    if (CnS) {
      for (const item of CnS) {
        const classid = item.id;
        const count = await countStudentByAssign(sid, teacherid, classid);

        counter.push({
          count: count || "No students found", // Handle no top student case
        });
      }

      // Send the response once after collecting all data
      res.json({
        success: true,
        counter,
      });
    } else {
      res.json({
        success: false,
        message: "No classes or subjects found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

// ----------------------- CHART CONTROLLER -----------------------

// ---------------------- REPORT CONTROLLER -----------------------

const updatePromotions = async (req, res) => {
  const { studentIDs, currentClass, nextClass, nextYear } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  const status = "promoted";

  try {
    const update = await upperPromote(status, currentClass, studentIDs);
    if (update) {
      const insert = await insertStudentHistory(
        sid,
        nextYear,
        nextClass,
        studentIDs
      );
      if (insert) {
        res.json({
          success: true,
          message: "Promotion successful",
        });
        return;
      }
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getReport = async (req, res) => {
  const { termid, typeid, classid } = req.body.data;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!termid || !typeid || !classid) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    const venom = "JCE";
    const getClass = await getClassById(classid);

    if (getClass) {
      if (getClass.denom === venom) {
        const codes = await getReportByStudent(sid, termid, typeid, classid);
        if (codes) {
          // Transform data to be used in frontend
          const subjectsSet = new Set();
          const studentsMap = new Map();

          codes.forEach((row) => {
            // Collect unique subjects
            subjectsSet.add(row.subject_name);

            // Collect student data with scores
            if (!studentsMap.has(row.studentid)) {
              studentsMap.set(row.studentid, {
                student_id: row.studentid,
                rank: row.ranko,
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
          message: "No records found",
        });
      } else {
        const codes = await getReportByStudentMSCE(
          sid,
          termid,
          typeid,
          classid
        );
        if (codes) {
          // Transform data to be used in frontend
          const subjectsSet = new Set();
          const studentsMap = new Map();

          codes.forEach((row) => {
            // Collect unique subjects
            subjectsSet.add(row.subject_name);

            // Collect student data with scores
            if (!studentsMap.has(row.studentid)) {
              studentsMap.set(row.studentid, {
                student_id: row.studentid,
                rank: row.ranko,
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
          message: "No records found",
        });
      }
    }

    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const insertPromotion = async (req, res) => {
  const { termid, typeid, classid } = req.body.data;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  if (!termid || !typeid || !classid) {
    return res.json({
      success: false,
      message: "Please fill in the blank fields",
    });
  }

  try {
    // Get End Of Term

    const venom = "JCE";
    const getClass = await getClassById(classid);

    if (!getClass) {
      return res.json({ success: false, message: "No records found" });
    }

    const getReport = getClass.denom === venom ? getReportByStudent : getReportByStudentMSCE;
    const codes = await getReport(sid, termid, typeid, classid);

    if (!codes || codes.length === 0) {
      return res.json({ success: false, message: "No records found" });
    }

    // Transform data to be used in frontend
    const studentsMap = new Map();
    codes.forEach((row) => {
      if (!studentsMap.has(row.studentid)) {
        studentsMap.set(row.studentid, {
          student_id: row.studentid,
          rank: row.ranko,
          agg: row.aggregate,
        });
      }
    });

    const students = Array.from(studentsMap.values());

    if (!students.length) {
      return res.status(400).json({ message: "Invalid students array" });
    }

    let remark = "";
    const studentIDs = students.map((student) => student.student_id);
    const aggregate = students.map((student) => student.agg);
    const count = await countSubjects(termid, typeid, classid, studentIDs, sid);

    if (count[0].count < 6) {
      remark = "failed";
    } else {
      if (
        getClass.denom === venom
          ? count[0].count >= 6
          : Math.max(...aggregate.map(Number)) <= 48
      ) {
        remark = "Passed";
      } else {
        remark = "failed";
      }
    }

    const exists = await checkPromote(sid, termid, typeid, classid, studentIDs);
    if (exists.exist === 1) {
      const updatePromises = students.map((student) =>
        updatePromote(
          sid,
          termid,
          typeid,
          classid,
          student.student_id,
          parseInt(student.agg, 10),
          remark,
          parseInt(student.rank, 10)
        )
      );

      await Promise.all(updatePromises);
      return res
        .status(201)
        .json({ message: "Students promotion updated successfully" });
    } else {
      const insertPromises = students.map((student) =>
        addPromote(
          sid,
          termid,
          typeid,
          classid,
          student.student_id,
          parseInt(student.agg, 10),
          remark,
          parseInt(student.rank, 10)
        )
      );

      await Promise.all(insertPromises);
      return res
        .status(201)
        .json({ message: "Students promoted successfully" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getStudentPromos = async (req, res) => {
  const { data } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  if (!data) {
    res.json({
      success: false,
      message: "Please select a valid class",
    });
  }

  try {
    const info = await getStudentForPromotion(data, sid);
    if (info) {
      res.json({
        success: true,
        info,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getStudentReport = async (req, res) => {
  const { termid, typeid, classid, id } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!termid || !typeid || !classid || !id) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    const venom = "JCE";
    const getClass = await getClassById(classid);

    if (getClass) {
      if (getClass.denom === venom) {
        // Fecthing data
        const studentInfo = await getStudentCard(
          sid,
          termid,
          typeid,
          classid,
          id
        );
        if (studentInfo) {
          return res.json({
            success: true,
            studentInfo,
          });
        }
        return res.json({
          success: false,
          message: "No records found",
        });
      } else {
        // Fecthing data
        const studentInfo = await getStudentCardMSCE(
          sid,
          termid,
          typeid,
          classid,
          id
        );
        if (studentInfo) {
          return res.json({
            success: true,
            studentInfo,
          });
        }
        return res.json({
          success: false,
          message: "No records found",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getCount = async (req, res) => {
  const { termid, typeid, classid } = req.body.data;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!termid || !typeid || !classid) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Fecthing data
    const count = await countResult(sid, termid, typeid, classid);
    if (count) {
      return res.json({
        success: true,
        count,
      });
    }
    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getCT4Report = async (req, res) => {
  const { classid } = req.body.data;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!classid) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Fecthing data
    const ct = await getClassTeacher4Report(classid, sid);
    if (ct) {
      return res.json({
        success: true,
        ct,
      });
    }
    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getSubjectPos = async (req, res) => {
  const { termid, typeid, classid, id } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!termid || !typeid || !classid) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Fecthing data
    const pos = await getSubjectPosition(termid, typeid, classid, sid, id);
    console.log(pos);
    if (pos) {
      return res.json({
        success: true,
        pos,
      });
    }
    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const realPosition = async (req, res) => {
  const { termid, typeid, classid, id } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!termid || !typeid || !classid) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
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
        position: validPositions,
      });
    }

    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getTByS = async (req, res) => {
  const { id } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

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
        info: teacherName,
      });
    }

    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getRemarksByClassID = async (req, res) => {
  const { id } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  const classid = Number(id);
  try {
    if (!id) {
      return res.json({
        success: false,
        message: "Please fill up all the fields",
      });
    }

    // Fecthing data
    const getDenom = await getClassById(sid, classid);
    if (getDenom) {
      const denom = getDenom.denom;
      const remarks = await getRemarks(denom, sid);
      if (remarks) {
        return res.json({
          success: true,
          remarks,
        });
      }
      return res.json({
        success: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const deleteReports = async (req, res) => {
  const { yearid, termid, typeid, classid } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!yearid || !termid || !typeid || !classid) {
      return res.json({
        success: false,
        message: "Please filter first then delete the report",
      });
    }

    // Fecthing data
    const deleteRep = await deleteReport(yearid, termid, typeid, classid, sid);
    if (deleteRep) {
      return res.json({
        success: true,
        message: "Report deleted successfully",
      });
    }
    return res.json({
      success: false,
      message: "No records found",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const countTermlyReports = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const counter = await countReports(sid);
    if (counter) {
      return res.json({
        success: true,
        counter,
      });
    } else {
      return res.json({
        success: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getBestStudents = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    const best = await bestStudents(sid);
    if (best.length > 0) {
      return res.json({
        success: true,
        best,
      });
    } else {
      return res.json({
        success: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getWorstStudents = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    const worst = await worstStudents(sid);
    if (worst) {
      return res.json({
        success: true,
        worst,
      });
    } else {
      return res.json({
        success: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const avSubjectbyClassID = async (req, res) => {
  const { classID } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    const get = await avSubByClass(sid, classID);
    if (get) {
      res.json({
        success: true,
        get,
      });
    } else {
      res.json({
        success: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- REPORT CONTROLLER -----------------------

// ----------------------- EVENT CONTROLLER -----------------------

const insertEvent = async (req, res) => {
  const { title, date, time, location, description } = req.body.data;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  try {
    if (!title || !date || !time || !location || !description) {
      return res.json({
        success: false,
        message: "Please fill in the required fields",
      });
    }

    // Check Event if exists
    const checker = await checkEvent(sid, title, date);
    if (checker.length > 0) {
      res.json({
        success: false,
        message: "Event already exists in the system",
      });
    }

    // Insert New Event
    const inserto = await addEvent(
      sid,
      title,
      date,
      time,
      location,
      description
    );
    if (inserto) {
      res.json({
        success: true,
        message: "Event added succesfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getEvent = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  try {
    const event = await getEvents(sid);
    if (event) {
      return res.json({
        event,
      });
    } else {
      return res.json({
        success: false,
        message: "failed fetching events",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const editEvents = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editEvent(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updateEvents = async (req, res) => {
  const { id } = req.params;
  const { title, date, time, location, description } = req.body;

  try {
    // Check if events exists
    const update = await updateEvent(
      id,
      title,
      date,
      time,
      location,
      description
    );
    if (update) {
      res.json({
        success: true,
        message: "Event updated successfully",
      });
    } else {
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
};

const deleteEvents = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteEvent(id);
    if (del) {
      res.json({
        success: true,
        message: "Deleted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Deletion failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- EVENT CONTROLLER -----------------------

// ----------------------- SUPER ADMIN CONTROLLER -----------------------

const addSubscriptions = async (req, res) => {
  const {
    name,
    price,
    max,
    pilot_price,
    pilot_discount_percentage,
    pilot_initial_payment_percentage,
    pilot_enabled,
    max_students,
    duration_months,
    is_active
  } = req.body;

  try {
    if (!name || !price || !max) {
      return res.json({
        success: false,
        message: "Please fill up all the required fields",
      });
    }

    const insert = await insertFeatures(
      name,
      price,
      max,
      pilot_price || null,
      pilot_discount_percentage || 50.00,
      pilot_initial_payment_percentage || 33.33,
      pilot_enabled || false,
      max_students || null,
      duration_months || 12,
      is_active !== undefined ? is_active : true
    );

    if (insert === true) {
      return res.json({
        success: true,
        message: "Subscription plan added successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "failed to add subscription plan",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: "Internal Server Error. Please try again later.",
    });
  }
};

const gotSubscriptions = async (req, res) => {
  try {
    const plan = await getSubscriptions();
    if (plan) {
      res.json({
        success: true,
        plan,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching subscriptions",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// New endpoint for public pricing data (for landing page and pricing page)
const getPublicPricingPlans = async (req, res) => {
  try {
    const plans = await getSubscriptions();
    if (plans && plans.length > 0) {
      // Format the data for public consumption
      const formattedPlans = plans.map(plan => ({
        id: plan.id,
        name: plan.name,
        price: plan.price,
        pilot_price: plan.pilot_price,
        features: plan.features ? plan.features.split(', ') : [],
        max_students: plan.max_students,
        duration_months: plan.duration_months,
        pilot_discount_percentage: plan.pilot_discount_percentage,


        // Calculate derived fields
        pricePerStudent: plan.max_students ? Math.round(plan.price / plan.max_students) : 0,
        students: plan.max_students ? `Up to ${plan.max_students}` : 'Unlimited',
        studentCount: plan.max_students || 'Unlimited',
        popular: plan.name === 'Professional', // Mark Professional as popular
        description: plan.name === 'Starter' ? 'Perfect for small schools and academies' :
          plan.name === 'Professional' ? 'Ideal for growing educational institutions' :
            plan.name === 'Enterprise' ? 'Comprehensive solution for large institutions' :
              'complete school management solution'
      }));

      res.json({
        success: true,
        plans: formattedPlans,
        message: "Pricing plans retrieved successfully"
      });
    } else {
      res.json({
        success: false,
        message: "No pricing plans found",
        plans: []
      });
    }
  } catch (error) {
    console.error('Error fetching public pricing plans:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const del = await deleteSubscription(id);
    if (del) {
      res.json({
        success: true,
        message: "Subscription deleted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Deletion failed",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const editPlans = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editPlan(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
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
};

const updatePlans = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    max,
    pilot_price,
    pilot_discount_percentage,
    pilot_initial_payment_percentage,
    pilot_enabled,
    max_students,
    duration_months,
    is_active
  } = req.body;

  try {
    const now = new Date();
    const updateAt = now.toLocaleString();

    const update = await updatePlan(
      id,
      name,
      price,
      max,
      pilot_price || null,
      pilot_discount_percentage || 50.00,
      pilot_initial_payment_percentage || 33.33,
      pilot_enabled || false,
      max_students || null,
      duration_months || 12,
      is_active !== undefined ? is_active : true,
      updateAt
    );

    if (update) {
      res.json({
        success: true,
        message: "Subscription Plan updated successfully",
      });
    } else {
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
};

// ----------------------- SUPER ADMIN CONTROLLER -----------------------

// ----------------------- SUBSCRIPTION CONTROLLER -----------------------

const SubsByID = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  try {
    const subs = await checkSubsByID(sid);
    if (subs) {
      res.json({
        success: true,
        subs,
      });
    } else {
      res.json({
        success: false,
        message: "Retrieving subscription data failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const gotSubs = async (req, res) => {
  const { plan } = req.params;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  try {
    // Check if school has an approved pilot program
    const pilotProgram = await getPilotProgramBySchoolId(sid);
    if (pilotProgram && (pilotProgram.status === 'active')) {
      const data = await getSubs(plan);
      if (data === false) {
        return res.json({ message: "No subscription plan found." });
      }

      return res.json({
        success: true,
        hasPilotProgram: true,
        data,
      });
    } else {
      // Handle regular subscription (non-pilot program)
      const data = await getSubs(plan);
      if (data === false) {
        return res.json({ 
          success: false,
          message: "No subscription plan found." 
        });
      }

      return res.json({
        success: true,
        hasPilotProgram: false,
        data,
      });
    }
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error." 
    });
  }
};

const cancSubscription = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  const status = "cancelled";
  const billing_status = "suspended";

  const checker = await checkSubToCancel(sid);
  if (checker) {
    const subscriptionID = checker.id;

    // Cancel Subscription
    const result = await cancelSubscription(status, sid);
    if (result) {
      // Cancel Billing
      const billing = await cancelBilling(billing_status, subscriptionID);
      if (billing) {
        return res.json({
          success: true,
          message: "Your subscription has been cancelled successfully.",
        });
      } else {
        return res.json({
          success: false,
          message: "failed to cancel subscription",
        });
      }
    }
  }
};

const insertSubscription = async (req, res) => {
  const { subscriptionName, grandTotal, billingCycle } = req.body;
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  const status = "pending";
  const billing_status = "pending";
  const amount = Number(parseFloat(grandTotal).toFixed(0));

  // Calculate expiry time (24 hours from now)
  // Get the Term as of today
  const term = await getTerm();
  if (term && term.length > 0) {
    const tdate = new Date(todayDate()); // Ensure todayDate is a Date object

    for (const tr of term) {
      if (tdate >= new Date(tr.start_date) && tdate <= new Date(tr.end_date)) {
        const expiryTime = tr.end_date; // Use the end date of the current term as expiry

        const response = await getSubs(subscriptionName);
        if (response) {
          const planID = response.id;

          // Check Subscription
          const checker = await checkSubscription(sid);
          if (checker.length > 0) {
            res.json({
              success: false,
              message: "You already have an active subscription",
            });
          } else {
            // Insert Subscription
            const newId = uuidv4();
            const result = await addSubscription(
              newId,
              sid,
              planID,
              status,
              billingCycle
            );
            if (result) {
              //     // Insert Billing
              const billing = await addBilling(
                newId,
                amount,
                billing_status,
                expiryTime
              );
              if (billing) {
                // Get school information for email notification
                try {
                  const schoolInfo = await editSchool(sid);
                  if (schoolInfo) {
                    const paymentData = {
                      schoolName: schoolInfo.name,
                      schoolEmail: schoolInfo.email,
                      schoolContact: schoolInfo.contact,
                      subscriptionName,
                      grandTotal,
                      billingCycle
                    };
                    // Send email notification to super-admin
                    await sendSuperAdminNotification(paymentData);
                  }
                } catch (emailError) {
                  console.error('Error sending super admin notification:', emailError);
                  // Don't fail the request if email fails
                }
                
                return res.json({
                  success: true,
                  message:
                    "Your subscription is set to pending waiting for confirmation.",
                });
              } else {
                return res.json({
                  success: false,
                  message: "failed to add subscription",
                });
              }
            }
          }
        }
      }
    }
  }
};

const checkSubStatus = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;
  try {
    const status = await checkSubscriptionStatus(sid);
    if (status) {
      return res.json({
        success: true,
        status,
      });
    } else {
      return res.json({
        success: false,
        message: "No records found",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const checkPaidStatus = async (req, res) => {
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  const status = "active";

  try {
    const checker = await checkPaid(sid, status);
    if (checker.length > 0) {
      // If no pilot program found, return normal success
      return res.json({
        success: true,
      });
    } else {
      // Check if school has an approved pilot program
      const pilotProgram = await getPilotProgramBySchoolId(sid);
      if (pilotProgram && (pilotProgram.status === 'approved' || pilotProgram.status === 'active')) {
        return res.json({
          hasPilotProgram: true,
          redirectTo: `/invoicing/${pilotProgram.pilot_plan_name}`
        });
      } else {
        return res.json({
          success: false,
        });
      }
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const updateSuspended = async (req, res) => {
  const { status } = req.body;

  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  try {
    const update = await updateSubscriptionStatus(status, sid);
    if (update) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const gotSubscriptionPayments = async (req, res) => {
  try {
    const result = await getSubscriptionPayments();
    if (result) {
      res.json({
        success: true,
        result,
      });
    } else {
      res.json({
        success: false,
        message: "failed to fetch payments",
      });
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const updateStatuses = async (req, res) => {
  const { status, bill } = req.body;
  const { id } = req.params;

  try {
    // Validate input
    if (!id || !status || !bill) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: id, status, or bill",
      });
    }

    // Update subscription status
    const resultOne = await updateSubStatus(id, bill);
    if (!resultOne) {
      return res.status(500).json({
        success: false,
        message: "failed to update subscription status",
      });
    }

    // Update billing status
    const resultTwo = await updateBillingStatus(id, status);
    if (!resultTwo) {
      return res.status(500).json({
        success: false,
        message: "failed to update billing status",
      });
    }

    // Send email notification to school if payment is approved
    if (status === "paid" || bill === "active") {
      try {
        // Get subscription details to find school information
        const subscriptionDetails = await getSubscriptionByID(id);
        if (subscriptionDetails) {
          const subscription = subscriptionDetails;
          const schoolInfo = await editSchool(subscription.sid);
          if (schoolInfo) {
            const paymentData = {
              schoolName: schoolInfo.name,
              schoolEmail: schoolInfo.email,
              schoolContact: schoolInfo.contact,
              subscriptionName: subscription.plan || "Premium Plan",
              grandTotal: subscription.amount || "0",
              billingCycle: subscription.period || "Termly"
            };
            // Send approval email to school
            await sendSchoolApprovalEmail(paymentData);
          }
        }
      } catch (emailError) {
        console.error('Error sending school approval email:', emailError);
        // Don't fail the request if email fails
      }
    }

    // Success response
    return res.json({
      success: true,
      message: "Payment was successful",
    });
  } catch (error) {
    console.error("Error updating statuses:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// Real-time payment status endpoint for polling
const getRealTimePaymentStatus = async (req, res) => {
  const token = req.cookies.schoolToken;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sid = decoded.id;
    
    const status = await checkResentSubscriptionStatus(sid);
    if (status) {
      return res.json({
        success: true,
        status: status,
        timestamp: new Date().toISOString()
      });
    } else {
      return res.json({
        success: false,
        message: "No subscription found"
      });
    }
  } catch (error) {
    console.error("Error checking real-time status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
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
        message: "Missing required parameters: id, status",
      });
    }

    // Update subscription status
    const resultOne = await updateSchoolStatus(id, status);
    if (resultOne.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: "failed to update school status",
      });
    }

    // Success response
    return res.json({
      success: true,
      message: "School has been activated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- SUBSCRIPTION CONTROLLER -----------------------

// ----------------------- SUBSCRIBE CONTROLLER -----------------------

const addSubscriber = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.json({
        success: false,
        message: "Please provide an email address",
      });
    }

    const check = await checkSubscribe(email);
    if (check.length !== 0) {
      return res.json({
        success: false,
        message: "You are already subscribed",
      });
    } else {
      const subscriber = await addSubscribe(email);
      if (subscriber) {
        return res.json({
          success: true,
          message: "You have been subscribed successfully",
        });
      } else {
        return res.json({
          success: false,
          message: "failed to subscribe. Please try again later",
        });
      }
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- SUBSCRIBE CONTROLLER -----------------------

// ----------------------- FEEDBACK CONTROLLER -----------------------

const insertFeedback = async (req, res) => {
  const { rating, selectedOption, comment } = req.body;
  const token = req.cookies.schoolToken || req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id || decoded.sid;

  try {
    if (!rating || !selectedOption || !comment) {
      return res.json({
        success: false,
        message: "Please fill in the blank fields",
      });
    }

    const feedback = await addFeedback(sid, rating, selectedOption, comment);
    if (feedback) {
      return res.json({
        success: true,
        message: "Feedback submitted successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "failed to submit feedback",
      });
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getFeedbackRating = async (req, res) => {
  try {
    const rate = "5";
    const rating = await getFeedbackByRating(rate);
    if (rating) {
      return res.json({
        success: true,
        rating,
      });
    } else {
      return res.json({
        success: false,
        message: "failed to fetch feedback",
      });
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getFeedbacko = async (req, res) => {
  try {
    const feedback = await getFeedback();
    if (feedback) {
      return res.json({
        success: true,
        feedback,
      });
    } else {
      return res.json({
        success: false,
        message: "failed to fetch feedback",
      });
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

// ----------------------- FEEDBACK CONTROLLER -----------------------

// ----------------------- EXPENSE CONTROLLER -----------------------
const insertExpense = async (req, res) => {
  const { date, description, category, amount } = req.body;
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  const todayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  try {
    if (!date || !description || !category || !amount) {
      return res.json({
        success: false,
        message: "Please fill in the blank fields",
      });
    }

    // Get the Term as of today
    const term = await getTerm();
    if (term && term.length > 0) {
      const tdate = new Date(todayDate()); // Ensure todayDate is a Date object

      for (const tr of term) {
        if (
          tdate >= new Date(tr.start_date) &&
          tdate <= new Date(tr.end_date)
        ) {
          const termid = tr.id;

          const add = await addExpense(
            termid,
            sid,
            date,
            description,
            category,
            amount
          );
          if (add) {
            return res.json({
              success: true,
              message: "Expense submitted successfully, waiting for approval",
            });
          } else {
            return res.json({
              success: false,
              message: "failed to submit expense",
            });
          }
        }
      }
    }
  } catch (error) {
    return res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getExpenses = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    const expense = await getExpense(sid);
    if (expense) {
      res.json({
        success: true,
        expense,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching expense",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getAdminExpenses = async (req, res) => {
  const token = req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.id;

  try {
    const expense = await getExpense(sid);
    if (expense) {
      res.json({
        success: true,
        expense,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching expense",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const updateStatusEx = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    // Validate input
    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: id, status",
      });
    }

    // Update subscription status
    const resultOne = await updateStatusExpense(id, status);
    if (resultOne.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: "failed to update expense status",
      });
    }

    // Success response
    if (status === "approved") {
      return res.json({
        success: true,
        message: "Expense has been approved successfully",
      });
    } else {
      return res.json({
        success: true,
        message: "Expense has been unapproved successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const sumExpenses = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    const sum = await sumExpense(sid);
    if (sum) {
      res.json({
        success: true,
        sum,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching expense",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const countExpenses = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    const count = await countExpense(sid);
    if (count) {
      res.json({
        success: true,
        count,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching expense",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const AvgMonthly = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;

  try {
    const avg = await monthlyAverage(sid);
    if (avg) {
      res.json({
        success: true,
        avg,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching expense",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const Transactions = async (req, res) => {
  const token = req.cookies.teacherToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid;
  try {
    const trans = await getTransactions(sid);
    if (trans) {
      res.json({
        success: true,
        trans,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching transactions",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const getChartLiner = async (req, res) => {
  const token = req.cookies.teacherToken || req.cookies.schoolToken;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const sid = decoded.sid || decoded.id;

  try {
    const line = await getLineChart(sid);
    if (line) {
      res.json({
        success: true,
        line,
      });
    } else {
      res.json({
        success: false,
        message: "failed fetching chart",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const deleteExpenses = async (req, res) => {
  const { id } = req.params;

  try {
    const del = await deleteExpense(id);
    if (del) {
      res.json({
        success: true,
        message: "Expense deleted successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Deletion failed",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const editExpenses = async (req, res) => {
  const { id } = req.params;
  try {
    const edit = await editExpense(id);
    if (edit) {
      res.json({
        success: true,
        edit,
      });
    } else {
      res.json({
        success: false,
        message: "Retrieving expense data failed..",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};

const updateExpenses = async (req, res) => {
  const { id } = req.params;
  const { date, description, category, amount } = req.body;

  try {
    const update = await updateExpense(id, date, description, category, amount);
    if (update) {
      res.json({
        success: true,
        message: "Expense updated successfully",
      });
    } else {
      res.json({
        success: false,
        message: "Expense updating failed..",
      });
    }
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      error: error.message,
    });
  }
};
// ----------------------- PARENT BOT STATISTICS CONTROLLER -----------------------

const getParentBotStats = async (req, res) => {
  try {
    const {
      getParentBotFeedback,
      getParentBotFeedbackAnalytics,
      getParentBotFeedbackByRating
    } = require('../model/apiModel.js');

    // Get overall statistics
    const today = new Date();
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get all feedback for the last month
    const allFeedback = await getParentBotFeedback(null, 1000); // Get all schools

    // Calculate overall stats
    const totalFeedback = allFeedback.length;
    const avgRating = allFeedback.length > 0 ?
      (allFeedback.reduce((sum, f) => sum + f.rating, 0) / allFeedback.length).toFixed(2) : 0;

    // Get rating distribution
    const ratingDistribution = {
      5: allFeedback.filter(f => f.rating === 5).length,
      4: allFeedback.filter(f => f.rating === 4).length,
      3: allFeedback.filter(f => f.rating === 3).length,
      2: allFeedback.filter(f => f.rating === 2).length,
      1: allFeedback.filter(f => f.rating === 1).length
    };

    // Get feedback by type
    const feedbackByType = {
      bot_experience: allFeedback.filter(f => f.feedback_type === 'bot_experience').length,
      ai_features: allFeedback.filter(f => f.feedback_type === 'ai_features').length,
      school_communication: allFeedback.filter(f => f.feedback_type === 'school_communication').length,
      student_info_access: allFeedback.filter(f => f.feedback_type === 'student_info_access').length,
      overall: allFeedback.filter(f => f.feedback_type === 'overall').length
    };

    // Get recent feedback (last 7 days)
    const recentFeedback = allFeedback.filter(f =>
      new Date(f.created_at) >= lastWeek
    );

    // Get active users (users who submitted feedback in last 7 days)
    const activeUsers = new Set(recentFeedback.map(f => f.user_id)).size;

    // Get most used features
    const allFeatures = allFeedback
      .filter(f => f.features_used)
      .flatMap(f => JSON.parse(f.features_used || '[]'));

    const featureUsage = {};
    allFeatures.forEach(feature => {
      featureUsage[feature] = (featureUsage[feature] || 0) + 1;
    });

    // Get average session duration
    const avgSessionDuration = allFeedback.length > 0 ?
      (allFeedback.reduce((sum, f) => sum + (f.session_duration || 0), 0) / allFeedback.length).toFixed(1) : 0;

    res.json({
      success: true,
      data: {
        totalFeedback,
        avgRating: parseFloat(avgRating),
        ratingDistribution,
        feedbackByType,
        recentFeedback: recentFeedback.length,
        activeUsers,
        featureUsage,
        avgSessionDuration: parseFloat(avgSessionDuration),
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting parent bot stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getParentBotFeedbackBySchool = async (req, res) => {
  try {
    const { getParentBotFeedback, getParentBotFeedbackAnalytics } = require('../model/apiModel.js');
    const { schoolId } = req.params;

    if (!schoolId) {
      return res.status(400).json({ success: false, error: 'School ID is required' });
    }

    // Get feedback for specific school
    const schoolFeedback = await getParentBotFeedback(schoolId, 100);

    // Get analytics for last 30 days
    const today = new Date();
    const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    const analytics = await getParentBotFeedbackAnalytics(
      schoolId,
      lastMonth.toISOString().split('T')[0],
      today.toISOString().split('T')[0]
    );

    res.json({
      success: true,
      data: {
        schoolId,
        feedback: schoolFeedback,
        analytics,
        totalFeedback: schoolFeedback.length
      }
    });
  } catch (error) {
    console.error('Error getting school feedback:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getParentBotRealTimeStats = async (req, res) => {
  try {
    const { getParentBotFeedback } = require('../model/apiModel.js');

    // Get feedback from last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const allFeedback = await getParentBotFeedback(null, 1000);

    const recentFeedback = allFeedback.filter(f =>
      new Date(f.created_at) >= last24Hours
    );

    // Get feedback from last hour
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    const lastHourFeedback = allFeedback.filter(f =>
      new Date(f.created_at) >= lastHour
    );

    // Calculate real-time metrics
    const realTimeStats = {
      feedbackLast24Hours: recentFeedback.length,
      feedbackLastHour: lastHourFeedback.length,
      avgRatingLast24Hours: recentFeedback.length > 0 ?
        (recentFeedback.reduce((sum, f) => sum + f.rating, 0) / recentFeedback.length).toFixed(2) : 0,
      activeUsersLast24Hours: new Set(recentFeedback.map(f => f.user_id)).size,
      recentFeedback: recentFeedback.slice(0, 10), // Last 10 feedback entries
      lastUpdated: new Date().toISOString()
    };

    res.json({
      success: true,
      data: realTimeStats
    });
  } catch (error) {
    console.error('Error getting real-time stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getParentBotNotifications = async (req, res) => {
  try {
    const { getParentBotFeedback } = require('../model/apiModel.js');

    // Get all feedback
    const allFeedback = await getParentBotFeedback(null, 1000);

    const notifications = [];

    // Check for low ratings (1-2 stars) in last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const lowRatings = allFeedback.filter(f =>
      f.rating <= 2 && new Date(f.created_at) >= last24Hours
    );

    if (lowRatings.length > 0) {
      notifications.push({
        type: 'warning',
        title: 'low Ratings Alert',
        message: `${lowRatings.length} low ratings (1-2 stars) received in the last 24 hours`,
        count: lowRatings.length,
        timestamp: new Date().toISOString(),
        data: lowRatings.slice(0, 5) // Show first 5
      });
    }

    // Check for high feedback volume
    const lastHour = new Date(Date.now() - 60 * 60 * 1000);
    const recentFeedback = allFeedback.filter(f =>
      new Date(f.created_at) >= lastHour
    );

    if (recentFeedback.length > 10) {
      notifications.push({
        type: 'info',
        title: 'high Activity',
        message: `${recentFeedback.length} feedback entries received in the last hour`,
        count: recentFeedback.length,
        timestamp: new Date().toISOString()
      });
    }

    // Check for new users (users who submitted their first feedback)
    const uniqueUsers = new Set(allFeedback.map(f => f.user_id));
    const newUsersToday = allFeedback.filter(f => {
      const userFeedback = allFeedback.filter(uf => uf.user_id === f.user_id);
      return userFeedback.length === 1 && new Date(f.created_at) >= last24Hours;
    });

    if (newUsersToday.length > 0) {
      notifications.push({
        type: 'success',
        title: 'New Users',
        message: `${newUsersToday.length} new users submitted feedback today`,
        count: newUsersToday.length,
        timestamp: new Date().toISOString()
      });
    }

    // Check for feature usage trends
    const allFeatures = allFeedback
      .filter(f => f.features_used && new Date(f.created_at) >= last24Hours)
      .flatMap(f => JSON.parse(f.features_used || '[]'));

    const featureUsage = {};
    allFeatures.forEach(feature => {
      featureUsage[feature] = (featureUsage[feature] || 0) + 1;
    });

    const mostUsedFeature = Object.keys(featureUsage).reduce((a, b) =>
      featureUsage[a] > featureUsage[b] ? a : b, 'none'
    );

    if (mostUsedFeature !== 'none') {
      notifications.push({
        type: 'info',
        title: 'Feature Usage',
        message: `Most used feature: ${mostUsedFeature} (${featureUsage[mostUsedFeature]} times)`,
        count: featureUsage[mostUsedFeature],
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: {
        notifications,
        totalNotifications: notifications.length,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error getting notifications:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// ----------------------- PARENT BOT STATISTICS CONTROLLER -----------------------

// ==================== REFERRAL SYSTEM CONTROLLERS ====================

// Create referral code for a school
const createReferralCode = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { createReferralCode: createCode } = require('../model/apiModel.js');

    const referralCodeId = await createCode(schoolId);

    res.json({
      success: true,
      message: 'Referral code created successfully',
      data: { referralCodeId }
    });
  } catch (error) {
    console.error('Error creating referral code:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get referral code for a school
const getReferralCode = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { getReferralCode: getCode } = require('../model/apiModel.js');

    const referralCode = await getCode(schoolId);

    if (!referralCode) {
      return res.json({
        success: false,
        message: 'No referral code found for this school'
      });
    }

    res.json({
      success: true,
      data: referralCode
    });
  } catch (error) {
    console.error('Error getting referral code:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Validate referral code
const validateReferralCode = async (req, res) => {
  try {
    const { referralCode } = req.body;
    const { validateReferralCode: validateCode } = require('../model/apiModel.js');

    const validation = await validateCode(referralCode);

    if (!validation) {
      return res.json({
        success: false,
        message: 'Invalid referral code'
      });
    }

    res.json({
      success: true,
      data: validation
    });
  } catch (error) {
    console.error('Error validating referral code:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Track referral usage
const trackReferralUsage = async (req, res) => {
  try {
    const { referrerSchoolId, referredSchoolId, referralCode } = req.body;
    const { trackReferralUsage: trackUsage } = require('../model/apiModel.js');

    const trackingId = await trackUsage(referrerSchoolId, referredSchoolId, referralCode);

    res.json({
      success: true,
      message: 'Referral usage tracked successfully',
      data: { trackingId }
    });
  } catch (error) {
    console.error('Error tracking referral usage:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get referral analytics for a school
const getReferralAnalytics = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { getReferralAnalytics: getAnalytics } = require('../model/apiModel.js');

    const analytics = await getAnalytics(schoolId);

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error getting referral analytics:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all referral analytics (for super admin)
const getAllReferralAnalytics = async (req, res) => {
  try {
    const { getAllReferralAnalytics: getAllAnalytics } = require('../model/apiModel.js');

    const analytics = await getAllAnalytics();

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Error getting all referral analytics:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get referral tracking records
const getReferralTracking = async (req, res) => {
  try {
    const { schoolId } = req.query;
    const { getReferralTracking: getTracking } = require('../model/apiModel.js');

    const tracking = await getTracking(schoolId);

    res.json({
      success: true,
      data: tracking
    });
  } catch (error) {
    console.error('Error getting referral tracking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Apply referral discount
const applyReferralDiscount = async (req, res) => {
  try {
    const { referralTrackingId, subscriptionAmount } = req.body;
    const { applyReferralDiscount: applyDiscount } = require('../model/apiModel.js');

    const discountAmount = await applyDiscount(referralTrackingId, subscriptionAmount);

    res.json({
      success: true,
      message: 'Referral discount applied successfully',
      data: { discountAmount }
    });
  } catch (error) {
    console.error('Error applying referral discount:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get referral settings
const getReferralSettings = async (req, res) => {
  try {
    const { getReferralSettings: getSettings } = require('../model/apiModel.js');

    const settings = await getSettings();

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error getting referral settings:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update referral settings
const updateReferralSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    const { updateReferralSettings: updateSettings } = require('../model/apiModel.js');

    await updateSettings(settings);

    res.json({
      success: true,
      message: 'Referral settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating referral settings:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {

  // ----- DISCIPLINARY EXPORTS ------
  getDisciplinaryStats,
  addDisciplinary,
  getDisciplinary,
  getDisciplinaryById,
  updateDisciplinary,
  deleteDisciplinary,
  // ----- DISCIPLINARY EXPORTS ------


  // ----- ATTENDANCE EXPORTS ------
  insertAttendance,
  // ----- ATTENDANCE EXPORTS ------


  // ----- EXPENSE EXPORTS ------
  insertExpense,
  getExpenses,
  getAdminExpenses,
  updateStatusEx,
  editExpenses,
  deleteExpenses,
  updateExpenses,
  sumExpenses,
  countExpenses,
  AvgMonthly,
  Transactions,
  getChartLiner,
  // ----- EXPENSE EXPORTS ------

  // ----- SCHOOL EXPORTS ------
  countXuls,
  countOTeachers,
  countOStudents,
  countPrivateXuls,
  countPublicXuls,
  countSubscribedXuls,
  sumAmounts,
  paymentLineChart,
  getXuls,
  // ----- SCHOOL EXPORTS ------

  // ----- LOGIN EXPORTS ------
  login,
  verify,
  tverify,
  superVerify,
  Logout,
  // ----- LOGIN EXPORTS ------

  // ----- REGISTER EXPORTS ------
  signup,
  verifyOTP,
  resendOTP,
  createResetSession,
  resetPassword,
  verifyUser,
  updateSchools,
  TeacherPasswordUpdates,
  PasswordUpdates,
  PasswordSuper,
  getAdministrator,
  updateAdministrator,
  // ----- REGISTER EXPORTS ------

  // ----- CONTACTS EXPORTS ------
  insertContacts,
  // ----- CONTACTS EXPORTS ------

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
  gettStudents,
  getSingleStudents,
  deleteStudents,
  updateStudents,
  StudentCounter,
  tStudentCounter,
  countMales,
  countFemales,
  countGenderForClass,
  genderByPercentage,
  gotStudents,
  gotCountry,
  // ----- STUDENT EXPORTS ------

  // ----- FEE EXPORTS ------
  addFee,
  getFees,
  gettFees,
  deleteFees,
  editFees,
  updateFees,
  // ----- FEE EXPORTS ------

  // ----- PAYMENT EXPORTS ------
  getPays,
  gettPays,
  getPayees,
  addPay,
  editPays,
  updatePays,
  deletePays,
  sumPayments,
  tsumPayments,
  sumPayDisMonth,
  sumtPayDisMonth,
  getTuitions,
  gettTuitions,
  getOutstandings,
  gettOutstandings,
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
  updatePromotions,
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
  getBestStudents,
  getWorstStudents,
  avSubjectbyClassID,
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
  getPublicPricingPlans,
  deletePlan,
  editPlans,
  updatePlans,
  // ----- SUPER ADMIN EXPORTS ------

  // ----- SUBSCRIPTION EXPORTS ------
  gotSubs,
  cancSubscription,
  SubsByID,
  insertSubscription,
  checkSubStatus,
  checkPaidStatus,
  updateSuspended,
  gotSubscriptionPayments,
  updateStatuses,
  updateSchoolStatuses,
  getRealTimePaymentStatus,
  // ----- SUBSCRIPTION EXPORTS ------

  // ----- SUBSCRIBE EXPORTS ------
  addSubscriber,
  // ----- SUBSCRIBE EXPORTS ------

  // ----- FEEDBACK EXPORTS ------
  insertFeedback,
  getFeedbacko,
  getFeedbackRating,
  // ----- FEEDBACK EXPORTS ------

  // ----- PARENT BOT STATISTICS EXPORTS ------
  getParentBotStats,
  getParentBotFeedbackBySchool,
  getParentBotRealTimeStats,
  getParentBotNotifications,
  // ----- PARENT BOT STATISTICS EXPORTS ------

  // ----- REFERRAL SYSTEM EXPORTS ------
  createReferralCode,
  getReferralCode,
  validateReferralCode,
  trackReferralUsage,
  getReferralAnalytics,
  getAllReferralAnalytics,
  getReferralTracking,
  applyReferralDiscount,
  getReferralSettings,
  updateReferralSettings,
  // ----- REFERRAL SYSTEM EXPORTS ------
};
