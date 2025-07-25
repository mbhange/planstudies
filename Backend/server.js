require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios");
const fetch = require("node-fetch");
const compression = require("compression");
const multer = require("multer");
const path = require("path");
const twilio = require("twilio");

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
// app.use("/uploads", express.static("uploads"));

const ODOO_URL = process.env.ODOO_URL;
const ODOO_DB = process.env.ODOO_DB;
const ODOO_USERNAME = process.env.ODOO_USERNAME;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD;

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected.");
});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API route to handle contact form submission
app.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, phoneNumber, country, service, message } = req.body;

  // Validate incoming data
  if (!firstName || !lastName || !email || !phoneNumber || !country || !service || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const mailOptions = {
    from: email,  // User's email
    to: process.env.CONTACT_EMAIL,  // Your email address
    subject: `New Inquiry: ${country} - ${service}`,
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phoneNumber}
      Country: ${country}
      Services: ${service}
      Message: ${message}
    `,
  };

  // Send the email with the form data
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email." });
    }
    res.status(200).json({ message: "Email sent successfully." });
  });
});

// API for password reset
app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

  const sql = "UPDATE users SET reset_token = ? WHERE email = ?";
  db.query(sql, [token, email], (err, result) => {
    if (err) {
      console.error("Error updating token:", err);
      return res.status(500).json("Server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(400).json("User not found.");
    }

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    // Send reset email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      text: `Click the link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email." });
      }
      res.json({ message: "Reset link sent to your email." });
    });
  });
});

//  Reset Password - Validate Token & Update Password
app.post("/api/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Invalid request." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hashedPassword, email],
      (err, result) => {
        if (err) {
          console.error("Error updating password:", err);
          return res.status(500).json({ message: "Server error." });
        }
        res.status(200).json({ message: "Password reset successfully." });
      }
    );
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return res.status(400).json({ message: "Invalid or expired token." });
  }
});

//API to register
// app.post("/api/register", async (req, res) => {
//   const { role, fullName, phone_number, email, password } = req.body;

//   if (!role || !email || !password) {
//     return res.status(400).send("All fields are required.");
//   }
//   if (typeof phone_number !== "string") {
//     return res.status(400).send("Invalid phone number.");
//   }
//   phone_number = phone_number.replace(/[^+\d]/g, "");

//   // **Ensure phone_number is not empty after sanitization**
//   if (!phone_number) {
//     return res.status(400).send("Invalid phone number after sanitization.");
//   }
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const sql = "INSERT INTO users (role, fullname, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
//     db.query(sql, [role, fullName,  phone_number, email, hashedPassword], (err, result) => {
//       if (err) {
//         console.error("Error inserting user:", err);
//         if (err.code === "ER_DUP_ENTRY") {
//           return res.status(400).send("Email already exists.");
//         }
//         return res.status(500).send("Server error.");
//       }
//       res.status(201).send("Account created successfully.");
//     });
//   } catch (error) {
//     console.error("Error hashing password:", error);
//     res.status(500).send("Error hashing password.");
//   }
// });
app.post("/api/register", async (req, res) => {
  let { role, fullName, phone_number, email, password } = req.body;

  // Validate required fields
  if (!role || !fullName || !email || !password) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into MySQL
    const sql = "INSERT INTO users (role, fullname, phone_number, email, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [role, fullName, phone_number, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).send("Email already exists.");
        }
        return res.status(500).send("Server error.");
      }
      return res.status(201).send("Account created successfully.");
    });

  } catch (error) {
    console.error("Error hashing password:", error);
    return res.status(500).send("Error hashing password.");
  }
});

app.get("/api/register", (req, res) => {
  const sql = "SELECT id, role, fullname, phone_number, email, created_at FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return res.status(500).send("Server error.");
    }
    res.json(results);
  });
});

app.get("/api/sub-admin", (req, res) => {
  const sql = "SELECT id, role, fullname, phone_number, email, created_at FROM users WHERE role = 'student'";
  // const sql = "SELECT id, role, fullname, phone_number, email, created_at FROM users WHERE role IN ('student', 'admin')";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).send("Server error.");
    }
    res.json(results);
  });
});


