const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing login with nyangazie@gmail.com and password "test"...');
    
    const response = await axios.post('http://localhost:5000/api/login', {
      schoolEmail: 'nyangazie@gmail.com',
      schoolPassword: 'test'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('Error occurred:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Message:', error.message);
    }
  }
}

testLogin();
