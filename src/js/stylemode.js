let modeButton;
const themes = ["light", "dark"];

function initializeTheme() {
  let theme = getFromLocalStorage("theme") ? getFromLocalStorage("theme") : "light";
  initModeButton(theme);
  setDataTheme(theme);
}

function initModeButton(theme) {
  opositeTheme = themes[(themes.indexOf(theme) + 1) % 2];
  modeButton = document.getElementById("switchbutton");
  modeButton.addEventListener("click", OnSwitch);
  modeButton.innerHTML = `${capitalizeFirstLetter(opositeTheme)} Mode`;
}

function OnSwitch() {
  if (modeButton.innerHTML == "Light Mode") {
    setDataTheme("light");
    modeButton.innerHTML = "Dark Mode";
    saveToLocalStorage("theme", "light");
  } else {
    setDataTheme("dark");
    modeButton.innerHTML = "Light Mode";
    saveToLocalStorage("theme", "dark");
  }
}

function setDataTheme(theme) {

  document.documentElement.setAttribute("data-theme", theme);
}
