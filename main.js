const savedLang = localStorage.getItem('lang') || 'en';

const en = {
  title: 'Italian Brainrot Image Generator',
  desc: 'Upload your photo and let the Italian meme magic happen! Add pizza, 🍕🤌, and Renaissance vibes to any image.',
  btns: ['Text Generator', 'Image Generator', 'Voice Synth', 'Brainrot Quiz'],
  download: 'Download',
  reset: 'Reset'
};
const it = {
  title: 'Generatore di Immagini Brainrot Italiano',
  desc: 'Carica la tua foto e lascia che la magia dei meme italiani abbia inizio! Aggiungi pizza, 🍕🤌 e vibrazioni rinascimentali a qualsiasi immagine.',
  btns: ['Generatore di Testo', 'Generatore di Immagini', 'Sintesi Vocale', 'Quiz Brainrot'],
  download: 'Scarica',
  reset: 'Resetta'
};

const langEnBtn = document.getElementById('lang-en');
const langItBtn = document.getElementById('lang-it');
const mainTitle = document.getElementById('main-title');
const mainDesc = document.getElementById('main-desc');
const navLinks = document.querySelectorAll('.main-nav a');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');

function setLang(lang) {
  if (lang === 'it') {
    mainTitle.textContent = it.title;
    mainDesc.textContent = it.desc;
    navLinks.forEach((btn, i) => btn.textContent = it.btns[i]);
    langItBtn.classList.add('active');
    langEnBtn.classList.remove('active');
    if(downloadBtn) downloadBtn.textContent = it.download;
    if(resetBtn) resetBtn.textContent = it.reset;
    const imgPrompt = document.getElementById('img-prompt');
    if(imgPrompt) imgPrompt.placeholder = 'Inserisci la tua immaginazione...';
    const uploadLabel = document.querySelector('label.upload-btn');
    if(uploadLabel) uploadLabel.innerHTML = '<span class="icon">📤</span> Carica';
    const createBtn = document.getElementById('generate-img-btn');
    if(createBtn) createBtn.textContent = 'Crea';
  } else {
    mainTitle.textContent = en.title;
    mainDesc.textContent = en.desc;
    navLinks.forEach((btn, i) => btn.textContent = en.btns[i]);
    langEnBtn.classList.add('active');
    langItBtn.classList.remove('active');
    if(downloadBtn) downloadBtn.textContent = en.download;
    if(resetBtn) resetBtn.textContent = en.reset;
    const imgPrompt = document.getElementById('img-prompt');
    if(imgPrompt) imgPrompt.placeholder = 'Enter your imagination...';
    const uploadLabel = document.querySelector('label.upload-btn');
    if(uploadLabel) uploadLabel.innerHTML = '<span class="icon">📤</span> Upload';
    const createBtn = document.getElementById('generate-img-btn');
    if(createBtn) createBtn.textContent = 'Create';
  }
  setFooterLang(lang);
}

document.addEventListener('DOMContentLoaded', function() {
  setLang(savedLang);
  setFooterLang(savedLang, false);
  // 语言切换按钮事件
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
});

// 图片生成器功能
const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const resultImg = document.getElementById('result-img');
const imgActions = document.getElementById('img-actions');

