// Italian Brainrot Generator - 共享模块
// 包含多语言配置、通用函数和共享数据

// 多语言配置
export const languages = {
  en: {
    // 导航
    nav: {
      textGenerator: 'Text Generator',
      imageGenerator: 'Image Generator',
      voiceSynth: 'Voice Synth',
      brainrotQuiz: 'Brainrot Quiz'
    },
    
    // 按钮文本
    buttons: {
      generate: '🚀 Generate Italian Brainrot',
      generateImage: '🚀 Generate Italian Brainrot Image',
      generateVoice: '🚀 Generate Italian Voice',
      copy: '📋 Copy to Clipboard',
      download: '📥 Download',
      reset: '🔄 Reset',
      upload: '📤 Upload Image',
      create: 'Create',
      play: 'Play',
      next: 'Next Question'
    },
    
    // 占位符文本
    placeholders: {
      textInput: 'Enter your imagination...',
      imagePrompt: 'Describe your Italian brainrot vision...',
      voiceInput: 'Enter text to convert to Italian voice...'
    },
    
    // 页面标题和描述
    pages: {
      textGenerator: {
        title: 'Italian Brainrot Text Generator',
        desc: 'Enter your text and let the Italian meme magic transform it! Add Italian vibes to any sentence.'
      },
      imageGenerator: {
        title: 'Italian Brainrot Image Generator',
        desc: 'Upload your photo and let the Italian meme magic happen! Add pizza, 🍕🤌, and Renaissance vibes to any image.'
      },
      voiceSynth: {
        title: 'Italian Brainrot Voice Synthesizer',
        desc: 'Enter your text and let the Italian meme voice bring it to life! Enjoy Italian accent in your audio.'
      },
      quiz: {
        title: 'Italian Brainrot Quiz',
        desc: 'Test your Italian meme knowledge! Choose the right answer and see how much brainrot you have.'
      }
    },
    
    // 错误消息
    errors: {
      uploadImageFirst: 'Please upload an image first!',
      enterText: 'Please enter some text!',
      voiceGenerationError: 'Voice generation error. Please try again later.'
    },
    
    // 成功消息
    success: {
      copied: 'Copied!',
      uploaded: '✔️ Uploaded'
    }
  },
  
  it: {
    // 导航
    nav: {
      textGenerator: 'Generatore di Testo',
      imageGenerator: 'Generatore di Immagini',
      voiceSynth: 'Sintesi Vocale',
      brainrotQuiz: 'Quiz Brainrot'
    },
    
    // 按钮文本
    buttons: {
      generate: '🚀 Genera Brainrot Italiano',
      generateImage: '🚀 Genera Immagine Brainrot Italiana',
      generateVoice: '🚀 Genera Voce Italiana',
      copy: '📋 Copia negli Appunti',
      download: '📥 Scarica',
      reset: '🔄 Resetta',
      upload: '📤 Carica Immagine',
      create: 'Crea',
      play: 'Riproduci',
      next: 'Prossima Domanda'
    },
    
    // 占位符文本
    placeholders: {
      textInput: 'Inserisci la tua immaginazione...',
      imagePrompt: 'Descrivi la tua visione brainrot italiana...',
      voiceInput: 'Inserisci il testo da convertire in voce italiana...'
    },
    
    // 页面标题和描述
    pages: {
      textGenerator: {
        title: 'Generatore di Testo Brainrot Italiano',
        desc: 'Inserisci il tuo testo e lascia che la magia dei meme italiani lo trasformi! Aggiungi vibrazioni italiane a qualsiasi frase.'
      },
      imageGenerator: {
        title: 'Generatore di Immagini Brainrot Italiano',
        desc: 'Carica la tua foto e lascia che la magia dei meme italiani abbia inizio! Aggiungi pizza, 🍕🤌 e vibrazioni rinascimentali a qualsiasi immagine.'
      },
      voiceSynth: {
        title: 'Sintetizzatore Vocale Brainrot Italiano',
        desc: 'Inserisci il testo e lascia che la voce meme italiana lo porti in vita! Goditi l\'accento italiano nell\'audio.'
      },
      quiz: {
        title: 'Quiz Brainrot Italiano',
        desc: 'Metti alla prova la tua conoscenza dei meme italiani! Scegli la risposta giusta e scopri quanto sei brainrottato.'
      }
    },
    
    // 错误消息
    errors: {
      uploadImageFirst: 'Carica prima un\'immagine!',
      enterText: 'Inserisci del testo!',
      voiceGenerationError: 'Errore nella generazione vocale. Riprova più tardi.'
    },
    
    // 成功消息
    success: {
      copied: 'Copiato!',
      uploaded: '✔️ Caricato'
    }
  }
};

