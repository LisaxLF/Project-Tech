const EditRankStandard = document.querySelector('.editStandard');
const EditRankDoubles = document.querySelector('.editDoubles');

let CurrentStandardImg = document.querySelector('.currentImgStandard');
const StandardRank = document.querySelector('.settings section:nth-of-type(2) > div:first-of-type > article:first-of-type > div:nth-of-type(2)');

let CurrentDoublesImg = document.querySelector('.currentImgDoubles');
const DoublesRank = document.querySelector('.settings section:nth-of-type(2) > div:first-of-type > article:nth-of-type(2) > div:nth-of-type(2)');

const cards = document.querySelector('.settings section:nth-of-type(2) div:first-of-type article:first-of-type')

const rankMenuDoubles = document.querySelector('.sliderDoubles');
const champDoubles = document.querySelector('#slideDoubles-1');
const champ2Doubles = document.querySelector('#slideDoubles-2');
const champ3Doubles = document.querySelector('#slideDoubles-3');

const rankMenuStandard = document.querySelector('.sliderStandard');
const champStandard = document.querySelector('#slideStandard-1');
const champ2Standard = document.querySelector('#slideStandard-2');
const champ3Standard = document.querySelector('#slideStandard-3');

const prefRanked = ['/images/icons/champ.png', '/images/icons/champ2.png', '/images/icons/champ3.png'];

function PreferedRankForMatchingStandard(Rank) {
    CurrentStandardImg.src = Rank;
    closeMenuStandard();
}

function ChoosingRankDoubles(Rank) {
    CurrentDoublesImg.src = Rank;
    closeMenuDoubles();
}

champStandard.addEventListener('click', PreferedRankForMatchingStandard.bind(this, prefRanked[0]));
champ2Standard.addEventListener('click', PreferedRankForMatchingStandard.bind(this, prefRanked[1]));
champ3Standard.addEventListener('click', PreferedRankForMatchingStandard.bind(this, prefRanked[2]));
EditRankStandard.addEventListener('click', openMenuStandard);

champDoubles.addEventListener('click', ChoosingRankDoubles.bind(this, prefRanked[0]));
champ2Doubles.addEventListener('click', ChoosingRankDoubles.bind(this, prefRanked[1]));
champ3Doubles.addEventListener('click', ChoosingRankDoubles.bind(this, prefRanked[2]));
EditRankDoubles.addEventListener('click', openMenuDoubles);

function openMenuStandard() {
    CurrentStandardImg.style.display = "none";
    StandardRank.style.display = "none";
    rankMenuStandard.style.display = "block";
}

function closeMenuStandard() {
    CurrentStandardImg.style.display = "block";
    StandardRank.style.display = "block";
    rankMenuStandard.style.display = "none";
}

function openMenuDoubles() {
    CurrentDoublesImg.style.display = "none";
    DoublesRank.style.display = "none";
    rankMenuDoubles.style.display = "block";
}

function closeMenuDoubles() {
    CurrentDoublesImg.style.display = "block";
    DoublesRank.style.display = "block";
    rankMenuDoubles.style.display = "none";
}

// FORM
const btnOpslaan = document.querySelector('.btnOpslaan')
btnOpslaan.addEventListener('click', SubmitForms);

function SubmitForms() {
    document.getElementById("form_text").submit();
    document.getElementById("form_check").submit();
}

// https://roytuts.com/limit-number-of-checkbox-selections-using-javascript/
function checkBoxLimit() {
    var checkBoxGroup = document.forms['form_name']['check'];
    var limit = 2;
    for (var i = 0; i < checkBoxGroup.length; i++) {
        checkBoxGroup[i].onclick = function () {
            var checkedcount = 0;
            for (var i = 0; i < checkBoxGroup.length; i++) {
                checkedcount += (checkBoxGroup[i].checked) ? 1 : 0;
            }
            if (checkedcount > limit) {
                alert("You can select maximum of " + limit + " checkboxes.");
                this.checked = false;
            }
        }
    }
}

checkBoxLimit();