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
    "You are allowed to take up space.",
    "You can breathe in calm and breathe out doubt.",
    "You are worthy, even on your hardest days.",
    "You don’t need to be perfect to be enough.",
    "You can release what you cannot control.",
    "You deserve rest without guilt.",
    "You carry resilience in every step.",
    "Your voice matters in every room you enter.",
    "You can choose courage over comfort.",
    "You are rooted, and you are rising.",
    "Your strength looks different every day, and that’s okay.",
    "You are safe to return to your breath.",
    "You can find peace in this very moment.",
    "You are allowed to take one step at a time.",
    "You can celebrate small victories as big wins.",
    "You deserve joy as much as anyone else.",
    "You create space for delight in your life.",
    "Your gratitude can shift your perspective.",
    "You can trust that small moments hold big meaning.",
    "You are enough, exactly as you are today.",
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
    // Pick a random saying
    let mantra = sayingGenerator();
    const { x, y } = randomPlace();

    // Main window box
    let alertBox = document.createElement("div");
    alertBox.classList.add("alertBox");
    alertBox.style.top = `${x}px`;
    alertBox.style.left = `${y}px`;

    // Title bar
    let titleBar = document.createElement("div");
    titleBar.classList.add("title-bar");
    titleBar.innerHTML = `<span>Digital Love ♡</span>`;

    let closeBtn = document.createElement("div");
    closeBtn.classList.add("close");
    closeBtn.textContent = "X";
    closeBtn.onclick = () => alertBox.remove();
    titleBar.appendChild(closeBtn);

    // Content area (message text)
    let content = document.createElement("div");
    content.classList.add("alertText");
    let alertMessage = document.createElement("p");
    alertMessage.textContent = mantra;
    content.appendChild(alertMessage);

    // Buttons
    let buttons = document.createElement("div");
    buttons.classList.add("buttons");

    let okBtn = document.createElement("button");
    okBtn.classList.add("btn");
    okBtn.textContent = "Ok";
    okBtn.onclick = () => alertBox.remove();

    let cancelBtn = document.createElement("button");
    cancelBtn.classList.add("btn");
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = () => alertBox.remove();

    buttons.appendChild(okBtn);
    buttons.appendChild(cancelBtn);

    // Put window together
    alertBox.appendChild(titleBar);
    alertBox.appendChild(content);
    alertBox.appendChild(buttons);

    // Add to container
    let container = document.getElementById("container");
    container.appendChild(alertBox);
  }

  setInterval(createAlert, 700);

  //next: I want to plot the messages into different parts of the viewport
  let screenWidth = document.documentElement.clientWidth;
  let screenHeight = document.documentElement.clientHeight;
  console.log(screenWidth);
  console.log(screenHeight);

  const randomPlace = () => {
    let horiValue = Math.floor(Math.random() * screenWidth) - 100;
    let vertValue = Math.floor(Math.random() * screenHeight);
    // return the values as x and y coordinates
    return { x: vertValue, y: horiValue };
  };

  randomPlace();
  console.log(randomPlace());
};
