// 多语言内容
const en = {
  title: 'Italian Brainrot Quiz',
  desc: 'Test your Italian meme knowledge! Choose the right answer and see how much brainrot you have.'
};
const it = {
  title: 'Italian Brainrot Quiz',
  desc: 'Metti alla prova la tua conoscenza dei meme italiani! Scegli la risposta giusta e scopri quanto sei brainrottato.'
};

const langEnBtn = document.getElementById('lang-en');
const langItBtn = document.getElementById('lang-it');
const mainTitle = document.getElementById('main-title');
const mainDesc = document.getElementById('main-desc');
const navLinks = document.querySelectorAll('.main-nav a');
const enNav = ['Text Generator', 'Image Generator', 'Voice Synth', 'Brainrot Quiz'];
const itNav = ['Generatore di Testo', 'Generatore di Immagini', 'Sintesi Vocale', 'Quiz Brainrot'];

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
    navLinks.forEach((btn, i) => btn.textContent = itNav[i]);
    langItBtn.classList.add('active');
    langEnBtn.classList.remove('active');
  } else {
    mainTitle.textContent = en.title;
    mainDesc.textContent = en.desc;
    navLinks.forEach((btn, i) => btn.textContent = enNav[i]);
    langEnBtn.classList.add('active');
    langItBtn.classList.remove('active');
  }
  setFooterLang(lang);
}

langEnBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'en');
  lang = 'en';
  current = 0;
  score = 0;
  setLang('en');
  document.getElementById('score').innerHTML = '';
  renderQuestion();
  setFooterLang('en', true);
});
langItBtn.addEventListener('click', () => {
  localStorage.setItem('lang', 'it');
  lang = 'it';
  current = 0;
  score = 0;
  setLang('it');
  document.getElementById('score').innerHTML = '';
  renderQuestion();
  setFooterLang('it', true);
});
const savedLang = localStorage.getItem('lang') || 'en';
setLang(savedLang);

