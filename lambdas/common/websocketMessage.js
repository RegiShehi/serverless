const AWS = require('aws-sdk');

const create = (domainName, stage) => {
  const endpoint = `${domainName}/${stage}`;

  return new AWS.ApiGatewayManagementApi({
    apiVersion: '2023-08-08',
    endpoint
  });
};

const send = ({ domainName, stage, connectionId, message }) => {
  const ws = create(domainName, stage);

  const postParams = {
    Data: message,
    ConnectionId: connectionId
  };

  return ws.postToConnection(postParams).promise();
};

module.exports = {
  send
};