const phrases = [
  'MAMMA MIA!', 'CHE CAZZO', 'SPAGHETTI TIME!', 'Dio cane!', 'FORZA ITALIA!', 'PASTA POWER!', 'MOZZARELLA!', 'BELLISSIMO!', 'CIAO BELLA!', 'ANDIAMO!', 'PIZZA PARTY!', "VIVA L'ITALIA!"
];
const emojis = ['🍕', '🤌', '🍝', '🇮🇹', '👨‍🍳', '🍅', '🥖', '🧀', '🍷', '🍦', '🥫', '🍆'];
const filters = [
  'rgba(200, 150, 50, 0.22)', // 黄褐色
  'rgba(0, 140, 69, 0.13)',   // 绿色
  'rgba(205, 33, 42, 0.13)',  // 红色
  'rgba(255,255,255,0.10)',   // 亮白
  'rgba(80, 60, 20, 0.10)'    // 复古棕
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 魔改文本生成器函数
function generateBrainrotText(input) {
  const memes = ['🤌', '🍕', 'Mamma mia!', 'Bellissimo!', 'Spaghetti!', 'Che pizza!', 'Forza!', 'Mozzarella!', 'Pasta!'];
  let output = input
    .replace(/a/gi, 'aa')
    .replace(/e/gi, 'ee')
    .replace(/o/gi, 'oo');
  output += ' ' + memes[Math.floor(Math.random() * memes.length)];
  return output;
}

// 获取自适应字号
function getOptimalFontSize(ctx, text, maxWidth, minSize, maxSize) {
  let fontSize = maxSize;
  ctx.font = `bold ${fontSize}px Arial Black, Impact, Arial, sans-serif`;
  while (fontSize > minSize && ctx.measureText(text).width > maxWidth) {
    fontSize -= 2;
    ctx.font = `bold ${fontSize}px Arial Black, Impact, Arial, sans-serif`;
  }
  return fontSize;
}

function addItalianBrainrotToImage(imageFile) {
  const ctx = canvas.getContext('2d');
  const img = new window.Image();
  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    // 随机滤镜
    ctx.fillStyle = getRandom(filters);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 主梗语：优先用输入框内容，风格与文本生成器一致
    let promptText = '';
    const promptInput = document.getElementById('img-prompt');
    if (promptInput && promptInput.value.trim()) {
      promptText = generateBrainrotText(promptInput.value.trim());
    } else {
      promptText = getRandom(phrases);
    }

    // --- 魔性梗图风格：自适应字号、随机颜色、粗描边、轻微旋转，随机上下/上下都放 ---
    ctx.save();
    const maxTextWidth = canvas.width * 0.92;
    const minFontSize = 32;
    const maxFontSize = Math.floor(canvas.height / 4);
    const fontSize = getOptimalFontSize(ctx, promptText, maxTextWidth, minFontSize, maxFontSize);
    ctx.font = `bold ${fontSize}px Arial Black, Impact, Arial, sans-serif`;
    ctx.fillStyle = getRandom(['#CD212A', '#008C45', '#222', '#FFD700', '#4f46e5', '#fff']);
    ctx.textAlign = 'center';
    ctx.lineWidth = Math.max(fontSize / 8, 6);
    ctx.strokeStyle = '#fff';
    const margin = Math.max(canvas.height * 0.08, 40);
    const mode = getRandom(['top', 'bottom', 'both']);
    const angle = (Math.random() - 0.5) * 0.10;
    const drawMemeText = (y) => {
      ctx.save();
      ctx.translate(canvas.width / 2, y);
      ctx.rotate(angle);
      ctx.strokeText(promptText, 0, 0);
      ctx.fillText(promptText, 0, 0);
      ctx.restore();
    };
    if (mode === 'top' || mode === 'both') {
      ctx.textBaseline = 'top';
      drawMemeText(margin);
    }
    if (mode === 'bottom' || mode === 'both') {
      ctx.textBaseline = 'bottom';
      drawMemeText(canvas.height - margin);
    }
    ctx.restore();

    // 随机emoji数量和位置
    const emojiCount = getRandomInt(2, 5); // 2~5个
    for(let i=0; i<emojiCount; i++) {
      ctx.save();
      const size = getRandomInt(canvas.width/14, canvas.width/7);
      ctx.font = `${size}px Arial`;
      ctx.globalAlpha = Math.random()*0.5+0.5;
      ctx.translate(getRandomInt(0, canvas.width-size), getRandomInt(canvas.height/6, canvas.height-size));
      ctx.rotate((Math.random()-0.5)*0.7); // 随机旋转
      ctx.fillText(getRandom(emojis), 0, 0);
      ctx.restore();
    }

    // 随机加点乱码
    ctx.save();
    ctx.font = `${getRandomInt(canvas.width/20, canvas.width/14)}px Courier New, monospace`;
    ctx.fillStyle = '#333';
    ctx.globalAlpha = 0.18;
    for(let i=0; i<getRandomInt(2,4); i++) {
      ctx.fillText(Math.random().toString(36).slice(2, 7).toUpperCase(), getRandomInt(0, canvas.width-80), getRandomInt(canvas.height/2, canvas.height-20));
    }
    ctx.restore();

    // 显示结果
    resultImg.src = canvas.toDataURL('image/png');
    resultImg.style.display = 'block';
    imgActions.style.display = 'block';
  };
  img.src = URL.createObjectURL(imageFile);
}

