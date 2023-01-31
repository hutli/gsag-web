function delay(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function typewrite(query, text, time = 0.05) {
  for (let c of text) {
    await delay(time);
    document.querySelector(query).value += c;
  }
}
async function typewriteAlt(element, text, time = 0.03) {
  element.textContent = "_";
  for (let i of [...Array(text.length).keys()]) {
    await delay(time);
    element.textContent = text.slice(0, i + 1) + "_";
  }
  await delay(time);
  element.textContent = text;
}

async function openMenu() {
  document.querySelector("#login").disabled = true;
  document.querySelector("#login").classList.add("disabled");
  if (!document.querySelector("#username").value) {
    document.querySelector("#username").value = "";
    await typewrite("#username", "guest");
  }
  document.querySelector("#username").disabled = true;
  document.querySelector("#username").classList.add("disabled");
  if (!document.querySelector("#password").value) {
    document.querySelector("#password").value = "";
    await typewrite("#password", "**********");
  }
  document.querySelector("#password").disabled = true;
  document.querySelector("#password").classList.add("disabled");
  await delay(0.5);
  document.querySelector(".left-menu").classList.add("left-menu-in");
  await delay(2);
  let menuItems = document.querySelector("#left-menu-list").children;
  let names = [
    "home",
    "about org",
    "squadrons",
    "operations",
    "RSI",
    "turn off",
  ];
  for (let i = 0; i < menuItems.length; i++) {
    await typewriteAlt(menuItems[i], names[i]);
  }
}

function turnOff() {
  document.querySelector(".container").classList.remove("on");
  document.querySelector(".container").classList.remove("reset");
  document.querySelector(".container").classList.add("off");
}

function turnOn() {
  document.querySelector(".container").classList.remove("off");
  document.querySelector(".container").classList.add("reset");
}

async function changePage(page) {
  turnOff();
  await delay(0.5);
  document.querySelector(".container").innerHTML = await (
    await fetch(`/pages/${page}.html`)
  ).text();
  turnOn();
}

async function about() {
  changePage("about");
}
async function home() {
  changePage("home");
}

// MAIN
fetch("/pages/home.html").then((r) =>
  r.text().then((t) => (document.querySelector(".container").innerHTML = t))
);