app.delete("/api/register/:id", (req, res) => {
  const userId = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).send("Server error.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("User not found.");
    }

    res.status(200).send("User removed successfully.");
  });
});

app.get("/api/user", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const sql = "SELECT fullname FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).send("Server error.");
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ fullname: results[0].fullname });
  });
});


app.get("/api/students", (req, res) => {
  const sql = "SELECT id, fullname, phone_number, email, created_at FROM users WHERE role = 'student'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).send("Server error.");
    }
    res.json(results);
  });
});

// Get all agents
app.get("/api/agents", (req, res) => {
  const sql = "SELECT id, fullname, phone_number, email, created_at FROM users WHERE role = 'agent'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).send("Server error.");
    }
    res.json(results);
  });
});

//API to Login
// app.post("/api/login", (req, res) => {
//   const { email, password, role } = req.body;

//   const sql = "SELECT * FROM users WHERE email = ? AND role = ?";
//   db.query(sql, [email, role], async (err, results) => {
//       if (err) {
//           console.error("Error querying user:", err);
//           return res.status(500).json({ error: "Server error." }); // ✅ Return JSON
//       }
//       if (results.length === 0) {
//           return res.status(401).json({ error: "Invalid credentials." }); // ✅ Return JSON
//       }

//       const user = results[0];
//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (isPasswordValid) {
//           return res.status(200).json({ 
//               message: "Login successful", 
//               user: { id: user.id, email: user.email, role: user.role } // ✅ Return user data
//           });
//       } else {
//           return res.status(401).json({ error: "Invalid password." }); // ✅ Return JSON
//       }
//   });
// });
app.post("/api/login", (req, res) => {
  const { email, password } = req.body; // Removed role from request body

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("Error querying user:", err);
      return res.status(500).json({ error: "Server error." });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return res.status(200).json({
        message: "Login successful",
        user: { id: user.id, email: user.email, role: user.role } // Role is still returned but not required for login
      });
    } else {
      return res.status(401).json({ error: "Invalid password." });
    }
  });
});


