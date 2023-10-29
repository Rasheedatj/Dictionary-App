import message from './message';
import './css/style.css';
import logo from './assets/webpack.png';
import '@fortawesome/fontawesome-free/js/all';

console.log(message);

const checkbox = document.querySelector('.checkbox');
const fonts = document.querySelector('select');
const play = document.querySelector('.play');
const searchInput = document.querySelector('.search input');
const audio = document.querySelector('audio');
const modal = document.querySelector('.modal');
const modeIcon = document.querySelector('.mode');

const html = document.querySelector('html');

// mode toggler
checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    html.classList.add('dark');
    // modeIcon.classList.replace('fa-bolt', 'fa-star');
  } else {
    html.classList.remove('dark');
    // modeIcon.classList.replace('fa-star', 'fa-bolt');
  }
});

// change fonts
fonts.addEventListener('change', function () {
  const selectedFont = fonts.options[fonts.selectedIndex].value;
  document.querySelector('body').style.fontFamily = `${selectedFont}`;
});

// request
async function getWord() {
  try {
    document.querySelector('.loader-container').style.display = 'flex';
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`,
      {}
    );
    if (!result.ok) {
      throw new Error('Something went wrong, pls enter a valid username.');
    }
    const data = await result.json();
    displayWord(data);
    document.querySelector('.loader-container').style.display = 'none';
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// display word details
function displayWord(data) {
  const word = document.getElementById('word');
  const source = document.querySelector('.url');

  data[0].meanings.forEach((meaning) => {
    const div = document.createElement('div');
    div.innerHTML = ` 
  <div class="speech">
    <p>${meaning.partOfSpeech}</p>
    <span></span>
  </div>

  <!-- meaning -->
  <div class="meaning">
    <p class="head">Meaning</p>
    <ul>
     ${meaning.definitions
       .map((define) => `<li>${define.definition}</li>`)
       .slice(0, 5)
       .join(' ')}
    </ul>
  </div>

  <!-- synonyms -->
  ${
    meaning.synonyms.length > 0
      ? `<div class="synonym">
  <p class="syn">Synonyms</p>

  <div class="syn-words">

  ${meaning.synonyms
    .map((syn) => ` <p>${syn}</p>`)
    .slice(0, 5)
    .join(' ,')}
  </div>`
      : ''
  }
  
  </div>`;
    div.className = 'speech_box';
    word.appendChild(div);
  });

  data[0].phonetics.forEach((phonetic) => {
    if (phonetic.audio) {
      audio.src = phonetic.audio;
      document.querySelector('.transcription').textContent = phonetic.text;
    }
  });

  source.textContent = data[0].sourceUrls[0];
  source.setAttribute('href', data[0].sourceUrls[0]);
  document.querySelector('.word').textContent = data[0].word;
  searchInput.value = '';
}

//search func
function search(e) {
  e.preventDefault();
  word.innerHTML = '';
  getWord();
}

play.addEventListener('click', function () {
  audio.src !== 'http://localhost:3000/? ' &&
  audio.src !== 'http://localhost:3000/'
    ? audio.play()
    : (modal.style.top = '3rem');

  setTimeout(function () {
    modal.style.top = '-5%';
  }, 3000);
});
document.querySelector('form').addEventListener('submit', search);
