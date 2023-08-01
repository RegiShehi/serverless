const Responses = require('./API_Responses');

exports.handler = async (event) => {
  console.log('event', event);

  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without an ID
    return Responses._400({ message: 'Missing ID from the path' });
  }

  let ID = event.pathParameters.ID;

  if (data[ID]) {
    // return data
    return Responses._200(data[ID]);
  }

  // failed as ID was not found
  return Responses._400({ message: 'No ID' });
};

const data = {
  1234: { name: 'Regi', age: 31, job: 'developer' },
  1234: { name: 'Geri', age: 31, job: 'architect' }
};