app.post("/api/send-otp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required.");
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  // Store OTP in the database temporarily
  const sql = "UPDATE users SET otp = ? WHERE email = ?";
  db.query(sql, [otp, email], (err, result) => {
    if (err) {
      console.error("Error updating OTP:", err);
      return res.status(500).send("Server error.");
    }

    // Send OTP to the user's email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account with OTP",
      text: `Your OTP for account verification is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending OTP email:", error);
        return res.status(500).send("Error sending OTP.");
      }
      console.log("Test email sent:", info.response);
      res.status(200).send("OTP sent to your email.");
    });
  });
});

// Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required.");
  }

  const sql = "SELECT otp FROM users WHERE email = ?";
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error querying OTP:", err);
      return res.status(500).send("Server error.");
    }

    if (result.length === 0 || result[0].otp !== otp) {
      return res.status(400).send("Invalid OTP.");
    }

    // OTP is valid, update the user to confirm their account
    const updateSql = "UPDATE users SET otp_verified = 1 WHERE email = ?";
    db.query(updateSql, [email], (updateErr, updateResult) => {
      if (updateErr) {
        console.error("Error updating OTP verification:", updateErr);
        return res.status(500).send("Server error.");
      }

      res.status(200).send("OTP verified successfully.");
    });
  });
});

//API to connect ODOO
app.post("/api/odoo/courses", async (req, res) => {
  try {
    const fetchAll = req.body.fetchAll || false;
    const page = Number(req.body.page) || 1;
    const resultsPerPage = Number(req.body.resultsPerPage) || 10;
    const offset = (page - 1) * resultsPerPage;

    // Fetch total course count
    const countResponse = await axios.post(ODOO_URL, {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [ODOO_DB, 2, ODOO_PASSWORD, "flc.course", "search_count", [[]]],
      },
      id: new Date().getTime(),
    });

    const totalCourses = Number(countResponse.data.result) || 0;
    const totalPages = Math.ceil(totalCourses / resultsPerPage);

    const commonFields = [
      "institute_id", "program_level_id", "semester", "year", "month", "name", "active", "country_id", "state_id", "city_id",
      "program_url", "application_fees", "currency_id", "total_tuition_fees_amount", "notes", "percentage_score", "scholarship",
      "program_type", "program_delivery_mode", "cgpa_score", "number_of_backlogs_accepted", "education_gap_allowed", "submission_deadline",
      "ielts_overall_score", "ielts_listening", "ielts_reading", "ielts_writing", "ielts_speaking", "pte_overall_score", "pte_listening",
      "pte_reading", "pte_writing", "pte_speaking", "toefl_overall_score", "toefl_listening", "toefl_reading", "toefl_writing", "toefl_speaking",
      "duolingo_overall_score", "duolingo_literacy", "duolingo_comprehension", "duolingo_conversation", "duolingo_production",
      "german_language_overall_score", "german_language_listening", "german_language_reading", "german_language_writing", "german_language_speaking",
      "program_delivery_mode", "french_language_overall_score", "french_language_listening", "french_language_reading", "french_language_writing",
      "french_language_speaking", "cael_overall_score", "cael_listening", "cael_reading", "cael_writing", "cael_speaking", "celpip_overall_score",
      "celpip_listening", "celpip_reading", "celpip_writing", "celpip_speaking", "gmat_overall_score", "gmat_analytical_writing", "gmat_integrated_reasoning",
      "gmat_quantitative_reasoning", "gmat_verbal_reasoning", "gre_overall_score", "gre_analytical_writing", "gre_quantitative_reasoning", "gre_verbal_reasoning",
      "sat_overall_score", "sat_reading_and_writing", "sat_math"
    ];

    let allCourses = [];

    if (fetchAll) {
      // Fetch in batches of 100
      const batchSize = 100;
      for (let i = 0; i < totalCourses; i += batchSize) {
        const batchResponse = await axios.post(ODOO_URL, {
          jsonrpc: "2.0",
          method: "call",
          params: {
            service: "object",
            method: "execute_kw",
            args: [
              ODOO_DB,
              2,
              ODOO_PASSWORD,
              "flc.course",
              "search_read",
              [[]],
              {
                fields: commonFields,
                limit: batchSize,
                offset: i,
              },
            ],
          },
          id: new Date().getTime(),
        });

        if (batchResponse.data && batchResponse.data.result) {
          allCourses = allCourses.concat(batchResponse.data.result);
        }
      }

      res.json({
        courses: allCourses,
        totalCourses,
        totalPages: 1,
        currentPage: 1,
      });
    } else {
      // Fetch only paginated results
      const response = await axios.post(ODOO_URL, {
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ODOO_DB,
            2,
            ODOO_PASSWORD,
            "flc.course",
            "search_read",
            [[]],
            {
              fields: commonFields,
              limit: resultsPerPage,
              offset,
            },
          ],
        },
        id: new Date().getTime(),
      });

      if (response.data && response.data.result) {
        res.json({
          courses: response.data.result,
          totalCourses,
          totalPages,
          currentPage: page,
        });
      } else {
        console.error("⚠️ Unexpected Odoo response:", response.data);
        res.status(500).json({ message: "Failed to fetch courses from Odoo" });
      }
    }
  } catch (error) {
    console.error("❌ Error fetching courses:", error.message);
    res.status(500).json({ message: "Server error while fetching courses" });
  }
});

// app.post("/api/odoo/courses", async (req, res) => {
//   try {
//     const {
//       fetchAll = false,
//       page = 1,
//       resultsPerPage = 10
//     } = req.body;

//     const offset = (page - 1) * resultsPerPage;

//     // ✅ Validate inputs
//     const currentPage = Number(page) > 0 ? Number(page) : 1;
//     const limit = Number(resultsPerPage) > 0 ? Number(resultsPerPage) : 50;

//     // Step 1: Get total number of courses
//     const countResponse = await axios.post(ODOO_URL, {
//       jsonrpc: "2.0",
//       method: "call",
//       params: {
//         service: "object",
//         method: "execute_kw",
//         args: [ODOO_DB, 2, ODOO_PASSWORD, "flc.course", "search_count", [[]]],
//       },
//       id: Date.now(),
//     });

//     const totalCourses = countResponse.data.result || 0;
//     const totalPages = Math.ceil(totalCourses / limit);

//     // Common fields
//     const fields = [
//       "institute_id", "program_level_id", "semester", "year", "month", "name", "active", "country_id", "state_id", "city_id",
//       "program_url", "application_fees", "currency_id", "total_tuition_fees_amount", "notes", "percentage_score", "scholarship",
//       "program_type", "program_delivery_mode", "cgpa_score", "number_of_backlogs_accepted", "education_gap_allowed", "submission_deadline",
//       "ielts_overall_score", "ielts_listening", "ielts_reading", "ielts_writing", "ielts_speaking", "pte_overall_score", "pte_listening",
//       "pte_reading", "pte_writing", "pte_speaking", "toefl_overall_score", "toefl_listening", "toefl_reading", "toefl_writing", "toefl_speaking",
//       "duolingo_overall_score", "duolingo_literacy", "duolingo_comprehension", "duolingo_conversation", "duolingo_production",
//       "german_language_overall_score", "german_language_listening", "german_language_reading", "german_language_writing", "german_language_speaking",
//       "program_delivery_mode", "french_language_overall_score", "french_language_listening", "french_language_reading", "french_language_writing",
//       "french_language_speaking", "cael_overall_score", "cael_listening", "cael_reading", "cael_writing", "cael_speaking", "celpip_overall_score",
//       "celpip_listening", "celpip_reading", "celpip_writing", "celpip_speaking", "gmat_overall_score", "gmat_analytical_writing", "gmat_integrated_reasoning",
//       "gmat_quantitative_reasoning", "gmat_verbal_reasoning", "gre_overall_score", "gre_analytical_writing", "gre_quantitative_reasoning", "gre_verbal_reasoning",
//       "sat_overall_score", "sat_reading_and_writing", "sat_math"
//     ];

//     // Step 2: Handle fetchAll = true
//     if (fetchAll) {
//       const batchSize = 500;
//       let allCourses = [];

//       for (let i = 0; i < totalCourses; i += batchSize) {
//         const batch = await axios.post(ODOO_URL, {
//           jsonrpc: "2.0",
//           method: "call",
//           params: {
//             service: "object",
//             method: "execute_kw",
//             args: [
//               ODOO_DB, 2, ODOO_PASSWORD, "flc.course", "search_read",
//               [[]],
//               {
//                 fields,
//                 limit: batchSize,
//                 offset: i,
//               }
//             ],
//           },
//           id: Date.now() + i,
//         });

//         if (batch.data?.result?.length) {
//           allCourses.push(...batch.data.result);
//         }
//       }

//       return res.json({
//         courses: allCourses,
//         totalCourses,
//         totalPages: 1,
//         currentPage: 1,
//       });
//     }

//     // Step 3: Handle paginated request
//     if (offset >= totalCourses) {
//       return res.json({
//         courses: [],
//         totalCourses,
//         totalPages,
//         currentPage,
//       });
//     }

//     const pageResponse = await axios.post(ODOO_URL, {
//       jsonrpc: "2.0",
//       method: "call",
//       params: {
//         service: "object",
//         method: "execute_kw",
//         args: [
//           ODOO_DB,
//           2,
//           ODOO_PASSWORD,
//           "flc.course",
//           "search_read",
//           [[]],
//           {
//             fields,
//             limit,
//             offset,
//           }
//         ],
//       },
//       id: Date.now(),
//     });

//     if (!pageResponse.data?.result) {
//       throw new Error("No data returned from Odoo");
//     }

//     return res.json({
//       courses: pageResponse.data.result,
//       totalCourses,
//       totalPages,
//       currentPage,
//     });

//   } catch (error) {
//     console.error("❌ Error fetching courses:", error.message);
//     return res.status(500).json({ message: "Server error while fetching courses" });
//   }
// });



const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ API to Insert User Profile in `user` Table
app.post("/api/add-profile", upload.single("profileImage"), (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { fullName, email, phoneNumber } = req.body;
  const profileImage = req.file ? req.file.filename : null;

  if (!fullName || !email || !phoneNumber) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO user (fullName, email, phoneNumber, profileImage) VALUES (?, ?, ?, ?)";
  db.query(sql, [fullName, email, phoneNumber, profileImage], (err, result) => {
    if (err) {
      console.error("Error inserting profile:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }
    res.json({ message: "Profile added successfully" });
  });
});

app.get("/api/agents", async (req, res) => {
  try {
    const query = "SELECT id, fullname, email FROM users WHERE role = 'agent'";
    console.log("🛠️ Running Query:", query);
    const [agents] = await db.execute(query);

    if (!agents.length) {
      return res.status(404).json({ message: "No agents found" });
    }

    console.log("✅ Agents Data:", agents);
    res.json(agents);
  } catch (error) {
    console.error("❌ Error fetching agents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/students", async (req, res) => {
  try {
    const query = "SELECT id, fullname, email FROM users WHERE role = 'student'";
    console.log("🛠️ Running Query:", query);
    const [students] = await db.execute(query);

    if (!students.length) {
      return res.status(404).json({ message: "No students found" });
    }

    console.log("✅ Students Data:", students);
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/send-otp-payment", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  const otp = (Math.floor(Math.random() * 900000) + 100000).toString(); // Generate OTP

  const sql = `
        INSERT INTO otp_verification (email, otp_code, expires_at) 
        VALUES (?, ?, NOW() + INTERVAL 5 MINUTE) 
        ON DUPLICATE KEY UPDATE otp_code = VALUES(otp_code), expires_at = VALUES(expires_at)
    `;

  db.query(sql, [email, otp], async (err) => {
    if (err) return res.status(500).json({ error: "Database error." });

    // Send OTP via email
    try {
      let info = await transporter.sendMail({
        from: '"PlanStudies" <your-email@gmail.com>',
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code for payment verification is: ${otp}`,
      });

      console.log("Email sent:", info.messageId);
      res.json("OTP sent successfully.");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });
});

