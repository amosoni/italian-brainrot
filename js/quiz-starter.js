// Italian Brainrot Quiz - 测验启动器
import { utils, languages, sharedData } from '../common.js';

class QuizStarter {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.elements = this.initializeElements();
    this.bindEvents();
    this.initializeLanguage();
    this.showStartScreen();
  }

  initializeElements() {
    return {
      mainTitle: document.getElementById('main-title'),
      mainDesc: document.getElementById('main-desc'),
      navLinks: document.querySelectorAll('.main-nav a'),
      langEnBtn: document.getElementById('lang-en'),
      langItBtn: document.getElementById('lang-it'),
      quizContainer: document.getElementById('quiz-container'),
      scoreDisplay: document.getElementById('score'),
      nextButton: document.getElementById('next-question-btn'),
      buttons: {
        next: document.getElementById('next-question-btn')
      }
    };
  }

  bindEvents() {
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
      pageType: 'quiz'
    });
    
    // 设置Footer语言
    utils.setFooterLanguage(lang, true);
    
    // 更新语言按钮状态
    this.updateLanguageButtons(lang);
    
    // 重新显示启动界面
    this.showStartScreen();
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

  showStartScreen() {
    const startHTML = `
      <div class="quiz-start-screen">
        <div class="quiz-intro" style="margin-bottom: 32px;">
          <div style="font-size: 4rem; margin-bottom: 16px;">🧠</div>
          <h3 style="color: #CD212A; margin-bottom: 16px; font-family: 'Permanent Marker', cursive; font-size: 1.5rem;">
            ${this.currentLang === 'it' ? 'Benvenuto al Quiz Brainrot Italiano!' : 'Welcome to the Italian Brainrot Quiz!'}
          </h3>
          <p style="color: #666; line-height: 1.6; margin-bottom: 24px;">
            ${this.currentLang === 'it' 
              ? 'Metti alla prova la tua conoscenza dei meme italiani! Scegli la risposta giusta e scopri quanto sei brainrottato.' 
              : 'Test your Italian meme knowledge! Choose the right answer and see how much brainrot you have.'}
          </p>
        </div>
        
        <div class="quiz-options" style="margin-bottom: 32px;">
          <div class="quiz-option" data-difficulty="easy" style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 2px solid #e0e0e0; cursor: pointer; transition: all 0.3s ease;">
            <h4 style="color: #008C45; margin-bottom: 8px;">🍕 ${this.currentLang === 'it' ? 'Principiante' : 'Beginner'}</h4>
            <p style="color: #666; font-size: 14px; margin: 0;">
              ${this.currentLang === 'it' 
                ? '5 domande semplici per iniziare' 
                : '5 simple questions to get started'}
            </p>
          </div>
          
          <div class="quiz-option" data-difficulty="medium" style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 2px solid #e0e0e0; cursor: pointer; transition: all 0.3s ease;">
            <h4 style="color: #CD212A; margin-bottom: 8px;">🤌 ${this.currentLang === 'it' ? 'Intermedio' : 'Intermediate'}</h4>
            <p style="color: #666; font-size: 14px; margin: 0;">
              ${this.currentLang === 'it' 
                ? '10 domande per testare la tua conoscenza' 
                : '10 questions to test your knowledge'}
            </p>
          </div>
          
          <div class="quiz-option" data-difficulty="hard" style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 16px; border: 2px solid #e0e0e0; cursor: pointer; transition: all 0.3s ease;">
            <h4 style="color: #FFD700; margin-bottom: 8px;">👑 ${this.currentLang === 'it' ? 'Esperto' : 'Expert'}</h4>
            <p style="color: #666; font-size: 14px; margin: 0;">
              ${this.currentLang === 'it' 
                ? '15 domande difficili per i veri esperti' 
                : '15 challenging questions for true experts'}
            </p>
          </div>
        </div>
        
        <div class="quiz-info" style="background: #e8f5e8; padding: 16px; border-radius: 8px; border-left: 4px solid #22bb33;">
          <p style="margin: 0; color: #155724; font-size: 14px;">
            <strong>💡 ${this.currentLang === 'it' ? 'Suggerimento:' : 'Tip:'}</strong> 
            ${this.currentLang === 'it' 
              ? 'Ogni domanda ha una sola risposta corretta. Buona fortuna!' 
              : 'Each question has only one correct answer. Good luck!'}
          </p>
        </div>
      </div>
    `;

    this.elements.quizContainer.innerHTML = startHTML;
    
    // 添加悬停效果
    this.addHoverEffects();
    
    // 绑定开始测验事件
    this.bindStartQuizEvents();
  }

  addHoverEffects() {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
      option.addEventListener('mouseenter', () => {
        option.style.transform = 'translateY(-2px)';
        option.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        option.style.borderColor = '#008C45';
      });
      
      option.addEventListener('mouseleave', () => {
        option.style.transform = 'translateY(0)';
        option.style.boxShadow = 'none';
        option.style.borderColor = '#e0e0e0';
      });
    });
  }

  bindStartQuizEvents() {
    // 为每个难度选项添加点击事件
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
      option.addEventListener('click', () => {
        const difficulty = option.dataset.difficulty;
        this.startQuiz(difficulty);
      });
    });
  }

  startQuiz(difficulty) {
    // 隐藏启动界面
    this.elements.quizContainer.innerHTML = '';
    
    // 根据难度设置问题数量
    const questionCount = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
    
    // 创建测验实例
    const quiz = new QuizRunner(this.currentLang, questionCount, difficulty);
    quiz.start();
  }
}

