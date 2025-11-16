const conn = require('../database/mysql.js');

// ------ ------------------------- COONVERSATION BUILDER ------------------------------------------------

const conversationRequest = async (parentId, recipientId, recipientType, studentId, schoolId, message) => {
  const sql = `INSERT INTO conversation_requests (parent_id, recipient_id, recipient_type, student_id, school_id, message, status, created_at) 
              VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())`;
  const values = [parentId, recipientId, recipientType, studentId, schoolId, message];
  const [res] = await conn.query(sql, values);
  return res.insertId;
} 

const getConversationRequest = async (id) => {
  const sql = `SELECT * FROM conversation_requests WHERE id = ?`;
  const values = [id];
  const [res] = await conn.query(sql, values);
  return res[0];
}

const updateConversationRequestStatus = async (id, status) => {
  const sql = `UPDATE conversation_requests 
      SET status = ?, updated_at = NOW()
      WHERE id = ?`;
  const values = [status, id];
  const [res] = await conn.query(sql, values);
  return res;
}

const createConversation = async (requestId, parentId, recipientId, recipientType) => {
  const sql = `INSERT INTO conversations 
      (request_id, parent_id, recipient_id, recipient_type, status, created_at)
      VALUES (?, ?, ?, ?, 'active', NOW())`;
  const values = [requestId, parentId, recipientId, recipientType];
  const [res] = await conn.query(sql, values);
  return res.insertId;
}

const addConversationMessage = async (conversationId, senderId, senderType, message) => {
  const sql = `INSERT INTO conversation_messages 
      (conversation_id, sender_id, sender_type, message, created_at)
      VALUES (?, ?, ?, ?, NOW())`;
  const values = [conversationId, senderId, senderType, message];
  const [res] = await conn.query(sql, values);
  return res.insertId;
}

const getConversationMessages = async (conversationId) => {
  const sql = `SELECT * FROM conversation_messages 
      WHERE conversation_id = ?
      ORDER BY created_at ASC`;
  const values = [conversationId];
  const [res] = await conn.query(sql, values);
  return res;
}

const closeConversation = async (id) => {
  const sql = `UPDATE conversations 
      SET status = 'closed', closed_at = NOW()
      WHERE id = ?`;
  const values = [id];
  const [res] = await conn.query(sql, values);
  return res;
}



// ------ ------------------------- COONVERSATION BUILDER ------------------------------------------------




// ------ ------------------------- DISCIPLINARY BUILDER ------------------------------------------------

