const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const url = 'https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp';

    const data = {
      login_id: 'test@sunbasedata.com',
      password: 'Test@123',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const responseData = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