// 共享数据
export const sharedData = {
  // Footer文本
  footerTexts: {
    en: [
      'Powered by Pizza & Memes',
      'Made with Spaghetti Energy',
      '100% Italian Brainrot',
      'Mamma Mia! Site',
      'Mozzarella Powered',
      'Viva la Pasta!',
      'Forza Meme!',
      'Coded with amore'
    ],
    it: [
      'A base di pizza e meme',
      'Energia di spaghetti pura',
      '100% brainrot italiano',
      'Sito Mamma Mia!',
      'Mozzarella inside',
      'Viva la pasta!',
      'Forza Meme!',
      'Creato con amore'
    ]
  },
  
  // 意大利短语
  phrases: [
    'MAMMA MIA!', 'CHE CAZZO', 'SPAGHETTI TIME!', 'Dio cane!', 'FORZA ITALIA!',
    'PASTA POWER!', 'MOZZARELLA!', 'BELLISSIMO!', 'CIAO BELLA!', 'ANDIAMO!',
    'PIZZA PARTY!', "VIVA L'ITALIA!", 'NONNA APPROVES!', 'MA DAI!', 'CHE FIGATA!',
    'TUTTO BENE!', 'SOLO IN ITALIA!', 'PANE E NUTELLA!', 'CAMPIONI DEL MONDO!',
    'MA CHE VUOI?', 'TROPPO FORTE!', 'LA DOLCE VITA!', 'FATTO A MANO!',
    'CIOCCOLATO!', 'FERRARI VIBES!', 'ROMA CAPUT MUNDI!', 'MILANO DA BERE!',
    'NAPOLI SOGNA!', 'VENICE VIBES!', 'BOLOGNA LA DOTTA!', 'FIRENZE ARTE!',
    'PUGLIA LOVE!', 'SICILIA BEDDA!', 'SARDEGNA MARE!', 'TIRAMISU TIME!',
    'ESPRESSO SHOT!', 'GELATO BREAK!', 'APERITIVO!', 'AMORE!', 'BACI DA ROMA!',
    'CIAO RAGAZZI!', 'VIVA LA MAMMA!', 'NONNO SAYS YES!', 'PIZZA IS LIFE!',
    'PASTA LA VISTA!', 'MOZZARELLA MOOD!', 'ITALIANO VERO!', 'MANGIARE!',
    'FATTO IN CASA!', 'GRANDE GIOIA!', 'FESTA!', 'CIN CIN!', 'SALUTE!',
    'VIVA L\'AMORE!', 'TUTTI A TAVOLA!', 'CHE BUONO!', 'MANGIAMO!',
    'ANDIAMO AL MARE!', 'SOLE E MARE!', 'FERRAGOSTO!', 'NATALE IN FAMIGLIA!',
    'PASQUA CON CHI VUOI!', 'CAPODANNO!', 'SANREMO TIME!', 'CALCIO E MEME!',
    'JUVE O ROMA?', 'MILAN O INTER?', 'NAPOLI CAMPIONE!', 'FORZA AZZURRI!',
    'GOAL!', 'RIGORE!', 'FUORIGIOCO!', 'ARBITRO!', 'TIFOSI PAZZI!', 'ULTRAS!',
    'STADIO!', 'SERIE A!', 'CHAMPIONS!', 'EURO2020!', 'MONDIALI!',
    'PIZZA NAPOLETANA!', 'CARBONARA!', 'AMATRICIANA!', 'LASAGNA!', 'RISOTTO!',
    'OSSOBUCO!', 'POLENTA!', 'ARANCINI!', 'CANNOLI!', 'PANETTONE!', 'COLOMBA!',
    'CROSTATA!', 'BABA!', 'CASSATA!', 'ZABAIONE!', 'LIMONCELLO!', 'GRAPPA!',
    'SPRITZ!', 'NEGRONI!', 'BIRRA MORETTI!', 'PERONI!', 'CAMPARI!', 'APEROL!',
    'PROSECCO!', 'FRANCIACORTA!', 'BAROLO!', 'CHIANTI!', 'BRUNELLO!', 'AMARONE!'
  ],
  
  // Emoji集合
  emojis: [
    '🍕', '🤌', '🍝', '🇮🇹', '👨‍🍳', '🍅', '🥖', '🧀', '🍷', '🍦', '🥫', '🍆',
    '😂', '🤣', '😎', '🔥', '💥', '🎉', '🎊', '🎶', '🏆', '⚽', '🏟️', '🚗', '🏍️',
    '🛵', '🚂', '✈️', '🛳️', '🏖️', '🏝️', '🏔️', '🏙️', '🌞', '🌊', '🌈', '💃',
    '🕺', '👑', '🦄', '🦸‍♂️', '🦸‍♀️', '👸', '🤴', '🧙‍♂️', '🧙‍♀️', '🧛‍♂️',
    '🧛‍♀️', '🧟‍♂️', '🧟‍♀️', '🧞‍♂️', '🧞‍♀️', '🧚‍♂️', '🧚‍♀️', '🧜‍♂️', '🧜‍♀️',
    '🧝‍♂️', '🧝‍♀️', '🧙', '🧚', '🧞', '🧜', '🧝', '👻', '👽', '🤖', '🎃', '😈',
    '👹', '👺', '💀', '☠️', '👾', '🤡', '👨‍🎤', '👩‍🎤', '🧑‍🎤', '🎭', '🎨',
    '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '🪕', '🎻', '📯',
    '🎵', '🎶', '🎙️', '🎚️', '🎛️', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺',
    '🎸', '🪕', '🎻', '📯', '🎵', '🎶'
  ],
  
  // 梗模板
  templates: [
    '{phrase} {emoji}',
    '{emoji} {phrase}',
    '{phrase} {emoji} {emoji}',
    '{emoji} {phrase} {emoji}',
    '{phrase} - {emoji}',
    '{emoji} - {phrase}',
    '{phrase}!!! {emoji}',
    '{emoji}!!! {phrase}',
    '{phrase} {emoji} {phrase}',
    '{emoji} {phrase} {emoji} {phrase}',
    '{phrase} {emoji} {phrase} {emoji}',
    '{phrase} {emoji} {emoji} {emoji}',
    '{emoji} {emoji} {phrase}',
    '{phrase} {phrase} {emoji}',
    '{emoji} {phrase} {phrase}',
    '{phrase} {emoji} {phrase} {emoji}',
    '{emoji} {phrase} {emoji} {phrase}',
    '{phrase} {emoji} {phrase} {emoji} {phrase}',
    '{emoji} {phrase} {emoji} {phrase} {emoji}',
    '{phrase} {emoji} {phrase} {emoji} {phrase} {emoji}'
  ]
};

