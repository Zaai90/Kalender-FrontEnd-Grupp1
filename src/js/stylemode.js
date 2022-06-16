let modeButton;
let css;

function initModeButton() {
  css = document.getElementsByClassName("css");
  modeButton = document.getElementById("switchbutton");
  modeButton.addEventListener("click", OnSwitch);
  modeButton.innerHTML = "Light Mode";
  setDataTheme("light");
}

function OnSwitch() {
  const darkModeButton = document.getElementById("switchbutton");

  if (darkModeButton.innerHTML == "Light Mode") {
    setDataTheme("dark");
    darkModeButton.innerHTML = "Dark Mode";
  } else {
    setDataTheme("light");
    darkModeButton.innerHTML = "Light Mode";
  }
}

/**
 * 
 * @param {*} theme 
 * @param {HTMLCollection<Element>} css
 */
function setDataTheme(theme) {
  // for (let i = 0; i < css.length; i++) {
  // }
  document.documentElement.setAttribute("data-theme", theme);
}
