var i = 0;
var j = 0;

var firstName = "ulia";
var secondName = "mith";

var myTimeout;
function typeWriter() {
  if (i < firstName.length) {
    document.getElementById("profile-username-first").innerHTML += firstName.charAt(i);
    i++;
  }
  if (j < secondName.length) {
    document.getElementById("profile-username-second").innerHTML += secondName.charAt(j);
    j++;
  }
  myTimeout = setTimeout(typeWriter, 50);
  if (!(i < firstName.length || j < secondName.length))
    clearTimeout(myTimeout);
}

function callWriter() {
  setTimeout(typeWriter, 500);
}

function addAnimToLinks () {
  let accountLinks = document.querySelector(".profile-accounts").children;
  console.log(accountLinks);
  for (let i = 0; i < accountLinks.length; i++) {
    accountLinks[i].style.animation = `popUp 1s ease-in-out ${i * 0.2 + 1.5}s both`;
  }
}

window.addEventListener("load", callWriter);
window.addEventListener("load", addAnimToLinks);
