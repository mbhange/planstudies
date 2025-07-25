const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Create connection without database first to create the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Developer@123",
  multipleStatements: true,
});

function setupDatabase() {
  // Read the SQL file
  const sqlFilePath = path.join(__dirname, "database_schema.sql");
  const sql = fs.readFileSync(sqlFilePath, "utf8");

  // Execute the SQL script
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error setting up database:", err);
      process.exit(1);
    }

    console.log("✅ Database setup completed successfully!");
    console.log('Database "user_management" created/updated');
    console.log("All tables created successfully");
    console.log("Sample data inserted");

    connection.end();
  });
}

// Run setup
console.log("🔧 Setting up database...");
setupDatabase();
