const Responses = require('../common/API_Responses');
const AWS = require('aws-skd');

const SES = new AWS.SES();

exports.handler = async (event) => {
  console.log('event', event);

  const message = `Hey Sam don't forget to do ...`;

  const params = {
    Destination: {
      toAddresses: ['shehi.regi@gmail.com']
    },
    Message: {
      Body: {
        Text: { Data: message }
      },
      Subject: { Data: 'reminder email' }
    },
    Source: 'shehi.regi@gmail.com'
  };

  try {
    await SES.sendEmail(params).promise();

    return Responses._200({ message: 'Email sent' });
  } catch (error) {
    console.log('error: ', error);
    return Responses._400({ message: 'Failed to send email' });
  }
};
