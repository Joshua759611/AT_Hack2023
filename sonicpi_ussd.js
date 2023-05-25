const express = require('express');
const bodyParser=require('body-parser')
const snc=require('osc')
const app = express();
const port = 5000; //port

// USSD callback route
app.post('/ussd/callback', (req, res) => {
  // Extract the necessary data from the request
  const { sessionId, serviceCode, phoneNumber, text } = req.body;

  // Process the USSD input and generate the Sonic Pi code
  const sonicPiCode = generateSonicPiCode(text);

  // Send the Sonic Pi code to Sonic Pi
  sendSonicPiCode(sonicPiCode);

  // Construct USSD response
  const response = generateUSSDResponse(text);

  // Send the response back to Africa's Talking
  res.send(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Function to generate Sonic Pi code based on USSD input
function generateSonicPiCode(userInput) {
  let sonicPiCode = "";

  // Generate Sonic Pi code based on user input
  if (userInput === "1") {
    sonicPiCode += "play :drum_bass_hard\n";
  } else if (userInput === "2") {
    sonicPiCode += "stop\n";
  } else if (userInput === "3") {
    sonicPiCode += "use_bpm 120\n";
  }

  return sonicPiCode;
}

// Function to send Sonic Pi code to Sonic Pi
function sendSonicPiCode(sonicPiCode) {
  // Send the code to Sonic Pi using the Sonic Pi API or the sonic-pi-tool package
  // Implement the logic here
}

// Function to generate USSD response based on user input
function generateUSSDResponse(userInput) {
  let response = "";

  // Generate USSD response based on user input
  if (userInput === "1") {
    response = "Playing beat: Drum Bass Hard";
  } else if (userInput === "2") {
    response = "Stopping the beat";
  } else if (userInput === "3") {
    response = "Changing tempo to 120 BPM";
  } else {
    response = "Invalid input. Please select a valid option.";
  }

  // Construct USSD response in Africa's Talking format
  const ussdResponse = `CON ${response}`;

  return ussdResponse;
}
