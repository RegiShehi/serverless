const Responses = require('../common/API_Responses');
const S3 = require('../common/S3');

const bucket = process.env.bucketName;

exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.fileName) {
    // failed without a file name
    return Responses._400({ message: 'Missing file name from the path' });
  }

  let fileName = event.pathParameters.fileName;

  const file = await S3.get(fileName, bucket).catch((err) => {
    console.log('Error in S3 get', err);

    return null;
  });

  if (!file) {
    return Responses._400({ message: 'Failed to read file' });
  }

  return Responses._200({ file });
};