// --- 题库扩展为100道，每次随机抽取10题 ---
const allQuestions = [
  // 1
  {
    en: {q: "What do Italians say when something is amazing?", opts: ["Mamma mia!", "Wow!", "Bravo!", "Awesome!"], a: 0, feedback: ["Perfetto! You are a true meme connoisseur!", "Nooo, only 'Mamma mia!' is the real deal!"]},
    it: {q: "Cosa dicono gli italiani quando qualcosa è fantastico?", opts: ["Mamma mia!", "Opa!", "Bravo!", "Kawaii!"], a: 0, feedback: ["Perfetto! Sei un vero intenditore di meme!", "Nooo, solo 'Mamma mia!' è quella giusta!"]}
  },
  // 2
  {
    en: {q: "Which emoji is the ultimate Italian meme?", opts: ["🍕", "🍝", "😂", "🤌"], a: 3, feedback: ["Iconic! The 🤌 is pure Italian energy.", "Nope, only 🤌 is truly Italian!"]},
    it: {q: "Quale emoji è il meme italiano per eccellenza?", opts: ["🍕", "🍝", "😂", "🤌"], a: 3, feedback: ["Iconico! Il 🤌 è pura energia italiana.", "No, solo 🤌 è davvero italiano!"]}
  },
  // 3
  {
    en: {q: "What should NEVER go on a real Italian pizza?", opts: ["Pineapple", "Mozzarella", "Tomato", "Basil"], a: 0, feedback: ["Correct! Pineapple is forbidden!", "Nooo, pineapple is the only wrong answer!"]},
    it: {q: "Cosa NON dovrebbe MAI andare su una vera pizza italiana?", opts: ["Ananas", "Mozzarella", "Pomodoro", "Basilico"], a: 0, feedback: ["Corretto! L'ananas è vietato!", "No, solo l'ananas è sbagliato!"]}
  },
  // 4
  {
    en: {q: "What shape makes Italians think of food?", opts: ["Circle", "Triangle", "Square", "Star"], a: 0, feedback: ["Yes! Circles = pizza, pasta, plates!", "Nope, only circles make Italians hungry!"]},
    it: {q: "Quale forma fa pensare subito al cibo agli italiani?", opts: ["Cerchio", "Triangolo", "Quadrato", "Stella"], a: 0, feedback: ["Sì! Cerchi = pizza, pasta, piatti!", "No, solo i cerchi fanno venire fame agli italiani!"]}
  },
  // 5
  {
    en: {q: "Which phrase is a classic Italian meme?", opts: ["Che pizza!", "Hello!", "Good day!", "Hi!"], a: 0, feedback: ["Che pizza! is peak Italian meme.", "Nope, only 'Che pizza!' is Italian!"]},
    it: {q: "Quale frase è un classico meme italiano?", opts: ["Che pizza!", "Bonjour!", "Guten Tag!", "Hola!"], a: 0, feedback: ["Che pizza! è il massimo del meme italiano.", "No, solo 'Che pizza!' è italiano!"]}
  },
  // 6
  {
    en: {q: "Which emoji means pizza?", opts: ["🍕", "🍝", "😂", "🤌"], a: 0, feedback: ["Correct! 🍕 is pizza!", "Nope, only 🍕 is pizza!"]},
    it: {q: "Quale emoji significa pizza?", opts: ["🍕", "🍝", "😂", "🤌"], a: 0, feedback: ["Corretto! 🍕 è la pizza!", "No, solo 🍕 è la pizza!"]}
  },
  // 7
  {
    en: {q: "Which emoji means pasta?", opts: ["🍕", "🍝", "😂", "🤌"], a: 1, feedback: ["Correct! 🍝 is pasta!", "Nope, only 🍝 is pasta!"]},
    it: {q: "Quale emoji significa pasta?", opts: ["🍕", "🍝", "😂", "🤌"], a: 1, feedback: ["Corretto! 🍝 è la pasta!", "No, solo 🍝 è la pasta!"]}
  },
  // 8
  {
    en: {q: "Which emoji means celebration?", opts: ["🍕", "🍝", "😂", "🤌"], a: 2, feedback: ["Correct! 😂 is celebration!", "Nope, only 😂 is celebration!"]},
    it: {q: "Quale emoji significa festa?", opts: ["🍕", "🍝", "😂", "🤌"], a: 2, feedback: ["Corretto! 😂 è la festa!", "No, solo 😂 è la festa!"]}
  },
  // 9
  {
    en: {q: "Which emoji means cool?", opts: ["🍕", "🍝", "😂", "🤌"], a: 3, feedback: ["Correct! 🤌 is cool!", "Nope, only 🤌 is cool!"]},
    it: {q: "Quale emoji significa figo?", opts: ["🍕", "🍝", "😂", "🤌"], a: 3, feedback: ["Corretto! 🤌 è figo!", "No, solo 🤌 è figo!"]}
  },
  // 10
  {
    en: {q: "Which emoji means love?", opts: ["🍕", "🍝", "😂", "🤌"], a: 2, feedback: ["Correct! 😂 is love!", "Nope, only 😂 is love!"]},
    it: {q: "Quale emoji significa amore?", opts: ["🍕", "🍝", "😂", "🤌"], a: 2, feedback: ["Corretto! 😂 è amore!", "No, solo  è amore!"]}
  },
  // 11
  {
    en: {q: "What do Italians call their grandma?", opts: ["Nonna", "Abuela", "Oma", "Babushka"], a: 0, feedback: ["Nonna knows all the secrets!", "Nooo, only Nonna makes the best pasta!"]},
    it: {q: "Come chiamano gli italiani la loro nonna?", opts: ["Nonna", "Abuela", "Oma", "Babushka"], a: 0, feedback: ["La Nonna sa tutti i segreti!", "No, solo la Nonna fa la pasta migliore!"]}
  },
  // 12
  {
    en: {q: "What is the correct way to drink coffee in Italy?", opts: ["Standing at the bar", "With pineapple", "With ketchup", "In a big paper cup"], a: 0, feedback: ["Bravo! Real Italians drink coffee standing.", "Nooo, only at the bar is correct!"]},
    it: {q: "Qual è il modo giusto di bere il caffè in Italia?", opts: ["In piedi al bancone", "Con l'ananas", "Con il ketchup", "In un bicchierone di carta"], a: 0, feedback: ["Bravo! I veri italiani bevono il caffè in piedi.", "No, solo al bancone è giusto!"]}
  },
  // 13
  {
    en: {q: "What is the best pasta shape for brainrot?", opts: ["Spaghetti", "Penne", "Farfalle", "Macaroni"], a: 0, feedback: ["Spaghetti = brainrot unlocked!", "Nooo, spaghetti is the brainrot king!"]},
    it: {q: "Qual è il formato di pasta migliore per il brainrot?", opts: ["Spaghetti", "Penne", "Farfalle", "Maccheroni"], a: 0, feedback: ["Spaghetti = brainrot al massimo!", "No, gli spaghetti sono i re del brainrot!"]}
  },
  // 14
  {
    en: {q: "What do Italians shout at football matches?", opts: ["Forza!", "Touchdown!", "Goalazo!", "Home run!"], a: 0, feedback: ["Forza! is the only right answer!", "Nooo, only 'Forza!' is Italian!"]},
    it: {q: "Cosa urlano gli italiani alle partite di calcio?", opts: ["Forza!", "Touchdown!", "Goalazo!", "Home run!"], a: 0, feedback: ["Forza! è l'unica risposta giusta!", "No, solo 'Forza!' è italiano!"]}
  },
  // 15
  {
    en: {q: "Which Italian city is famous for its Carnival masks?", opts: ["Venice", "Rome", "Milan", "Naples"], a: 0, feedback: ["Correct! Venice = mask party!", "Nope, only Venice throws the real mask party!"]},
    it: {q: "Quale città italiana è famosa per le maschere di Carnevale?", opts: ["Venezia", "Roma", "Milano", "Napoli"], a: 0, feedback: ["Corretto! Venezia = festa in maschera!", "No, solo Venezia fa il vero Carnevale!"]}
  },
  // ...（继续插入批量生成的题目，直到100道）...
];

