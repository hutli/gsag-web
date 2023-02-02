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

async function openMenuFirst() {
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
  for (let i of document.querySelector("#left-menu-list").children) {
    i.classList.remove("hidden");
    await typewriteAlt(i, i.textContent);
  }
}

function closeMenu() {
  document.querySelector(".left-menu").classList.remove("left-menu-in");
  document.querySelector(".left-menu").classList.add("left-menu-peeking");
}

function openMenu() {
  document.querySelector(".left-menu").classList.remove("left-menu-peeking");
  document.querySelector(".left-menu").classList.add("left-menu-in");
}

function _turnOn() {
  document.querySelector(".container").classList.remove("off");
  document.querySelector(".container").classList.add("reset");
}
function _turnOff() {
  document.querySelector(".container").classList.remove("on");
  document.querySelector(".container").classList.remove("reset");
  document.querySelector(".container").classList.add("off");
}

function toggleContent(e) {
  if (e.textContent == "turn on") {
    _turnOn();
    for (let c of [...document.querySelector("#left-menu-list").children].slice(
      1,
      5
    )) {
      c.classList.remove("disabled");
      c.disabled = false;
    }
    typewriteAlt(e, "turn off");
  } else {
    _turnOff();
    for (let c of [...document.querySelector("#left-menu-list").children].slice(
      1,
      5
    )) {
      c.classList.add("disabled");
      c.disabled = true;
    }
    typewriteAlt(e, "turn on");
  }
}

async function changePage(e, page) {
  if (!e.disabled) {
    typewriteAlt(e, page);
    if (window.innerWidth < 1200) {
      closeMenu();
    }
    _turnOff();
    await delay(0.5);
    document.querySelector("#container").innerHTML = await (
      await fetch(`/pages/${page}.html`)
    ).text();
    _turnOn();
  }
}

// MAIN
fetch("/pages/home.html").then((r) =>
  r.text().then((t) => (document.querySelector("#container").innerHTML = t))
);