let uploadedImageFile = null;
let uploadStatus = null;
const uploadLabel = document.querySelector('label.upload-btn');
if (uploadLabel) {
  uploadStatus = document.createElement('span');
  uploadStatus.id = 'upload-status';
  uploadStatus.style.marginLeft = '10px';
  uploadStatus.style.color = '#22bb33';
  uploadStatus.style.fontWeight = 'bold';
  uploadLabel.parentNode.insertBefore(uploadStatus, uploadLabel.nextSibling);
}
function updateUploadStatusText() {
  if (!uploadStatus) return;
  const lang = langItBtn.classList.contains('active') ? 'it' : 'en';
  uploadStatus.textContent = lang === 'it' ? '✔️ Caricato' : '✔️ Uploaded';
}
if(upload) {
  upload.addEventListener('change', (e) => {
    if(e.target.files && e.target.files[0]) {
      uploadedImageFile = e.target.files[0];
      updateUploadStatusText();
    } else {
      if (uploadStatus) uploadStatus.textContent = '';
    }
  });
}
const generateImgBtn = document.getElementById('generate-img-btn');
if(generateImgBtn) {
  generateImgBtn.addEventListener('click', () => {
    if(uploadedImageFile) {
      addItalianBrainrotToImage(uploadedImageFile);
    } else {
      alert('Please upload an image first!');
    }
  });
}
if(downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'italian-brainrot.png';
    link.href = resultImg.src;
    link.click();
  });
}
if(resetBtn) {
  resetBtn.addEventListener('click', () => {
    resultImg.style.display = 'none';
    imgActions.style.display = 'none';
    upload.value = '';
    canvas.width = 0;
    canvas.height = 0;
  });
}

// 语言切换时同步更新上传提示
if (langEnBtn && langItBtn) {
  langEnBtn.addEventListener('click', () => {
    if (uploadedImageFile) updateUploadStatusText();
  });
  langItBtn.addEventListener('click', () => {
    if (uploadedImageFile) updateUploadStatusText();
  });
}

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

function setFooterLang(lang, forceRandom = true) {
  const footer = document.getElementById('footer-text');
  if (!footer) return;
  if (lang === 'it') {
    footer.innerHTML = (forceRandom ? getRandom(footerIt) : footerIt[0]) + ' | italian brainrot';
  } else {
    footer.innerHTML = (forceRandom ? getRandom(footerEn) : footerEn[0]) + ' | italian brainrot';
  }
}