const checkDisciplinary = async (studentid, schoolid) => {
  const sql = 'SELECT id FROM students WHERE id = ? AND id IN (SELECT studentid FROM history WHERE schoolid = ? AND status = "active")';
  const values = [studentid, schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}

const insertDisciplinary = async (studentid, category, actiontaken, severitylevel, incidentdate, status, remarks, evidence, witnesses, parentnotified, followupdate, followupnotes) => {
  const sql = `INSERT INTO disciplinary_records (student_id,
        category, action_taken, severity_level, incident_date, status, remarks, evidence, witnesses, parent_notified,
        follow_up_date, follow_up_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  const values = [studentid, category, actiontaken, severitylevel, incidentdate, status, remarks, evidence, witnesses, parentnotified, followupdate, followupnotes];
  const [res] = await conn.query(sql, values);
  return res;
}

const getoDisciplinary = async (schoolid) => {
  const sql = `SELECT 
        dr.id,
        dr.student_id,
        s.name AS studentName,
        c.name AS studentClass,
        dr.category,
        dr.action_taken AS action,
        dr.severity_level AS severity,
        dr.status,
        dr.remarks,
        dr.incident_date AS date,
        dr.evidence,
        dr.witnesses,
        dr.parent_notified,
        dr.follow_up_date,
        dr.follow_up_notes,
        dr.created_at,
        dr.updated_at
      FROM disciplinary_records dr
      JOIN students s ON dr.student_id = s.id
      JOIN history h ON dr.student_id = h.studentid
      JOIN class c ON h.classid = c.id
      WHERE h.schoolid = ?
      ORDER BY dr.incident_date DESC, dr.created_at DESC`;
  const values = [schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}

const getoDisciplinaryById = async (id, schoolid) => {
  const sql = `SELECT 
        dr.*,
        s.name AS studentName
      FROM disciplinary_records dr
      JOIN students s ON dr.student_id = s.id
      JOIN history h ON dr.student_id = h.studentid
      JOIN class c ON h.classid = c.id
      WHERE dr.id = ? AND h.schoolid = ?`;
  const values = [id, schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}

const updatedDisciplinary = async (data, id, schoolid) => {
  const sql = `UPDATE disciplinary_records dr
      JOIN students s ON dr.student_id = s.id
      JOIN history h ON s.id = h.studentid
      SET dr.category = ?,
          dr.action_taken = ?,
          dr.severity_level = ?,
          dr.incident_date = ?,
          dr.status = ?,
          dr.remarks = ?,
          dr.incident_date = ?,
          dr.evidence = ?,
          dr.witnesses = ?,
          dr.parent_notified = ?,
          dr.follow_up_date = ?,
          dr.follow_up_notes = ?,
          dr.updated_at = CURRENT_TIMESTAMP
      WHERE dr.id = ? AND h.schoolid = ?`;
  const values = [data.category, data.action_taken, data.severity_level, data.incident_date, data.status, data.remarks, data.evidence, data.witnesses, data.parent_notified, data.follow_up_date, data.follow_up_notes, id, schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}

const deletedDisciplinary = async (id) => {
  const sql = 'DELETE FROM disciplinary_records WHERE id = ?';
  const values = [id];
  const [res] = await conn.query(sql, values);
  return res;
}

const countDisciplinary = async (schoolid) => {
  const sql = `SELECT COUNT(*) as total FROM disciplinary_records dr JOIN history h ON dr.student_id = h.studentid WHERE h.schoolid = ?`;
  const values = [schoolid];
  const [res] = await conn.query(sql, values);
  return res[0];
}

const statusDisciplinary = async (schoolid) => {
  const sql = 'SELECT status, COUNT(*) as count FROM disciplinary_records dr JOIN history h ON dr.student_id = h.studentid WHERE h.schoolid = ? GROUP BY status';
  const values = [schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}

const severityDisciplinary = async (schoolid) => {
  const sql = 'SELECT severity_level, COUNT(*) as count FROM disciplinary_records dr JOIN history h ON dr.student_id = h.studentid WHERE h.schoolid = ? GROUP BY severity_level';
  const values = [schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}

const categoryDisciplinary = async (schoolid) => {
  const sql = 'SELECT category, COUNT(*) as count FROM disciplinary_records dr JOIN history h ON dr.student_id = h.studentid WHERE h.schoolid = ? GROUP BY category ORDER BY count DESC LIMIT 5';
  const values = [schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}

const recent30DaysDisciplinary = async (schoolid) => {
  const sql = 'SELECT COUNT(*) as count FROM disciplinary_records dr JOIN history h ON dr.student_id = h.studentid WHERE h.schoolid = ? AND dr.incident_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)';
  const values = [schoolid];
  const [res] = await conn.query(sql, values);
  return res;
}


// ------ ------------------------- DISCIPLINARY BUILDER ------------------------------------------------



// ------ ------------------------- ATTENDANCE BUILDER ------------------------------------------------

const checkAttendance = async (date, studentids) => {
  const sql = 'SELECT studentid FROM attendance WHERE date = ? AND studentid IN (?)';
  const values = [date, studentids];
  const [res] = await conn.query(sql, values);
  return res;
}

const addAttendance = async (values) => {
  const insertSql = `INSERT INTO attendance (studentid, date, status, note) VALUES ?`;
  const [res] = await conn.query(insertSql, [values]);
  return res;
}

// ------ ------------------------- ATTENDANCE BUILDER ------------------------------------------------


// // --------------------------------------- SCHOOL ------------------------------------------------

const countSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM schools';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countAllTeachers = async () => {
  const sql = 'SELECT COUNT(*) as count FROM teachers';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countAllStudents = async () => {
  const sql = `SELECT COUNT(*) as count FROM history WHERE status = 'active'`;
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countPrivateSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM schools WHERE type = "private"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countPublicSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM schools WHERE type = "public"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const countSubscribedSchools = async () => {
  const sql = 'SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const sumAmount = async () => {
  const sql = 'SELECT SUM(amount) as sum FROM billing WHERE status = "successful"';
  const [res] = await conn.query(sql); // Changed to async/await
  return res[0];
}

const paymentChart = async (year) => {
  const sql = `SELECT
    DATE_FORMAT(created_at, '%M') AS month,
    MONTH(created_at) AS month_number,
    SUM(amount) AS total_amount
    FROM
        billing
    WHERE
        status = 'successful'
        AND YEAR(created_at) = ?
    GROUP BY
        month, month_number
    ORDER BY
        month_number`;
        const values = [year];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res;
}

const getSchools = async () => {
  const sql = `SELECT schools.* FROM schools
    INNER JOIN subscriptions ON subscriptions.sid = schools.id
    WHERE subscriptions.status = 'active'
    ORDER BY name ASC`;
  const [res] = await conn.query(sql); // Changed to async/await
  return res;
}

const getOTPCode = async (email) => {
  const sql = 'SELECT otp_code, otp_expires_at FROM schools WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res;
}
 
const updateOTPStatus = async (status) => {
  const sql = 'UPDATE schools SET status = ?';
  const values = [status];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res;
}  

const getSchoolByID = async (id) => {
  const sql = `SELECT id, name, contact, email
      FROM schools
      WHERE id = ?
      LIMIT 1`;
  const values = [id];
  const [res] = await conn.query(sql, values);
  return res;
}

// // --------------------------------------- SCHOOL ------------------------------------------------




// // --------------------------------------- REGISTER CRUD ------------------------------------------------

const checkSchool = async (email) => {
  try {
    const sql = 'SELECT * FROM schools WHERE email = ?';
    const values = [email];
    const [res] = await conn.query(sql, values);
    return res;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

const checkPassword = async (sid) => {
  const sql = 'SELECT password FROM schools WHERE id = ?';
  const values = [sid];
  const [res] = await conn.query(sql, values);
  return res[0];
};

const checkTeacherPassword = async (sid, id) => {
  const sql = 'SELECT password FROM teachers WHERE sid = ? AND id = ?';
  const values = [sid, id];
  const [res] = await conn.query(sql, values);
  return res[0];
};

const checkSuperPassword = async () => {
  const sql = "SELECT password FROM administrator";
  const [res] = await conn.query(sql);
  return res[0];
};

const insertSchool = async (email, password) => {
  const sql = `INSERT INTO schools(email, password) VALUES (?, ?)`;
  const values = [email, password];
  const [res] = await conn.query(sql, values);
  return res;
};


const editSchool = async (id) => {
  const sql = 'SELECT * FROM schools WHERE id = ?';
  const values = [id];
  const [res] = await conn.query(sql, values);
  return res[0];
};

const updateSchool = async (
  id,
  name,
  address,
  city,
  country,
  email,
  contact,
  logo,
  slogan,
  type,
) => {
  const sql = "UPDATE schools SET name = ?, address = ?, city = ?, country = ?, email = ?, contact = ?, logo = ?, slogan = ?, type = ? WHERE id = ?";
  const values = [name, address, city, country, email, contact, logo, slogan, type, id];
  const [res] = await conn.query(sql, values);
  return res;
};

const updateSchoolWithoutLogo = async (
  id,
  name,
  address,
  city,
  country,
  email,
  contact,
  slogan,
  type
) => {
  const sql = "UPDATE schools SET name = ?, address = ?, city = ?, country = ?, email = ?, contact = ?, slogan = ?, type = ? WHERE id = ?";
  const values = [name, address, city, country, email, contact, slogan, type, id];
  const [res] = await conn.query(sql, values);
  return res;
};

const OTPGeneration = async(otpCode, otpExpire, email) => {
  const sql = "UPDATE schools SET otp_code = ?, otp_expires_at = ? WHERE email = ?";
  const values = [otpCode, otpExpire, email];
  const [res] = await conn.query(sql, values);
  return res;
};

const OTPVerification = async(email) => {
  const sql = "UPDATE schools SET status = 'activated' WHERE email = ?";
  const values = [email];
  const [res] = await conn.query(sql, values);
  return res;
};

const updatePassword = async(newPassword, sid) => {
  const sql = "UPDATE schools SET password = ? WHERE id = ?";
  const values = [newPassword, sid];
  const [res] = await conn.query(sql, values);
  return res;
};

const updateTeacherPassword = async(newPassword, sid, id) => {
  const sql = "UPDATE teachers SET password = ? WHERE sid = ? AND id = ?";
  const values = [newPassword, sid, id];
  const [res] = await conn.query(sql, values);
  return res;
};

const updateSuperPassword = async(newPassword) => {
  const sql = "UPDATE administrator SET password = ?";
  const values = [newPassword];
  const [res] = await conn.query(sql, values);
  return res;
};


const getAdmin = async() => {
  const query = `SELECT * FROM administrator`;
  const [res] = await conn.query(query);
  return res[0]
}

const updateAdmin = async(email, phone, address, email_address, whatsapp, id) => {
  const query = `UPDATE administrator SET email = ?, phone = ?, address = ?, email_address = ?, whatsapp = ? WHERE id = ?`;
  const values = [email, phone, address, email_address, whatsapp, id];
  const [res] = await conn.query(query, values);
  return res;
}

// // --------------------------------------- REGISTER CRUD ------------------------------------------------



// // --------------------------------------- CONTACTS ------------------------------------------------

const addContacts = async(name, email, message) => {
  const query =  `INSERT INTO contacts(name, email, message) VALUES (?, ?, ?)`;
  const value = [name, email, message];
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- CONTACTS ------------------------------------------------



// // --------------------------------------- LOGIN ------------------------------------------------

const checkMail = async (email) => {
  const sql = 'SELECT * FROM schools WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values);
  return res;
};

const checkTeacherMail = async (email) => {
  const sql = 'SELECT * FROM teachers WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values);
  return res;
};

const checkAdminMail = async (email) => {
  const sql = 'SELECT * FROM administrator WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(sql, values);
  return res[0];
};



// // --------------------------------------- LOGIN ------------------------------------------------

// // --------------------------------------- EXAM CRUD ------------------------------------------------

// // Check if Examination Type exists
const checkExam = async (name) => {
  const query = "SELECT name FROM exam WHERE name = ?";
  const value = [name];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new examination type
const insertExam = async (name, percentage) => {
  const query =
    "INSERT INTO exam(name, percentage) VALUES (?, ?)"; // Changed to ?
  const values = [name, percentage];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all examination types
const getExam = async () => {
  const query = "SELECT * FROM exam";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete Examination Type
const deleteExam = async (id) => {
  const query = "DELETE FROM exam WHERE id = ?"; // Changed to ?
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Updating Examination Type
const updateExam = async (id, name, percentage) => {
  const query =
    "UPDATE exam SET name = ?, percentage = ? WHERE id = ?"; // Changed to ?
  const values = [name, percentage, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single Exam
const editExam = async (id) => {
  const query = "SELECT id, name, percentage FROM exam WHERE id = ?"; // Changed to ?
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- EXAM CRUD ------------------------------------------------

// // --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------

// // Check if academic year exists
const checkYear = async (name, startDate, endDate) => {
  const query =
    "SELECT name FROM acyear WHERE name = ? AND start_date = ? AND end_date = ?";
  const value = [name, startDate, endDate];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new academic year
const insertYear = async (name, startDate, endDate) => {
  const query = "INSERT INTO acyear(name, start_date, end_date) VALUES (?, ?, ?)";
  const values = [name, startDate, endDate];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all academic year
const getYear = async () => {
  const query = "SELECT * FROM acyear";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete academic year
const deleteYear = async (id) => {
  const query = "DELETE FROM acyear WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Updating academic year
const updateYear = async (id, name, startDate, endDate) => {
  const query =
    "UPDATE acyear SET name = ?, start_date = ?, end_date = ? WHERE id = ?";
  const values = [name, startDate, endDate, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single academic year
const editYear = async (id) => {
  const query = "SELECT * FROM acyear WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- ACADEMIC YEAR CRUD ------------------------------------------------

// // --------------------------------------- SUBJECT CRUD ------------------------------------------------

// // Check if subject exists
const checkSubject = async (name, code) => {
  const query = "SELECT name FROM subject WHERE name = ? AND code = ?";
  const value = [name, code];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new subject
const insertSubject = async (name, code) => {
  const query = "INSERT INTO subject(name, code) VALUES (?, ?)";
  const values = [name, code];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all subject
const getSubject = async () => {
  const query = "SELECT * FROM subject";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete subject
const deleteSubject = async (id) => {
  const query = "DELETE FROM subject WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Updating subject
const updateSubject = async (id, name, code) => {
  const query = "UPDATE subject SET name = ?, code = ? WHERE id = ?";
  const values = [name, code, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single subject
const editSubject = async (id) => {
  const query = "SELECT id, name, code FROM subject WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- SUBJECT CRUD ------------------------------------------------

// // --------------------------------------- CLASS CRUD ------------------------------------------------

// // Check if object exists
const checkClass = async (name, denom) => {
  const query = "SELECT name FROM class WHERE name = ? AND denom = ?";
  const value = [name, denom];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new object
const insertClass = async (name, denom) => {
  const query = "INSERT INTO class(name, denom) VALUES (?, ?)";
  const values = [name, denom];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all object
const getClass = async () => {
  const query = "SELECT * FROM class ORDER BY name ASC";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete object
const deleteClass = async (id) => {
  const query = "DELETE FROM class WHERE classid = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.length < 1;
};

// // Updating object
const updateClass = async (id, name, denom) => {
  const query =
    "UPDATE class SET name = ?, denom = ? WHERE id = ?";
  const values = [name, denom, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single object
const editClass = async (id) => {
  const query = "SELECT id, denom, name FROM class WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- CLASS CRUD ------------------------------------------------

// // --------------------------------------- TERM CRUD ------------------------------------------------

// // Check if object exists
const checkTerm = async (name, startDate, endDate) => {
  const query =
    "SELECT name FROM term WHERE name = ? AND start_date = ? AND end_date = ?";
  const value = [name, startDate, endDate];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new object
const insertTerm = async (name, year, startDate, endDate) => {
  const query = "INSERT INTO term(name, yearid, start_date, end_date) VALUES (?, ?, ?, ?)";
  const values = [name, year, startDate, endDate];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all object
const getTerm = async () => {
  const query = `SELECT term.*, acyear.name AS year
FROM term 
INNER JOIN acyear ON acyear.id = term.yearid`;
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// // Delete object
const deleteTerm = async (id) => {
  const query = "DELETE FROM term WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.length < 1;
};

// // Updating object
const updateTerm = async (id, name, year, startDate, endDate) => {
  const query =
    "UPDATE term SET name = ?, yearid = ?, start_date = ?, end_date = ? WHERE id = ?";
  const values = [name, year, startDate, endDate, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single object
const editTerm = async (id) => {
  const query = "SELECT id, name, yearid, start_date, end_date FROM term WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- TERM CRUD ------------------------------------------------

// // --------------------------------------- GRADING CRUD ------------------------------------------------

// // Check if object exists
const checkGrade = async (denom, grade) => {
  const query = "SELECT denom, grade FROM grading WHERE denom = ? AND grade = ?";
  const value = [denom, grade];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// // Add new object
const insertGrade = async (denom, roof, floor, grade, remark) => {
  const query = "INSERT INTO grading(denom, roof, floor, grade, remark) VALUES (?, ?, ?, ?, ?)";
  const values = [denom, roof, floor, grade, remark];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get all object
const getGrade = async () => {
  const query = "SELECT * FROM grading";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

const getMSCEGrade = async () => {
  const query = "SELECT * FROM grading WHERE denom = 'MSCE'";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

const getJCEGrade = async () => {
  const query = "SELECT * FROM grading WHERE denom = 'JCE'";
  const [res] = await conn.query(query); // Changed to async/await
  return res;
};

// Delete object
const deleteGrade = async (id) => {
  const query = "DELETE FROM grading WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

// Updating object
const updateGrade = async (id, denom, roof, floor, grade, remark) => {
  const query = "UPDATE grading SET denom = ?, roof = ?, floor = ?, grade = ?, remark = ? WHERE id = ?";
  const values = [denom, roof, floor, grade, remark, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

// // Get Single object
const editGrade = async (id) => {
  const query = "SELECT * FROM grading WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- GRADING CRUD ------------------------------------------------

// // --------------------------------------- JCE CRUD ------------------------------------------------

// // Check if object exists
const checkJCE = async (denom, roof, floor) => {
  const query = "SELECT denom, roof, floor FROM remarks WHERE denom = ? AND roof = ? AND floor = ?";
  const value = [denom, roof, floor];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertJCE = async (denom, roof, floor, remark) => {
  const query =
    "INSERT INTO remarks(denom, roof, floor, remark) VALUES (?, ?, ?, ?)";
  const values = [denom, roof, floor, remark];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getJCE = async () => {
  const query = "SELECT * FROM remarks WHERE denom = 'JCE'";
  const [res] = await conn.query(query);
  return res;
};

// // Delete object
const deleteJCE = async (id) => {
  const query = "DELETE FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Updating object
const updateJCE = async (id, denom, roof, floor, remark) => {
  const query =
    "UPDATE remarks SET denom = ?, roof = ?, floor = ?, remark = ? WHERE id = ?";
  const values = [denom, roof, floor, remark, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get Single object
const editJCE = async (id) => {
  const query = "SELECT * FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

// // --------------------------------------- JCE CRUD ------------------------------------------------

// // --------------------------------------- MSCE CRUD ------------------------------------------------

// // Check if object exists
const checkMSCE = async (denom, roof, floor) => {
  const query =
    "SELECT denom, roof, floor FROM remarks WHERE denom = ? AND roof = ? AND floor = ?";
  const value = [denom, roof, floor];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertMSCE = async (denom, roof, floor, remark) => {
  const query =
    "INSERT INTO remarks(denom, roof, floor, remark) VALUES (?, ?, ?, ?)";
  const values = [denom, roof, floor, remark];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getMSCE = async () => {
  const query = "SELECT * FROM remarks WHERE denom = 'MSCE'";
  const [res] = await conn.query(query);
  return res;
};

// // Delete object
const deleteMSCE = async (id) => {
  const query = "DELETE FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Updating object
const updateMSCE = async (id, denom, roof, floor, remark) => {
  const query =
    "UPDATE remarks SET denom = ?, roof = ?, floor = ?, remark = ? WHERE id = ?";
  const values = [denom, roof, floor, remark, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get Single object
const editMSCE = async (id) => {
  const query = "SELECT * FROM remarks WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

// // --------------------------------------- MSCE CRUD ------------------------------------------------

// // --------------------------------------- TEACHER CRUD ------------------------------------------------

// // Check if object exists
const checkTeacher = async (sid, name) => {
  const query =
    "SELECT sid, name FROM teachers WHERE sid = ? AND name = ?";
  const value = [sid, name];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertTeacher = async (sid, name, contact, email, address, gender, role, password) => {
  const query =
    "INSERT INTO teachers(sid, name, contact, email, address, gender, role, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [sid, name, contact, email, address, gender, role, password];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getTeacher = async (sid) => {
  const query = "SELECT * FROM teachers WHERE sid = ?";
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getSingleTeacher = async (sid, id) => {
  const query = "SELECT * FROM teachers WHERE sid = ? AND id = ?";
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res[0];
};

const getTeacherClass = async (sid, id) => {
  const query = `SELECT class.name FROM assignteacher 
    INNER JOIN class ON class.id=assignteacher.classid
    WHERE assignteacher.sid = ? AND assignteacher.id=?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

const getTeacherSubject = async (sid, id) => {
  const query = `SELECT subject.name FROM assignteacher 
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = ? AND assignteacher.id=?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

// Delete object
const deleteTeacher = async (id) => {
  const query = "DELETE FROM teachers WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// Updating object
const updateTeacher = async (id, name, contact, email, address, gender, role) => {
  const query =
    "UPDATE teachers SET name = ?, contact = ?, email = ?, address = ?, gender = ?, role = ? WHERE id = ?";
  const values = [name, contact, email, address, gender, role, id];
  const [res] = await conn.query(query, values);
  return res;
};

// Get Single object
const editTeacher = async (id) => {
  const query = "SELECT * FROM teachers WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

const countTeachers = async (sid) => {
  const query = "SELECT COUNT(*) as count FROM teachers WHERE sid = ?";
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countMaleTeachers = async (sid) => {
  const query = `SELECT COUNT(*) as count
    FROM teachers 
    WHERE sid = ? AND gender = 'male'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countFemaleTeachers = async (sid) => {
  const query = `SELECT COUNT(*) as count
    FROM teachers 
    WHERE sid = ? AND gender = 'female'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const teacherGenderPercentage = async (sid) => {
  const query = `SELECT 
    gender,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 0) AS percentage
FROM 
    teachers
WHERE sid = ?
GROUP BY 
    gender
ORDER BY 
    gender`
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- TEACHER CRUD ------------------------------------------------

// // --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------

// // Check if object exists
const checkAssignTeacher = async (sid, classid, subjectid) => {
  const query =
    "SELECT sid, classid, subjectid FROM assignteacher WHERE sid = ? AND classid = ? AND subjectid = ?";
  const value = [sid, classid, subjectid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertAssignTeacher = async (sid, teacherid, classid, subjectid) => {
  const query =
    "INSERT INTO assignteacher(sid, teacherid, classid, subjectid) VALUES (?, ?, ?, ?)";
  const values = [sid, teacherid, classid, subjectid];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getAssignTeacher = async (sid) => {
  const query = `SELECT assignteacher.id, teachers.name AS teacher, class.name AS classs, subject.name AS subject FROM assignteacher
    INNER JOIN teachers ON teachers.id=assignteacher.teacherid
    INNER JOIN class ON class.id=assignteacher.classid
    INNER JOIN subject ON subject.id=assignteacher.subjectid
    WHERE assignteacher.sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteAssignTeacher = async (id) => {
  const query = "DELETE FROM assignteacher WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // --------------------------------------- ASSIGN TEACHER CRUD ------------------------------------------------

// // --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------
 
// // Check if object exists
const checkClassTeacher = async (sid, classid) => {
  const query =
    "SELECT sid, classid FROM classteacher WHERE sid = ? AND classid = ?";
  const value = [sid, classid];
  const [res] = await conn.query(query, value);
  return res; // Adjusted to return the correct row
};

// // Add new object
const insertClassTeacher = async (sid, teacherid, classid) => {
  const query =
    "INSERT INTO classteacher(sid, teacherid, classid) VALUES (?, ?, ?)";
  const values = [sid, teacherid, classid];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getClassTeacher = async (sid) => {
  const query = `SELECT classteacher.id, teachers.name AS teacher, class.name AS classs FROM classteacher
    INNER JOIN teachers ON teachers.id=classteacher.teacherid
    INNER JOIN class ON class.id=classteacher.classid
    WHERE classteacher.sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteClassTeacher = async (id) => {
  const query = "DELETE FROM classteacher WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

const getClassTeacherByStudentID = async (studentid) => {
  const query = `SELECT classteacher.id, teachers.name AS teacher, class.name AS class FROM classteacher
    INNER JOIN teachers ON teachers.id=classteacher.teacherid
    INNER JOIN class ON class.id=classteacher.classid
    INNER JOIN history ON history.classid = classteacher.classid
    WHERE history.studentid = ? AND history.status = 'active'`;
  const value = [studentid];
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- CLASS TEACHER CRUD ------------------------------------------------

// // --------------------------------------- STUDENT CRUD ------------------------------------------------

// // Check if object exists
const checkStudent = async (sid, students) => {
  const query = `SELECT EXISTS (
      SELECT 1 FROM students
      INNER JOIN history ON history.studentid = students.id
      WHERE history.schoolid = ? 
      AND name IN (${students.map(() => '?').join(',')})
  ) AS existsCheck`; // Assign an alias for readability
  const values = [sid, ...students]; // Spread students array
  const [res] = await conn.query(query, values);
  
  // Extract value properly
  const exists = Object.values(res[0])[0]; // Get first column value (1 or 0)
  
  return exists === 1; // Return true or false
};


// // Add new object
const insertStudent = async (students) => {
  const studentIDs = [];
  const query = "INSERT INTO students (id, name) VALUES (?, ?)";
  try {
    // Assuming 'conn' is your MySQL connection or pool
    for (const { studentID, student } of students) {
      await conn.query(query, [studentID, student]);
      studentIDs.push(studentID);
    }
    return studentIDs;
  } catch (error) {
    throw error;
  }
};


const insertStudentHistory = async (sid, yearid, classid, studentIDs) => {
  const query = "INSERT INTO history (schoolid, yearid, classid, studentid) VALUES ?";
  
  const values = studentIDs.map(studentID => [sid, yearid, classid, studentID]); // Prepare bulk insert data
  
  try {
    const [result] = await conn.query(query, [values]); // Bulk insert into history
    return result; 
  } catch (error) {
    throw error; // Propagate the error
  }
};

// // Get all object
const getStudent = async (sid) => {
  const query = `SELECT s.id, s.name, acyear.name AS year, class.name AS class, s.dob, s.contact, TIMESTAMPDIFF(YEAR, s.dob, CURDATE()) AS age, schools.name AS school, s.gender, s.address FROM history
    INNER JOIN students AS s ON s.id = history.studentid
    INNER JOIN acyear ON acyear.id=history.yearid
    INNER JOIN class ON class.id=history.classid
    INNER JOIN schools ON schools.id=history.schoolid
    WHERE history.schoolid = ? AND history.status = 'active'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Get single object
const getSingleStudent = async (sid, id) => {
  const query = `SELECT s.*, DATE_FORMAT(s.created_at, '%M %d, %Y') AS admission, class.name AS class
FROM students s
INNER JOIN history h ON h.studentid = s.id 
INNER JOIN class ON class.id = h.classid
WHERE s.id = ? AND h.schoolid = ? AND h.status = 'active'`;
  const value = [id, sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteStudent = async (id) => {
  const query = "DELETE FROM students WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Updating object
const updateStudent = async (
  id,
  name,
  contact,
  email,
  address,
  gender,
  dob
) => {
  const query =
    "UPDATE students SET name = ?, contact = ?, email = ?, address = ?, gender = ?, dob = ? WHERE id = ?";
  const values = [name, contact, email, address, gender, dob, id];
  const [res] = await conn.query(query, values);
  return res;
};

const countStudents = async (sid) => {
  const query = "SELECT COUNT(*) as count FROM history WHERE schoolid = ? AND status = 'active'";
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countMale = async (sid) => {
  const query = `SELECT COUNT(*) as count
    FROM history 
    INNER JOIN students s ON s.id = history.studentid
    WHERE history.schoolid = ? AND status = 'active' AND s.gender = 'male'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countFemale = async (sid) => {
  const query = `SELECT COUNT(*) as count
    FROM history 
    INNER JOIN students s ON s.id = history.studentid
    WHERE history.schoolid = ? AND status = 'active' AND s.gender = 'female'`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const countGenderAndClass = async (sid) => {
  const query = `SELECT 
    c.name as class,
    s.gender,
    COUNT(*) AS count
FROM 
    history
INNER JOIN students s ON s.id = history.studentid
INNER JOIN class c ON c.id = history.classid
WHERE history.schoolid = ? AND status = 'active'
GROUP BY 
    c.name, s.gender
ORDER BY 
    c.name, s.gender`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

const genderPercentage = async (sid) => {
  const query = `SELECT 
    s.gender,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 0) AS percentage
FROM 
    history
INNER JOIN students s ON s.id = history.studentid
WHERE history.schoolid = ? AND status = 'active'
GROUP BY 
    s.gender
ORDER BY 
    s.gender;`
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

const statStudents = async () => {
  // Try multiple approaches to count students
  const sql = `SELECT 
    (SELECT COUNT(*) FROM history WHERE status = 'active') as history_count,
    (SELECT COUNT(*) FROM students) as total_students,
    (SELECT COUNT(DISTINCT studentid) FROM history WHERE status = 'active') as active_students`;
  const [res] = await conn.query(sql);
  return res[0]
}

const statCountry = async () => {
  const sql = `SELECT COUNT(DISTINCT country) AS cunt
FROM schools
WHERE status = 'activated'`;
const [res] = await conn.query(sql);
  return res[0]
}

// // --------------------------------------- STUDENT CRUD ------------------------------------------------

// // --------------------------------------- FEES CRUD ------------------------------------------------

// // Check if object exists
const checkFee = async (sid, name) => {
  const query = `SELECT name FROM fees WHERE sid = ? AND name = ?`;
  const value = [sid, name];
  const [res] = await conn.query(query, value);
  return res;
};

// // Add new object
const insertFee = async (sid, name, amount, description) => {
  const query =
    "INSERT INTO fees(sid, name, amount, description) VALUES (?, ?, ?, ?)";
  const values = [sid, name, amount, description];
  const [res] = await conn.query(query, values);
  return res;
};

// // Get all object
const getFee = async (sid) => {
  const query = `SELECT * FROM fees WHERE sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

// // Delete object
const deleteFee = async (id) => {
  const query = "DELETE FROM fees WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

// // Get Single object
const editFee = async (id) => {
  const query = "SELECT * FROM fees WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

// // Updating object
const updateFee = async (id, name, amount, description) => {
  const query =
    "UPDATE fees SET name = ?, amount = ?, description = ? WHERE id = ?";
  const values = [name, amount, description, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // --------------------------------------- FEES CRUD ------------------------------------------------

// // --------------------------------------- PAYMENT CRUD ------------------------------------------------

// // Get all object
const getPay = async (sid) => {
  const query = `SELECT 
      p.id, 
      p.paid, 
      p.updated_at, 
      s.name AS student, 
      c.name AS class, 
      f.name AS fee, 
      p.status, 
      t.name AS term, 
      ay.name AS year
  FROM payment p
  INNER JOIN students s ON p.studentid = s.id
  INNER JOIN history h ON s.id = h.studentid
      AND h.yearid = (SELECT yearid FROM term WHERE id = p.termid) -- Ensure the student was in this academic year
  INNER JOIN fees f ON f.id = p.feeid
  INNER JOIN term t ON t.id = p.termid
  INNER JOIN acyear ay ON ay.id = t.yearid
  INNER JOIN class c ON h.classid = c.id
  WHERE p.sid = ?`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getPayee = async (sid, id) => {
  const query = `SELECT payment.id, DATE_FORMAT(payment.updated_at, '%M %d, %Y') AS date, fees.name, 
fees.amount, payment.paid, payment.balance, payment.status, term.name AS term, acyear.name AS year
FROM payment
INNER JOIN fees ON fees.id = payment.feeid
INNER JOIN term ON term.id = payment.termid
INNER JOIN acyear ON acyear.id = term.yearid
                    WHERE payment.sid =  ? AND payment.studentid = ?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

const insertPay = async (sid, id, feeid, paid, balance, status, term) => {
  const query = "INSERT INTO payment(sid, studentid, feeid, paid, balance, status, termid) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [sid, id, feeid, paid, balance, status, term];
  const [res] = await conn.query(query, values);
  return res;
};

const checkPay = async (sid, feeid, id, term) => {
  const query = `SELECT * FROM payment WHERE sid = ? AND feeid = ? AND studentid = ? AND termid = ?`;
  const value = [sid, feeid, id, term];
  const [res] = await conn.query(query, value);
  return res;
};

// // Get Single object
const editPay = async (id) => {
  const query = `SELECT payment.*, fees.amount 
                  FROM payment 
                  INNER JOIN fees ON fees.id = payment.feeid
                  WHERE payment.id = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

// // Updating object
const updatePay = async (id, paid, balance, status) => {
  const query =
    "UPDATE payment SET paid = ?, balance = ?, status = ? WHERE id = ?";
  const values = [paid, balance, status, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // Delete object
const deletePay = async (id) => {
  const query = "DELETE FROM payment WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
};

const sumPayment = async (id) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN CAST(start_date AS DATE) AND CAST(end_date AS DATE)
)
SELECT 
    COALESCE(SUM(CAST(paid AS DECIMAL)), 0) AS count
    FROM 
        payment
    WHERE 
        termid = (SELECT termid FROM CurrentTerm) AND payment.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
}

const sumPaymentThisMonth = async (id) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN CAST(start_date AS DATE) AND CAST(end_date AS DATE)
)
SELECT 
    COALESCE(SUM(CAST(paid AS DECIMAL(10,2))), 0) AS count
FROM 
    payment
WHERE 
    termid = (SELECT termid FROM CurrentTerm LIMIT 1) 
    AND MONTH(payment.created_at) = MONTH(CURRENT_DATE)
    AND YEAR(payment.created_at) = YEAR(CURRENT_DATE)
    AND payment.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
}

const getTuition = async (id) => {
  const query = `SELECT amount FROM fees WHERE sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

const getOutstanding = async (id) => {
  const query = `WITH CurrentTerm AS (
        SELECT 
            id AS termid
        FROM 
            term
        WHERE 
            CURRENT_DATE BETWEEN CAST(start_date AS DATE) AND CAST(end_date AS DATE)
    )
    SELECT 
        COUNT(*) AS count
    FROM 
        payment
    WHERE 
        termid = (SELECT termid FROM CurrentTerm) AND payment.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
}

const PaidByDays = async (id) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN CAST(start_date AS DATE) AND CAST(end_date AS DATE)
    LIMIT 1
)
SELECT 
    DATE_FORMAT(created_at, '%W') AS day,  -- Converts to weekday name (e.g., 'Monday')
    COALESCE(SUM(CAST(paid AS DECIMAL(10,0))), 0) AS amount
FROM 
    payment
WHERE 
    termid = (SELECT termid FROM CurrentTerm) 
    AND payment.sid = ?
GROUP BY 
    DATE_FORMAT(created_at, '%W')
ORDER BY 
    FIELD(DATE_FORMAT(created_at, '%W'), 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') ASC`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
}

const PaidByClass = async (id) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN CAST(start_date AS DATE) AND CAST(end_date AS DATE)
    LIMIT 1
),
ClassPaymentStats AS (
    SELECT 
        history.classid,
        COUNT(DISTINCT fp.studentid) AS StudentsPaid
    FROM 
        payment fp
    INNER JOIN history ON history.schoolid = fp.sid
    WHERE 
        fp.termid = (SELECT termid FROM CurrentTerm)
    GROUP BY 
        history.classid
),
ClassTotals AS (
    SELECT 
        c.id, 
        c.name AS class,
        COUNT(s.studentid) AS TotalStudents
    FROM 
        class c
    LEFT JOIN 
        history s ON c.id = s.classid
    WHERE 
        s.schoolid = ?
    GROUP BY 
        c.id
)
SELECT 
    ct.id, 
    ct.class,
    COALESCE(cp.StudentsPaid, 0) AS StudentsPaid,
    ct.TotalStudents,
    CASE 
        WHEN ct.TotalStudents > 0 
        THEN ROUND((COALESCE(cp.StudentsPaid, 0) / ct.TotalStudents) * 100, 0)
        ELSE 0
    END AS Percentage
FROM 
    ClassTotals ct
LEFT JOIN 
    ClassPaymentStats cp ON ct.id = cp.classid
ORDER BY 
    Percentage DESC`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- PAYMENT CRUD ------------------------------------------------

// // --------------------------------------- ENTRY CRUD ------------------------------------------------

const getYearByTeacherID = async () => {
  const query = "SELECT * FROM acyear";
  const [res] = await conn.query(query);
  return res;
};

const getTermByTeacherID = async () => {
  const query = `SELECT term.*, acyear.name AS year
    FROM term 
    INNER JOIN acyear ON acyear.id = term.yearid`;
  const [res] = await conn.query(query);
  return res;
};

const getExamByTeacherID = async () => {
  const query = "SELECT * FROM exam";
  const [res] = await conn.query(query);
  return res;
};

const getClassByTeacherID = async (sid, id) => {
  const query = `SELECT DISTINCT(class.name), class.id FROM assignteacher
                  INNER JOIN class ON  class.id = assignteacher.classid
                  WHERE assignteacher.sid = ? AND assignteacher.teacherid = ?`;
  const value = [sid, id];
  const [res] = await conn.query(query, value);
  return res;
};

const getSubjectByTeacherID = async (sid, id, classid) => {
  const query = `SELECT DISTINCT(subject.name), subject.id as subjectid FROM assignteacher
                  INNER JOIN subject ON  subject.id = assignteacher.subjectid
                  WHERE assignteacher.sid = ? AND assignteacher.teacherid = ? AND assignteacher.classid = ?`;
  const value = [sid, id, classid];
  const [res] = await conn.query(query, value);
  return res;
};

const getStudentForEntry = async (sid, classid) => {
  const query = `SELECT students.id, name FROM students 
  INNER JOIN history ON history.studentid = students.id
  WHERE history.schoolid = ? AND classid = ? AND status = 'active'
  ORDER BY name ASC`;
  const values = [sid, classid];
  const [res] = await conn.query(query, values);
  return res;
};

const checkResult = async (sid, termid, data) => {
  try {
    const query = `
      SELECT EXISTS (
        SELECT 1 FROM results
        WHERE classid = ? 
          AND sid = ? 
          AND typeid = ? 
          AND studentid = ? 
          AND subjectid = ? 
          AND termid = ?
      ) AS record_exists`;

    const values = [
      data.selectedClass,
      sid,
      data.typeid,
      data.id,
      data.selectedSubject,
      termid,
    ];

    const [rows] = await conn.query(query, values);
    
    return rows.length > 0 ? rows[0].record_exists === 1 : false;
  } catch (error) {
    console.error("Error checking result:", error);
    throw new Error("Database query failed");
  }
};


const insertResult = async (sid, termid, grade, remarks, data) => {
  const query = `INSERT INTO results(sid, studentid, termid, typeid, classid, subjectid, score, remarks, grade) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    sid,
    data.id,
    termid,
    data.typeid,
    data.selectedClass,
    data.selectedSubject,
    data.score,
    remarks,
    grade,
  ];
  const [res] = await conn.query(query, values);
  return res;
};

const getClassById = async (data) => {
  const query = "SELECT denom FROM class WHERE id = ?";
  const value = [data];
  const [res] = await conn.query(query, value);
  return res[0];
};

const getGradeByDenom = async (denom) => {
  const query = "SELECT * FROM grading WHERE denom = ?";
  const value = [denom];
  const [res] = await conn.query(query, value);
  return res;
};

// // --------------------------------------- ENTRY CRUD ------------------------------------------------

// // --------------------------------------- FILTER CRUD ------------------------------------------------

const getX = async (sid, termid, typeid, classid, subjectid) => {
  const query = `SELECT results.id as resultid, students.name as student, class.name as class, subject.name as subject, results.score, results.grade, results.remarks
      FROM results
      INNER JOIN students ON students.id = results.studentid
      INNER JOIN class ON class.id = results.classid
      INNER JOIN subject ON subject.id = results.subjectid
      WHERE results.termid = ? AND results.typeid = ?
      AND results.classid = ? AND results.subjectid = ? AND results.sid = ?`;
  const value = [termid, typeid, classid, subjectid, sid];
  const [res] = await conn.query(query, value);
  return res;
};

const deleteResult = async (
  termid,
  typeid,
  classid,
  subjectid,
  sid
) => {
  const query =
    "DELETE FROM results WHERE termid = ? AND typeid = ? AND classid = ? AND subjectid = ? AND sid = ?";
  const value = [termid, typeid, classid, subjectid, sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getScore = async (id) => {
  const query = `SELECT * FROM results WHERE id = ?`;
  const value = [id];
  const [res] = await conn.query(query, value);
  return res[0];
};

// Updating object
const updateScore = async (id, score, grade, remark) => {
  const query =
    "UPDATE results SET score = ?, grade = ?, remarks = ? WHERE id = ?";
  const values = [score, grade, remark, id];
  const [res] = await conn.query(query, values);
  return res;
};

// // --------------------------------------- FILTER CRUD ------------------------------------------------

// // --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------

const getClassStudent = async (sid, teacherid) => {
  const query = `SELECT 
    students.id, 
    students.name, 
    TIMESTAMPDIFF(YEAR, students.dob, CURDATE()) AS age, 
    class.name AS class, 
    students.gender, 
    students.address, 
    students.contact
FROM classteacher
INNER JOIN history ON history.classid = classteacher.classid
INNER JOIN students ON students.id = history.studentid
INNER JOIN class ON class.id = classteacher.classid
WHERE classteacher.sid = ? 
AND classteacher.teacherid = ? 
AND history.status = 'active'`;
  const value = [sid, teacherid];
  const [res] = await conn.query(query, value);
  return res;
};

const getClassNSubject = async (sid, teacherid) => {
  const query = `SELECT class.id, class.name AS class, subject.name AS subject FROM assignteacher
      INNER JOIN class ON class.id = assignteacher.classid
      INNER JOIN subject ON subject.id = assignteacher.subjectid
      WHERE assignteacher.sid = ? AND assignteacher.teacherid = ?`;
  const value = [sid, teacherid];
  const [res] = await conn.query(query, value);
  return res;
};

const dashboardClassTeacher = async (sid, teacherid) => {
  const query = `SELECT class.name AS class FROM classteacher
      INNER JOIN class ON class.id = classteacher.classid
      WHERE classteacher.sid = ? AND classteacher.teacherid = ?`;
  const value = [sid, teacherid];
  const [res] = await conn.query(query, value);
  return res;
};
// // --------------------------------------- TEACHER STUDENR CRUD ------------------------------------------------


// // --------------------------------------- CHART CRUD ------------------------------------------------

const getStudentByGender = async (sid, classid) => {
  const query = `SELECT COALESCE(gender, 'other') as gender, COUNT(*) as count
    FROM students
    INNER JOIN history h ON h.studentid = students.id
    WHERE classid = ? AND h.schoolid = ?
    GROUP BY COALESCE(gender, 'other')`;
  const values = [classid, sid];
  const [res] = await conn.query(query, values);
  return res;
};

const getTopStudent = async (sid, teacherid, classid) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        id AS termid
    FROM 
        term
    WHERE 
        CURRENT_DATE BETWEEN start_date AND end_date
),
RankedResults AS (
    SELECT 
        results.classid, 
        results.subjectid, 
        students.name, 
        subject.name AS subject,  
        results.score,
        ROW_NUMBER() OVER (
            PARTITION BY results.classid, results.subjectid 
            ORDER BY results.score DESC, results.created_at DESC
        ) AS ranko
    FROM results
    INNER JOIN students ON students.id = results.studentid
    INNER JOIN subject ON subject.id = results.subjectid
    INNER JOIN assignteacher ON assignteacher.classid = results.classid
    WHERE assignteacher.classid = ?
    AND assignteacher.teacherid = ?
    AND assignteacher.sid = ?
    AND results.termid = (SELECT termid FROM CurrentTerm) -- Ensuring data is within the current term
)
SELECT classid, subjectid, name, subject, score
FROM RankedResults
WHERE rank = 1;
`;
  const value = [classid, teacherid, sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getAggScoreBySUbject = async (sid, teacherid, classid) => {
  const query = `WITH CurrentTerm AS (
    SELECT 
        term.id AS termid, 
        term.name AS term_name,
        acyear.name AS year
    FROM 
        term
    INNER JOIN acyear ON acyear.id = term.yearid
    WHERE 
      CURRENT_DATE BETWEEN term.start_date AND term.end_date
)
SELECT 
    subject.name AS subject, 
    ROUND(AVG(results.score)) AS average, 
    CurrentTerm.term_name AS term, 
    CurrentTerm.year AS year, 
    exam.name AS exam, 
    class.name AS class
FROM results
INNER JOIN subject ON subject.id = results.subjectid
INNER JOIN CurrentTerm ON CurrentTerm.termid = results.termid
INNER JOIN exam ON exam.id = results.typeid
INNER JOIN class ON class.id = results.classid
INNER JOIN assignteacher ON assignteacher.classid = results.classid
WHERE assignteacher.classid = ? 
AND assignteacher.teacherid = ? 
AND results.sid = ?
GROUP BY subject.name, CurrentTerm.term_name, exam.name, class.name
ORDER BY average DESC
`;
  const value = [classid, teacherid, sid];
  const [res] = await conn.query(query, value);
  return res;
};

const countStudentByAssign = async (sid, teacherid, classid) => {
  const query = `SELECT COUNT(DISTINCT(students.id)) AS count
    FROM students
    INNER JOIN history ON history.studentid = students.id
    INNER JOIN assignteacher ON assignteacher.classid = history.classid
    WHERE assignteacher.classid = ? AND assignteacher.teacherid = ? AND history.schoolid = ? AND status = 'active'`;
  const value = [classid, teacherid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

// // --------------------------------------- CHART CRUD ------------------------------------------------

// // --------------------------------------- REPORT CRUD ------------------------------------------------

// // JCE
const countSubjects = async (termid, typeid, classid, studentid, sid) => {
  const query = `SELECT studentid, COUNT(subjectid) AS count 
    FROM results 
    WHERE termid = ? 
    AND typeid = ? 
    AND classid = ? 
    AND studentid IN (?)
    AND sid = ?
    GROUP BY studentid
    `;
  const values = [termid, typeid, classid, studentid, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const addPromote = async (sid, termid, typeid, classid, studentid, agg, remarks, rank) => {
  const query = `INSERT INTO promotion(sid, termid, typeid, classid, studentid, agg, remarks, \`rank\`)
                  VALUES(?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [sid, termid, typeid, classid, studentid, agg, remarks, rank];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const checkPromote = async (sid, termid, typeid, classid, studentid) => {
  const query = `SELECT COUNT(*) > 0 AS exist
    FROM promotion 
    WHERE sid = ? 
    AND termid = ? 
    AND typeid = ? 
    AND classid = ? 
    AND studentid IN (?)`;
  const values = [sid, termid, typeid, classid, studentid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0];
}

const updatePromote = async (sid, termid, typeid, classid, studentid, agg, remarks, rank) => {
  const query = `UPDATE promotion SET agg = ?, remarks = ?, \`rank\` = ?
                WHERE sid = ? AND termid = ? AND typeid = ? AND classid = ? AND studentid = ?`;
  const values = [agg, remarks, rank, sid, termid, typeid, classid, studentid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const getReportByStudent = async (sid, termid, typeid, classid) => {
  const query = `WITH student_scores AS (
    SELECT 
        studentid,
        classid,
        subjectid,
        score,
        ROW_NUMBER() OVER (
            PARTITION BY studentid, classid 
            ORDER BY score DESC
        ) AS subject_rank
    FROM results
    WHERE results.termid = ?
      AND results.typeid = ?
      AND results.classid = ?
      AND results.sid = ?
),
top_6_subjects AS (
    SELECT 
        studentid,
        classid,
        SUM(score) AS total_score
    FROM student_scores
    WHERE subject_rank <= 6
    GROUP BY studentid, classid
),
ranked_students AS (
    SELECT 
        studentid, 
        classid, 
        total_score,
        RANK() OVER (PARTITION BY classid ORDER BY total_score DESC) AS ranko
    FROM top_6_subjects
)
SELECT 
    DISTINCT r.studentid,
    rs.ranko, 
    st.name AS studentname,  
    rs.total_score AS aggregate,
    r.classid,
    subject.id AS subject_id, 
    subject.code AS subject_name, 
    r.score,
    r.grade, 
    r.remarks
FROM ranked_students rs
JOIN results r ON r.studentid = rs.studentid AND r.classid = rs.classid
JOIN students st ON st.id = r.studentid
LEFT JOIN subject ON subject.id = r.subjectid
ORDER BY r.classid, rs.ranko, st.name`;
  
  const value = [termid, typeid, classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

const getStudentCard = async (sid, termid, typeid, classid, studentid) => {
  const query = `SELECT 
    st.name AS studentname,  
    rs.total_score AS aggregate,
    ac.name AS year,
    t.name AS term,
    e.name AS exam,
    c.name AS class,
    c.id AS classid
FROM (
    SELECT 
        studentid,
        termid,  -- Include termid here
        typeid,  -- Include typeid here
    classid,
        SUM(score) AS total_score
    FROM (
        SELECT 
            studentid,
            termid,  -- Include termid here
            typeid,  -- Include typeid here
        classid,
            CAST(score AS SIGNED) AS score,
            ROW_NUMBER() OVER (PARTITION BY studentid ORDER BY CAST(score AS SIGNED) DESC) AS subject_rank
        FROM results
        WHERE termid = ?
          AND typeid = ?
          AND classid = ?
          AND sid = ?
          AND studentid = ?
    ) AS student_scores
    WHERE subject_rank <= 6  -- Only consider the top 6 subjects
    GROUP BY studentid, termid, typeid  -- Group by typeid as well
) AS rs  -- Now typeid is part of the outer query
JOIN students st ON st.id = rs.studentid
JOIN term t ON t.id = rs.termid  -- Join term based on termid
JOIN acyear ac ON ac.id = t.yearid  -- Join acyear based on term's yearid
JOIN exam e ON e.id = rs.typeid  -- Join exam based on typeid
JOIN class c ON c.id = rs.classid
ORDER BY st.name`;
  
  const value = [termid, typeid, classid, sid, studentid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
};

const countResult = async (sid, termid, typeid, classid) => {
  const query = `SELECT COUNT(DISTINCT(studentid)) AS count
      FROM results
      WHERE results.termid = ?
          AND results.typeid = ?
          AND results.classid = ?
          AND results.sid = ?`;
  const value = [termid, typeid, classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
}

// JCE


// MSCE

const getReportByStudentMSCE = async (sid, termid, typeid, classid) => {
  const query = `WITH student_scores AS (
    SELECT 
        studentid,
        classid,
        subjectid,
        CAST(grade AS UNSIGNED) AS grade,
        ROW_NUMBER() OVER (
            PARTITION BY studentid, classid 
            ORDER BY CAST(grade AS UNSIGNED) DESC
        ) AS subject_rank
    FROM results
    WHERE results.termid = ?
        AND results.typeid = ?
        AND results.classid = ?
        AND results.sid = ?
),
top_6_subjects AS (
    SELECT 
        studentid,
        classid,
        SUM(grade) AS total_score
    FROM student_scores
    WHERE subject_rank <= 6
    GROUP BY studentid, classid
),
ranked_students AS (
    SELECT 
        studentid, 
        classid, 
        total_score,
        RANK() OVER (PARTITION BY classid ORDER BY total_score ASC) AS ranko
    FROM top_6_subjects
)
SELECT 
    DISTINCT r.studentid,
    rs.ranko, 
    st.name AS studentname,  
    rs.total_score AS aggregate,
    r.classid,
    subject.id AS subject_id, 
    subject.code AS subject_name, 
    r.score,
    r.grade, 
    r.remarks
FROM ranked_students rs
JOIN results r ON r.studentid = rs.studentid AND r.classid = rs.classid
JOIN students st ON st.id = r.studentid
LEFT JOIN subject ON subject.id = r.subjectid
ORDER BY r.classid, rs.ranko, st.name;
`;
  const value = [termid, typeid, classid, sid];
  const [res] = await conn.query(query, value);
  return res;
};

const getStudentCardMSCE = async (sid, termid, typeid, classid, studentid) => {
  const query = `WITH student_scores AS (
    SELECT 
        studentid,
        CAST(grade AS UNSIGNED) AS grade,
        ROW_NUMBER() OVER (
            PARTITION BY studentid 
            ORDER BY CAST(grade AS UNSIGNED) DESC
        ) AS subject_rank
    FROM results
    WHERE termid = ?
        AND typeid = ?
        AND classid = ?
        AND sid = ?
        AND studentid = ?
        AND grade REGEXP '^[0-9]+$'  -- Ensure only numeric grades are processed
),
top_6_subjects AS (
    SELECT 
        studentid,
        SUM(grade) AS total_score
    FROM student_scores
    WHERE subject_rank <= 6
    GROUP BY studentid
),
ranked_students AS (
    SELECT 
        studentid, 
        total_score,
        RANK() OVER (ORDER BY total_score DESC) AS ranko
    FROM top_6_subjects
)
SELECT 
    DISTINCT st.name AS studentname,  
    rs.total_score AS aggregate,
    ac.name AS year,
    t.name AS term,
    e.name AS exam,
    c.name AS class,
    c.id
FROM ranked_students rs
JOIN results r ON r.studentid = rs.studentid
JOIN students st ON st.id = r.studentid
JOIN term t ON t.id = r.termid
JOIN acyear ac ON ac.id = t.yearid
JOIN exam e ON e.id = r.typeid
JOIN class c ON c.id = r.classid
ORDER BY st.name;

`;
  const value = [termid, typeid, classid, sid, studentid];
  const [res] = await conn.query(query, value);
  return res;
};
// MSCE

// Class teacher
const getClassTeacher4Report = async (classid, sid) => {
  const query = `SELECT teachers.name
    FROM classteacher
    INNER JOIN teachers ON teachers.id = classteacher.teacherid
    WHERE classteacher.classid = ? AND classteacher.sid = ?`;
  const value = [classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getSubjectPosition = async (
  termid,
  typeid,
  classid,
  sid,
  studentid
) => {
  const query = `SELECT 
          results.studentid,
          subject.name AS subject,
          score,
          grade,
          remarks,
          subjectid
      FROM 
          results
      INNER JOIN subject On subject.id = results.subjectid
      WHERE 
      results.termid = ? AND
      results.typeid = ? AND
      results.classid = ? AND
      results.sid = ? AND
      results.studentid = ?
      ORDER BY 
          studentid, subject ASC`;
  const value = [termid, typeid, classid, sid, studentid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const realPos = async (termid, typeid, classid, sid, subjectid) => {
  const query = `SELECT studentid, 
          subjectid, 
          score, 
          ROW_NUMBER() OVER (ORDER BY score DESC) AS ranko
    FROM (
        SELECT results.studentid, 
              results.subjectid, 
              results.score
        FROM results
        WHERE results.termid = ?
          AND results.typeid = ?
          AND results.classid = ?
          AND results.subjectid = ?
          AND results.sid = ?
        GROUP BY results.studentid, results.subjectid, results.score
    ) AS ranked_results`;
  const value = [termid, typeid, classid, subjectid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getTeacherBySubject = async (subjectid, sid) => {
  const query = `SELECT subjectid, teachers.name 
        FROM assignteacher
        INNER JOIN teachers ON teachers.id = assignteacher.teacherid
        WHERE assignteacher.subjectid = ? AND assignteacher.sid = ?`;
  const value = [subjectid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};
// Class teacher

const getRemarks = async (denom, sid) => {
  const query = `SELECT * FROM remarks WHERE denom = ? AND sid = ?`;
  const value = [denom, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const deleteReport = async (yearid, termid, typeid, classid, sid) => {
  const query = `DELETE FROM results WHERE yearid = ? AND termid = ? AND typeid = ? AND classid = ? AND sid = ?`;
  const value = [yearid, termid, typeid, classid, sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.length < 1; // Adjusted for MySQL
};

const countReports = async (id) => {
  const query = `WITH CurrentTerm AS (
      SELECT 
          id AS termid
      FROM 
          term
      WHERE 
          CURRENT_DATE BETWEEN DATE(start_date) AND DATE(end_date)
  )
  SELECT 
      COUNT(*) AS Count
  FROM 
      results
  WHERE 
      results.termid = (SELECT termid FROM CurrentTerm) AND results.sid = ?`;
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getStudentForPromotion = async (classid, sid) => {
  const query = `WITH CurrentTerm AS (
    SELECT id AS termid
    FROM term
    WHERE CURRENT_DATE BETWEEN DATE(start_date) AND DATE(end_date)
)
SELECT 
    p.studentid, 
    students.name AS student, 
    exam.name AS exam, 
    p.agg, 
    p.remarks, 
    p.rank
FROM promotion p
INNER JOIN students ON students.id = p.studentid
INNER JOIN exam ON exam.id = p.typeid
WHERE p.classid = ? 
  AND p.termid = (SELECT termid FROM CurrentTerm) 
  AND p.sid = ?`;
  const values = [classid, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
};

const upperPromote = async (status, classid, studentid) => {
  const query = `UPDATE history SET status = ?
    WHERE classid = ? AND studentid = ?`;
  const values = [status, classid, studentid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

const bestStudents = async (sid) => {
  const query = `WITH CurrentTerm AS (
    SELECT id AS termid
    FROM term
    WHERE CURRENT_DATE BETWEEN CAST(start_date AS DATE) AND CAST(end_date AS DATE)
)
SELECT DISTINCT p.classid, 
       s.name AS student, 
       term.name AS term, 
       class.name AS class, 
       exam.name AS exam, 
       p.agg
FROM promotion p
INNER JOIN students s ON s.id = p.studentid 
INNER JOIN term ON term.id = p.termid
INNER JOIN class ON class.id = p.classid
INNER JOIN exam ON exam.id = p.typeid 
WHERE p.termid = (SELECT termid FROM CurrentTerm) AND sid = ?
ORDER BY p.classid, p.rank ASC
`;
  const value = [sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.affectedRows > 0;
}

const worstStudents = async (sid) => {
  const query = `WITH CurrentTerm AS (
    SELECT id AS termid
    FROM term
    WHERE CURRENT_DATE BETWEEN DATE(start_date) AND DATE(end_date)
),
RankedPromotions AS (
    SELECT 
        p.*,
        s.name AS student,
        term.name AS term,
        class.name AS class,
        exam.name AS exam,
        ROW_NUMBER() OVER (PARTITION BY p.classid ORDER BY p.rank DESC) AS row_num
    FROM promotion p
    INNER JOIN students s ON s.id = p.studentid 
    INNER JOIN term ON term.id = p.termid
    INNER JOIN class ON class.id = p.classid
    INNER JOIN exam ON exam.id = p.typeid 
    WHERE p.termid = (SELECT termid FROM CurrentTerm) 
      AND sid = ?
)
SELECT 
    classid,
    student,
    term,
    class,
    exam,
    agg
FROM RankedPromotions
WHERE row_num = 1
ORDER BY classid`;
  const value = [sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
}

const avSubByClass = async (sid, classid) => {
  const query =  `WITH CurrentTerm AS (
    SELECT id AS termid
    FROM term
    WHERE CURRENT_DATE BETWEEN DATE(start_date) AND DATE(end_date)
)
SELECT 
    subject.name AS subject,
    classid, 
    subjectid, 
    ROUND(AVG(CAST(score AS DECIMAL(10, 0)))) AS average
FROM results
INNER JOIN subject ON subject.id = results.subjectid
WHERE classid = ? 
  AND results.sid = ? 
  AND results.termid = (SELECT termid FROM CurrentTerm)
GROUP BY classid, subjectid, subject
ORDER BY classid, subjectid, subject ASC;
`;
  const values = [classid, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

// // --------------------------------------- REPORT CRUD ------------------------------------------------




// // --------------------------------------- EVENTS CRUD ------------------------------------------------

const addEvent = async (id, title, date, time, location, description) => {
  const query = 'INSERT INTO events (title, date, time, location, description, sid) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [title, date, time, location, description, id];
  const [res] = await conn.query(query, values);
  return res;
}

const checkEvent = async (id, title, date) => {
  const query = 'SELECT * FROM events WHERE sid = ? AND title = ? AND date = ?';
  const values = [id, title, date];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const getEvents = async (sid) => {
  const query = 'SELECT * FROM events WHERE sid = ? ORDER BY created_at DESC';
  const value = [sid];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res;
}

const editEvent = async (id) => {
  const query = 'SELECT * FROM events WHERE id = ?';
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0];
};

const updateEvent = async (id, title, date, time, location, description) => {
  const query = 'UPDATE events SET title = ?, date = ?, time = ?, location = ?, description = ? WHERE id = ?';
  const values = [title, date, time, location, description, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
};

const deleteEvent = async (id) => {
  const query = 'DELETE FROM events WHERE id = ?';
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

// // --------------------------------------- EVENTS CRUD ------------------------------------------------




// // --------------------------------------- SUPER ADMIN CRUD ------------------------------------------------

const insertFeatures = async (name, price, max, pilot_price, pilot_discount_percentage, pilot_initial_payment_percentage, pilot_enabled, max_students, duration_months, is_active) => {
  const query = `INSERT INTO subscription_plans (name, price, features, pilot_price, pilot_discount_percentage, pilot_initial_payment_percentage, pilot_enabled, max_students, duration_months, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const value = [name, price, max, pilot_price, pilot_discount_percentage, pilot_initial_payment_percentage, pilot_enabled, max_students, duration_months, is_active];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res.affectedRows > 0; // Adjusted for MySQL
};

const getSubscriptions = async () => {
  const sql = 'SELECT * FROM subscription_plans ORDER BY price ASC';
  const [res] = await conn.query(sql); // Changed to async/await
  return res;
};

const deleteSubscription = async (id) => {
  const query = `DELETE FROM subscription_plans WHERE id = ?`;
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const editPlan = async (id) => {
  const query = "SELECT * FROM subscription_plans WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0]; // Adjusted for MySQL
};

// Updating object
const updatePlan = async (id, name, price, max, pilot_price, pilot_discount_percentage, pilot_initial_payment_percentage, pilot_enabled, max_students, duration_months, is_active, update) => {
  const query =
    "UPDATE subscription_plans SET name = ?, price = ?, features = ?, pilot_price = ?, pilot_discount_percentage = ?, pilot_initial_payment_percentage = ?, pilot_enabled = ?, max_students = ?, duration_months = ?, is_active = ?, created_at = ? WHERE id = ?";
  const values = [name, price, max, pilot_price, pilot_discount_percentage, pilot_initial_payment_percentage, pilot_enabled, max_students, duration_months, is_active, update, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
};

// // --------------------------------------- SUPER ADMIN CRUD ------------------------------------------------




// // --------------------------------------- SUBSCRIPTION CRUD ------------------------------------------------

const getSubs = async (plan) => {
  const query = 'SELECT * FROM subscription_plans WHERE name = ?'; // Changed to ?
  const values = [plan];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0]; // Adjusted for MySQL
}

const getPlanByID = async (id) => {
  const query = 'SELECT * FROM subscription_plans WHERE id = ?'; // Changed to ?
  const values = [id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0]; // Adjusted for MySQL
} 

const addSubscription = async (id, sid, planid, strata, period) => {
  const query = `INSERT INTO subscriptions (id, sid, planid, status, period)
          VALUES (?, ?, ?, ?, ?)`;
  const values = [id, sid, planid, strata, period];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}
const checkSubToCancel = async (sid) => {
  const query = `SELECT * FROM subscriptions WHERE status = 'active' AND sid = ?`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0];
}
const cancelSubscription = async (status, sid) => {
  const query = `UPDATE subscriptions SET status = ? WHERE status = 'active' AND sid = ?`;
  const values = [status, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const cancelBilling = async (status, subscriptionid) => {
  const query = `UPDATE billing SET status = ? WHERE subscriptionid = ?`;
  const values = [status, subscriptionid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res.affectedRows > 0;
}

const addBilling = async (subscriptionid, amount, strata, expiry) => {
  const query = `INSERT INTO billing (subscriptionid, amount, status, expiry)
          VALUES (?, ?, ?, ?)`;
  const values = [subscriptionid, amount, strata, expiry];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res.affectedRows > 0;
}

const checkSubscription = async (sid) => {
  const query = `SELECT * FROM subscriptions WHERE sid = ? AND status = 'active'`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const checkSubscriptionStatus = async (sid) => {
  const query = `SELECT b.status, b.expiry FROM billing b
    INNER JOIN subscriptions s ON s.id = b.subscriptionid
    WHERE s.sid = ? AND b.status = 'pending'`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0];
}

const checkResentSubscriptionStatus = async (sid) => {
  const query = `SELECT b.status, b.expiry, b.id FROM billing b
    INNER JOIN subscriptions s ON s.id = b.subscriptionid
    WHERE s.sid = ? ORDER BY b.created_at DESC LIMIT 1`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0];
}

const checkSubsByID = async (sid) => {
  const query = `SELECT *, sp.name, billing.expiry FROM subscriptions
    INNER JOIN subscription_plans sp ON sp.id = subscriptions.planid      
    INNER JOIN billing ON billing.subscriptionid = subscriptions.id      
    WHERE sid = ? ORDER BY subscriptions.created_at ASC`;
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const getSubscriptionByID = async (id) => {
  const query = `SELECT sp.name AS plan, s.period, s.sid, b.amount
FROM subscriptions s
INNER JOIN subscription_plans sp ON sp.id = s.planid
INNER JOIN billing b ON b.subscriptionid = s.id
WHERE s.id = ?`;
  const values = [id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0];
}

const updateSubscriptionStatus = async (status, sid) => {
  const query = `UPDATE billing b
SET status = ?
FROM subscriptions s
WHERE s.id = b.subscriptionid
  AND s.sid = ?`;
  const values = [status, sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
} 

const checkPaid = async (sid, status) => {
  const query = `SELECT status FROM subscriptions WHERE sid = ? AND status = ?`;
  const values = [sid, status];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res;
}

const getSubscriptionPayments = async () => {
  const query = `SELECT sub.id, schools.name, sp.name AS plan, sub.period, bill.amount, sub.created_at AS date, sub.status, bill.status AS bill FROM subscriptions sub
    INNER JOIN schools ON schools.id = sub.sid
    INNER JOIN billing bill ON bill.subscriptionid = sub.id
    INNER JOIN subscription_plans sp ON sp.id = sub.planid
    ORDER BY date DESC`;
  const [res] = await conn.query(query); // Changed to async/await
  return res;
}

const updateSubStatus = async (id, status) => {
  const query = `UPDATE subscriptions SET status = ? WHERE id = ?`;
  const values = [status, id];
  const [res] = await conn.query(query, values);
  return res;
}

const updateBillingStatus = async (id, status) => {
  const query = 'UPDATE billing SET status = ? WHERE subscriptionid = ?';
  const values = [status, id];
  const [res] = await conn.query(query, values);
  return res;
}

const updateSchoolStatus = async (id, status) => {
  const query = 'UPDATE schools SET status = ? WHERE id = ?';
  const values = [status, id];
  const [res] = await conn.query(query, values);
  return res;
}

// // --------------------------------------- SUBSCRIPTION CRUD ------------------------------------------------








// // --------------------------------------- SUBSCRIBE CRUD ------------------------------------------------

const checkSubscribe = async(email) => {
  const query = 'SELECT email FROM subscribe WHERE email = ?';
  const values = [email];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
}

const addSubscribe = async (email) => {
  const query = `INSERT INTO subscribe (email) VALUES (?)`; // Changed to ?
  const values = [email];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
}


// // --------------------------------------- SUBSCRIBE CRUD ------------------------------------------------




// // --------------------------------------- FEEDBACK CRUD ------------------------------------------------

const addFeedback = async (sid, rating, optioni, commenti) => {
  const query = `INSERT INTO feedback (sid, rating, optioni, commenti) VALUES (?, ?, ?, ?)`;
  const values = [sid, rating, optioni, commenti];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res.affectedRows > 0;
}

const getFeedbackByRating = async (rating) => {
  const sql = `
      SELECT feedback.*, schools.name
      FROM feedback 
      INNER JOIN schools ON schools.id = feedback.sid  
      WHERE rating = ?`;
  const values = [rating];
  const [res] = await conn.query(sql, values); // Changed to async/await
  return res; // Adjusted for MySQL
};

const getFeedback = async () => {
  const query = `SELECT feedback.*, schools.name, feedback.created_at AS date FROM feedback 
  INNER JOIN schools ON schools.id = feedback.sid`;
  const [res] = await conn.query(query); // Changed to async/await
  return res; // Adjusted for MySQL
}

// // --------------------------------------- PARENT BOT FEEDBACK CRUD ------------------------------------------------

const addParentBotFeedback = async (userId, schoolId, studentId, rating, feedbackType, comment, sessionDuration, featuresUsed) => {
  const query = `INSERT INTO parent_bot_feedback (user_id, school_id, student_id, rating, feedback_type, comment, session_duration, features_used) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [userId, schoolId, studentId, rating, feedbackType, comment, sessionDuration, JSON.stringify(featuresUsed)];
  const [res] = await conn.query(query, values);
  return res.affectedRows > 0;
}

const getParentBotFeedback = async (schoolId, limit = 50) => {
  let query, values;
  
  if (schoolId === null || schoolId === undefined) {
    // Get all feedback when schoolId is null
    query = `
      SELECT pbf.*, s.name as school_name, st.name as student_name
      FROM parent_bot_feedback pbf
      LEFT JOIN schools s ON s.id = pbf.school_id
      LEFT JOIN students st ON st.id = pbf.student_id
      ORDER BY pbf.created_at DESC
      LIMIT ?
    `;
    values = [limit];
  } else {
    // Get feedback for specific school
    query = `
      SELECT pbf.*, s.name as school_name, st.name as student_name
      FROM parent_bot_feedback pbf
      LEFT JOIN schools s ON s.id = pbf.school_id
      LEFT JOIN students st ON st.id = pbf.student_id
      WHERE pbf.school_id = ?
      ORDER BY pbf.created_at DESC
      LIMIT ?
    `;
    values = [schoolId, limit];
  }
  
  const [res] = await conn.query(query, values);
  return res;
}

const getParentBotFeedbackByRating = async (schoolId, rating) => {
  const query = `
    SELECT pbf.*, s.name as school_name, st.name as student_name
    FROM parent_bot_feedback pbf
    LEFT JOIN schools s ON s.id = pbf.school_id
    LEFT JOIN students st ON st.id = pbf.student_id
    WHERE pbf.school_id = ? AND pbf.rating = ?
    ORDER BY pbf.created_at DESC
  `;
  const values = [schoolId, rating];
  const [res] = await conn.query(query, values);
  return res;
}

const getParentBotFeedbackAnalytics = async (schoolId, startDate, endDate) => {
  const query = `
    SELECT 
      COUNT(*) as total_feedback,
      AVG(rating) as avg_rating,
      SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as rating_1_count,
      SUM(CASE WHEN rating = 2 THEN 1 ELSE 0 END) as rating_2_count,
      SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) as rating_3_count,
      SUM(CASE WHEN rating = 4 THEN 1 ELSE 0 END) as rating_4_count,
      SUM(CASE WHEN rating = 5 THEN 1 ELSE 0 END) as rating_5_count
    FROM parent_bot_feedback 
    WHERE school_id = ? 
    AND created_at BETWEEN ? AND ?
  `;
  const values = [schoolId, startDate, endDate];
  const [res] = await conn.query(query, values);
  return res[0];
}

const getParentBotFeedbackByUser = async (userId) => {
  const query = `
    SELECT pbf.*, s.name as school_name, st.name as student_name
    FROM parent_bot_feedback pbf
    LEFT JOIN schools s ON s.id = pbf.school_id
    LEFT JOIN students st ON st.id = pbf.student_id
    WHERE pbf.user_id = ?
    ORDER BY pbf.created_at DESC
  `;
  const values = [userId];
  const [res] = await conn.query(query, values);
  return res;
}

// // --------------------------------------- EXPENSES CRUD ------------------------------------------------

const addExpense = async (termid, sid, date, description, category, amount) => {
  const query = `INSERT INTO expense (termid, sid, date, description, category, amount) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [termid, sid, date, description, category, amount];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res.affectedRows > 0;
}

const getExpense = async (sid) => {
  const sql = 'SELECT * FROM expense WHERE sid = ? ORDER BY date DESC';
  const value = [sid];
  const [res] = await conn.query(sql, value); // Changed to async/await
  return res;
};

const updateStatusExpense = async (id, status) => {
  const sql = 'UPDATE expense SET status = ? WHERE id = ?';
  const value = [status, id];
  const [res] = await conn.query(sql, value); // Changed to async/await
  return res;
};

const deleteExpense = async (id) => {
  const query = `DELETE FROM expense WHERE id = ?`;
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res; // Adjusted for MySQL
};

const editExpense = async (id) => {
  const query = "SELECT * FROM expense WHERE id = ?";
  const value = [id];
  const [res] = await conn.query(query, value); // Changed to async/await
  return res[0]; // Adjusted for MySQL
};

// Updating object
const updateExpense = async (id, date, description, category, amount) => {
  const query =
    "UPDATE expense SET date = ?, description = ?, category = ?, amount = ? WHERE id = ?";
  const values = [date, description, category, amount, id];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res; // Adjusted for MySQL
};

const sumExpense = async (sid) => {
  const query =
    "SELECT SUM(amount) AS sam FROM expense WHERE status = 'approved' AND sid = ?";
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0]; // Adjusted for MySQL
};

const countExpense = async (sid) => {
  const query =
    "SELECT COUNT(id) AS conta FROM expense WHERE status = 'pending' AND sid = ?";
  const values = [sid];
  const [res] = await conn.query(query, values); // Changed to async/await
  return res[0]; // Adjusted for MySQL
};

const monthlyAverage = async(sid) => {
  const query = `SELECT 
    AVG(amount) AS average
FROM expense
WHERE sid = ?
AND status = 'approved'
AND YEAR(date) = YEAR(CURDATE()) 
AND MONTH(date) = MONTH(CURDATE());

  `;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res[0];
}

const getTransactions = async(sid) => {
  const query = `SELECT 'Income' AS type, 'Fee Payment' AS fees, DATE(payment.created_at) AS date, payment.paid AS amount FROM payment 
    INNER JOIN students ON students.id = payment.studentid 
    INNER JOIN history ON history.studentid = students.id 
    INNER JOIN class ON class.id = history.classid 
    UNION ALL
    SELECT 'Expense' AS type, category, date, amount FROM expense 
    WHERE sid = ?
    ORDER BY date DESC`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

const getLineChart = async(sid) => {
  const query = `SELECT 
    m.name AS name,
    COALESCE(p.income, 0) AS income,
    COALESCE(e.expense, 0) AS expenses
FROM 
    (
        SELECT DISTINCT 
            MONTHNAME(created_at) AS name, 
            DATE_FORMAT(created_at, '%Y-%m') AS month 
        FROM payment 
        UNION 
        SELECT DISTINCT 
            MONTHNAME(created_at), 
            DATE_FORMAT(created_at, '%Y-%m') 
        FROM expense
    ) AS m
LEFT JOIN 
    (
        SELECT 
            MONTHNAME(created_at) AS name, 
            DATE_FORMAT(created_at, '%Y-%m') AS month, 
            SUM(paid) AS income 
        FROM payment 
        WHERE payment.sid = ?
        GROUP BY name, month
    ) AS p 
    ON p.month = m.month
LEFT JOIN 
    (
        SELECT 
            MONTHNAME(created_at) AS name, 
            DATE_FORMAT(created_at, '%Y-%m') AS month, 
            SUM(amount) AS expense
        FROM expense
        WHERE expense.status = 'approved' AND expense.sid = ?
        GROUP BY name, month
    ) AS e 
    ON e.month = m.month
ORDER BY m.month`;
  const value = [sid];
  const [res] = await conn.query(query, value);
  return res;
}

// // --------------------------------------- EXPENSES CRUD ------------------------------------------------




// // --------------------------------------- WHATSAPP API ------------------------------------------------

const getFeeBalance = async(phone) => {
  const query = `SELECT 
    p.balance, 
    p.paid,
    p.status,
    p.created_at AS payment_date,
    p.updated_at AS last_updated,
    t.name AS term,
    t.start_date AS term_start,
    t.end_date AS term_end,
    ay.name AS academic_year,
    ay.start_date AS year_start,
    ay.end_date AS year_end,
    f.name AS fee_name,
    f.amount AS fee_amount,
    s.created_at AS admission_date
  FROM payment p
  INNER JOIN students s ON s.id = p.studentid
  INNER JOIN term t ON t.id = p.termid
  INNER JOIN acyear ay ON ay.id = t.yearid
  INNER JOIN fees f ON f.id = p.feeid
  WHERE s.contact = ?
  ORDER BY ay.start_date DESC, t.start_date DESC, p.created_at DESC`;
  const value = [phone];
  const [res] = await conn.query(query, value);
  return res;
}

const getStudentNameByContact = async(phone) => {
  const query = `SELECT students.id, students.name, students.contact, students.address, students.gender, CAST(students.dob AS DATE) AS dob, 
history.schoolid, schools.name AS school, class.name AS class, CAST(students.created_at AS DATE) AS admission
FROM students 
INNER JOIN history ON history.studentid = students.id
INNER JOIN schools ON history.schoolid = schools.id
INNER JOIN class ON history.classid = class.id
WHERE students.contact = ? AND history.status = 'active'`;
  const value = [phone];
  const [res] = await conn.query(query, value);
  return res[0];
}


// // --------------------------------------- TELEGRAM API ------------------------------------------------




// // --------------------------------------- PILOT PROGRAM CRUD ------------------------------------------------

const getPilotPrograms = async () => {
  const query = `SELECT pp.*, s.name as school_name, sp.name as pilot_plan_name, 
                 sp.pilot_price as initial_payment_amount,
                 (sp.price - sp.pilot_price) as total_savings
                 FROM pilot_programs pp
                 LEFT JOIN schools s ON s.id = pp.school_id
                 LEFT JOIN subscription_plans sp ON sp.id = pp.preferred_plan_id
                 WHERE pp.status = 'active'
                 ORDER BY pp.created_at DESC`;
  const [res] = await conn.query(query);
  return res;
};

const getPilotProgramBySchoolId = async (schoolId) => {
  const query = `SELECT pp.*, s.name as school_name, sp.name as pilot_plan_name,
                 sp.pilot_price as initial_payment_amount,
                 (sp.price - sp.pilot_price) as total_savings
                 FROM pilot_programs pp
                 LEFT JOIN schools s ON s.id = pp.school_id
                 LEFT JOIN subscription_plans sp ON sp.id = pp.preferred_plan_id
                 WHERE pp.school_id = ? AND (pp.status = 'approved' OR pp.status = 'active')`;
  const values = [schoolId];
  const [res] = await conn.query(query, values);
  return res[0];
};

const updatePilotProgramStatus = async (id, status) => {
  const query = `UPDATE pilot_programs SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  const values = [status, id];
  const [res] = await conn.query(query, values);
  return res;
};






// --------------------------------------- PILOT PROGRAM CRUD ------------------------------------------------

// Check Pilot Program
const checkPilotProgram = async (schoolId) => {
  const query = `SELECT * FROM pilot_programs WHERE school_id = ?`;
  const values = [schoolId];
  const [res] = await conn.query(query, values);
  return res;
};

// Pilot Application Management
const createPilotProgram = async (id, schoolId, schoolSize, currentSystem, note, expectedStudents, preferredPlanId, startDate, endDate, pilotActive, status = 'pending') => {
  const query = `INSERT INTO pilot_programs (id, school_id, school_size, current_system, note, expected_students, preferred_plan_id, start_date, end_date, pilot_active, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [id, schoolId, schoolSize, currentSystem, note, expectedStudents, preferredPlanId, startDate, endDate, pilotActive, status];
  const [res] = await conn.query(query, values);
  return res;
};
 
const getPilotApplications = async () => {
  const query = `SELECT pp.id, pp.school_id, pp.preferred_plan_id, pp.school_size, pp.current_system,
                 pp.expected_students, pp.start_date, pp.end_date, pp.pilot_active, pp.status,
                 pp.note as motivation, pp.created_at as applied_at,
                 s.name as school_name, s.email as contact_email, s.contact as contact_phone,
                 sp.name as preferred_plan_name, pp.status as application_status
                 FROM pilot_programs pp
                 LEFT JOIN schools s ON s.id = pp.school_id
                 LEFT JOIN subscription_plans sp ON sp.id = pp.preferred_plan_id
                 ORDER BY pp.created_at DESC`;
  const [res] = await conn.query(query);
  return res;
};

const updatePilotApplicationStatus = async (id, status, adminNotes, reviewedBy) => {
  const query = `UPDATE pilot_programs SET status = ?, note = CONCAT(COALESCE(note, ''), '\n\nAdmin Notes: ', ?), updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  const values = [status, adminNotes, id];
  const [res] = await conn.query(query, values);
  return res;
};

// Pilot Subscription Plans (now using unified subscription_plans table)
const getPilotSubscriptionPlans = async () => {
  const query = `SELECT * FROM subscription_plans 
                 WHERE pilot_enabled = TRUE AND is_active = TRUE
                 ORDER BY price ASC`;
  const [res] = await conn.query(query);
  return res;
};

const getPilotPlanById = async (id) => {
  const query = `SELECT * FROM subscription_plans 
                 WHERE id = ? AND pilot_enabled = TRUE AND is_active = TRUE`;
  const values = [id];
  const [res] = await conn.query(query, values);
  return res[0];
};

// Pilot Payments - Simplified for unified table
const createPilotPayment = async (id, pilotProgramId, paymentType, amount, originalAmount, discountAmount, dueDate) => {
  // Since we're using unified table, we'll just return success
  // Payment tracking would need to be handled separately or added to pilot_programs table
  return { affectedRows: 1 };
};

const getPilotPayments = async (pilotProgramId) => {
  // Return empty array since we're not tracking payments in separate table
  return [];
};

const updatePilotPaymentStatus = async (id, status, transactionId, paymentMethod) => {
  // Since we're using unified table, we'll just return success
  return { affectedRows: 1 };
};

// Pilot Milestones - Simplified for unified table
const createPilotMilestone = async (id, pilotProgramId, milestoneType, milestoneDate) => {
  // Since we're using unified table, we'll just return success
  // Milestone tracking would need to be handled separately or added to pilot_programs table
  return { affectedRows: 1 };
};

const getPilotMilestones = async (pilotProgramId) => {
  // Return empty array since we're not tracking milestones in separate table
  return [];
};

const updatePilotMilestone = async (id, status, notes, feedbackScore) => {
  // Since we're using unified table, we'll just return success
  return { affectedRows: 1 };
};






module.exports = {

  // ----- CONVERSATION SECTION -----
  conversationRequest,
  getConversationRequest,
  updateConversationRequestStatus,
  createConversation,
  addConversationMessage,
  getConversationMessages,
  closeConversation,
  // ----- CONVERSATION SECTION -----


  // ----- DISCIPLINARY SECTION -----
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
  // ----- DISCIPLINARY SECTION -----


  // ----- ATTENDANCE SECTION -----
  checkAttendance,
  addAttendance,
  // ----- ATTENDANCE SECTION -----


//   // ----- WHATSAPP API -----
  getFeeBalance,
  getStudentNameByContact,
//   // ----- WHATSAPP API -----



//   // ----- EXPENSE SECTION -----
addExpense,
getExpense,
updateStatusExpense,
editExpense,
updateExpense,
deleteExpense,
sumExpense,
countExpense,
monthlyAverage,
getTransactions,
getLineChart,
//   // ----- EXPENSE SECTION -----



//   // ----- SCHOOLS SECTION -----
  countSchools,
  countAllTeachers,
  countAllStudents,
  getSchools,
  getOTPCode,
  updateOTPStatus,
  countPrivateSchools,
  countPublicSchools,
  countSubscribedSchools,
  sumAmount,
  paymentChart,
//   // ----- SCHOOLS SECTION -----


//   // ----- REGISTER SECTION -----
  checkSchool,
  checkSuperPassword,
  checkPassword,
  checkTeacherPassword,
  insertSchool,
  editSchool,
  updateSchool,
  updateSchoolWithoutLogo,
  OTPGeneration,
  OTPVerification,
  updatePassword,
  updateTeacherPassword,
  updateSuperPassword,
  getAdmin,
  updateAdmin,
  getSchoolByID,
//   // ----- REGISTER SECTION -----



//   // ----- CONTACTS SECTION -----
addContacts,
//   // ----- CONTACTS SECTION -----

  checkMail,
  checkTeacherMail,
  checkAdminMail,

//   // ----- EXAM SECTION -----
  checkExam,
  insertExam,
  getExam,
  deleteExam,
  updateExam,
  editExam,
//   // ----- EXAM SECTION -----

//   // ----- YEAR SECTION -----
  checkYear,
  insertYear,
  getYear,
  deleteYear,
  updateYear,
  editYear,
//   // ----- YEAR SECTION -----

//   // ----- SUBJECT SECTION -----
  checkSubject,
  insertSubject,
  getSubject,
  deleteSubject,
  updateSubject,
  editSubject,
//   // ----- SUBJECT SECTION -----

//   // ----- CLASS SECTION -----
  checkClass,
  insertClass,
  getClass,
  deleteClass,
  updateClass,
  editClass,
//   // ----- CLASS SECTION -----

//   // ----- TERM SECTION -----
  checkTerm,
  insertTerm,
  getTerm,
  deleteTerm,
  updateTerm,
  editTerm,
//   // ----- TERM SECTION -----

//   // ----- GRADE SECTION -----
  checkGrade,
  insertGrade,
  getGrade,
  deleteGrade,
  updateGrade,
  editGrade,
  getMSCEGrade,
  getJCEGrade,
//   // ----- GRADE SECTION -----

//   // ----- JCE SECTION -----
  checkJCE,
  insertJCE,
  getJCE,
  deleteJCE,
  updateJCE,
  editJCE,
//   // ----- JCE SECTION -----

//   // ----- MSCE SECTION -----
  checkMSCE,
  insertMSCE,
  getMSCE,
  deleteMSCE,
  updateMSCE,
  editMSCE,
//   // ----- MSCE SECTION -----

//   // ----- TEACHER SECTION -----
  checkTeacher,
  insertTeacher,
  getTeacher,
  getSingleTeacher,
  getTeacherClass,
  getTeacherSubject,
  deleteTeacher,
  updateTeacher,
  editTeacher,
  countTeachers,
  countMaleTeachers,
  countFemaleTeachers,
  teacherGenderPercentage,
//   // ----- TEACHER SECTION -----

//   // ----- STUDENT SECTION -----
  checkStudent,
  insertStudent,
  getStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
  insertStudentHistory,
  countStudents,
  countMale,
  countFemale,
  countGenderAndClass,
  genderPercentage,
  statStudents,
  statCountry,
//   // ----- STUDENT SECTION -----

//   // ----- FEE SECTION -----
  checkFee,
  insertFee,
  getFee,
  deleteFee,
  updateFee,
  editFee,
//   // ----- FEE SECTION -----

//   // ----- PAYMENT SECTION -----
  getPay,
  getPayee,
  insertPay,
  checkPay,
  editPay,
  updatePay,
  deletePay,
  sumPayment,
  sumPaymentThisMonth,
  getTuition,
  getOutstanding,
  PaidByDays,
  PaidByClass,
//   // ----- PAYMENT SECTION -----


  
//   // ----- ENTRY SECTION -----
  getClassByTeacherID,
  getSubjectByTeacherID,
  getYearByTeacherID,
  getTermByTeacherID,
  getExamByTeacherID,
  getStudentForEntry,
  checkResult,
  insertResult,
  getClassById,
  getGradeByDenom,
//   // ----- ENTRY SECTION -----

//   // ----- FILTER SECTION -----
  getX,
  getScore,
  updateScore,
  deleteResult,
//   // ----- FILTER SECTION -----

//   // ----- TEACHER CLASS SECTION -----
  getClassStudent,
  getClassNSubject,
  dashboardClassTeacher,
  checkAssignTeacher,
  insertAssignTeacher,
  getAssignTeacher,
  deleteAssignTeacher,
  checkClassTeacher,
  insertClassTeacher,
  getClassTeacher,
  deleteClassTeacher,
  getClassTeacherByStudentID,
//   // ----- TEACHER CLASS SECTION -----

//   // ----- CHART SECTION -----
  getStudentByGender,
  getTopStudent,
  getAggScoreBySUbject,
  countStudentByAssign,
//   // ----- CHART SECTION -----

//   // ----- REPORT SECTION -----
  getReportByStudent,
  countSubjects,
  addPromote,
  checkPromote,
  updatePromote,
  getReportByStudentMSCE,
  getStudentCard,
  getStudentCardMSCE,
  getClassTeacher4Report,
  countResult,
  getSubjectPosition,
  realPos,
  getTeacherBySubject,
  getRemarks,
  deleteReport,
  countReports,
  getStudentForPromotion,
  upperPromote,
  bestStudents,
  worstStudents,
  avSubByClass,
//   // ----- REPORT SECTION -----




//   // ----- EVENTS SECTION -----
  checkEvent,
  addEvent,
  getEvents,
  editEvent,
  updateEvent,
  deleteEvent,
//   // ----- EVENTS SECTION -----




//   // ----- SUPER ADMIN SECTION -----
  insertFeatures,
  getSubscriptions,
  deleteSubscription,
  editPlan, 
  updatePlan,
//   // ----- SUPER ADMIN SECTION -----



//   // ----- SUBSCRIPTION SECTION -----
  getSubs,
  getPlanByID,
  addSubscription,
  addBilling,
  cancelSubscription,
  checkSubToCancel,
  cancelBilling,
  checkSubscription,
  checkSubscriptionStatus,
  checkResentSubscriptionStatus,
  checkSubsByID,
  updateSubscriptionStatus,
  checkPaid,
  getSubscriptionPayments,
  updateSubStatus,
  updateBillingStatus,
  updateSchoolStatus,
  getSubscriptionByID,
  // ----- SUBSCRIPTION SECTION -----




  // ----- SUBSCRIBE SECTION -----
  checkSubscribe,
  addSubscribe,



  // ----- FEEDBACK SECTION -----
  addFeedback,
  getFeedbackByRating,
  getFeedback,

  // ----- PARENT BOT FEEDBACK SECTION -----
  addParentBotFeedback,
  getParentBotFeedback,
  getParentBotFeedbackByRating,
  getParentBotFeedbackAnalytics,
  getParentBotFeedbackByUser,

  // ----- AI STUDENT DATA SECTION -----
  getStudentDataForAI,

  // ----- PILOT PROGRAM SECTION -----
  createPilotProgram,
  getPilotPrograms,
  getPilotApplications,
  updatePilotApplicationStatus,
  getPilotProgramBySchoolId,
  updatePilotProgramStatus,
  checkPilotProgram,
  getPilotPayments,
  updatePilotPaymentStatus,
//   // ----- PILOT PROGRAM SECTION -----

//   // ----- REFERRAL SYSTEM SECTION -----

};

// ==================== AI STUDENT DATA FUNCTIONS ====================

/**
 * Get comprehensive student data for AI analysis (enhanced with additional tables)
 * @param {number} studentId - Student ID
 * @param {number} schoolId - School ID
 * @returns {Object} Comprehensive student data for AI consumption
 */
async function getStudentDataForAI(studentId, schoolId) {
  const startTime = Date.now();
  
  try {
    // Enhanced: Single query with UNION for all data types using correct table names and fields
    // Note: Using subqueries to handle ORDER BY and LIMIT properly in UNION
    const [rows] = await conn.query(`
      SELECT * FROM (
        SELECT 
          'academic' as data_type,
          r.score, r.grade, r.remarks, subj.name as subject, r.created_at,
          NULL as date, NULL as status, NULL as note, NULL as category, NULL as action, NULL as severity,
          NULL as amount, NULL as payment_status, NULL as due_date, NULL as term, NULL as year,
          NULL as event_title, NULL as event_description, NULL as event_date, NULL as event_type,
          NULL as class_name, NULL as teacher_name, NULL as term_name
        FROM results r
        INNER JOIN subject subj ON subj.id = r.subjectid
        WHERE r.studentid = ? AND r.sid = ?
        ORDER BY r.created_at DESC
        LIMIT 20
      ) academic_data
      
      UNION ALL
      
      SELECT * FROM (
        SELECT 
          'attendance' as data_type,
          NULL as score, NULL as grade, NULL as remarks, NULL as subject, created_at,
          date, status, note, NULL as category, NULL as action, NULL as severity,
          NULL as amount, NULL as payment_status, NULL as due_date, NULL as term, NULL as year,
          NULL as event_title, NULL as event_description, NULL as event_date, NULL as event_type,
          NULL as class_name, NULL as teacher_name, NULL as term_name
        FROM attendance
        WHERE studentid = ?
        ORDER BY date DESC
        LIMIT 30
      ) attendance_data
      
      UNION ALL
      
      SELECT * FROM (
        SELECT 
          'disciplinary' as data_type,
          NULL as score, NULL as grade, NULL as remarks, NULL as subject, dr.created_at,
          dr.incident_date as date, dr.status, NULL as note, dr.category, dr.action_taken as action, dr.severity_level as severity,
          NULL as amount, NULL as payment_status, NULL as due_date, NULL as term, NULL as year,
          NULL as event_title, NULL as event_description, NULL as event_date, NULL as event_type,
          NULL as class_name, NULL as teacher_name, NULL as term_name
        FROM disciplinary_records dr
        WHERE dr.student_id = ?
        ORDER BY dr.incident_date DESC
        LIMIT 10
      ) disciplinary_data
      
      UNION ALL
      
      SELECT * FROM (
        SELECT 
          'fees' as data_type,
          NULL as score, NULL as grade, NULL as remarks, NULL as subject, p.created_at,
          NULL as date, p.status, NULL as note, NULL as category, NULL as action, NULL as severity,
          p.paid as amount, p.status as payment_status, NULL as due_date, t.name as term, ay.name as year,
          NULL as event_title, NULL as event_description, NULL as event_date, NULL as event_type,
          NULL as class_name, NULL as teacher_name, NULL as term_name
        FROM payment p
        INNER JOIN fees f ON f.id = p.feeid
        INNER JOIN term t ON t.id = p.termid
        INNER JOIN acyear ay ON ay.id = t.yearid
        WHERE p.studentid = ? AND p.sid = ?
        ORDER BY p.created_at DESC
        LIMIT 15
      ) fees_data
      
      UNION ALL
      
      SELECT * FROM (
        SELECT 
          'events' as data_type,
          NULL as score, NULL as grade, NULL as remarks, NULL as subject, created_at,
          NULL as date, NULL as status, NULL as note, NULL as category, NULL as action, NULL as severity,
          NULL as amount, NULL as payment_status, NULL as due_date, NULL as term, NULL as year,
          title as event_title, description as event_description, date as event_date, NULL as event_type,
          NULL as class_name, NULL as teacher_name, NULL as term_name
        FROM events
        WHERE sid = ? AND (date >= CURDATE() OR date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY))
        ORDER BY date DESC
        LIMIT 10
      ) events_data
      
      UNION ALL
      
      SELECT * FROM (
        SELECT 
          'class_info' as data_type,
          NULL as score, NULL as grade, NULL as remarks, NULL as subject, s.created_at,
          NULL as date, NULL as status, NULL as note, NULL as category, NULL as action, NULL as severity,
          NULL as amount, NULL as payment_status, NULL as due_date,
          NULL as event_title, NULL as event_description, NULL as event_date, NULL as event_type,
          c.name as class_name, t.name as teacher_name
        FROM students s
        LEFT JOIN history h ON h.studentid = s.id
        LEFT JOIN class c ON c.id = h.classid
        LEFT JOIN classteacher ct ON ct.classid = c.id
        LEFT JOIN teachers t ON t.id = ct.teacherid
        WHERE s.id = ? AND h.schoolid = ?
        LIMIT 1
      ) class_info_data
    `, [studentId, schoolId, studentId, studentId, studentId, schoolId, schoolId, studentId, schoolId]);

    // Process and separate data by type
    const academic = [];
    const attendance = [];
    const disciplinary = [];
    const fees = [];
    const events = [];
    const classInfo = [];

    rows.forEach(row => {
      switch (row.data_type) {
        case 'academic':
          academic.push({
            score: row.score,
            grade: row.grade,
            remarks: row.remarks,
            subject: row.subject,
            created_at: row.created_at
          });
          break;
        case 'attendance':
          attendance.push({
            date: row.date,
            status: row.status,
            note: row.note,
            created_at: row.created_at
          });
          break;
        case 'disciplinary':
          disciplinary.push({
            date: row.date,
            category: row.category,
            action: row.action,
            severity: row.severity,
            status: row.status,
            created_at: row.created_at
          });
          break;
        case 'fees':
          fees.push({
            amount: row.amount,
            payment_status: row.payment_status,
            term: row.term,
            year: row.year,
            created_at: row.created_at
          });
          break;
        case 'events':
          events.push({
            title: row.event_title,
            description: row.event_description,
            event_date: row.event_date,
            created_at: row.created_at
          });
          break;
        case 'class_info':
          classInfo.push({
            class_name: row.class_name,
            teacher_name: row.teacher_name,
            term_name: row.term_name,
            created_at: row.created_at
          });
          break;
      }
    });

    const queryTime = Date.now() - startTime;
    
    // Performance monitoring - slow query threshold: 200ms

    return {
      academic,
      attendance,
      disciplinary,
      fees,
      events,
      classInfo: classInfo[0] || null // Single class info object
    };
  } catch (error) {
    console.error('[AI] Error getting student data:', error);
    return { 
      academic: [], 
      attendance: [], 
      disciplinary: [], 
      fees: [], 
      events: [], 
      classInfo: null 
    };
  }
}

// ==================== REFERRAL SYSTEM FUNCTIONS ====================

// Generate a unique referral code
// const generateReferralCode = async (schoolId) => {
//   try {
//     const length = 8; // Default length
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let code = '';
    
//     // Generate code until we find a unique one
//     let isUnique = false;
//     while (!isUnique) {
//       code = '';
//       for (let i = 0; i < length; i++) {
//         code += chars.charAt(Math.floor(Math.random() * chars.length));
//       }
      
//       // Check if code already exists
//       const sql = 'SELECT id FROM referral_codes WHERE referral_code = ?';
//       const [existing] = await conn.query(sql, [code]);
//       isUnique = existing.length === 0;
//     }
    
//     return code;
//   } catch (error) {
//     console.error('Error generating referral code:', error);
//     throw error;
//   }
// };

// Create referral code for a school
// const createReferralCode = async (schoolId) => {
//   try {
//     // Check if school already has a referral code
//     const checkSql = 'SELECT id FROM referral_codes WHERE school_id = ? AND is_active = TRUE';
//     const [existing] = await conn.query(checkSql, [schoolId]);
    
//     if (existing.length > 0) {
//       return existing[0].id; // Return existing code ID
//     }
    
//     // Generate new referral code
//     const referralCode = await generateReferralCode(schoolId);
    
//     // Insert new referral code
//     const sql = 'INSERT INTO referral_codes (school_id, referral_code) VALUES (?, ?)';
//     const [result] = await conn.query(sql, [schoolId, referralCode]);
    
//     return result.insertId;
//   } catch (error) {
//     console.error('Error creating referral code:', error);
//     throw error;
//   }
// };

// Get referral code for a school
// const getReferralCode = async (schoolId) => {
//   try {
//     const sql = 'SELECT * FROM referral_codes WHERE school_id = ? AND is_active = TRUE';
//     const [result] = await conn.query(sql, [schoolId]);
//     return result[0] || null;
//   } catch (error) {
//     console.error('Error getting referral code:', error);
//     throw error;
//   }
// };

// Validate referral code
// const validateReferralCode = async (referralCode) => {
//   try {
//     const sql = `
//       SELECT rc.*, s.email as referrer_email 
//       FROM referral_codes rc 
//       JOIN schools s ON rc.school_id = s.id 
//       WHERE rc.referral_code = ? AND rc.is_active = TRUE
//     `;
//     const [result] = await conn.query(sql, [referralCode]);
//     return result[0] || null;
//   } catch (error) {
//     console.error('Error validating referral code:', error);
//     throw error;
//   }
// };

// Track referral usage
// const trackReferralUsage = async (referrerSchoolId, referredSchoolId, referralCode) => {
//   try {
//     // Get referral settings
//     const settings = await getReferralSettings();
//     const discountPercentage = parseFloat(settings.referral_discount_percentage) || 10.00;
//     const rewardAmount = parseFloat(settings.referral_reward_amount) || 50.00;
    
//     const sql = `
//       INSERT INTO referral_tracking 
//       (referrer_school_id, referred_school_id, referral_code_used, discount_percentage, reward_amount) 
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     const [result] = await conn.query(sql, [
//       referrerSchoolId, 
//       referredSchoolId, 
//       referralCode, 
//       discountPercentage, 
//       rewardAmount
//     ]);
    
//     return result.insertId;
//   } catch (error) {
//     console.error('Error tracking referral usage:', error);
//     throw error;
//   }
// };

// Get referral settings
// const getReferralSettings = async () => {
//   try {
//     const sql = 'SELECT setting_key, setting_value FROM referral_settings';
//     const [result] = await conn.query(sql);
    
//     const settings = {};
//     result.forEach(row => {
//       settings[row.setting_key] = row.setting_value;
//     });
    
//     return settings;
//   } catch (error) {
//     console.error('Error getting referral settings:', error);
//     throw error;
//   }
// };

// Update referral settings
// const updateReferralSettings = async (settings) => {
//   try {
//     const updates = [];
//     for (const [key, value] of Object.entries(settings)) {
//       updates.push(`('${key}', '${value}')`);
//     }
    
//     const sql = `
//       INSERT INTO referral_settings (setting_key, setting_value) 
//       VALUES ${updates.join(', ')}
//       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)
//     `;
    
//     await conn.query(sql);
//     return true;
//   } catch (error) {
//     console.error('Error updating referral settings:', error);
//     throw error;
//   }
// };

// Get referral analytics for a school
// const getReferralAnalytics = async (schoolId) => {
//   try {
//     const sql = `
//       SELECT 
//         ra.total_referrals,
//         ra.successful_referrals,
//         ra.total_rewards_earned,
//         ra.total_discounts_given,
//         ra.last_referral_date,
//         rc.referral_code,
//         s.email as school_email
//       FROM referral_analytics ra
//       LEFT JOIN referral_codes rc ON ra.school_id = rc.school_id AND rc.is_active = TRUE
//       LEFT JOIN schools s ON ra.school_id = s.id
//       WHERE ra.school_id = ?
//     `;
//     const [result] = await conn.query(sql, [schoolId]);
//     return result[0] || null;
//   } catch (error) {
//     console.error('Error getting referral analytics:', error);
//     throw error;
//   }
// };

// Get all referral analytics (for super admin)
// const getAllReferralAnalytics = async () => {
//   try {
//     const sql = `
//       SELECT 
//         ra.school_id,
//         s.email as school_email,
//         ra.total_referrals,
//         ra.successful_referrals,
//         ra.total_rewards_earned,
//         ra.total_discounts_given,
//         ra.last_referral_date,
//         rc.referral_code,
//         ra.created_at
//       FROM referral_analytics ra
//       LEFT JOIN schools s ON ra.school_id = s.id
//       LEFT JOIN referral_codes rc ON ra.school_id = rc.school_id AND rc.is_active = TRUE
//       ORDER BY ra.total_referrals DESC
//     `;
//     const [result] = await conn.query(sql);
//     return result;
//   } catch (error) {
//     console.error('Error getting all referral analytics:', error);
//     throw error;
//   }
// };

// Update referral analytics
// const updateReferralAnalytics = async (schoolId, updateData) => {
//   try {
//     const fields = [];
//     const values = [];
    
//     for (const [key, value] of Object.entries(updateData)) {
//       fields.push(`${key} = ?`);
//       values.push(value);
//     }
    
//     values.push(schoolId);
    
//     const sql = `
//       INSERT INTO referral_analytics (school_id, ${Object.keys(updateData).join(', ')})
//       VALUES (?, ${Object.keys(updateData).map(() => '?').join(', ')})
//       ON DUPLICATE KEY UPDATE ${fields.join(', ')}
//     `;
    
//     await conn.query(sql, values);
//     return true;
//   } catch (error) {
//     console.error('Error updating referral analytics:', error);
//     throw error;
//   }
// };

// Get referral tracking records
// const getReferralTracking = async (schoolId = null) => {
//   try {
//     let sql = `
//       SELECT 
//         rt.*,
//         s1.email as referrer_email,
//         s2.email as referred_email,
//         s1.id as referrer_school_id,
//         s2.id as referred_school_id
//       FROM referral_tracking rt
//       LEFT JOIN schools s1 ON rt.referrer_school_id = s1.id
//       LEFT JOIN schools s2 ON rt.referred_school_id = s2.id
//     `;
    
//     const values = [];
//     if (schoolId) {
//       sql += ' WHERE rt.referrer_school_id = ? OR rt.referred_school_id = ?';
//       values.push(schoolId, schoolId);
//     }
    
//     sql += ' ORDER BY rt.created_at DESC';
    
//     const [result] = await conn.query(sql, values);
//     return result;
//   } catch (error) {
//     console.error('Error getting referral tracking:', error);
//     throw error;
//   }
// };

// Apply referral discount
// const applyReferralDiscount = async (referralTrackingId, subscriptionAmount) => {
//   try {
//     const sql = `
//       SELECT rt.*, rc.referral_code 
//       FROM referral_tracking rt
//       LEFT JOIN referral_codes rc ON rt.referral_code_used = rc.referral_code
//       WHERE rt.id = ?
//     `;
//     const [result] = await conn.query(sql, [referralTrackingId]);
    
//     if (result.length === 0) {
//       throw new Error('Referral tracking record not found');
//     }
    
//     const tracking = result[0];
//     const discountAmount = (subscriptionAmount * tracking.discount_percentage) / 100;
    
//     // Update tracking record
//     const updateSql = `
//       UPDATE referral_tracking 
//       SET discount_applied = ?, status = 'completed'
//       WHERE id = ?
//     `;
//     await conn.query(updateSql, [discountAmount, referralTrackingId]);
    
//     // Update analytics
//     await updateReferralAnalytics(tracking.referrer_school_id, {
//       successful_referrals: 1,
//       total_discounts_given: discountAmount,
//       last_referral_date: new Date()
//     });
    
//     return discountAmount;
//   } catch (error) {
//     console.error('Error applying referral discount:', error);
//     throw error;
//   }
// };

// ----- PASSWORD RESET SYSTEM SECTION -----

// Find user by email across all user tables
const findUserByEmail = async (email) => {
  const schoolQuery = "SELECT id, name, email FROM schools WHERE email = ?";
  const teacherQuery = "SELECT id, name, email, sid FROM teachers WHERE email = ?";
  const superAdminQuery = "SELECT id, email FROM administrator WHERE email = ?";

  const [schoolResult] = await conn.query(schoolQuery, [email]);
  const [teacherResult] = await conn.query(teacherQuery, [email]);
  const [superAdminResult] = await conn.query(superAdminQuery, [email]);

  let user = null;
  let userType = null;

  if (schoolResult.length > 0) {
    user = schoolResult[0];
    userType = 'school';
  } else if (teacherResult.length > 0) {
    user = teacherResult[0];
    userType = 'teacher';
  } else if (superAdminResult.length > 0) {
    user = superAdminResult[0];
    userType = 'super_admin';
  }

  return { user, userType };
};

// Store password reset token
const storePasswordResetToken = async (email, token, expiresAt, ipAddress, userAgent, sessionId, correlationId) => {
  const sql = `
    INSERT INTO password_reset_tokens (email, token, expires_at, ip_address, user_agent, session_id, correlation_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [email, token, expiresAt, ipAddress, userAgent, sessionId, correlationId];
  const [result] = await conn.query(sql, values);
  return result.insertId;
};

// Validate password reset token
const validatePasswordResetToken = async (token) => {
  const sql = `
    SELECT * FROM password_reset_tokens 
    WHERE token = ? AND used = FALSE AND expires_at > NOW()
  `;
  const [result] = await conn.query(sql, [token]);
  return result[0] || null;
};

// Update user password based on user type
const updateUserPassword = async (userId, userType, hashedPassword) => {
  let updateQuery;
  
  if (userType === 'school') {
    updateQuery = "UPDATE schools SET password = ? WHERE id = ?";
  } else if (userType === 'teacher') {
    updateQuery = "UPDATE teachers SET password = ? WHERE id = ?";
  } else if (userType === 'super_admin') {
    updateQuery = "UPDATE administrator SET password = ? WHERE id = ?";
  } else {
    throw new Error('Invalid user type');
  }

  const [result] = await conn.query(updateQuery, [hashedPassword, userId]);
  return result;
};

// Store password in history
const storePasswordHistory = async (userId, userType, passwordHash) => {
  const sql = `
    INSERT INTO password_history (user_id, user_type, password_hash, created_at) 
    VALUES (?, ?, ?, NOW())
  `;
  const values = [userId, userType, passwordHash];
  const [result] = await conn.query(sql, values);
  return result.insertId;
};

// Mark password reset token as used
const markPasswordResetTokenAsUsed = async (token) => {
  const sql = `
    UPDATE password_reset_tokens 
    SET used = TRUE, used_at = NOW() 
    WHERE token = ?
  `;
  const [result] = await conn.query(sql, [token]);
  return result;
};

// Get password reset token by email
const getPasswordResetTokenByEmail = async (email) => {
  const sql = `
    SELECT * FROM password_reset_tokens 
    WHERE email = ? AND used = FALSE AND expires_at > NOW()
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const [result] = await conn.query(sql, [email]);
  return result[0] || null;
};

// Clean up expired tokens
const cleanupExpiredTokens = async () => {
  const sql = `
    DELETE FROM password_reset_tokens 
    WHERE expires_at < NOW() OR (used = TRUE AND used_at < DATE_SUB(NOW(), INTERVAL 1 DAY))
  `;
  const [result] = await conn.query(sql);
  return result.affectedRows;
};

// Get password reset statistics
const getPasswordResetStats = async (email = null) => {
  let sql = `
    SELECT 
      COUNT(*) as total_requests,
      COUNT(CASE WHEN used = TRUE THEN 1 END) as successful_resets,
      COUNT(CASE WHEN used = FALSE AND expires_at > NOW() THEN 1 END) as pending_tokens,
      COUNT(CASE WHEN expires_at < NOW() AND used = FALSE THEN 1 END) as expired_tokens
    FROM password_reset_tokens
  `;
  const values = [];
  
  if (email) {
    sql += " WHERE email = ?";
    values.push(email);
  }
  
  const [result] = await conn.query(sql, values);
  return result[0];
};

// Add password reset functions to module.exports
module.exports = {
  ...module.exports,
  // ----- REFERRAL SYSTEM SECTION -----
  // generateReferralCode,
  // createReferralCode,
  // getReferralCode,
  // validateReferralCode,
  // trackReferralUsage,
  // getReferralSettings,
  // updateReferralSettings,
  // getReferralAnalytics,
  // getAllReferralAnalytics,
  // updateReferralAnalytics,
  // getReferralTracking,
  // applyReferralDiscount,
  // ----- PASSWORD RESET SYSTEM SECTION -----
  findUserByEmail,
  storePasswordResetToken,
  validatePasswordResetToken,
  updateUserPassword,
  storePasswordHistory,
  markPasswordResetTokenAsUsed,
  getPasswordResetTokenByEmail,
  cleanupExpiredTokens,
  getPasswordResetStats
};
