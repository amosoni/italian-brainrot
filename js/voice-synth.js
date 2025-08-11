// Italian Brainrot Voice Synthesizer - 重构版本
import { utils, languages, sharedData } from './common.js';

class VoiceSynth {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.cachedVoices = [];
    this.elements = this.initializeElements();
    this.bindEvents();
    this.initializeLanguage();
    this.loadVoices();
  }

  initializeElements() {
    return {
      mainTitle: document.getElementById('main-title'),
      mainDesc: document.getElementById('main-desc'),
      navLinks: document.querySelectorAll('.main-nav a'),
      langEnBtn: document.getElementById('lang-en'),
      langItBtn: document.getElementById('lang-it'),
      voiceInput: document.getElementById('voice-input'),
      generateBtn: document.getElementById('generate-voice-btn'),
      voiceOutput: document.getElementById('voice-output'),
      downloadBtn: document.getElementById('download-voice-btn'),
      buttons: {
        generate: document.getElementById('generate-voice-btn'),
        download: document.getElementById('download-voice-btn')
      },
      placeholders: {
        voiceInput: document.getElementById('voice-input')
      }
    };
  }

  bindEvents() {
    // 生成语音按钮事件
    this.elements.generateBtn.addEventListener('click', () => {
      this.generateVoice();
    });

    // 语言切换事件
    this.elements.langEnBtn.addEventListener('click', () => {
      this.switchLanguage('en');
    });

    this.elements.langItBtn.addEventListener('click', () => {
      this.switchLanguage('it');
    });
  }

  initializeLanguage() {
    this.setLanguage(this.currentLang);
  }

  setLanguage(lang) {
    this.currentLang = lang;
    
    // 设置页面语言
    utils.setPageLanguage(lang, {
      ...this.elements,
      pageType: 'voiceSynth'
    });
    
    // 设置Footer语言
    utils.setFooterLanguage(lang, true);
    
    // 更新语言按钮状态
    this.updateLanguageButtons(lang);
  }

  updateLanguageButtons(lang) {
    if (lang === 'it') {
      this.elements.langItBtn.classList.add('active');
      this.elements.langEnBtn.classList.remove('active');
    } else {
      this.elements.langEnBtn.classList.add('active');
      this.elements.langItBtn.classList.remove('active');
    }
  }

  switchLanguage(lang) {
    this.setLanguage(lang);
    localStorage.setItem('lang', lang);
  }

  loadVoices() {
    if (typeof speechSynthesis !== 'undefined') {
      this.cachedVoices = window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.cachedVoices = window.speechSynthesis.getVoices();
      };
    }
  }

  async generateVoice() {
    const text = this.elements.voiceInput.value.trim();
    if (!text) {
      const errorMsg = languages[this.currentLang].errors.enterText;
      alert(errorMsg);
      return;
    }

    const btn = this.elements.generateBtn;
    const originalText = btn.textContent;
    const generatingText = this.currentLang === 'it' ? 'Generando...' : 'Generating...';
    
    btn.textContent = generatingText;
    btn.disabled = true;

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.audioUrl) {
        this.displayAudioResult(data.audioUrl);
      } else {
        throw new Error('No audio URL received');
      }
    } catch (error) {
      console.error('Voice generation error:', error);
      const errorMsg = languages[this.currentLang].errors.voiceGenerationError;
      alert(errorMsg);
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }

  displayAudioResult(audioUrl) {
    const outputDiv = this.elements.voiceOutput;
    const downloadText = languages[this.currentLang].buttons.download;
    
    outputDiv.innerHTML = `
      <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #008C45;">
        <h3 style="color: #CD212A; margin-bottom: 12px;">🎤 Generated Audio</h3>
        <audio controls style="width: 100%; margin-bottom: 12px;">
          <source src="${audioUrl}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <button id="download-voice-btn" style="background: #008C45; color: white; border: none; border-radius: 8px; padding: 12px 24px; font-weight: bold; cursor: pointer;">${downloadText}</button>
      </div>
    `;

    // 重新绑定下载按钮事件
    const downloadBtn = document.getElementById('download-voice-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        this.downloadAudio(audioUrl);
      });
    }
  }

  downloadAudio(audioUrl) {
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'italian-brainrot-voice.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // 备用语音合成方法（使用浏览器内置TTS）
  generateLocalVoice() {
    const text = this.elements.voiceInput.value.trim();
    if (!text) {
      const errorMsg = languages[this.currentLang].errors.enterText;
      alert(errorMsg);
      return;
    }

    window.speechSynthesis.cancel();
    let voices = this.cachedVoices.length ? this.cachedVoices : window.speechSynthesis.getVoices();
    
    if (!voices.length) {
      const noVoiceMsg = this.currentLang === 'it' 
        ? 'Nessuna voce italiana trovata. Ricarica la pagina o prova un altro browser.'
        : 'No speech voices available. Please refresh the page or try a different browser.';
      alert(noVoiceMsg);
      return;
    }

    // 优先选择意大利语音
    let voice = voices.find(v => v.lang && v.lang.startsWith('it')) ||
                voices.find(v => v.lang && v.lang.startsWith('en')) ||
                voices[0];

    if (!voices.find(v => v.lang && v.lang.startsWith('it'))) {
      const noItalianVoiceMsg = this.currentLang === 'it'
        ? `Voce italiana non trovata. Verrà usata: ${voice.name} (${voice.lang}). Per la migliore esperienza, installa il pacchetto lingua italiana nel sistema o browser.`
        : `No Italian voice found. Using ${voice.name} (${voice.lang}). For best experience, please install Italian language pack in your system or browser.`;
      alert(noItalianVoiceMsg);
    }

    const utter = new window.SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.rate = 1;
    utter.pitch = 1.1;
    window.speechSynthesis.speak(utter);
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new VoiceSynth();
});

export default VoiceSynth; 