// 测验运行器类
class QuizRunner {
  constructor(lang, questionCount, difficulty) {
    this.currentLang = lang;
    this.questionCount = questionCount;
    this.difficulty = difficulty;
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = this.generateQuestions();
    this.elements = this.initializeElements();
    this.renderQuestion();
  }

  initializeElements() {
    return {
      quizContainer: document.getElementById('quiz-container'),
      scoreDisplay: document.getElementById('score'),
      nextButton: document.getElementById('next-question-btn')
    };
  }

  generateQuestions() {
    // 生成测验问题
    const allQuestions = this.getQuestionBank();
    const shuffled = this.shuffleArray(allQuestions);
    return shuffled.slice(0, this.questionCount);
  }

  getQuestionBank() {
    return [
      {
        en: {
          q: "What do Italians say when something is amazing?",
          opts: ["Mamma mia!", "Wow!", "Bravo!", "Awesome!"],
          a: 0,
          feedback: ["Perfetto! You are a true meme connoisseur!", "Nooo, only 'Mamma mia!' is the real deal!"]
        },
        it: {
          q: "Cosa dicono gli italiani quando qualcosa è fantastico?",
          opts: ["Mamma mia!", "Opa!", "Bravo!", "Kawaii!"],
          a: 0,
          feedback: ["Perfetto! Sei un vero intenditore di meme!", "Nooo, solo 'Mamma mia!' è quella giusta!"]
        }
      },
      {
        en: {
          q: "Which Italian food is most associated with memes?",
          opts: ["Pizza", "Sushi", "Tacos", "Burgers"],
          a: 0,
          feedback: ["Eccellente! Pizza is the heart of Italian memes!", "Nooo, it's all about the pizza! 🍕"]
        },
        it: {
          q: "Quale cibo italiano è più associato ai meme?",
          opts: ["Pizza", "Sushi", "Tacos", "Hamburger"],
          a: 0,
          feedback: ["Eccellente! La pizza è il cuore dei meme italiani!", "Nooo, si tratta tutto della pizza! 🍕"]
        }
      },
      {
        en: {
          q: "What's the classic Italian hand gesture?",
          opts: ["🤌", "👍", "👌", "✌️"],
          a: 0,
          feedback: ["Perfetto! 🤌 is the iconic Italian gesture!", "Nooo, 🤌 is the real Italian way!"]
        },
        it: {
          q: "Qual è il gesto classico italiano?",
          opts: ["🤌", "👍", "👌", "✌️"],
          a: 0,
          feedback: ["Perfetto! 🤌 è il gesto iconico italiano!", "Nooo, 🤌 è il vero modo italiano!"]
        }
      },
      {
        en: {
          q: "What do Italians say when they're excited?",
          opts: ["Bellissimo!", "Cool!", "Nice!", "Great!"],
          a: 0,
          feedback: ["Fantastico! Bellissimo is pure Italian excitement!", "Nooo, Bellissimo is the Italian way!"]
        },
        it: {
          q: "Cosa dicono gli italiani quando sono entusiasti?",
          opts: ["Bellissimo!", "Figo!", "Bello!", "Grande!"],
          a: 0,
          feedback: ["Fantastico! Bellissimo è puro entusiasmo italiano!", "Nooo, Bellissimo è il modo italiano!"]
        }
      },
      {
        en: {
          q: "Which Italian city is famous for art?",
          opts: ["Firenze", "Tokyo", "Paris", "London"],
          a: 0,
          feedback: ["Perfetto! Firenze is the art capital!", "Nooo, Firenze is the Italian art city!"]
        },
        it: {
          q: "Quale città italiana è famosa per l'arte?",
          opts: ["Firenze", "Tokyo", "Parigi", "Londra"],
          a: 0,
          feedback: ["Perfetto! Firenze è la capitale dell'arte!", "Nooo, Firenze è la città dell'arte italiana!"]
        }
      }
    ];
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  start() {
    this.renderQuestion();
  }

  renderQuestion() {
    if (this.currentQuestion >= this.questions.length) {
      this.showFinalScore();
      return;
    }

    const question = this.questions[this.currentQuestion];
    const langData = question[this.currentLang] || question.en;
    
    const questionHTML = `
      <div class="quiz-q">
        <h2 style="color: #CD212A; margin-bottom: 20px; font-family: 'Permanent Marker', cursive; font-size: 1.5rem;">${langData.q}</h2>
        <div class="quiz-options" style="display: grid; gap: 16px; margin-bottom: 24px;">
          ${langData.opts.map((opt, index) => `
            <button class="quiz-opt" data-index="${index}" style="background: #f8f9fa; padding: 16px; border: 2px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: all 0.3s ease; text-align: left; font-size: 16px;">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" style="display: none; margin-top: 20px;"></div>
      </div>
    `;

    this.elements.quizContainer.innerHTML = questionHTML;
    this.updateScoreDisplay();
    
    // 为新创建的选项按钮添加事件监听器
    this.bindQuestionEvents();
  }

  selectAnswer(selectedIndex) {
    const question = this.questions[this.currentQuestion];
    const langData = question[this.currentLang] || question.en;
    const correctAnswer = langData.a;
    const isCorrect = selectedIndex === correctAnswer;

    // 禁用所有选项按钮
    const optionButtons = document.querySelectorAll('.quiz-opt');
    optionButtons.forEach(button => {
      button.disabled = true;
      if (parseInt(button.dataset.index) === correctAnswer) {
        button.style.background = '#e8f5e8';
        button.style.borderColor = '#22bb33';
        button.style.color = '#155724';
      } else if (parseInt(button.dataset.index) === selectedIndex && !isCorrect) {
        button.style.background = '#f8d7da';
        button.style.borderColor = '#CD212A';
        button.style.color = '#721c24';
      }
    });

    // 显示反馈
    const feedbackDiv = document.querySelector('.quiz-feedback');
    const feedbackText = isCorrect ? langData.feedback[0] : langData.feedback[1];
    feedbackDiv.innerHTML = `<p style="color: ${isCorrect ? '#22bb33' : '#CD212A'}; font-weight: bold; font-size: 18px;">${feedbackText}</p>`;
    feedbackDiv.style.display = 'block';

    // 更新分数
    if (isCorrect) {
      this.score++;
    }

    // 显示下一题按钮
    if (this.elements.nextButton) {
      this.elements.nextButton.style.display = 'inline-block';
      this.elements.nextButton.onclick = () => this.nextQuestion();
    }
  }

  bindQuestionEvents() {
    const optionButtons = document.querySelectorAll('.quiz-opt');
    optionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedIndex = parseInt(button.dataset.index);
        this.selectAnswer(selectedIndex);
      });
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    this.renderQuestion();
  }

  updateScoreDisplay() {
    if (this.elements.scoreDisplay) {
      const scoreText = this.currentLang === 'it' 
        ? `Punteggio: ${this.score}/${this.questions.length}`
        : `Score: ${this.score}/${this.questions.length}`;
      this.elements.scoreDisplay.innerHTML = scoreText;
    }
  }

  showFinalScore() {
    const finalScoreHTML = `
      <div class="final-score">
        <h2>${this.currentLang === 'it' ? 'Quiz Completato!' : 'Quiz Complete!'}</h2>
        <p>${this.currentLang === 'it' ? 'Il tuo punteggio finale:' : 'Your final score:'}</p>
        <h1>${this.score}/${this.questions.length}</h1>
        <p>${this.getScoreMessage()}</p>
        <button onclick="location.reload()" class="create-btn">
          ${this.currentLang === 'it' ? 'Riprova Quiz' : 'Try Quiz Again'}
        </button>
      </div>
    `;

    this.elements.quizContainer.innerHTML = finalScoreHTML;
    
    // 隐藏分数显示和下一题按钮
    if (this.elements.scoreDisplay) this.elements.scoreDisplay.innerHTML = '';
    if (this.elements.nextButton) this.elements.nextButton.style.display = 'none';
  }

  getScoreMessage() {
    const percentage = (this.score / this.questions.length) * 100;
    
    if (this.currentLang === 'it') {
      if (percentage >= 90) return "Perfetto! Sei un vero esperto di meme italiani! 🇮🇹";
      if (percentage >= 70) return "Molto bene! Hai una buona conoscenza dei meme italiani! 🍕";
      if (percentage >= 50) return "Non male! Continua a imparare sui meme italiani! 🤌";
      return "Continua a studiare! I meme italiani ti aspettano! 📚";
    } else {
      if (percentage >= 90) return "Perfect! You are a true Italian meme expert! 🇮🇹";
      if (percentage >= 70) return "Very good! You have good knowledge of Italian memes! 🍕";
      if (percentage >= 50) return "Not bad! Keep learning about Italian memes! 🤌";
      return "Keep studying! Italian memes are waiting for you! 📚";
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new QuizStarter();
});

export default QuizStarter; 