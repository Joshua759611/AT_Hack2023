const Client=require('osc')

function sendSonicPiCode(sonicPiCode) {
  // Create an OSC client
  const client = new Client('localhost', 4557);

  // Create an OSC message
  const message = {
    address: '/run-code',
    args: [
      {
        type: 's',
        value: sonicPiCode,
      },
    ],
  };

  // Send the OSC message to Sonic Pi server
  client.send(message, (error) => {
    if (error) {
      console.error('Error sending Sonic Pi code:', error);
    } else {
      console.log('Sonic Pi code sent successfully.');
    }

    // Close the OSC client
    client.close();
  });
}
