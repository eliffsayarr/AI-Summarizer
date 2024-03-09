const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const demoButton = document.getElementById("demo-button");

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
demoButton.addEventListener("click", demoText);

submitButton.disabled = true; //disable submit button by default

//function to display demo text
function demoText() {
  textArea.value = "Jack woke up to the sound of birds chirping outside his window. It was a beautiful morning, and he decided to go for a walk in the park. As he strolled along the path, he noticed a stray dog following him. Feeling sorry for the dog, Jack decided to take it home. He named the dog Max and they became inseparable. Max brought joy and companionship into Jack's life, and Jack was grateful for their chance encounter in the park."
  submitButton.disabled = false;


}
function verifyTextLength(e) {
  const textarea = e.target;

  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  }
  else {
    submitButton.disabled = true;
  }
}
//function to send API request 
function submitData(e) {
  submitButton.classList.add("submit-button--loading");//add animation to                                                           submit button
  const text_to_summarize = textArea.value;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  //Send the text to the server using fetch API
  fetch('/summarize', requestOptions)
    .then(response => response.text()) //Response will be summarized text
    .then(summary => {
      // Update the output text area with new summary
      summarizedTextArea.value = summary;
      // Stop the animation
      submitButton.classList.remove("submit-button--loading");

    })
    .catch(error => {
      console.log(error.message);
    });
}