// Verify OTP
app.post("/api/verify-otp-payment", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP are required." });

  const sql = `SELECT * FROM otp_verification WHERE email = ? AND otp_code = ? AND expires_at > NOW()`;

  db.query(sql, [email, otp], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length === 0) return res.status(400).json({ error: "Invalid or expired OTP." });

    // Delete OTP after successful verification (optional but recommended)
    db.query(`DELETE FROM otp_verification WHERE email = ?`, [email], (deleteErr) => {
      if (deleteErr) return res.status(500).json({ error: "Error deleting OTP." });

      res.json({ message: "OTP verified successfully!" });
    });
  });
});

// ✅ Store a New Payment
app.post("/api/payments", (req, res) => {
  const { amount, payment_method, transaction_id } = req.body;
  const query = "INSERT INTO payments (amount, payment_method, transaction_id) VALUES (?, ?, ?)";

  db.query(query, [amount, payment_method, transaction_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Payment recorded successfully", payment_id: result.insertId });
  });
});

// ✅ Get Payments with Filters (Year, Month, Week, Day, Custom)
app.get("/api/payments", (req, res) => {
  let { filter, from_date, to_date } = req.query;
  let query = "SELECT * FROM payments";

  switch (filter) {
    case "year":
      query += " WHERE YEAR(date) = YEAR(CURDATE())";
      break;
    case "month":
      query += " WHERE MONTH(date) = MONTH(CURDATE()) AND YEAR(date) = YEAR(CURDATE())";
      break;
    case "week":
      query += " WHERE YEARWEEK(date) = YEARWEEK(CURDATE())";
      break;
    case "day":
      query += " WHERE DATE(date) = CURDATE()";
      break;
    case "custom":
      if (!from_date || !to_date) {
        return res.status(400).json({ message: "Please provide both from_date and to_date" });
      }
      query += ` WHERE DATE(date) BETWEEN '${from_date}' AND '${to_date}'`;
      break;
  }
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const sendOtp = async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    // ✅ Remove spaces and dashes
    phone = phone.replace(/\s|-/g, "");

    if (!phone.startsWith("+")) {
      phone = "+" + phone; // Ensure it starts with "+"
    }

    console.log("Sending OTP to:", phone); // Debugging log

    // ✅ Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // ✅ Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio Number
      to: phone
    });

    console.log("✅ OTP sent successfully:", otp);

    // ✅ Store OTP in MySQL
    const sql = "INSERT INTO otp_verifications (phone, otp) VALUES (?, ?)";
    db.query(sql, [phone, otp], (err, result) => {
      if (err) {
        console.error("❌ Database Error:", err.sqlMessage); // Log error message
        console.error("❌ SQL Query:", err.sql); // Log the exact query
        return res.status(500).json({
          success: false,
          message: "Failed to store OTP in database",
          error: err.sqlMessage
        });
      }
      console.log("✅ OTP stored successfully in MySQL");
      res.json({ success: true, message: "OTP sent successfully!" });
    });

  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Error sending OTP", error: error.message });
  }
};

