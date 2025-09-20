const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  checkSchool,
  insertSchool,
  createPilotProgram,
  checkPilotProgram,
  editPlan,
  getPilotApplications,
  getPilotPrograms,
  updatePilotApplicationStatus,
  getPilotPlanById,
  createPilotPayment,
  getPilotPayments,
  updatePilotPaymentStatus,
  createPilotMilestone,
  getPilotMilestones,
  updatePilotMilestone,
  getPilotProgramBySchoolId,
  updatePilotProgramStatus
} = require('../model/apiModel');
const {
  sendNewApplicationNotification,
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
  sendPaymentReceivedEmail,
  sendAdminNotification,
  sendApplicationReceivedEmail
} = require('../emails/pilotProgramEmail');

/**
 * Creates a new pilot program application with all required steps
 * @param {Object} params - Application parameters
 * @param {string} params.schoolId - School ID
 * @param {string} params.schoolName - School name
 * @param {string} params.contactEmail - Contact email
 * @param {string} params.contactPhone - Contact phone
 * @param {string} params.schoolSize - School size
 * @param {string} params.currentSystem - Current system
 * @param {string} params.motivation - Motivation for joining
 * @param {number} params.expectedStudents - Expected number of students
 * @param {string} params.preferredPlanId - Preferred plan ID
 * @returns {Promise<Object>} - Result object with success status and message
 */
