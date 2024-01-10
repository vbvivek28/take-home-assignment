import express from 'express';
import bodyParser from 'body-parser';
import {questionsAndKeywords} from './response.js';
import cors from 'cors';
// Creating Express application
const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// route for handling POST requests to /api/chat
app.post('/api/chat', (req, res) => {
  const userInput = req.body.userInput;
  const response = getResponse(userInput);
  res.json({ message: response });
});

  
function getResponse(userInput) {
    const lowerCaseInput = userInput.toLowerCase();
  
    for (const questionData of questionsAndKeywords.questions) {
      for (const [category, keywords] of Object.entries(questionData)) {
        for (const keyword of keywords) {
          if (lowerCaseInput.includes(keyword.toLowerCase())) {
            return getRandomResponse(questionsAndKeywords.responses[category]);
          }
        }
      }
    }
    return getRandomResponse(questionsAndKeywords.responses.default);
  }
  
  // function to get a random response from an array
  function getRandomResponse(responseArray) {
    const randomIndex = Math.floor(Math.random() * responseArray.length);
    return responseArray[randomIndex];
  }
  
// Start the Express server
app.listen(port,()=>{
    console.log("listening on port 3001")
});