// ✅ Define route AFTER defining sendOtp
app.post("/api/send-mobile-otp", sendOtp);

app.post("/api/verify-mobile-otp", (req, res) => {
  let { phone, otp } = req.body;

  if (!phone || !otp) {
    console.warn("⚠️ Missing phone or OTP in request");
    return res.status(400).json({ success: false, message: "Phone and OTP are required" });
  }

  // ✅ Normalize phone number (remove spaces and dashes)
  phone = phone.replace(/\s|-/g, "");
  if (!phone.startsWith("+")) {
    phone = "+" + phone;
  }

  console.log("🔍 Verifying OTP for:", phone, "Entered OTP:", otp);

  // ✅ Query to fetch the latest OTP for the phone
  const sql = "SELECT otp FROM otp_verifications WHERE phone = ? ORDER BY created_at DESC LIMIT 1";

  db.query(sql, [phone], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err.sqlMessage);
      return res.status(500).json({ success: false, message: "Database error", error: err.sqlMessage });
    }

    if (result.length === 0) {
      console.warn("⚠️ No OTP found for phone:", phone);
      return res.status(400).json({ success: false, message: "No OTP found for this number" });
    }

    const storedOtp = result[0].otp;
    console.log("✅ Stored OTP:", storedOtp, "Entered OTP:", otp);

    if (storedOtp == otp) {  // 🔥 Ensure comparison is correct (string vs number)
      console.log("✅ OTP Verified Successfully!");
      return res.json({ success: true, message: "OTP verified successfully!" });
    } else {
      console.warn("❌ OTP Mismatch!");
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  });
});

