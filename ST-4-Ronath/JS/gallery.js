// Student Name: Ronath Tharana Wijayin
// Student Role: student 4

// Use for next and previous buttons
const goPre = (row) => {
  row.scrollLeft -= 500;
};

const goNxt = (row) => {
  row.scrollLeft += 500;
};

// display the images in the allocated popup container
function popUpFunction(imgInfo, num) {
  var expandImg = document.getElementById("expandedImg" + num);
  var imgText = document.getElementById("imgtext" + num);
  expandImg.parentElement.style.cssText = `left: -100%; transform: scaleY(0);`;
  setTimeout(() => {
    expandImg.parentElement.style.cssText = `left: 0; transform: scaleY(1);`;
    expandImg.src = imgInfo.previousElementSibling.src;
    imgText.innerHTML = imgInfo.previousElementSibling.alt;
  }, 300);
}

function closePopUpContainer(el, num) {
  console.log("click");
  el.parentElement.style.cssText = "left: -100%; transform: scaleY(0);";
  document.getElementById("expandedImg" + num).src = "";
  document.getElementById("imgtext" + num).innerHTML = "";
}

// Applaying the body font color and background color
function changeContainerColourText(colors) {
  document.querySelector("body").style.color = "" + colors;
}

function changeContainerColourBg(colors) {
  document.querySelector("body").style.backgroundColor = "" + colors;
}

// Change background color
function bgColors(element) {
  var color = element.style.background;
  changeContainerColourBg(color);
}

// Change font color
function fontColors(element) {
  var color = element.style.background;
  changeContainerColourText(color);
}

// Changing the css property of the buttons
var ifClosedbg = true;
var ifClosedfont = true;

function changebgColor() {
  if (ifClosedbg) {
    document.getElementById("font-color").style.display = "none";
    document.getElementById("background-color").style.display = "flex";
    ifClosedfont = true;
    ifClosedbg = false;
  } else {
    document.getElementById("font-color").style.display = "none";
    document.getElementById("background-color").style.display = "none";
    ifClosedfont = true;
    ifClosedbg = true;
  }
  console.log(open);
}

function changeFontColor() {
  if (ifClosedfont) {
    document.getElementById("font-color").style.display = "flex";
    document.getElementById("background-color").style.display = "none";
    ifClosedbg = true;
    ifClosedfont = false;
  } else {
    document.getElementById("font-color").style.display = "none";
    document.getElementById("background-color").style.display = "none";
    ifClosedfont = true;
    ifClosedbg = true;
  }
  console.log(open);
}

// Make changes in the more options button on click
function options() {
  var options = document.querySelector(".options");
  var icon = document.querySelector(".more-options");

  if (options.style.opacity == "" || options.style.opacity == "0") {
    options.style.opacity = "1";
    options.style.left = "70px";
    icon.style.transform = "rotate(225deg)";
  } else {
    options.style.opacity = "0";
    options.style.left = "-100%";
    icon.style.transform = "rotate(0deg)";
    document.getElementById("background-color").style.display = "none";
    document.getElementById("font-color").style.display = "none";
    ifClosedfont = true;
    ifClosedbg = true;
  }
}

//Background color changing to random colors
function changeColorRandom() {
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  changeContainerColourBg(randomColor);
}

//font size change
function changeFontSize(type) {
  let ids = [
    "#h1",
    "#h2",
    "#a",
    "#h3",
    "#sub-topic1",
    "#sub-topic2",
    "#imgtext1",
    "#imgtext2",
  ];

  ids.forEach((id) => {
    let el = document.querySelector(id);

    let fontSize = window
      .getComputedStyle(el, null)
      .getPropertyValue("font-size");

    fontSize = parseFloat(fontSize);

    if (type === "increase") {
      el.style.fontSize = fontSize + 4 + "px";
    } else {
      el.style.fontSize = fontSize - 4 + "px";
    }
  });
}

// Change the light and the dark mode of the page
function changeMode() {
  var e = document.querySelector("body");
  var button = document.getElementById("mode");
  var icon = button.innerHTML;

  if (icon == "Dark Mode") {
    changeContainerColourBg("black");
    changeContainerColourText("#5DD6F4");
    document.querySelector("#imgtext1").style.color = "black";
    document.querySelector("#imgtext2").style.color = "black";
    button.innerHTML = "Light Mode";
  } else {
    changeContainerColourBg("white");
    changeContainerColourText("black");
    button.innerHTML = "Dark Mode";
  }
}
