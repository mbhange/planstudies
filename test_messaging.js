const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000';

async function testMessaging() {
  console.log('🧪 Starting comprehensive messaging and file attachment test...\n');

  try {
    // Test 1: Student to Admin message with file
    console.log('📧 Test 1: Student to Admin messaging with file attachment');
    const studentForm = new FormData();
    studentForm.append('sender_email', 'student@example.com');
    studentForm.append('receiver_email', 'yashd@gmail.com'); // Use actual admin email
    studentForm.append('message', 'Hello Admin! This is a test message from a student with a file attachment.');
    studentForm.append('file', fs.createReadStream('./test_files/student_document.txt'));

    const studentResponse = await axios.post(`${BASE_URL}/api/messages`, studentForm, {
      headers: {
        ...studentForm.getHeaders()
      }
    });
    
    console.log('✅ Student to Admin:', studentResponse.data);
    
    // Test 2: Agent to Admin message with file  
    console.log('\n📧 Test 2: Agent to Admin messaging with file attachment');
    const agentForm = new FormData();
    agentForm.append('sender_email', 'agent@example.com');
    agentForm.append('receiver_email', 'yashd@gmail.com'); // Use actual admin email
    agentForm.append('message', 'Dear Admin, This is a report from an agent with attached file.');
    agentForm.append('file', fs.createReadStream('./test_files/agent_report.txt'));

    const agentResponse = await axios.post(`${BASE_URL}/api/messages`, agentForm, {
      headers: {
        ...agentForm.getHeaders()
      }
    });
    
    console.log('✅ Agent to Admin:', agentResponse.data);

    // Test 3: Admin to Student message with file
    console.log('\n📧 Test 3: Admin to Student messaging with file attachment');
    const adminForm = new FormData();
    adminForm.append('sender_email', 'yashd@gmail.com'); // Use actual admin email
    adminForm.append('receiver_email', 'student@example.com');
    adminForm.append('message', 'Dear Student, Here is your official response with attached documents.');
    adminForm.append('file', fs.createReadStream('./test_files/admin_response.txt'));

    const adminResponse = await axios.post(`${BASE_URL}/api/messages`, adminForm, {
      headers: {
        ...adminForm.getHeaders()
      }
    });
    
    console.log('✅ Admin to Student:', adminResponse.data);

    // Test 4: Test text-only messages
    console.log('\n📧 Test 4: Text-only messages (no file attachments)');
    const textOnlyResponse = await axios.post(`${BASE_URL}/api/messages`, {
      sender_email: 'student@example.com',
      receiver_email: 'yashd@gmail.com', // Use actual admin email
      message: 'This is a text-only message without any file attachment.'
    });
    
    console.log('✅ Text-only message:', textOnlyResponse.data);

    // Test 5: Check notification counts
    console.log('\n🔔 Test 5: Checking notification counts');
    const adminNotifications = await axios.get(`${BASE_URL}/api/unread-messages-admin/yashd@gmail.com`); // Use admin-specific endpoint
    const studentNotifications = await axios.get(`${BASE_URL}/api/unread-messages/student@example.com`);
    
    console.log('✅ Admin notifications:', adminNotifications.data);
    console.log('✅ Student notifications:', studentNotifications.data);

    // Test 6: Retrieve messages
    console.log('\n💬 Test 6: Retrieving conversation messages');
    const studentAdminMessages = await axios.get(`${BASE_URL}/api/messages`, {
      params: {
        sender: 'student@example.com',
        receiver: 'yashd@gmail.com' // Use actual admin email
      }
    });
    
    console.log('✅ Student-Admin conversation:', studentAdminMessages.data);

    // Test 7: Mark messages as read
    console.log('\n👀 Test 7: Marking messages as read');
    const markReadResponse = await axios.post(`${BASE_URL}/api/read-messages`, {
      senderEmail: 'student@example.com',
      receiverEmail: 'yashd@gmail.com' // Use actual admin email
    });
    
    console.log('✅ Mark as read:', markReadResponse.data);

    // Test 8: Check notification counts after marking as read
    console.log('\n🔔 Test 8: Checking notification counts after marking as read');
    const updatedAdminNotifications = await axios.get(`${BASE_URL}/api/unread-messages-admin/yashd@gmail.com`); // Use admin-specific endpoint
    console.log('✅ Updated admin notifications:', updatedAdminNotifications.data);

    console.log('\n🎉 All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testMessaging();
