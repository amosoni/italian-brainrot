// 简单的意大利脑瘫梗文本生成逻辑
function generateMemeText() {
  const memes = ['🤌', '🍕', 'Mamma mia!', 'Bellissimo!', 'Spaghetti!', 'Che pizza!', 'Forza!', 'Mozzarella!', 'Pasta!'];
  const input = document.getElementById('text-input').value;
  let output = input
    .replace(/a/gi, 'aa')
    .replace(/e/gi, 'ee')
    .replace(/o/gi, 'oo');
  output += ' ' + memes[Math.floor(Math.random() * memes.length)];
  return output;
}

document.getElementById('generate-text-btn').onclick = function() {
  const input = document.getElementById('text-input').value;
  if (!input.trim()) return;
  let output = generateMemeText();
  document.getElementById('text-output').innerText = output;
  document.getElementById('copy-btn').style.display = 'inline-block';
};

document.getElementById('copy-btn').onclick = function() {
  const text = document.getElementById('text-output').innerText;
  navigator.clipboard.writeText(text);
  this.innerText = 'Copied!';
  setTimeout(() => { this.innerText = 'Copy'; }, 1000);
};

const footerEn = [
  'Powered by Pizza & Memes',
  'Made with Spaghetti Energy',
  '100% Italian Brainrot',
  'Mamma Mia! Site',
  'Mozzarella Powered',
  'Viva la Pasta!',
  'Forza Meme!',
  'Coded with amore'
];
const footerIt = [
  'A base di pizza e meme',
  'Energia di spaghetti pura',
  '100% brainrot italiano',
  'Sito Mamma Mia!',
  'Mozzarella inside',
  'Viva la pasta!',
  'Forza Meme!',
  'Creato con amore'
];
function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function setFooterLang(lang, forceRandom = true) {
  const footer = document.getElementById('footer-text');
  if (!footer) return;
  if (lang === 'it') {
    footer.innerHTML = (forceRandom ? getRandom(footerIt) : footerIt[0]) + ' | italian brainrot';
  } else {
    footer.innerHTML = (forceRandom ? getRandom(footerEn) : footerEn[0]) + ' | italian brainrot';
  }
}

const navLinks = document.querySelectorAll('.main-nav a');
const en = {
  btns: ['Text Generator', 'Image Generator', 'Voice Synth', 'Brainrot Quiz'],
  create: 'Create',
  placeholder: 'Enter your imagination...'
};
const it = {
  btns: ['Generatore di Testo', 'Generatore di Immagini', 'Sintesi Vocale', 'Quiz Brainrot'],
  create: 'Crea',
  placeholder: 'Inserisci la tua immaginazione...'
};
document.getElementById('main-desc').innerHTML = 'Enter your text and let the Italian meme magic transform it! Add Italian vibes to any sentence.';

function setLang(lang) {
  navLinks.forEach((btn, i) => btn.textContent = (lang === 'it' ? it.btns[i] : en.btns[i]));
  document.getElementById('generate-text-btn').textContent = lang === 'it' ? it.create : en.create;
  document.getElementById('text-input').placeholder = lang === 'it' ? it.placeholder : en.placeholder;
  if (lang === 'it') {
    langItBtn.classList.add('active');
    langEnBtn.classList.remove('active');
  } else {
    langEnBtn.classList.add('active');
    langItBtn.classList.remove('active');
  }
  setFooterLang(lang, true);
}

const langEnBtn = document.getElementById('lang-en');
const langItBtn = document.getElementById('lang-it');
langEnBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'en');
  setLang('en');
  setFooterLang('en', true);
});
langItBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'it');
  setLang('it');
  setFooterLang('it', true);
});
const savedLang = localStorage.getItem('lang') || 'en';
setLang(savedLang);
setFooterLang(savedLang, false); 