require('dotenv').config();
const axios = require('axios');

const ODOO_URL = process.env.ODOO_URL;
const ODOO_DB = process.env.ODOO_DB;
const ODOO_USERNAME = process.env.ODOO_USERNAME;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD;

console.log('Testing Odoo Connection...');
console.log('ODOO_URL:', ODOO_URL);
console.log('ODOO_DB:', ODOO_DB);
console.log('ODOO_USERNAME:', ODOO_USERNAME);

async function testOdooConnection() {
  try {
    console.log('\n🔄 Testing Odoo course count...');
    
    const countResponse = await axios.post(ODOO_URL, {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [ODOO_DB, 2, ODOO_PASSWORD, "flc.course", "search_count", [[]]]
      },
      id: new Date().getTime()
    });

    console.log('✅ Count Response:', JSON.stringify(countResponse.data, null, 2));

    if (countResponse.data.result > 0) {
      console.log('\n🔄 Testing course data fetch...');
      
      const dataResponse = await axios.post(ODOO_URL, {
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
              fields: ["name", "institute_id", "country_id", "program_level_id"],
              limit: 5
            }
          ]
        },
        id: new Date().getTime()
      });

      console.log('✅ Data Response:', JSON.stringify(dataResponse.data, null, 2));
    }

  } catch (error) {
    console.error('❌ Error testing Odoo connection:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testOdooConnection();
