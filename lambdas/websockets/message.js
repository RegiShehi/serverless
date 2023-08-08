const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');
const WebSocket = require('../common/websocketMessage');

const tableName = process.env.websocketTableName;

exports.handler = async (event) => {
  console.log('event', event);

  const { connectionId } = event.requestContext;

  const body = JSON.parse(event.body);

  try {
    const record = await Dynamo.get(connectionId, tableName);
    const { messages, domainName, stage } = record;

    messages.push(body.message);

    const data = {
      ...record,
      messages
    };

    await Dynamo.write(data, tableName);

    await WebSocket.send({
      domainName,
      stage,
      connectionId,
      message: 'This is a reply to your message'
    });

    return Responses._200({ message: 'Got a message' });
  } catch (error) {
    console.log('error ', error);
    return Responses._400({ message: 'Message could not be received' });
  }
};