app.post("/api/messages", upload.single("file"), (req, res) => {
  const { sender_email, receiver_email, message } = req.body;
  const file_url = req.file ? `/uploads/${req.file.filename}` : null;

  if (!sender_email || !receiver_email || (!message && !file_url)) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = "INSERT INTO messages (sender_email, receiver_email, message, file_url) VALUES (?, ?, ?, ?)";
  db.query(query, [sender_email, receiver_email, message, file_url], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error. Check server logs." });
    }
    res.json({ success: true, message: "Message sent successfully", file_url });
  });
});

app.get("/api/messages", (req, res) => {
  const { sender, receiver } = req.query;

  const query = `
      SELECT sender_email, receiver_email, message, file_url 
      FROM messages 
      WHERE (sender_email = ? AND receiver_email = ?) 
      OR (sender_email = ? AND receiver_email = ?) 
      ORDER BY id ASC
  `;

  db.query(query, [sender, receiver, receiver, sender], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error. Check server logs." });
    }
    console.log("Fetched Messages:", results);  // ✅ Debugging
    res.json(results);
  });
});

app.delete("/api/messages", (req, res) => {
  const { sender, receiver } = req.body;

  if (!sender || !receiver) {
    return res.status(400).json({ error: "Sender and receiver are required" });
  }

  const query = `
      DELETE FROM messages 
      WHERE (sender_email = ? AND receiver_email = ?) 
      OR (sender_email = ? AND receiver_email = ?)
  `;

  db.query(query, [sender, receiver, receiver, sender], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error. Check server logs." });
    }
    res.json({ success: true, message: "Chat history deleted successfully" });
  });
});

