// Italian Brainrot Voice Synthesizer - 本地版本（备用方案）
import { utils, languages, sharedData } from '../common.js';

class LocalVoiceSynth {
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
      buttons: {
        generate: document.getElementById('generate-voice-btn')
      },
      placeholders: {
        voiceInput: document.getElementById('voice-input')
      }
    };
  }

  bindEvents() {
    // 生成语音按钮事件
    this.elements.generateBtn.addEventListener('click', () => {
      this.generateLocalVoice();
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

  generateLocalVoice() {
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
      // 使用浏览器内置的语音合成
      this.speakText(text);
      
      // 显示成功消息
      this.displaySuccessMessage();
      
    } catch (error) {
      console.error('Voice generation error:', error);
      const errorMsg = languages[this.currentLang].errors.voiceGenerationError;
      alert(errorMsg);
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  }

  speakText(text) {
    if (typeof speechSynthesis === 'undefined') {
      throw new Error('Speech synthesis not supported in this browser');
    }

    // 停止当前播放
    window.speechSynthesis.cancel();
    
    // 获取可用的语音
    let voices = this.cachedVoices.length ? this.cachedVoices : window.speechSynthesis.getVoices();
    
    if (!voices.length) {
      throw new Error('No speech voices available');
    }

    // 优先选择意大利语音，其次是英语语音
    let voice = voices.find(v => v.lang && v.lang.startsWith('it')) ||
                voices.find(v => v.lang && v.lang.startsWith('en')) ||
                voices[0];

    // 如果没有找到意大利语音，显示提示
    if (!voices.find(v => v.lang && v.lang.startsWith('it'))) {
      const noItalianVoiceMsg = this.currentLang === 'it'
        ? `Voce italiana non trovata. Verrà usata: ${voice.name} (${voice.lang}). Per la migliore esperienza, installa il pacchetto lingua italiana nel sistema o browser.`
        : `No Italian voice found. Using ${voice.name} (${voice.lang}). For best experience, please install Italian language pack in your system or browser.`;
      console.warn(noItalianVoiceMsg);
    }

    // 创建语音合成请求
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 0.9; // 稍微慢一点，更像意大利口音
    utterance.pitch = 1.1; // 稍微高一点，更有表现力
    utterance.volume = 1.0;

    // 添加意大利口音效果
    this.addItalianAccent(utterance);

    // 播放语音
    window.speechSynthesis.speak(utterance);
  }

  addItalianAccent(utterance) {
    // 为意大利语音添加特殊效果
    if (utterance.voice && utterance.voice.lang && utterance.voice.lang.startsWith('it')) {
      utterance.rate = 0.85; // 意大利语音稍微慢一点
      utterance.pitch = 1.2; // 更有表现力
    }
  }

  displaySuccessMessage() {
    const outputDiv = this.elements.voiceOutput;
    const playText = languages[this.currentLang].buttons.play || 'Play';
    
    outputDiv.innerHTML = `
      <div style="margin-top: 16px; padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #008C45;">
        <h3 style="color: #CD212A; margin-bottom: 12px;">🎤 Voice Generated Successfully!</h3>
        <p style="margin-bottom: 12px; color: #333;">
          ${this.currentLang === 'it' 
            ? 'La voce è stata generata con successo! Usa i controlli audio del tuo browser per riprodurla.' 
            : 'Voice generated successfully! Use your browser audio controls to play it.'}
        </p>
        <div style="background: #e8f5e8; padding: 12px; border-radius: 6px; border-left: 4px solid #22bb33;">
          <p style="margin: 0; color: #155724; font-size: 14px;">
            <strong>💡 Tip:</strong> ${this.currentLang === 'it' 
              ? 'Per la migliore esperienza, installa il pacchetto lingua italiana nel tuo sistema.' 
              : 'For the best experience, install Italian language pack on your system.'}
          </p>
        </div>
      </div>
    `;
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new LocalVoiceSynth();
});

export default LocalVoiceSynth; 