const axios = require('axios');

//function to call to the API.Returns the summarized text as a string.
async function summarizeText(text) {
  let data = JSON.stringify({
    "inputs": text,
    "parameters": {
      "max_length": 100,
      "min_length": 30
    }
  });
  //creating a config object to conain instructions to make the API call
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
    },
    data: data
  };

  try {
    const response = await axios.request(config);
    //return the summary
    return response.data[0].summary_text;
  }
  catch (error) {
    console.log(error);
  }
}

// Allows for summarizeText() to be called outside of this file

module.exports = summarizeText;