// app.get("/api/unread-messages/:email", (req, res) => {
//   const { email } = req.params;

//   const sql = `
//       SELECT COUNT(*) AS unreadCount 
//       FROM messages 
//       WHERE receiver_email = ? AND is_read = 0
//   `;

//   db.query(sql, [email], (err, result) => {
//       if (err) {
//           console.error("Error fetching unread messages:", err);
//           return res.status(500).json({ success: false, error: err.message });
//       }

//       res.json({ unreadCount: result[0].unreadCount });
//   });
// });

// ✅ API: Mark Messages as Read When Chat Opens
app.get("/api/unread-messages/:email", (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: "Email parameter is required." });
  }

  const sql = `
      SELECT COUNT(*) AS unreadCount 
      FROM messages 
      WHERE receiver_email = ? AND is_read = 0
  `;

  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error fetching unread messages:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ unreadCount: result[0]?.unreadCount || 0 });
  });
});

app.post("/api/read-messages", (req, res) => {
  const { senderEmail, receiverEmail } = req.body;

  const sql = `
      UPDATE messages 
      SET is_read = 1 
      WHERE sender_email = ? AND receiver_email = ?
  `;

  db.query(sql, [senderEmail, receiverEmail], (err, result) => {
    if (err) {
      console.error("Error updating read status:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Messages marked as read" });
  });
});

