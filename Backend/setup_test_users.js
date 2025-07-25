const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'user_management'
});

async function setupTestUsers() {
  console.log('🔄 Setting up test users with real passwords...\n');

  // Hash passwords
  const adminPassword = await bcrypt.hash('admin123', 10);
  const studentPassword = await bcrypt.hash('student123', 10);
  const agentPassword = await bcrypt.hash('agent123', 10);

  // Test user for chat testing
  const testPassword = await bcrypt.hash('test123', 10);

  const updates = [
    {
      role: 'admin',
      email: 'admin@planstudies.com',
      password: adminPassword,
      plainPassword: 'admin123'
    },
    {
      role: 'student', 
      email: 'student@gmail.com',
      password: studentPassword,
      plainPassword: 'student123'
    },
    {
      role: 'agent',
      email: 'agent@gmail.com', 
      password: agentPassword,
      plainPassword: 'agent123'
    }
  ];

  // Create additional test user for chat testing
  const insertTestUser = `
    INSERT INTO users (role, fullname, phone_number, email, password, otp_verified) VALUES
    ('student', 'Test User', '+1111111111', 'test@example.com', ?, TRUE)
    ON DUPLICATE KEY UPDATE password = VALUES(password)
  `;

  try {
    // Update existing users
    for (const user of updates) {
      const updateSql = 'UPDATE users SET password = ? WHERE email = ?';
      await new Promise((resolve, reject) => {
        db.query(updateSql, [user.password, user.email], (err, result) => {
          if (err) {
            console.error(`❌ Error updating ${user.email}:`, err);
            reject(err);
          } else {
            console.log(`✅ Updated ${user.role}: ${user.email} (password: ${user.plainPassword})`);
            resolve(result);
          }
        });
      });
    }

    // Insert/update test user
    await new Promise((resolve, reject) => {
      db.query(insertTestUser, [testPassword], (err, result) => {
        if (err) {
          console.error('❌ Error creating test user:', err);
          reject(err);
        } else {
          console.log('✅ Created/Updated test user: test@example.com (password: test123)');
          resolve(result);
        }
      });
    });

    console.log('\n📋 DATABASE USERS SUMMARY:');
    console.log('┌─────────────────────────┬─────────────┬─────────────┐');
    console.log('│ Email                   │ Role        │ Password    │');
    console.log('├─────────────────────────┼─────────────┼─────────────┤');
    console.log('│ admin@planstudies.com   │ admin       │ admin123    │');
    console.log('│ student@gmail.com       │ student     │ student123  │');
    console.log('│ agent@gmail.com         │ agent       │ agent123    │');
    console.log('│ test@example.com        │ student     │ test123     │');
    console.log('└─────────────────────────┴─────────────┴─────────────┘');

    console.log('\n🔍 WHY ADMIN EMAILS ARE HARDCODED:');
    console.log('The admin emails are hardcoded in frontend files because:');
    console.log('1. Chat system needs to know who to connect students to');
    console.log('2. Different regions have different admin emails:');
    console.log('   - admin@planstudies.com (main admin)');
    console.log('   - usadmin@gmail.com (US admin)');
    console.log('   - europe@gmail.com (Europe admin)');
    console.log('   - canada@gmail.com (Canada admin)');
    console.log('   - uk@gmail.com (UK admin)');
    console.log('   - aus@gmail.com (Australia admin)');
    console.log('3. These are used for message styling and routing');
    console.log('4. Students always chat with admin@planstudies.com by default');

    console.log('\n🎯 TO TEST CHAT FUNCTIONALITY:');
    console.log('1. Login as student: test@example.com / test123');
    console.log('2. Click notification bell to open chat');
    console.log('3. Send messages - they go to admin@planstudies.com');
    console.log('4. Login as admin: admin@planstudies.com / admin123');
    console.log('5. Reply to student messages');

    db.end();
  } catch (error) {
    console.error('❌ Setup failed:', error);
    db.end();
    process.exit(1);
  }
}

setupTestUsers();
