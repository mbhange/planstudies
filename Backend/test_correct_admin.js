const querystring = require('querystring');

// Test data - simulate a student sending a message to CORRECT admin email
const postData = querystring.stringify({
  sender_email: 'student@gmail.com',
  receiver_email: 'admin@planstudies.com',
  message: 'Hello Admin! This is a test message to the correct admin email!'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/messages',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🧪 Testing message sending to correct admin email: admin@planstudies.com');

const req = require('http').request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('✅ Response Status:', res.statusCode);
    console.log('📬 Response:', JSON.parse(data));
    
    if (res.statusCode === 200) {
      console.log('🎉 Message sent successfully!');
      
      // Test fetching messages for correct admin
      console.log('\n🔍 Testing message retrieval for correct admin...');
      const fetchOptions = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/messages?sender=admin@planstudies.com&receiver=student@gmail.com',
        method: 'GET'
      };
      
      const fetchReq = require('http').request(fetchOptions, (fetchRes) => {
        let fetchData = '';
        
        fetchRes.on('data', (chunk) => {
          fetchData += chunk;
        });
        
        fetchRes.on('end', () => {
          console.log('📥 Fetched Messages:', JSON.parse(fetchData));
          
          // Test unread count for correct admin
          console.log('\n📊 Testing unread count for correct admin...');
          const unreadOptions = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/unread-messages-admin/admin@planstudies.com',
            method: 'GET'
          };
          
          const unreadReq = require('http').request(unreadOptions, (unreadRes) => {
            let unreadData = '';
            
            unreadRes.on('data', (chunk) => {
              unreadData += chunk;
            });
            
            unreadRes.on('end', () => {
              console.log('📈 Unread Counts:', JSON.parse(unreadData));
            });
          });
          
          unreadReq.end();
        });
      });
      
      fetchReq.end();
    } else {
      console.log('❌ Message sending failed');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Error:', e.message);
});

req.write(postData);
req.end();
