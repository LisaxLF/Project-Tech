const EditRankStandard = document.querySelector('.editStandard');
const editRankDoubles = document.querySelector('.editDoubles');

let currentStandardImg = document.querySelector('.currentImgStandard');
const standardRank = document.querySelector('.gamemodeStandardText');

let currentDoublesImg = document.querySelector('.currentImgDoubles');
const doublesRank = document.querySelector('.gamemodeDoublesText');

const rankMenuDoubles = document.querySelector('.sliderDoubles');
const champDoubles = document.querySelector('#slideDoubles-1');
const champ2Doubles = document.querySelector('#slideDoubles-2');
const champ3Doubles = document.querySelector('#slideDoubles-3');

const rankMenuStandard = document.querySelector('.sliderStandard');
const champStandard = document.querySelector('#slideStandard-1');
const champ2Standard = document.querySelector('#slideStandard-2');
const champ3Standard = document.querySelector('#slideStandard-3');

const prefRanked = ['/images/icons/champ.png', '/images/icons/champ2.png', '/images/icons/champ3.png'];

function chooseRank(type, Rank) {
  const currentImg = type === 'standard' ? currentStandardImg : currentDoublesImg;
  const rankElement = type === 'standard' ? standardRank : doublesRank;
  const rankMenu = type === 'standard' ? rankMenuStandard : rankMenuDoubles;

  currentImg.src = Rank;
  closeMenu(type);
}

function openMenu(type) {
  const currentImg = type === 'standard' ? currentStandardImg : currentDoublesImg;
  const rankElement = type === 'standard' ? standardRank : doublesRank;
  const rankMenu = type === 'standard' ? rankMenuStandard : rankMenuDoubles;

  currentImg.style.display = "none";
  rankElement.style.display = "none";
  rankMenu.style.display = "block";
  checkboxes.style.opacity = "0";
}

function closeMenu(type) {
  const currentImg = type === 'standard' ? currentStandardImg : currentDoublesImg;
  const rankElement = type === 'standard' ? standardRank : doublesRank;
  const rankMenu = type === 'standard' ? rankMenuStandard : rankMenuDoubles;

  currentImg.style.display = "flex";
  rankElement.style.display = "flex";
  rankMenu.style.display = "none";
}

// addEventListeners
champStandard.addEventListener('click', chooseRank.bind(this, 'standard', prefRanked[0]));
champ2Standard.addEventListener('click', chooseRank.bind(this, 'standard', prefRanked[1]));
champ3Standard.addEventListener('click', chooseRank.bind(this, 'standard', prefRanked[2]));
EditRankStandard.addEventListener('click', openMenu.bind(this, 'standard'));

champDoubles.addEventListener('click', chooseRank.bind(this, 'doubles', prefRanked[0]));
champ2Doubles.addEventListener('click', chooseRank.bind(this, 'doubles', prefRanked[1]));
champ3Doubles.addEventListener('click', chooseRank.bind(this, 'doubles', prefRanked[2]));
editRankDoubles.addEventListener('click', openMenu.bind(this, 'doubles'));


// FORM
// https://roytuts.com/limit-number-of-checkbox-selections-using-javascript/
function checkBoxLimit() {
  var checkBoxGroup = document.forms['teammateSettings']['check'];
  var limit = 2;
  for (var i = 0; i < checkBoxGroup.length; i++) {
    checkBoxGroup[i].onclick = function () {
      var checkedcount = 0;
      for (var i = 0; i < checkBoxGroup.length; i++) {
        checkedcount += (checkBoxGroup[i].checked) ? 1 : 0;
      }
      if (checkedcount > limit) {
        const warningText = document.querySelector('.settings section:nth-of-type(2) form > section > p');
        alert("You can select maximum of " + limit + " checkboxes.");
        warningText.style.color = "red";
        setTimeout(function () {
          warningText.style.color = "white";
        }, 1000);
        this.checked = false;
      }
    }
  }
}

checkBoxLimit();

// LOADING SCREEN
const SaveBtn = document.querySelector('.saveButton');
const loadingContent = document.querySelector('#loading-screen');
const pageContent = document.querySelector('#content-screen');
const BodyEl = document.querySelector("body");
const factsHolder = document.querySelector(".factholder");
const apiUrl = "https://uselessfacts.jsph.pl/random.json?language=en";

SaveBtn.addEventListener('click', () => {
  loadingContent.style.display = "flex";
  pageContent.style.display = "none";

  // wacht 3 seconden voordat het loading scherm verdwijnt
  setTimeout(function () {
    fetch(apiUrl)
    .then(response => response.json())
    .then(fact => {
      factsHolder.innerHTML = fact.text;
      console.log(fact)
    })
    .catch(error => console.error(error));
    loadingContent.style.display = "none";
    pageContent.style.display = "flex";
    BodyEl.style.height = "100vh";
  }, 4000);
});

// API
