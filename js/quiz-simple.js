// Italian Brainrot Quiz - 简化版本
// 确保基本功能正常工作

class SimpleQuiz {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.init();
  }

  init() {
    console.log('SimpleQuiz initialized');
    this.setupLanguage();
    this.showQuizStart();
  }

  setupLanguage() {
    // 设置语言按钮
    const langEnBtn = document.getElementById('lang-en');
    const langItBtn = document.getElementById('lang-it');
    
    if (langEnBtn && langItBtn) {
      langEnBtn.addEventListener('click', () => this.switchLanguage('en'));
      langItBtn.addEventListener('click', () => this.switchLanguage('it'));
      
      // 设置当前语言状态
      if (this.currentLang === 'it') {
        langItBtn.classList.add('active');
        langEnBtn.classList.remove('active');
      } else {
        langEnBtn.classList.add('active');
        langItBtn.classList.remove('active');
      }
    }
  }

  switchLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    this.showQuizStart();
  }

  showQuizStart() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) {
      console.error('Quiz container not found');
      return;
    }

    const startHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 4rem; margin-bottom: 20px;">🧠</div>
        <h2 style="color: #CD212A; margin-bottom: 20px; font-family: 'Permanent Marker', cursive;">
          ${this.currentLang === 'it' ? 'Benvenuto al Quiz!' : 'Welcome to the Quiz!'}
        </h2>
        <p style="color: #666; margin-bottom: 30px; font-size: 18px;">
          ${this.currentLang === 'it' 
            ? 'Scegli la difficoltà e inizia il quiz!' 
            : 'Choose difficulty and start the quiz!'}
        </p>
        
        <div style="display: grid; gap: 20px; max-width: 400px; margin: 0 auto;">
          <button onclick="window.simpleQuiz.startQuiz('easy')" style="background: #008C45; color: white; padding: 20px; border: none; border-radius: 12px; font-size: 18px; cursor: pointer; transition: all 0.3s ease;">
            🍕 ${this.currentLang === 'it' ? 'Principiante (5 domande)' : 'Beginner (5 questions)'}
          </button>
          
          <button onclick="window.simpleQuiz.startQuiz('medium')" style="background: #CD212A; color: white; padding: 20px; border: none; border-radius: 12px; font-size: 18px; cursor: pointer; transition: all 0.3s ease;">
            🤌 ${this.currentLang === 'it' ? 'Intermedio (10 domande)' : 'Intermediate (10 questions)'}
          </button>
          
          <button onclick="window.simpleQuiz.startQuiz('hard')" style="background: #FFD700; color: #333; padding: 20px; border: none; border-radius: 12px; font-size: 18px; cursor: pointer; transition: all 0.3s ease;">
            👑 ${this.currentLang === 'it' ? 'Esperto (15 domande)' : 'Expert (15 questions)'}
          </button>
        </div>
      </div>
    `;

    quizContainer.innerHTML = startHTML;
  }

  startQuiz(difficulty) {
    console.log('Starting quiz with difficulty:', difficulty);
    
    const questionCount = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;
    this.runQuiz(questionCount);
  }

  runQuiz(questionCount) {
    const quizContainer = document.getElementById('quiz-container');
    const questions = this.getQuestions().slice(0, questionCount);
    let currentQuestion = 0;
    let score = 0;

    const showQuestion = () => {
      if (currentQuestion >= questions.length) {
        this.showFinalScore(score, questions.length);
        return;
      }

      const question = questions[currentQuestion];
      const langData = question[this.currentLang] || question.en;
      
      const questionHTML = `
        <div style="text-align: center; padding: 20px;">
          <h2 style="color: #CD212A; margin-bottom: 30px; font-family: 'Permanent Marker', cursive;">
            ${langData.q}
          </h2>
          
          <div style="display: grid; gap: 15px; max-width: 500px; margin: 0 auto 30px auto;">
            ${langData.opts.map((opt, index) => `
              <button onclick="window.simpleQuiz.selectAnswer(${index}, ${currentQuestion}, ${score}, ${questions.length})" 
                      style="background: #f8f9fa; padding: 20px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; cursor: pointer; transition: all 0.3s ease; text-align: left;">
                ${opt}
              </button>
            `).join('')}
          </div>
          
          <div style="color: #666; font-size: 16px;">
            ${this.currentLang === 'it' ? 'Domanda' : 'Question'} ${currentQuestion + 1} / ${questions.length}
          </div>
        </div>
      `;

      quizContainer.innerHTML = questionHTML;
    };

    showQuestion();
  }

  selectAnswer(selectedIndex, currentQuestion, currentScore, totalQuestions) {
    const questions = this.getQuestions();
    const question = questions[currentQuestion];
    const langData = question[this.currentLang] || question.en;
    const correctAnswer = langData.a;
    const isCorrect = selectedIndex === correctAnswer;
    
    let newScore = currentScore;
    if (isCorrect) {
      newScore++;
    }

    // 显示反馈
    const feedbackHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 3rem; margin-bottom: 20px;">
          ${isCorrect ? '✅' : '❌'}
        </div>
        
        <h3 style="color: ${isCorrect ? '#22bb33' : '#CD212A'}; margin-bottom: 20px;">
          ${isCorrect ? langData.feedback[0] : langData.feedback[1]}
        </h3>
        
        <p style="color: #666; margin-bottom: 30px;">
          ${this.currentLang === 'it' ? 'Punteggio attuale:' : 'Current score:'} ${newScore}/${totalQuestions}
        </p>
        
        <button onclick="window.simpleQuiz.nextQuestion(${currentQuestion + 1}, ${newScore}, ${totalQuestions})" 
                style="background: #008C45; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
          ${this.currentLang === 'it' ? 'Prossima Domanda' : 'Next Question'} →
        </button>
      </div>
    `;

    document.getElementById('quiz-container').innerHTML = feedbackHTML;
  }

  nextQuestion(currentQuestion, currentScore, totalQuestions) {
    const questions = this.getQuestions();
    
    if (currentQuestion >= totalQuestions) {
      this.showFinalScore(currentScore, totalQuestions);
      return;
    }

    this.runQuiz(totalQuestions);
  }

  showFinalScore(score, totalQuestions) {
    const percentage = (score / totalQuestions) * 100;
    let message = '';
    
    if (this.currentLang === 'it') {
      if (percentage >= 90) message = "Perfetto! Sei un vero esperto! 🇮🇹";
      else if (percentage >= 70) message = "Molto bene! Hai una buona conoscenza! 🍕";
      else if (percentage >= 50) message = "Non male! Continua a imparare! 🤌";
      else message = "Continua a studiare! 📚";
    } else {
      if (percentage >= 90) message = "Perfect! You are a true expert! 🇮🇹";
      else if (percentage >= 70) message = "Very good! You have good knowledge! 🍕";
      else if (percentage >= 50) message = "Not bad! Keep learning! 🤌";
      else message = "Keep studying! 📚";
    }

    const finalHTML = `
      <div style="text-align: center; padding: 40px;">
        <h2 style="color: #CD212A; margin-bottom: 20px; font-family: 'Permanent Marker', cursive;">
          ${this.currentLang === 'it' ? 'Quiz Completato!' : 'Quiz Complete!'}
        </h2>
        
        <div style="font-size: 4rem; margin-bottom: 20px;">🎉</div>
        
        <h1 style="font-size: 3rem; color: #008C45; margin-bottom: 20px;">
          ${score}/${totalQuestions}
        </h1>
        
        <p style="color: #666; font-size: 18px; margin-bottom: 30px;">
          ${message}
        </p>
        
        <button onclick="location.reload()" 
                style="background: #CD212A; color: white; padding: 15px 30px; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
          ${this.currentLang === 'it' ? 'Riprova Quiz' : 'Try Quiz Again'}
        </button>
      </div>
    `;

    document.getElementById('quiz-container').innerHTML = finalHTML;
  }

  getQuestions() {
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
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing SimpleQuiz');
  window.simpleQuiz = new SimpleQuiz();
});

export default SimpleQuiz; 