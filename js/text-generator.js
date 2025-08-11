// Italian Brainrot Text Generator - 重构版本
import { utils, languages, sharedData } from './common.js';

class TextGenerator {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.elements = this.initializeElements();
    this.bindEvents();
    this.initializeLanguage();
  }

  initializeElements() {
    return {
      mainTitle: document.getElementById('main-title'),
      mainDesc: document.getElementById('main-desc'),
      navLinks: document.querySelectorAll('.main-nav a'),
      langEnBtn: document.getElementById('lang-en'),
      langItBtn: document.getElementById('lang-it'),
      textInput: document.getElementById('text-input'),
      generateBtn: document.getElementById('generate-text-btn'),
      textOutput: document.getElementById('text-output'),
      copyBtn: document.getElementById('copy-btn'),
      buttons: {
        generate: document.getElementById('generate-text-btn'),
        copy: document.getElementById('copy-btn')
      },
      placeholders: {
        textInput: document.getElementById('text-input')
      }
    };
  }

  bindEvents() {
    // 生成按钮事件
    this.elements.generateBtn.addEventListener('click', () => {
      this.generateText();
    });

    // 复制按钮事件
    this.elements.copyBtn.addEventListener('click', () => {
      this.copyToClipboard();
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
      pageType: 'textGenerator'
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

  generateText() {
    const input = this.elements.textInput.value.trim();
    if (!input) {
      const errorMsg = languages[this.currentLang].errors.enterText;
      alert(errorMsg);
      return;
    }

    // 生成意大利脑瘫梗文本
    let output = this.transformText(input);
    output += ' ' + utils.getRandom(sharedData.phrases);
    
    // 显示结果
    this.elements.textOutput.innerText = output;
    this.elements.copyBtn.style.display = 'inline-block';
  }

  transformText(text) {
    // 简单的文本转换逻辑
    return text
      .replace(/a/gi, 'aa')
      .replace(/e/gi, 'ee')
      .replace(/o/gi, 'oo')
      .replace(/i/gi, 'ii')
      .replace(/u/gi, 'uu');
  }

  copyToClipboard() {
    const text = this.elements.textOutput.innerText;
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
      // 显示成功消息
      const successMsg = languages[this.currentLang].success.copied;
      this.elements.copyBtn.innerText = successMsg;
      
      // 恢复原始文本
      setTimeout(() => {
        const originalText = languages[this.currentLang].buttons.copy;
        this.elements.copyBtn.innerText = originalText;
      }, 1000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // 降级方案
      this.fallbackCopy(text);
    });
  }

  fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
      document.execCommand('copy');
      const successMsg = languages[this.currentLang].success.copied;
      this.elements.copyBtn.innerText = successMsg;
      
      setTimeout(() => {
        const originalText = languages[this.currentLang].buttons.copy;
        this.elements.copyBtn.innerText = originalText;
      }, 1000);
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new TextGenerator();
});

export default TextGenerator; 