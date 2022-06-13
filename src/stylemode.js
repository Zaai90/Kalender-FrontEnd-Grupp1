let modeButton;
function initModeButton() {
  modeButton = document.getElementById("switchbutton");
  modeButton.addEventListener("click", OnSwitch);
  modeButton.innerHTML = "Light Mode";
}

function OnSwitch() {
  const css = document.getElementById("cssSwitcher");
  const darkModeButton = document.getElementById("switchbutton");

  if (darkModeButton.innerHTML == "Dark Mode") {
    css.setAttribute("href", "src/lightstyle.css");
    darkModeButton.innerHTML = "Light Mode";
  } else {
    css.setAttribute("href", "src/style.css");
    darkModeButton.innerHTML = "Dark Mode";
  }
}