// API endpoint to clear ALL unread messages for a specific receiver
app.post("/api/clear-all-notifications", (req, res) => {
  const { receiverEmail } = req.body;

  if (!receiverEmail) {
    return res.status(400).json({ error: "Receiver email is required." });
  }

  const sql = `
      UPDATE messages 
      SET is_read = 1 
      WHERE receiver_email = ? AND is_read = 0
  `;

  db.query(sql, [receiverEmail], (err, result) => {
    if (err) {
      console.error("Error clearing all notifications:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: `All notifications cleared for ${receiverEmail}`, rowsAffected: result.affectedRows });
  });
});

// API endpoint for admin to get unread counts from all users
app.get("/api/unread-messages-admin/:email", (req, res) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: "Admin email parameter is required." });
  }

  const sql = `
      SELECT sender_email, COUNT(*) AS unreadCount 
      FROM messages 
      WHERE receiver_email = ? AND is_read = 0
      GROUP BY sender_email
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error fetching admin unread messages:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    const unreadCounts = results.reduce((acc, row) => {
      acc[row.sender_email] = row.unreadCount;
      return acc;
    }, {});

    res.json({ unreadCounts });
  });
});

app.post("/api/request-course", async (req, res) => {
  const { name, email, country, intake, preferences } = req.body;

  // Validate required fields
  if (!name || !email) {
    return res.status(400).json({ message: "Name and Email are required." });
  }

  try {
    // Configure email transporter
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password
      },
    });

    // Email content
    const mailOptions = {
      from: email,  // Student's email
      to: process.env.CONTACT_EMAIL,  // Your office email
      subject: "New Course Request",
      text: `
              Student Name: ${name}
              Email: ${email}
              Interested Country: ${country}
              Interested Intake: ${intake}
              Preferences: ${preferences || "Not specified"}
          `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Request sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send request." });
  }
});

// Additional API endpoints for frontend testing

// Get dashboard stats from both local MySQL and Odoo
app.get("/api/dashboard/stats", async (req, res) => {
  try {
    // Get local MySQL user stats
    const userStatsQuery = `
      SELECT 
        role, 
        COUNT(*) as count 
      FROM users 
      GROUP BY role
    `;
    
    const paymentStatsQuery = `
      SELECT 
        COUNT(*) as total_payments,
        SUM(amount) as total_amount,
        AVG(amount) as avg_amount
      FROM payments
    `;
    
    // Fetch Odoo data in parallel
    const [localUserStats, localPaymentStats, odooStudents, odooCourses, odooLeads] = await Promise.all([
      new Promise((resolve, reject) => {
        db.query(userStatsQuery, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      }),
      new Promise((resolve, reject) => {
        db.query(paymentStatsQuery, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      }),
      // Fetch students from Odoo (res.partner with student category)
      axios.post(ODOO_URL, {
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ODOO_DB,
            2,
            ODOO_PASSWORD,
            "res.partner",
            "search_count",
            [["is_company", "=", false]]
          ]
        },
        id: 1
      }),
      // Fetch courses count from Odoo
      axios.post(ODOO_URL, {
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ODOO_DB,
            2,
            ODOO_PASSWORD,
            "flc.course",
            "search_count",
            [[]]
          ]
        },
        id: 2
      }),
      // Fetch leads/opportunities from Odoo
      axios.post(ODOO_URL, {
        jsonrpc: "2.0",
        method: "call",
        params: {
          service: "object",
          method: "execute_kw",
          args: [
            ODOO_DB,
            2,
            ODOO_PASSWORD,
            "crm.lead",
            "search_count",
            [[]]
          ]
        },
        id: 3
      })
    ]);
    
    // Combine local and Odoo stats
    const dashboardStats = {
      // Local MySQL stats
      localUsers: localUserStats,
      localPayments: localPaymentStats[0] || { total_payments: 0, total_amount: 0, avg_amount: 0 },
      
      // Odoo stats (real data)
      odooStats: {
        totalStudents: odooStudents.data.result || 0,
        totalCourses: odooCourses.data.result || 0,
        totalLeads: odooLeads.data.result || 0
      },
      
      // Summary for dashboard
      summary: {
        totalUsers: (localUserStats.reduce((sum, user) => sum + user.count, 0)) + (odooStudents.data.result || 0),
        totalCourses: odooCourses.data.result || 0,
        totalLeads: odooLeads.data.result || 0,
        totalPayments: localPaymentStats[0]?.total_payments || 0,
        totalAmount: localPaymentStats[0]?.total_amount || 0
      }
    };
    
    res.json(dashboardStats);
    
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ 
      error: "Failed to fetch dashboard stats",
      details: error.message 
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Test database connection
app.get("/api/test-db", (req, res) => {
  db.query("SELECT 1 as test", (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database connection failed", details: err.message });
    }
    res.json({ message: "Database connection successful", result });
  });
});

// Get all course data (for testing)
app.get("/api/courses/test", (req, res) => {
  // Return sample course data for testing
  res.json({
    courses: [
      {
        id: 1,
        name: "Computer Science",
        institute_id: [1, "Harvard University"],
        country_id: [1, "USA"],
        program_level_id: [1, "Bachelor's"],
        total_tuition_fees_amount: 50000,
        currency_id: [1, "USD"]
      },
      {
        id: 2,
        name: "Business Administration",
        institute_id: [2, "Stanford University"],
        country_id: [1, "USA"],
        program_level_id: [2, "Master's"],
        total_tuition_fees_amount: 60000,
        currency_id: [1, "USD"]
      }
    ],
    totalCourses: 2,
    totalPages: 1,
    currentPage: 1
  });
});

// Serve static files BEFORE error handlers
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

console.log("Connected to Odoo at:", ODOO_URL);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Database test: http://localhost:${PORT}/api/test-db`);
});
