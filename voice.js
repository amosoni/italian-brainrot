window.addEventListener('DOMContentLoaded', function() {
  let cachedVoices = [];
  function loadVoices() {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  if (typeof speechSynthesis !== 'undefined') {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }

  function getCurrentLang() {
    const enBtn = document.getElementById('lang-en');
    return enBtn && enBtn.classList.contains('active') ? 'en' : 'it';
  }

  document.getElementById('synth-btn').onclick = function() {
    const text = document.getElementById('voice-input').value;
    if (!text.trim()) return;
    const resultBox = document.getElementById('voice-result-box');
    const resultText = document.getElementById('voice-result-text');
    resultText.textContent = text;
    resultBox.style.display = 'block';
  };

  document.getElementById('play-voice-btn').onclick = function() {
    const text = document.getElementById('voice-result-text').textContent;
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    let voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
    if (!voices.length) {
      alert(getCurrentLang() === 'it'
        ? 'Nessuna voce italiana trovata. Ricarica la pagina o prova un altro browser.'
        : 'No speech voices available. Please refresh the page or try a different browser.');
      return;
    }
    let voice = voices.find(v => v.lang && v.lang.startsWith('it')) ||
                voices.find(v => v.lang && v.lang.startsWith('en')) ||
                voices[0];
    if (!voices.find(v => v.lang && v.lang.startsWith('it'))) {
      alert(getCurrentLang() === 'it'
        ? `Voce italiana non trovata. Verrà usata: ${voice.name} (${voice.lang}). Per la migliore esperienza, installa il pacchetto lingua italiana nel sistema o browser.`
        : `No Italian voice found. Using ${voice.name} (${voice.lang}). For best experience, please install Italian language pack in your system or browser.`);
    }
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.rate = 1;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  };

  // 多语言内容
  const en = {
    title: 'Italian Brainrot Voice Synth',
    desc: 'Enter your text and let the Italian meme voice bring it to life! Enjoy pizza, 🍕🤌, and Italian accent in your audio.',
    synthBtn: 'Create',
    playBtn: 'Play',
    btns: ['Text Generator', 'Image Generator', 'Voice Synth', 'Brainrot Quiz']
  };
  const it = {
    title: 'Sintesi Vocale Brainrot Italiana',
    desc: 'Inserisci il testo e lascia che la voce meme italiana lo porti in vita! Goditi pizza, 🍕🤌 e accento italiano nell\'audio.',
    synthBtn: 'Crea',
    playBtn: 'Riproduci',
    btns: ['Generatore di Testo', 'Generatore di Immagini', 'Sintesi Vocale', 'Quiz Brainrot']
  };

  const langEnBtn = document.getElementById('lang-en');
  const langItBtn = document.getElementById('lang-it');
  const mainTitle = document.getElementById('main-title');
  const mainDesc = document.getElementById('main-desc');
  const synthBtn = document.getElementById('synth-btn');
  const playBtn = document.getElementById('play-voice-btn');
  const navLinks = document.querySelectorAll('.main-nav a');

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

  function setLang(lang) {
    if (lang === 'it') {
      mainTitle.textContent = it.title;
      mainDesc.textContent = it.desc;
      synthBtn.textContent = it.synthBtn;
      playBtn.textContent = it.playBtn;
      navLinks.forEach((btn, i) => btn.textContent = it.btns[i]);
      langItBtn.classList.add('active');
      langEnBtn.classList.remove('active');
      const voiceInput = document.getElementById('voice-input');
      if(voiceInput) voiceInput.placeholder = 'Inserisci la tua immaginazione...';
    } else {
      mainTitle.textContent = en.title;
      mainDesc.textContent = en.desc;
      synthBtn.textContent = en.synthBtn;
      playBtn.textContent = en.playBtn;
      navLinks.forEach((btn, i) => btn.textContent = en.btns[i]);
      langEnBtn.classList.add('active');
      langItBtn.classList.remove('active');
      const voiceInput = document.getElementById('voice-input');
      if(voiceInput) voiceInput.placeholder = 'Enter your imagination...';
    }
    setFooterLang(lang, true);
  }

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
});