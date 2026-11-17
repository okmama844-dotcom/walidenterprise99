const admin = require('firebase-admin');

// Netlify Environment Variable থেকে কী লোড করা
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { token, title, body } = JSON.parse(event.body);

    const message = {
      notification: { title, body },
      token: token
    };

    const response = await admin.messaging().send(message);
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: response })
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};