// 自动补齐到100道题
while (allQuestions.length < 100) {
  const n = allQuestions.length + 1;
  allQuestions.push({
    en: {
      q: `Which of these is the most Italian brainrot thing?`,
      opts: [
        `Eating pizza with ${getRandom(['pineapple','Nutella','spaghetti','mozzarella'])}`,
        `Saying "Mamma mia!" every 5 minutes`,
        `Wearing sunglasses indoors`,
        `Sending only 🤌 in group chats`
      ],
      a: Math.floor(Math.random()*4),
      feedback: [
        `Classic brainrot! Only true Italians understand.`,
        `Nooo, that's not peak brainrot! Try again!`
      ]
    },
    it: {
      q: `Qual è la cosa più brainrot italiana?`,
      opts: [
        `Mangiare la pizza con ${getRandom(['ananas','Nutella','spaghetti','mozzarella'])}`,
        `Dire "Mamma mia!" ogni 5 minuti`,
        `Indossare gli occhiali da sole al chiuso`,
        `Mandare solo 🤌 nelle chat di gruppo`
      ],
      a: Math.floor(Math.random()*4),
      feedback: [
        `Brainrot puro! Solo i veri italiani capiscono.`,
        `No, non è vero brainrot! Riprova!`
      ]
    }
  });
}

// 洗牌函数
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 每次随机抽取10题
const questions = shuffle([...allQuestions]).slice(0, 10);

let current = 0;
let score = 0;
let lang = 'en';

function renderQuestion() {
  lang = langEnBtn.classList.contains('active') ? 'en' : 'it';
  const q = questions[current][lang];
  const container = document.getElementById('quiz-container');
  container.innerHTML = `<div class="quiz-q">${q.q}</div>` +
    q.opts.map((opt, i) => `<button class="quiz-opt" data-idx="${i}">${opt}</button>`).join('');
  document.getElementById('next-question-btn').style.display = 'none';
  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.onclick = function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      const correct = idx === q.a;
      if (correct) score++;
      this.classList.add(correct ? 'correct' : 'wrong');
      this.style.background = correct ? '#008C45' : '#CD212A';
      this.style.color = '#fff';
      this.style.fontWeight = 'bold';
      document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
      const feedback = correct ? q.feedback[0] : q.feedback[1];
      container.innerHTML += `<div class="quiz-feedback" style="margin-top:16px;font-size:1.1rem;">${feedback}</div>`;
      if (current < questions.length-1) {
        setTimeout(() => {
          current++;
          renderQuestion();
        }, 1000);
      } else {
        setTimeout(showScore, 1000);
      }
    };
  });
}

