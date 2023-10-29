const searchInput = document.querySelector('.search input');
const audio = document.querySelector('audio');
const errorMsg = document.querySelector('.error');

// request
async function getWord() {
  try {
    document.querySelector('.loader-container').style.display = 'flex';
    const result = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput.value}`,
      {}
    );
    if (!result.ok) {
      document.querySelector('.loader-container').style.display = 'none';
      throw new Error('Something went wrong, pls enter a valid word.');
    }
    const data = await result.json();
    displayWord(data);
    document.querySelector('.loader-container').style.display = 'none';
  } catch (error) {
    errorMsg.style.top = '3rem';

    setTimeout(function () {
      errorMsg.style.top = '-5%';
    }, 3000);
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

export { getWord };
