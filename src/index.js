import './css/style.css';
import { getWord } from './module';
import '@fortawesome/fontawesome-free/js/all';

const checkbox = document.querySelector('.checkbox');
const fonts = document.querySelector('select');
const play = document.querySelector('.play');
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
