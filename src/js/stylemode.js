let modeButton;
let css;

function initModeButton() {
  css = document.getElementsByClassName("css");
  modeButton = document.getElementById("switchbutton");
  modeButton.addEventListener("click", OnSwitch);
  modeButton.innerHTML = "Dark Mode";
  setDataTheme("light");
}

function OnSwitch() {
  if (modeButton.innerHTML == "Light Mode") {
    setDataTheme("light");
    modeButton.innerHTML = "Dark Mode";
  } else {
    setDataTheme("dark");
    modeButton.innerHTML = "Light Mode";
  }
}

function setDataTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