// 更丰富的梗词、emoji和梗模板
const memePhrases = [
  'MAMMA MIA!', 'CHE CAZZO', 'SPAGHETTI TIME!', 'Dio cane!', 'FORZA ITALIA!', 'PASTA POWER!', 'MOZZARELLA!', 'BELLISSIMO!', 'CIAO BELLA!', 'ANDIAMO!', 'PIZZA PARTY!', "VIVA L'ITALIA!", 'NONNA APPROVES!', 'MA DAI!', 'CHE FIGATA!', 'TUTTO BENE!', 'SOLO IN ITALIA!', 'PANE E NUTELLA!', 'CAMPIONI DEL MONDO!', 'MA CHE VUOI?', 'TROPPO FORTE!', 'LA DOLCE VITA!', 'FATTO A MANO!', 'CIOCCOLATO!', 'FERRARI VIBES!', 'ROMA CAPUT MUNDI!', 'MILANO DA BERE!', 'NAPOLI SOGNA!', 'VENICE VIBES!', 'BOLOGNA LA DOTTA!', 'FIRENZE ARTE!', 'PUGLIA LOVE!', 'SICILIA BEDDA!', 'SARDEGNA MARE!', 'TIRAMISU TIME!', 'ESPRESSO SHOT!', 'GELATO BREAK!', 'APERITIVO!', 'AMORE!', 'BACI DA ROMA!', 'CIAO RAGAZZI!', 'VIVA LA MAMMA!', 'NONNO SAYS YES!', 'PIZZA IS LIFE!', 'PASTA LA VISTA!', 'MOZZARELLA MOOD!', 'ITALIANO VERO!', 'MANGIARE!', 'FATTO IN CASA!', 'GRANDE GIOIA!', 'FESTA!', 'CIN CIN!', 'SALUTE!', 'VIVA L\'AMORE!', 'TUTTI A TAVOLA!', 'CHE BUONO!', 'MANGIAMO!', 'ANDIAMO AL MARE!', 'SOLE E MARE!', 'FERRAGOSTO!', 'NATALE IN FAMIGLIA!', 'PASQUA CON CHI VUOI!', 'CAPODANNO!', 'SANREMO TIME!', 'CALCIO E MEME!', 'JUVE O ROMA?', 'MILAN O INTER?', 'NAPOLI CAMPIONE!', 'FORZA AZZURRI!', 'GOAL!', 'RIGORE!', 'FUORIGIOCO!', 'ARBITRO!', 'TIFOSI PAZZI!', 'ULTRAS!', 'STADIO!', 'SERIE A!', 'CHAMPIONS!', 'EURO2020!', 'MONDIALI!', 'PIZZA NAPOLETANA!', 'CARBONARA!', 'AMATRICIANA!', 'LASAGNA!', 'RISOTTO!', 'OSSOBUCO!', 'POLENTA!', 'ARANCINI!', 'CANNOLI!', 'PANETTONE!', 'COLOMBA!', 'CROSTATA!', 'BABA!', 'CASSATA!', 'ZABAIONE!', 'LIMONCELLO!', 'GRAPPA!', 'SPRITZ!', 'NEGRONI!', 'BIRRA MORETTI!', 'PERONI!', 'CAMPARI!', 'APEROL!', 'PROSECCO!', 'FRANCIACORTA!', 'BAROLO!', 'CHIANTI!', 'BRUNELLO!', 'AMARONE!', 'TRENITALIA!', 'ALITALIA!', 'FIAT 500!', 'VESPA!', 'FERRARI!', 'LAMBORGHINI!', 'DUCATI!', 'GUCCI!', 'PRADA!', 'VERSACE!', 'DOLCE & GABBANA!', 'ARMANI!', 'BENETTON!', 'SUPERMARIO!', 'LUIGI!', 'PEACH!', 'BOWSER!', 'WARIO!', 'YOSHI!', 'POKEMON ITALIA!', 'NETFLIX & PIZZA!', 'INSTAGRAMMABILE!', 'TIKTOK ITALIA!', 'YOUTUBE MEMES!', 'TWITTER DRAMA!', 'FACEBOOK NONNI!', 'WHATSAPP MAMMA!', 'TELEGRAM GRUPPO!', 'DISCORD ITALIA!', 'RED CARPET ROMA!', 'FESTIVAL DI VENEZIA!', 'OSCAR ITALIANO!', 'CINEMA PARADISO!', 'LA VITA È BELLA!', 'PINOCCHIO!', 'SPIDERMAN ROMA!', 'BATMAN MILANO!', 'AVENGERS ITALIA!', 'STAR WARS SICILIA!', 'HARRY POTTER NAPOLI!', 'GAME OF PIZZA!', 'SQUID GAME ITALIA!', 'STRANGER THINGS ROMA!', 'SQUID GAME SICILIA!', 'MEME LORD!', 'KING OF PIZZA!', 'PASTA QUEEN!', 'EMOJI MASTER!', 'ITALIANO DOC!', 'MEME BOSS!', 'CHEF SUPREMO!', 'NONNA POWER!', 'MAMMA POWER!', 'PIZZA BOSS!', 'PASTA BOSS!', 'MOZZARELLA KING!', 'GELATO QUEEN!', 'TIRAMISU MASTER!', 'ESPRESSO KING!', 'FERRARI DRIVER!', 'VESPA RIDER!', 'FASHION ICON!', 'SOCCER STAR!', 'GOAL MACHINE!', 'DEFENSE WALL!', 'MIDFIELD BOSS!', 'STRIKER KING!', 'GOALKEEPER HERO!', 'ULTRAS LEADER!', 'TIFOSO PAZZO!', 'FANATICO!', 'CAMPIONE!', 'LEGGENDA!', 'MITO!', 'EROE!', 'GENIO!', 'FENOMENO!', 'NUMERO UNO!', 'TOP PLAYER!', 'BOMBER!', 'BOMBA!', 'SCUDETTO!', 'TRIPLETE!', 'CAMPIONATO!', 'COPPA!', 'SUPERCOPPA!', 'EUROPA LEAGUE!', 'CHAMPIONS LEAGUE!', 'MONDIALE!', 'OLIMPIADI!', 'RECORD!', 'VITTORIA!', 'SCONFITTA!', 'PAREGGIO!', 'RIMONTA!', 'SORPASSO!', 'ASSIST!', 'DRIBBLING!', 'TACCO!', 'RABONA!', 'SCORPION KICK!', 'BICICLETTA!', 'ROVESCIATA!', 'TIRO AL VOLO!', 'GOLAZO!', 'PALO!', 'TRAVERSA!', 'AUTOGOL!', 'RIGORE PARATO!', 'ESPULSIONE!', 'AMMONIZIONE!', 'VAR!', 'MOVIOLA!', 'MOVIMENTO!', 'AZIONE!', 'PARTITA!', 'ALLENATORE!', 'MISTER!', 'CAPITANO!', 'BANDIERA!', 'CURVA!', 'GRADINATA!', 'DISTINTI!', 'TRIBUNA!', 'SETTORE OSPITI!', 'TIFO ORGANIZZATO!', 'COREOGRAFIA!', 'STRISCIONE!', 'BANDIERA!', 'FUMOGENO!', 'TORCIA!', 'MEGAFONO!', 'CORO!', 'INNO!', 'APPLAUSI!', 'FISCHI!', 'BOATO!', 'SILENZIO!', 'ESULTANZA!', 'ABBONAMENTO!', 'BIGLIETTO!', 'STAGIONE!', 'CALENDARIO!', 'CLASSIFICA!', 'MERCATO!', 'ACQUISTO!', 'CESSIONE!', 'PRESTITO!', 'RINNOVO!', 'SCADENZA!', 'INGAGGIO!', 'STIPENDIO!', 'BONUS!', 'MULTA!', 'SQUALIFICA!', 'INFORTUNIO!', 'RECUPERO!', 'SOSTITUZIONE!', 'PANCHINA!', 'TITOLARE!', 'RISERVA!', 'PRIMAVERA!', 'SETTORE GIOVANILE!', 'ALLIEVI!', 'GIOVANISSIMI!', 'ESORDIENTI!', 'PULCINI!', 'PICCOLI AMICI!', 'SCUOLA CALCIO!', 'CAMP ESTIVO!', 'TORNEO!', 'FINALE!', 'SEMIFINALE!', 'QUARTI!', 'OTTAVI!', 'GIRONE!', 'PLAYOFF!', 'PLAYOUT!', 'RETROCESSIONE!', 'PROMOZIONE!', 'SERIE B!', 'SERIE C!', 'SERIE D!', 'ECCELLENZA!', 'PROMOZIONE!', 'PRIMA CATEGORIA!', 'SECONDA CATEGORIA!', 'TERZA CATEGORIA!', 'JUNIORES!', 'ALLENAMENTO!', 'RITIRO!', 'PREPARAZIONE!', 'AMICHEVOLE!', 'TEST MATCH!', 'DERBY!', 'CLASSICO!', 'RIVALITÀ!', 'SFIDA!', 'DUELLO!', 'SCONTRO!', 'BATTAGLIA!', 'GUERRA!', 'PACE!', 'AMICIZIA!', 'FRATELLANZA!', 'SOLIDARIETÀ!', 'ONORE!', 'GLORIA!', 'FAME!', 'SETTE!', 'SETE!', 'FELICITÀ!', 'TRISTEZZA!', 'RABBIA!', 'PAURA!', 'SORPRESA!', 'DISGUSTO!', 'AMORE!', 'ODIO!', 'INVIDIA!', 'GELOSIA!', 'ORGOGLIO!', 'UMILTÀ!', 'SAGGEZZA!', 'INTELLIGENZA!', 'CREATIVITÀ!', 'FANTASIA!', 'IMMAGINAZIONE!', 'INNOVAZIONE!', 'TRADIZIONE!', 'CULTURA!', 'STORIA!', 'ARTE!', 'MUSICA!', 'CINEMA!', 'TEATRO!', 'LETTERATURA!', 'POESIA!', 'FOTOGRAFIA!', 'SCULTURA!', 'PITTURA!', 'ARCHITETTURA!', 'MODA!', 'DESIGN!', 'CUCINA!', 'GASTRONOMIA!', 'ENOGASTRONOMIA!', 'VINO!', 'BIRRA!', 'LIQUORE!', 'COCKTAIL!', 'CAFFÈ!', 'CAPPUCCINO!', 'LATTE MACCHIATO!', 'CORNETTO!', 'BRIOCHE!', 'BISCOTTO!', 'CROISSANT!', 'PANINO!', 'TRAMEZZINO!', 'FOCACCIA!', 'PIADINA!', 'TORTA!', 'DOLCE!', 'GELATO!', 'FRUTTA!', 'VERDURA!', 'CARNE!', 'PESCE!', 'FORMAGGIO!', 'SALUME!', 'PROSCIUTTO!', 'MORTADELLA!', 'SALAME!', 'SALSICCIA!', 'SPECK!', 'BRESAOLA!', 'COPPA!', 'LARDO!', 'PANCETTA!', 'GUANCIALE!', 'COTECHINO!', 'ZAMPONE!', 'PORCHETTA!', 'POLPETTA!', 'COTOLETTA!', 'OSSOBUCO!', 'VITELLO TONNATO!', 'BOLLITO!', 'ARROSTO!', 'GRIGLIATA!', 'FRITTO!', 'PADELLA!', 'FORNO!', 'MICROONDE!', 'FRIGGITRICE!', 'ROBOT DA CUCINA!', 'BIMBY!', 'PADELLA!', 'PENTOLA!', 'TEGAME!', 'GRIGLIA!', 'BARBECUE!', 'SPIEDO!', 'SPAGHETTI!', 'PENNE!', 'RIGATONI!', 'FUSILLI!', 'FARFALLE!', 'ORECCHIETTE!', 'TROFIE!', 'GNOCCHI!', 'TAGLIATELLE!', 'LASAGNE!', 'CANNELLONI!', 'RAVIOLI!', 'AGNOLOTTI!', 'TORTELLINI!', 'CAPPELLETTI!', 'PANZEROTTI!', 'CALZONE!', 'FOCACCIA!', 'PIADINA!', 'CRESCIA!', 'CASSATA!', 'CANNOLI!', 'BABA!', 'PASTIERA!', 'ZEPPOLE!', 'CHIACCHIERE!', 'CASTAGNOLE!', 'FRAPPE!', 'CROSTOLI!', 'BUGIE!', 'STRUFFOLI!', 'TORRONE!', 'PANFORTE!', 'RICCIARELLI!', 'CAVALLUCCI!', 'CANTUCCI!', 'AMARETTI!', 'BACI DI DAMA!', 'BRUTTI MA BUONI!', 'TORTA CAPRESE!', 'TORTA DELLA NONNA!', 'TORTA PARADISO!', 'TORTA SACHER!', 'TORTA MIMOSA!', 'TORTA ZUCCA!', 'TORTA DI MELE!', 'TORTA DI RICOTTA!', 'TORTA DI CAROTE!', 'TORTA DI CIOCCOLATO!', 'TORTA DI NOCCIOLE!', 'TORTA DI MANDORLE!', 'TORTA DI LIMONE!', 'TORTA DI ARANCIA!', 'TORTA DI PERE!', 'TORTA DI FICHI!', 'TORTA DI UVA!', 'TORTA DI FRAGOLE!', 'TORTA DI LAMPONI!', 'TORTA DI MIRTILLI!', 'TORTA DI CILIEGIE!', 'TORTA DI ALBICOCCHE!', 'TORTA DI PESCA!', 'TORTA DI ANANAS!', 'TORTA DI BANANA!', 'TORTA DI COCCO!', 'TORTA DI ZUCCA!', 'TORTA DI PATATE!', 'TORTA DI SPINACI!', 'TORTA DI ZUCCHINE!', 'TORTA DI MELANZANE!', 'TORTA DI POMODORI!', 'TORTA DI CARCIOFI!', 'TORTA DI ASPARAGI!', 'TORTA DI FUNGHI!', 'TORTA DI CIPOLLE!', 'TORTA DI PORRI!', 'TORTA DI PATATE!', 'TORTA DI RISO!', 'TORTA DI PANE!', 'TORTA DI POLENTA!', 'TORTA DI SEMOLINO!', 'TORTA DI MAIS!', 'TORTA DI GRANO!', 'TORTA DI FARRO!', 'TORTA DI ORZO!', 'TORTA DI AVENA!', 'TORTA DI MIGLIO!', 'TORTA DI QUINOA!', 'TORTA DI AMARANTO!', 'TORTA DI CHIA!', 'TORTA DI LINO!', 'TORTA DI SESAMO!', 'TORTA DI GIRASOLE!', 'TORTA DI PAPAVERO!', 'TORTA DI ZUCCA!', 'TORTA DI PATATE!', 'TORTA DI SPINACI!', 'TORTA DI ZUCCHINE!', 'TORTA DI MELANZANE!', 'TORTA DI POMODORI!', 'TORTA DI CARCIOFI!', 'TORTA DI ASPARAGI!', 'TORTA DI FUNGHI!', 'TORTA DI CIPOLLE!', 'TORTA DI PORRI!', 'TORTA DI PATATE!', 'TORTA DI RISO!', 'TORTA DI PANE!', 'TORTA DI POLENTA!', 'TORTA DI SEMOLINO!', 'TORTA DI MAIS!', 'TORTA DI GRANO!', 'TORTA DI FARRO!', 'TORTA DI ORZO!', 'TORTA DI AVENA!', 'TORTA DI MIGLIO!', 'TORTA DI QUINOA!', 'TORTA DI AMARANTO!', 'TORTA DI CHIA!', 'TORTA DI LINO!', 'TORTA DI SESAMO!', 'TORTA DI GIRASOLE!'
];
const memeEmojis = ['🍕','🤌','🍝','🇮🇹','👨‍🍳','🍅','🥖','🧀','🍷','🍦','🥫','🍆','😂','🤣','😎','🔥','💥','🎉','🎊','🎶','🏆','⚽','🏟️','🚗','🏍️','🛵','🚂','✈️','🛳️','🏖️','🏝️','🏔️','🏙️','🌞','🌊','🌈','💃','🕺','👑','🦄','🦸‍♂️','🦸‍♀️','👸','🤴','🧙‍♂️','🧙‍♀️','🧛‍♂️','🧛‍♀️','🧟‍♂️','🧟‍♀️','🧞‍♂️','🧞‍♀️','🧚‍♂️','🧚‍♀️','🧜‍♂️','🧜‍♀️','🧝‍♂️','🧝‍♀️','🧙','🧚','🧞','🧜','🧝','👻','👽','🤖','🎃','😈','👹','👺','💀','☠️','👾','🤡','👨‍🎤','👩‍🎤','🧑‍🎤','🎭','🎨','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🪕','🎻','📯','🎵','🎶','🎙️','🎚️','🎛️','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🪕','🎻','📯','🎵','🎶'];
const memeTemplates = [
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
];

function generateMemeText() {
  const phrase = getRandom(memePhrases);
  const emoji1 = getRandom(memeEmojis);
  const emoji2 = getRandom(memeEmojis);
  const template = getRandom(memeTemplates);
  return template
    .replace('{phrase}', phrase)
    .replace('{phrase}', getRandom(memePhrases))
    .replace('{emoji}', emoji1)
    .replace('{emoji}', emoji2)
    .replace('{phrase}', getRandom(memePhrases))
    .replace('{emoji}', getRandom(memeEmojis));
}

// 替换图片生成器短语逻辑
function getRandomPhraseForImage() {
  return generateMemeText();
} 