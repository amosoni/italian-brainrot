// 简化的语音合成功能 - 只使用浏览器内置功能
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

  // 简化的语音生成功能
  document.getElementById('generate-voice-btn').onclick = function() {
    const text = document.getElementById('voice-input').value;
    if (!text.trim()) {
      alert(getCurrentLang() === 'it' ? 'Inserisci del testo!' : 'Please enter some text!');
      return;
    }
    
    const btn = document.getElementById('generate-voice-btn');
    const originalText = btn.textContent;
    btn.textContent = getCurrentLang() === 'it' ? 'Generando...' : 'Generating...';
    btn.disabled = true;
    
    // 使用浏览器内置的语音合成
    setTimeout(() => {
      try {
        window.speechSynthesis.cancel();
        let voices = cachedVoices.length ? cachedVoices : window.speechSynthesis.getVoices();
        
        if (!voices.length) {
          alert(getCurrentLang() === 'it'
            ? 'Nessuna voce disponibile. Ricarica la pagina o prova un altro browser.'
            : 'No voices available. Please refresh the page or try a different browser.');
          return;
        }
        
        // 尝试找到意大利语音
        let voice = voices.find(v => v.lang && v.lang.startsWith('it')) ||
                    voices.find(v => v.lang && v.lang.startsWith('en')) ||
                    voices[0];
        
        const utter = new window.SpeechSynthesisUtterance(text);
        utter.voice = voice;
        utter.rate = 1;
        utter.pitch = 1.1;
        
        // 显示结果
        const outputDiv = document.getElementById('voice-output');
        outputDiv.innerHTML = `
          <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #008C45;">
            <h3 style="color: #CD212A; margin-bottom: 12px;">🎤 Generated Audio</h3>
            <p style="margin-bottom: 12px; font-style: italic;">"${text}"</p>
            <button id="play-voice-btn" style="background: #CD212A; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: bold; cursor: pointer; margin-right: 12px;">▶️ Play Audio</button>
            <button id="stop-voice-btn" style="background: #6c757d; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: bold; cursor: pointer;">⏹️ Stop</button>
          </div>
        `;
        
        // 播放按钮功能
        document.getElementById('play-voice-btn').onclick = function() {
          window.speechSynthesis.speak(utter);
        };
        
        // 停止按钮功能
        document.getElementById('stop-voice-btn').onclick = function() {
          window.speechSynthesis.cancel();
        };
        
        // 自动播放
        window.speechSynthesis.speak(utter);
        
      } catch (error) {
        console.error('Voice generation error:', error);
        alert(getCurrentLang() === 'it' 
          ? 'Errore nella generazione vocale. Riprova più tardi.' 
          : 'Voice generation error. Please try again later.');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    }, 500);
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

  // 语言切换功能
  const langEnBtn = document.getElementById('lang-en');
  const langItBtn = document.getElementById('lang-it');
  const mainTitle = document.getElementById('main-title');
  const mainDesc = document.getElementById('main-desc');
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
    footer.textContent = forceRandom ? getRandom(lang === 'it' ? footerIt : footerEn) : (lang === 'it' ? 'italian brainrot' : 'italian brainrot');
  }
  
  function setLang(lang) {
    const isIt = lang === 'it';
    if (langEnBtn) langEnBtn.classList.toggle('active', !isIt);
    if (langItBtn) langItBtn.classList.toggle('active', isIt);
    if (mainTitle) mainTitle.textContent = isIt ? it.title : en.title;
    if (mainDesc) mainDesc.textContent = isIt ? it.desc : en.desc;
    navLinks.forEach((link, i) => {
      if (link.textContent !== 'Brainrot Quiz') link.textContent = isIt ? it.btns[i] : en.btns[i];
    });
    setFooterLang(lang);
  }

  if (langEnBtn) langEnBtn.onclick = () => setLang('en');
  if (langItBtn) langItBtn.onclick = () => setLang('it');
  
  setLang('en');
}); 