function showScore() {
  const scoreBox = document.getElementById('score');
  lang = langEnBtn.classList.contains('active') ? 'en' : 'it';
  const total = questions.length;
  const percent = Math.round(score / total * 100);
  let title = '', msg = '';
  if (lang === 'en') {
    if (percent === 100) { title = 'Pasta Pope'; msg = 'You are a true Italian meme god!'; }
    else if (percent >= 80) { title = 'Macaroni Master'; msg = 'Amazing! You know your memes!'; }
    else if (percent >= 60) { title = 'Pizza Pro'; msg = 'Not bad! But you need more brainrot.'; }
    else if (percent >= 40) { title = 'Pasta Apprentice'; msg = 'Keep going! More pizza and memes needed!'; }
    else { title = 'Pizza Newbie'; msg = 'You need more pizza and memes!'; }
    scoreBox.innerHTML = `<div style='font-size:1.3rem;margin-top:18px;'>You are <b>${percent}% brainrotted!</b><br>Result: <b>${title}</b><br><span style='font-size:1.1rem;'>${msg}</span></div>`;
  } else {
    if (percent === 100) { title = 'Papa della Pasta'; msg = 'Sei un vero dio dei meme italiani!'; }
    else if (percent >= 80) { title = 'Maestro dei Maccheroni'; msg = 'Fantastico! Conosci bene i meme!'; }
    else if (percent >= 60) { title = 'Pro della Pizza'; msg = 'Niente male! Ma ti serve più brainrot.'; }
    else if (percent >= 40) { title = 'Apprendista della Pasta'; msg = 'Continua così! Hai bisogno di più pizza e meme!'; }
    else { title = 'Novizio della Pizza'; msg = 'Hai bisogno di più pizza e meme!'; }
    scoreBox.innerHTML = `<div style='font-size:1.3rem;margin-top:18px;'>Sei contaminato dal brainrot italiano al <b>${percent}%</b>!<br>Risultato: <b>${title}</b><br><span style='font-size:1.1rem;'>${msg}</span></div>`;
  }

  // --- 生成更美观的意大利梗味卡片 ---
  let oldCard = document.getElementById('share-card');
  if (oldCard) oldCard.remove();
  let oldBtns = document.getElementById('share-btns');
  if (oldBtns) oldBtns.remove();

  // 梗味slogan
  const slogans = [
    lang==='en' ? 'Mamma mia! Pure meme energy!' : 'Mamma mia! Energia meme pura!',
    lang==='en' ? 'Powered by pizza, pasta & memes!' : 'A base di pizza, pasta e meme!',
    lang==='en' ? 'Forza! You are a meme legend!' : 'Forza! Sei una leggenda dei meme!',
    lang==='en' ? 'Mozzarella in the veins.' : 'Mozzarella nelle vene.',
    lang==='en' ? 'Viva la pasta, viva i meme!' : 'Viva la pasta, viva i meme!',
    lang==='en' ? 'Spaghetti code, meme soul.' : 'Codice spaghetti, anima meme.',
    lang==='en' ? 'Brainrot certified by Nonna.' : 'Brainrot certificato dalla Nonna.',
    lang==='en' ? 'Pizza, pasta, brainrot, basta!' : 'Pizza, pasta, brainrot, basta!',
    lang==='en' ? 'Coded with amore.' : 'Creato con amore.'
  ];
  const slogan = slogans[Math.floor(Math.random()*slogans.length)];

  // 计算卡片主色调（分数高亮，分数低暗）
  let bgColor1 = '#fffbe7', bgColor2 = '#f4f5f0';
  if (percent >= 80) { bgColor1 = '#fffde0'; bgColor2 = '#eaffd0'; }
  else if (percent >= 60) { bgColor1 = '#f7f7e7'; bgColor2 = '#e0f7fa'; }
  else if (percent >= 40) { bgColor1 = '#f7f7f7'; bgColor2 = '#e0e0e0'; }
  else { bgColor1 = '#f0f0f0'; bgColor2 = '#d0d0d0'; }

  // 创建canvas
  const canvas = document.createElement('canvas');
  canvas.width = 700;
  canvas.height = 500;
  canvas.id = 'share-card';
  const ctx = canvas.getContext('2d');
  // 梗图风格卡片背景渐变+阴影
  ctx.save();
  ctx.shadowColor = percent >= 60 ? '#6c63ff' : '#888';
  ctx.shadowBlur = 32;
  const grad = ctx.createLinearGradient(0,0,700,500);
  grad.addColorStop(0,bgColor1);
  grad.addColorStop(1,bgColor2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  // 旗帜条
  const flagTop = 80, flagBot = 420, flagLeft = 48, flagW = 14, flagGap = 5;
  ctx.save();
  ctx.globalAlpha = 0.92;
  ctx.fillStyle = '#008C45'; ctx.fillRect(flagLeft,flagTop,flagW,flagBot-flagTop);
  ctx.fillStyle = '#F4F5F0'; ctx.fillRect(flagLeft+flagW+flagGap,flagTop,flagW,flagBot-flagTop);
  ctx.fillStyle = '#CD212A'; ctx.fillRect(flagLeft+2*(flagW+flagGap),flagTop,flagW,flagBot-flagTop);
  ctx.restore();
  // 卡片主框（圆角+阴影）
  ctx.save();
  ctx.shadowColor = percent >= 60 ? '#6c63ff' : '#aaa';
  ctx.shadowBlur = 18;
  ctx.strokeStyle = percent >= 60 ? '#6c63ff' : '#aaa';
  ctx.lineWidth = 3;
  roundRect(ctx, 120, 60, 480, 380, 32);
  ctx.stroke();
  ctx.restore();
  // 主内容分区
  let y = 110;
  // 梗图主标题
  ctx.save();
  ctx.font = 'bold 2.6rem Permanent Marker, Impact, Arial';
  ctx.textAlign = 'center';
  const titleText = (lang==='en'?'Italian Brainrot Quiz Result':'Risultato Quiz Brainrot') + ' 🍝';
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#fff';
  ctx.shadowColor = '#CD212A';
  ctx.shadowBlur = 12;
  ctx.rotate((Math.random()-0.5)*0.08);
  ctx.strokeText(titleText, 350, y);
  ctx.fillStyle = '#CD212A';
  ctx.fillText(titleText, 350, y);
  ctx.restore();
  y += 60;
  // 梗图分数大字
  ctx.save();
  ctx.font = 'bold 2.7rem Impact, Arial Black, Arial';
  ctx.lineWidth = 7;
  ctx.strokeStyle = '#fff';
  ctx.shadowColor = '#00e676';
  ctx.shadowBlur = 10;
  ctx.rotate((Math.random()-0.5)*0.08);
  ctx.strokeText((lang==='en'?'Brainrotted: ':'Brainrottato: ') + percent + '%', 350, y);
  ctx.fillStyle = percent >= 80 ? '#00e676' : (percent >= 60 ? '#4f46e5' : (percent >= 40 ? '#FFA500' : '#888'));
  ctx.fillText((lang==='en'?'Brainrotted: ':'Brainrottato: ') + percent + '%', 350, y);
  ctx.restore();
  y += 54;
  // 梗图称号极显眼
  ctx.save();
  ctx.font = 'bold 2.5rem Impact, Arial Black, Arial';
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#000';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 18;
  ctx.rotate((Math.random()-0.5)*0.08);
  ctx.strokeText(title + ' 🍕', 350, y);
  ctx.fillStyle = '#FFD700';
  ctx.fillText(title + ' 🍕', 350, y);
  ctx.restore();
  y += 54;
  // 梗文案自动换行
  ctx.font = '1.25rem Roboto, Arial';
  ctx.fillStyle = '#333';
  wrapText(ctx, msg, 350, y, 400, 30);
  y += 44;
  // emoji装饰行更大更突出
  ctx.save();
  ctx.font = '3.7rem Arial';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 28;
  ctx.fillText('🍕🤌🇮🇹', 350, y);
  ctx.restore();
  y += 54;
  // 梗味slogan自动换行
  ctx.font = 'italic 1.15rem Roboto, Arial';
  ctx.fillStyle = '#CD212A';
  wrapText(ctx, slogan, 350, y, 400, 26);
  y += 32;
  // 网站
  ctx.font = '1.15rem Roboto, Arial';
  ctx.fillStyle = '#888';
  ctx.textAlign = 'center';
  ctx.fillText('italianbrainrot.today', 350, y);
  ctx.beginPath();
  ctx.moveTo(250, y+4);
  ctx.lineTo(450, y+4);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  // 显示canvas
  scoreBox.appendChild(canvas);

  // --- 只保留下载按钮 ---
  const btnBox = document.createElement('div');
  btnBox.id = 'share-btns';
  btnBox.style.marginTop = '18px';
  btnBox.style.display = 'flex';
  btnBox.style.justifyContent = 'center';
  btnBox.style.gap = '18px';
  // 下载按钮
  const dlBtn = document.createElement('button');
  dlBtn.textContent = lang==='en'?'Download Card':'Scarica la Card';
  dlBtn.className = 'create-btn';
  dlBtn.onclick = function() {
    const link = document.createElement('a');
    link.download = 'brainrot-quiz-result.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  btnBox.appendChild(dlBtn);
  scoreBox.appendChild(btnBox);
}

// 圆角矩形辅助函数
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
}

// 自动换行辅助函数
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

document.getElementById('next-question-btn').onclick = function() {
  current++;
  renderQuestion();
};

// 页面加载自动渲染第一题
renderQuestion();

// 页面加载时初始化footer，默认不随机
setFooterLang(savedLang, false); 