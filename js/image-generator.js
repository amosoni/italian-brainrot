// Italian Brainrot Image Generator - 重构版本
import { utils, languages, sharedData } from './common.js';

class ImageGenerator {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.uploadedImageFile = null;
    this.elements = this.initializeElements();
    this.bindEvents();
    this.initializeLanguage();
    this.setupUploadStatus();
  }

  initializeElements() {
    return {
      mainTitle: document.getElementById('main-title'),
      mainDesc: document.getElementById('main-desc'),
      navLinks: document.querySelectorAll('.main-nav a'),
      langEnBtn: document.getElementById('lang-en'),
      langItBtn: document.getElementById('lang-it'),
      upload: document.getElementById('upload'),
      canvas: document.getElementById('canvas'),
      resultImg: document.getElementById('result-img'),
      imgActions: document.getElementById('img-actions'),
      downloadBtn: document.getElementById('download-btn'),
      resetBtn: document.getElementById('reset-btn'),
      generateBtn: document.getElementById('generate-img-btn'),
      buttons: {
        generate: document.getElementById('generate-img-btn'),
        download: document.getElementById('download-btn'),
        reset: document.getElementById('reset-btn')
      },
      placeholders: {
        imagePrompt: document.getElementById('img-prompt')
      }
    };
  }

  bindEvents() {
    // 文件上传事件
    this.elements.upload.addEventListener('change', (e) => {
      this.handleFileUpload(e);
    });

    // 生成按钮事件
    this.elements.generateBtn.addEventListener('click', () => {
      this.generateImage();
    });

    // 下载按钮事件
    this.elements.downloadBtn.addEventListener('click', () => {
      this.downloadImage();
    });

    // 重置按钮事件
    this.elements.resetBtn.addEventListener('click', () => {
      this.resetGenerator();
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
      pageType: 'imageGenerator'
    });
    
    // 设置Footer语言
    utils.setFooterLanguage(lang, true);
    
    // 更新语言按钮状态
    this.updateLanguageButtons(lang);
    
    // 更新上传状态文本
    if (this.uploadedImageFile) {
      this.updateUploadStatusText();
    }
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

  setupUploadStatus() {
    const uploadLabel = document.querySelector('label.upload-btn');
    if (uploadLabel) {
      this.uploadStatus = document.createElement('span');
      this.uploadStatus.id = 'upload-status';
      this.uploadStatus.style.marginLeft = '10px';
      this.uploadStatus.style.color = '#22bb33';
      this.uploadStatus.style.fontWeight = 'bold';
      uploadLabel.parentNode.insertBefore(this.uploadStatus, uploadLabel.nextSibling);
    }
  }

  updateUploadStatusText() {
    if (!this.uploadStatus) return;
    const successMsg = languages[this.currentLang].success.uploaded;
    this.uploadStatus.textContent = successMsg;
  }

  handleFileUpload(e) {
    if (e.target.files && e.target.files[0]) {
      this.uploadedImageFile = e.target.files[0];
      this.updateUploadStatusText();
    } else {
      if (this.uploadStatus) this.uploadStatus.textContent = '';
    }
  }

  generateImage() {
    if (!this.uploadedImageFile) {
      const errorMsg = languages[this.currentLang].errors.uploadImageFirst;
      alert(errorMsg);
      return;
    }

    this.addItalianBrainrotToImage(this.uploadedImageFile);
  }

  addItalianBrainrotToImage(imageFile) {
    const img = new Image();
    const canvas = this.elements.canvas;
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      // 设置画布尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 绘制原始图片
      ctx.drawImage(img, 0, 0);

      // 添加意大利滤镜
      this.addItalianFilter(ctx, canvas.width, canvas.height);

      // 添加意大利文本
      this.addItalianText(ctx, canvas.width, canvas.height);

      // 显示结果
      this.elements.resultImg.src = canvas.toDataURL('image/png');
      this.elements.resultImg.style.display = 'block';
      this.elements.imgActions.style.display = 'block';
    };

    img.src = URL.createObjectURL(imageFile);
  }

  addItalianFilter(ctx, width, height) {
    const filters = [
      'rgba(200, 150, 50, 0.22)', // 黄褐色
      'rgba(0, 140, 69, 0.13)',   // 绿色
      'rgba(205, 33, 42, 0.13)',  // 红色
      'rgba(255,255,255,0.10)',   // 亮白
      'rgba(80, 60, 20, 0.10)'    // 复古棕
    ];

    const filter = utils.getRandom(filters);
    ctx.fillStyle = filter;
    ctx.fillRect(0, 0, width, height);
  }

  addItalianText(ctx, width, height) {
    const phrases = sharedData.phrases;
    const emojis = sharedData.emojis;
    
    // 生成随机意大利文本
    const phrase = utils.getRandom(phrases);
    const emoji = utils.getRandom(emojis);
    const text = `${phrase} ${emoji}`;

    // 设置文本样式
    ctx.fillStyle = '#CD212A';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.textAlign = 'center';
    ctx.font = 'bold 48px Arial';

    // 计算文本位置
    const x = width / 2;
    const y = height - 50;

    // 绘制文本描边和填充
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    // 添加更多随机文本
    this.addRandomTextElements(ctx, width, height);
  }

  addRandomTextElements(ctx, width, height) {
    const phrases = sharedData.phrases;
    const emojis = sharedData.emojis;
    
    // 添加2-3个随机文本元素
    const numElements = utils.getRandomInt(2, 3);
    
    for (let i = 0; i < numElements; i++) {
      const phrase = utils.getRandom(phrases);
      const emoji = utils.getRandom(emojis);
      const text = `${phrase} ${emoji}`;
      
      // 随机位置
      const x = utils.getRandomInt(50, width - 50);
      const y = utils.getRandomInt(50, height - 100);
      
      // 随机字体大小
      const fontSize = utils.getRandomInt(24, 36);
      ctx.font = `bold ${fontSize}px Arial`;
      
      // 随机颜色
      const colors = ['#008C45', '#CD212A', '#FFD700', '#FF6B35'];
      ctx.fillStyle = utils.getRandom(colors);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      
      // 绘制文本
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    }
  }

  downloadImage() {
    const link = document.createElement('a');
    link.download = 'italian-brainrot.png';
    link.href = this.elements.resultImg.src;
    link.click();
  }

  resetGenerator() {
    this.elements.resultImg.style.display = 'none';
    this.elements.imgActions.style.display = 'none';
    this.elements.upload.value = '';
    this.elements.canvas.width = 0;
    this.elements.canvas.height = 0;
    this.uploadedImageFile = null;
    if (this.uploadStatus) this.uploadStatus.textContent = '';
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new ImageGenerator();
});

export default ImageGenerator; 