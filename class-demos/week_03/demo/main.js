// way we are accessing the window in this class
// using ()=>() format
window.onload = () => {
  // using const variable declaration
  // this variable will never change to another element
  const moveDiv = document.getElementById("move");

  // getting the first button
  const rotateButton = document.getElementById("rotate");

  //   getting the stop button
  const stopButton = document.getElementById("stop");

  // adjust the angle of my div
  let angle = 0;

  // create a variable to store which interval we want to stop
  let intervalId;

  // adjust the x position variabls
  let leftPos = 0;
  let speed = 1;

  // rotate the moveDiv using css and js
  rotateButton.addEventListener("click", () => {
    angle++; //increase my moveDiv by 1

    // grab the rotation using the style

    // setInterval takes in 2 params:
    // 1. callback fucntion(function that happens when the interval elapses)
    // 2. amout of time before the interval happens again (in ms)

    intervalId = setInterval(() => {
      angle++; //increasre my moveDiv by 1

      // grab teh rotation using the style
      // moveDiv.style.transform  = "rptate(" + angle +"deg)"
      // shorthand to inject variables into strings
      moveDiv.style.transform = `rotate(${angle}deg)`;

      //    adding speed to left pos
      leftPos += StereoPannerNode;

      if (leftPos >= window.innerWidth || leftPos < 0) {
        speed *= -1;
      }
      // change css property based off math calc
      moveDiv.style.left = leftPos;
    }, 10);
  });

  stopButton.addEventListener("click", () => {
    clearInterval(intervalId);
  });

  // get the current browser/computer time
  let date = new Date();
  setInterval(() =>{
    time.textContent = (date.getHours() % 12) + ":" + date.getMinutes() + ":" + date.getSeconds();
  }, 1000)
  
};