// 通用工具函数
export const utils = {
  // 获取随机数组元素
  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  
  // 获取随机整数
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  // 设置页面语言
  setPageLanguage(lang, elements) {
    const langData = languages[lang];
    if (!langData) return;
    
    // 设置导航链接
    if (elements.navLinks) {
      elements.navLinks.forEach((link, i) => {
        const navKeys = Object.values(langData.nav);
        if (navKeys[i]) link.textContent = navKeys[i];
      });
    }
    
    // 设置页面标题和描述
    if (elements.mainTitle && elements.mainDesc) {
      const pageKey = elements.pageType || 'textGenerator';
      const pageData = langData.pages[pageKey];
      if (pageData) {
        elements.mainTitle.textContent = pageData.title;
        elements.mainDesc.textContent = pageData.desc;
      }
    }
    
    // 设置按钮文本
    if (elements.buttons) {
      Object.keys(elements.buttons).forEach(key => {
        const button = elements.buttons[key];
        const buttonKey = key;
        if (button && langData.buttons[buttonKey]) {
          button.textContent = langData.buttons[buttonKey];
        }
      });
    }
    
    // 设置占位符
    if (elements.placeholders) {
      Object.keys(elements.placeholders).forEach(key => {
        const input = elements.placeholders[key];
        const placeholderKey = key;
        if (input && langData.placeholders[placeholderKey]) {
          input.placeholder = langData.placeholders[placeholderKey];
        }
      });
    }
  },
  
  // 设置Footer语言
  setFooterLanguage(lang, forceRandom = true) {
    const footer = document.getElementById('footer-text');
    if (!footer) return;
    
    const footerTexts = sharedData.footerTexts[lang] || sharedData.footerTexts.en;
    const text = forceRandom ? this.getRandom(footerTexts) : footerTexts[0];
    footer.innerHTML = `${text} | italian brainrot`;
  },
  
  // 生成梗文本
  generateMemeText() {
    const phrase = this.getRandom(sharedData.phrases);
    const emoji1 = this.getRandom(sharedData.emojis);
    const emoji2 = this.getRandom(sharedData.emojis);
    const template = this.getRandom(sharedData.templates);
    
    return template
      .replace('{phrase}', phrase)
      .replace('{phrase}', this.getRandom(sharedData.phrases))
      .replace('{emoji}', emoji1)
      .replace('{emoji}', emoji2)
      .replace('{phrase}', this.getRandom(sharedData.phrases))
      .replace('{emoji}', this.getRandom(sharedData.emojis));
  },
  
  // 语言切换处理
  handleLanguageSwitch(lang, elements, pageType) {
    localStorage.setItem('lang', lang);
    this.setPageLanguage(lang, { ...elements, pageType });
    this.setFooterLanguage(lang, true);
  }
};

// 导出默认对象
export default {
  languages,
  sharedData,
  utils
}; 