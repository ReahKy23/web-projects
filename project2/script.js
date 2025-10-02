window.onload = () => {
  const sayings = [
    "You are enough, just as you are.",
    "Your worth is not tied to your productivity.",
    "You can choose progress over perfection.",
    "You honor your body, mind, and spirit.",
    "You are deserving of rest, peace, and joy.",
    "You have permission to grow at your own pace.",
    "Your voice matters, and your story is valuable.",
    "You can release what no longer serves you.",
    "You can trust yourself to make the right decisions.",
    "You radiate love, kindness, and compassion.",
    "You are becoming who you’re meant to be.",
    "You let go of comparison and embrace your uniqueness.",
    "You can forgive yourself for past mistakes and choose healing.",
    "Every challenge you face helps you grow stronger.",
    "You are worthy of love, respect, and abundance.",
    "You can trust the timing of your life.",
    "You should be proud of how far you’ve come.",
    "You create space for joy and creativity in your life.",
    "You are safe to take up space and shine brightly.",
    "You love the person you are becoming.",
  ];


  // displays a random array entry
  const sayingGenerator = () => {
    const sayingIndex = Math.floor(Math.random() * sayings.length);
    return sayings[sayingIndex];
    
  };
  sayingGenerator();

  // creating a div and paragraph element through js, so that it is no automatically there on laod
  //next i will use time intreval to have them appear on a timer

//   let timeOut = sayings.length * 100;


  // adds another div into the body
  function createAlert() {
    // stores the random saying populated into a variable
    let mantra = sayingGenerator();

    // creates a new div with a p element nested inside
    let alertBox = document.createElement("div");
    alertBox.classList.add("alertBox");

    // creates the alert message and nestles it inside the div w/ the random message
    let alertMessage = document.createElement("p");
    alertMessage.classList.add("boxText");
    alertMessage.textContent = mantra;

    // adds it to teh body 
    alertBox.appendChild(alertMessage)
    
    let container = document.getElementById("container");
    container.appendChild(alertBox);
  }
  setInterval(createAlert, 2000);

  //next: I want to plot the messages into different parts of the viewport
  
};