async function createPilotProgramApplication({
  schoolId,
  schoolName,
  contactEmail,
  contactPhone,
  schoolSize,
  currentSystem,
  motivation,
  expectedStudents,
  preferredPlanId
}) {
  try {
    // Generate application details
    const applicationId = uuidv4();
    const startDateObj = new Date();
    const startDate = startDateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD for database
    const endDateObj = new Date(startDateObj.getFullYear() + 1, startDateObj.getMonth(), startDateObj.getDate());
    const endDate = endDateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD for database
    const pilotActive = false;
    const status = 'pending'; // Initial status for new applications

    // Create pilot program in database
    console.log('Creating pilot program with params:', {
      applicationId,
      schoolId,
      schoolSize,
      currentSystem,
      motivation,
      expectedStudents,
      preferredPlanId,
      startDate,
      endDate,
      pilotActive
    });

    try {
      const result = await createPilotProgram(
        applicationId,
        schoolId,
        schoolSize,
        currentSystem,
        motivation,
        expectedStudents,
        preferredPlanId,
        startDate,
        endDate,
        pilotActive,
        status
      );

      console.log('Database result:', result);

      if (!result) {
        return {
          success: false,
          message: "failed to create pilot program in database"
        };
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      return {
        success: false,
        message: "Database error: " + dbError.message
      };
    }

    // Get plan details for email notifications
    let subscription_plan;
    const plan = await editPlan(preferredPlanId);
    if (plan) {
      subscription_plan = plan.name;
    }

    // Send notification emails
    try {
      console.log('Sending notification emails...');
      
      const adminNotification = await sendNewApplicationNotification({
        school_name: schoolName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        school_size: schoolSize,
        current_system: currentSystem,
        motivation: motivation,
        expected_students: expectedStudents,
        preferred_plan_name: subscription_plan,
        applied_at: new Date().toISOString(),
        start_date: startDate,
        end_date: endDate,
        pilot_active: pilotActive
      });
      console.log('Admin notification result:', adminNotification);

      const adminAlert = await sendAdminNotification('new_application', {
        applicationId,
        school_name: schoolName,
        contact_email: contactEmail,
        school_size: schoolSize,
        applied_at: new Date().toISOString(),
        start_date: startDate,
        end_date: endDate,
        pilot_active: pilotActive
      });
      console.log('Admin alert result:', adminAlert);

      const userConfirmation = await sendApplicationReceivedEmail({
        school_name: schoolName,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        school_size: schoolSize,
        current_system: currentSystem,
        motivation: motivation,
        expected_students: expectedStudents,
        preferred_plan_id: preferredPlanId,
        applied_at: new Date().toISOString(),
        start_date: startDate,
        end_date: endDate,
        pilot_active: pilotActive
      });
      console.log('User confirmation result:', userConfirmation);
      
    } catch (emailError) {
      console.error('Error sending notification emails:', emailError);
      // Don't fail the program if email fails, but log the error
    }

    return {
      success: true,
      message: "Pilot program application created successfully"
    };

  } catch (error) {
    console.error('Error in createPilotProgramApplication:', error);
    return {
      success: false,
      message: "Internal error creating pilot program application"
    };
  }
}

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

// ==================== PILOT PROGRAM CONTROLLERS ====================

/**
 * Submit pilot program application
 */
const submitPilotApplication = async (req, res) => {
  try {
    const {
      schoolName,
      contactEmail,
      contactPhone,
      schoolSize,
      currentSystem,
      motivation,
      expectedStudents,
      preferredPlanId
    } = req.body;

    // Validate required fields
    if (!schoolName || !contactEmail || !schoolSize || !preferredPlanId) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields"
      });
    }

    // Check if school already exists
    const existingSchool = await checkSchool(contactEmail);
    let schoolId;

    if (existingSchool.length > 0) {
      schoolId = existingSchool[0].id;
    } else {
      const password = generatePassword();

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newSchool = await insertSchool(contactEmail, hashedPassword);
      if (newSchool) {
        const getID = await checkSchool(contactEmail);
        if (getID) {
          schoolId = getID[0].id;
        }
      }
    }


    // Check if pilot program already exists
    const existingPilotProgram = await checkPilotProgram(schoolId);
    console.log('Existing pilot program:', existingPilotProgram.length > 0);
    
    // If pilot program exists, check if it's currently active or pending
    if (existingPilotProgram.length > 0) {
      const pilotProgram = existingPilotProgram[0]; // Get the first (and should be only) pilot program
      
      // Check if there's already a pending application
      if (pilotProgram.status === 'pending') {
        return res.status(400).json({
          success: false,
          message: "You already have a pending pilot program application. Please wait for review."
        });
      }
      
      // Check if there's an active program
      if (pilotProgram.status === 'active') {
        const expiryDate = new Date(pilotProgram.end_date);
        const currentDate = new Date();

        if (currentDate <= expiryDate) {
          return res.status(400).json({
            success: false,
            message: "You already have a pilot program running."
          });
        }
      }
      
      // If program is expired or cancelled, allow new application
      if (pilotProgram.status === 'expired' || pilotProgram.status === 'cancelled') {
        // Allow new application
      }
    }

    // If no existing pilot program or it's expired, create a new one
    console.log('Creating new pilot program application...');
    const result = await createPilotProgramApplication({
      schoolId,
      schoolName,
      contactEmail,
      contactPhone,
      schoolSize,
      currentSystem,
      motivation,
      expectedStudents,
      preferredPlanId
    });

    if (result.success) {
      res.json({
        success: true,
        message: "Pilot program submitted successfully! We'll review your application and get back to you within 24 hours.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.message || "failed to submit pilot application"
      });
    }
  } catch (error) {
    console.error('Error submitting pilot application:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
}; 

/**
 * Get pilot applications (Admin only)
 */
const getApplications = async (req, res) => {
  try {
    const applications = await getPilotApplications();
    res.json({
      success: true,
      data: applications,
      message: "Pilot applications retrieved successfully"
    });
  } catch (error) {
    console.error('Error getting pilot applications:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Update pilot application status (Admin only)
 */
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const reviewedBy = req.user?.id || 'admin'; // Assuming you have user context

    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved' or 'rejected'"
      });
    }

    const result = await updatePilotApplicationStatus(id, status, adminNotes, reviewedBy);

    if (result) {
      // Send notification emails
      try {
        // Get the application details for email
        const applications = await getPilotApplications();
        const application = applications.find(app => app.id === id);

        if (application) {
          if (status === 'approved') {
            // When approved, the application becomes an active program
            await updatePilotProgramStatus(id, 'active');
            await sendApplicationApprovedEmail(application);
            await sendAdminNotification('application_approved', {
              applicationId: id,
              school_name: application.school_name,
              contact_email: application.contact_email,
              approved_at: new Date().toISOString()
            });
          } else if (status === 'rejected') {
            await updatePilotProgramStatus(id, 'rejected');
            await sendApplicationRejectedEmail(application, adminNotes);
            await sendAdminNotification('application_rejected', {
              applicationId: id,
              school_name: application.school_name,
              contact_email: application.contact_email,
              reason: adminNotes,
              rejected_at: new Date().toISOString()
            });
          }
        }
      } catch (emailError) {
        console.error('Error sending notification emails:', emailError);
        // Don't fail the status update if email fails
      }

      res.json({
        success: true,
        message: `Application ${status} successfully`
      });
    } else {
      res.status(500).json({
        success: false,
        message: "failed to update application status"
      });
    }
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Create pilot program (after application approval)
 */
const createProgram = async (req, res) => {
  try {
    const {
      schoolId,
      pilotPlanId,
      initialPaymentAmount
    } = req.body;

    // Validate required fields
    if (!schoolId || !pilotPlanId || !initialPaymentAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Get pilot plan details
    const pilotPlan = await getPilotPlanById(pilotPlanId);
    if (!pilotPlan) {
      return res.status(404).json({
        success: false,
        message: "Pilot plan not found"
      });
    }

    // Calculate dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + (pilotPlan.duration_months || 12)); // Use plan duration

    // Create pilot program
    const programId = uuidv4();
    const result = await createPilotProgram(
      programId,
      schoolId,
      'Early Adopter Program',
      pilotPlan.pilot_discount_percentage || 50.00,
      pilotPlanId, // Now using the same plan ID since it's unified
      pilotPlanId, // Same plan ID for both original and pilot
      startDate,
      endDate,
      initialPaymentAmount
    );

    if (result) {
      // Create initial payment record
      const paymentId = uuidv4();
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 7); // 7 days to pay

      await createPilotPayment(
        paymentId,
        programId,
        'initial',
        initialPaymentAmount,
        pilotPlan.price, // Original price from unified table
        pilotPlan.price - initialPaymentAmount, // discount amount
        dueDate
      );

      // Create milestone records
      const milestones = [
        { type: 'onboarding', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // 1 week
        { type: 'first_month', date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }, // 1 month
        { type: 'quarterly', date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) }, // 3 months
        { type: 'annual', date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) } // 1 year
      ];

      for (const milestone of milestones) {
        await createPilotMilestone(uuidv4(), programId, milestone.type, milestone.date);
      }

      res.json({
        success: true,
        message: "Pilot program created successfully",
        data: { programId }
      });
    } else {
      res.status(500).json({
        success: false,
        message: "failed to create pilot program"
      });
    }
  } catch (error) {
    console.error('Error creating pilot program:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Get pilot programs (Admin only)
 */
const getPrograms = async (req, res) => {
  try {
    const programs = await getPilotPrograms();
    res.json({
      success: true,
      data: programs,
      message: "Pilot programs retrieved successfully"
    });
  } catch (error) {
    console.error('Error getting pilot programs:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Get pilot program by school ID
 */
const getProgramBySchool = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const program = await getPilotProgramBySchoolId(schoolId);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "No pilot program found for this school"
      });
    }

    res.json({
      success: true,
      data: program,
      message: "Pilot program retrieved successfully"
    });
  } catch (error) {
    console.error('Error getting pilot program:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Update pilot program status
 */
const updateProgramStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['active', 'expired', 'cancelled', 'converted'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const result = await updatePilotProgramStatus(id, status);

    if (result) {
      res.json({
        success: true,
        message: "Pilot program status updated successfully"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "failed to update pilot program status"
      });
    }
  } catch (error) {
    console.error('Error updating pilot program status:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Get pilot program payments
 */
const getProgramPayments = async (req, res) => {
  try {
    const { programId } = req.params;
    const payments = await getPilotPayments(programId);

    res.json({
      success: true,
      data: payments,
      message: "Pilot program payments retrieved successfully"
    });
  } catch (error) {
    console.error('Error getting pilot program payments:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Update payment status
 */
const updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, transactionId, paymentMethod } = req.body;

    if (!status || !['pending', 'paid', 'failed', 'refunded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment status"
      });
    }

    const result = await updatePilotPaymentStatus(id, status, transactionId, paymentMethod);

    if (result) {
      // Send notification emails for successful payments
      if (status === 'paid') {
        try {
          // Get payment and program details
          const payments = await getPilotPayments(id.split('-')[0]); // Assuming payment ID contains program ID
          const payment = payments.find(p => p.id === id);

          if (payment) {
            const programs = await getPilotPrograms();
            const program = programs.find(p => p.id === payment.pilot_program_id);

            if (program) {
              await sendPaymentReceivedEmail(program, {
                amount: payment.amount,
                payment_method: paymentMethod,
                transaction_id: transactionId,
                payment_date: new Date().toISOString()
              });

              await sendAdminNotification('payment_received', {
                paymentId: id,
                programId: payment.pilot_program_id,
                school_name: program.school_name,
                amount: payment.amount,
                payment_method: paymentMethod,
                transaction_id: transactionId,
                received_at: new Date().toISOString()
              });
            }
          }
        } catch (emailError) {
          console.error('Error sending payment notification emails:', emailError);
          // Don't fail the payment update if email fails
        }
      }

      res.json({
        success: true,
        message: "Payment status updated successfully"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "failed to update payment status"
      });
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Get pilot program milestones
 */
const getProgramMilestones = async (req, res) => {
  try {
    const { programId } = req.params;
    const milestones = await getPilotMilestones(programId);

    res.json({
      success: true,
      data: milestones,
      message: "Pilot program milestones retrieved successfully"
    });
  } catch (error) {
    console.error('Error getting pilot program milestones:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Update milestone
 */
const updateMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, feedbackScore } = req.body;

    if (!status || !['pending', 'completed', 'overdue'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid milestone status"
      });
    }

    const result = await updatePilotMilestone(id, status, notes, feedbackScore);

    if (result) {
      res.json({
        success: true,
        message: "Milestone updated successfully"
      });
    } else {
      res.status(500).json({
        success: false,
        message: "failed to update milestone"
      });
    }
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Get pilot program for logged-in school
 */
const getPilotProgramForSchool = async (req, res) => {
  try {
    const token = req.cookies.schoolToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id;

    const pilotProgram = await getPilotProgramBySchoolId(schoolId);
    
    if (!pilotProgram) {
      return res.status(404).json({
        success: false,
        message: "No pilot program found for this school"
      });
    }

    res.json({
      success: true,
      data: pilotProgram,
      message: "Pilot program retrieved successfully"
    });
  } catch (error) {
    console.error('Error getting pilot program for school:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

/**
 * Submit pilot program payment
 */
const submitPilotPayment = async (req, res) => {
  try {
    const token = req.cookies.schoolToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const schoolId = decoded.id;

    const {
      pilotProgramId,
      paymentMethod,
      transactionId,
      amount,
      originalAmount
    } = req.body;

    // Validate required fields
    if (!pilotProgramId || !paymentMethod || !transactionId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Verify the pilot program belongs to the school
    const pilotProgram = await getPilotProgramBySchoolId(schoolId);
    if (!pilotProgram || pilotProgram.id !== pilotProgramId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to pilot program"
      });
    }

    // Create payment record
    const paymentId = uuidv4();
    const discountAmount = originalAmount - amount;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7); // 7 days to verify

    const result = await createPilotPayment(
      paymentId,
      pilotProgramId,
      'initial',
      amount,
      originalAmount,
      discountAmount,
      dueDate
    );

    if (result) {
      // Send notification emails
      try {
        await sendAdminNotification('payment_received', {
          paymentId,
          pilotProgramId,
          school_name: pilotProgram.school_name,
          amount,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          received_at: new Date().toISOString()
        });
      } catch (emailError) {
        console.error('Error sending payment notification:', emailError);
        // Don't fail the payment if email fails
      }

      res.json({
        success: true,
        message: "Payment submitted successfully. You will receive confirmation within 24 hours."
      });
    } else {
      res.status(500).json({
        success: false,
        message: "failed to submit payment"
      });
    }
  } catch (error) {
    console.error('Error submitting pilot payment:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
      error: error.message
    });
  }
};

module.exports = {
  createPilotProgramApplication,
  submitPilotApplication,
  getApplications,
  updateApplicationStatus,
  createProgram,
  getPrograms,
  getProgramBySchool,
  getPilotProgramForSchool,
  updateProgramStatus,
  getProgramPayments,
  updatePaymentStatus,
  getProgramMilestones,
  updateMilestone,
  submitPilotPayment
};
