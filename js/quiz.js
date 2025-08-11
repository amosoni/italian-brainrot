// Italian Brainrot Quiz - 重构版本
import { utils, languages, sharedData } from './common.js';

class BrainrotQuiz {
  constructor() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = this.initializeQuestions();
    this.elements = this.initializeElements();
    this.bindEvents();
    this.initializeLanguage();
    this.renderQuestion();
  }

  initializeElements() {
    return {
      mainTitle: document.getElementById('main-title'),
      mainDesc: document.getElementById('main-desc'),
      navLinks: document.querySelectorAll('.main-nav a'),
      langEnBtn: document.getElementById('lang-en'),
      langItBtn: document.getElementById('lang-it'),
      questionContainer: document.getElementById('question-container'),
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

    // 下一题按钮事件
    if (this.elements.nextButton) {
      this.elements.nextButton.addEventListener('click', () => {
        this.nextQuestion();
      });
    }
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
    
    // 重新渲染当前问题
    this.renderQuestion();
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

  initializeQuestions() {
    // 题库扩展为100道，每次随机抽取10题
    const allQuestions = [
      // 1
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
      // 2
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
      // 3
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
      // 4
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
      // 5
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
      },
      // 6
      {
        en: {
          q: "What's the Italian word for 'beautiful'?",
          opts: ["Bella", "Beautiful", "Bonita", "Jolie"],
          a: 0,
          feedback: ["Eccellente! Bella is pure Italian beauty!", "Nooo, Bella is the Italian way!"]
        },
        it: {
          q: "Qual è la parola italiana per 'bella'?",
          opts: ["Bella", "Beautiful", "Bonita", "Jolie"],
          a: 0,
          feedback: ["Eccellente! Bella è pura bellezza italiana!", "Nooo, Bella è il modo italiano!"]
        }
      },
      // 7
      {
        en: {
          q: "Which Italian drink is famous worldwide?",
          opts: ["Espresso", "Tea", "Coffee", "Juice"],
          a: 0,
          feedback: ["Perfetto! Espresso is Italian coffee culture!", "Nooo, Espresso is the Italian way!"]
        },
        it: {
          q: "Quale bevanda italiana è famosa nel mondo?",
          opts: ["Espresso", "Tè", "Caffè", "Succo"],
          a: 0,
          feedback: ["Perfetto! L'Espresso è la cultura del caffè italiana!", "Nooo, l'Espresso è il modo italiano!"]
        }
      },
      // 8
      {
        en: {
          q: "What do Italians say when they're surprised?",
          opts: ["Che cosa!", "What!", "Wow!", "Oh!"],
          a: 0,
          feedback: ["Fantastico! Che cosa is pure Italian surprise!", "Nooo, Che cosa is the Italian way!"]
        },
        it: {
          q: "Cosa dicono gli italiani quando sono sorpresi?",
          opts: ["Che cosa!", "Cosa!", "Wow!", "Oh!"],
          a: 0,
          feedback: ["Fantastico! Che cosa è pura sorpresa italiana!", "Nooo, Che cosa è il modo italiano!"]
        }
      },
      // 9
      {
        en: {
          q: "Which Italian pasta is most popular?",
          opts: ["Spaghetti", "Ramen", "Noodles", "Pasta"],
          a: 0,
          feedback: ["Perfetto! Spaghetti is the Italian classic!", "Nooo, Spaghetti is the Italian way!"]
        },
        it: {
          q: "Quale pasta italiana è più popolare?",
          opts: ["Spaghetti", "Ramen", "Noodles", "Pasta"],
          a: 0,
          feedback: ["Perfetto! Gli Spaghetti sono il classico italiano!", "Nooo, gli Spaghetti sono il modo italiano!"]
        }
      },
      // 10
      {
        en: {
          q: "What's the Italian word for 'hello'?",
          opts: ["Ciao", "Hello", "Hola", "Bonjour"],
          a: 0,
          feedback: ["Eccellente! Ciao is pure Italian greeting!", "Nooo, Ciao is the Italian way!"]
        },
        it: {
          q: "Qual è la parola italiana per 'ciao'?",
          opts: ["Ciao", "Hello", "Hola", "Bonjour"],
          a: 0,
          feedback: ["Eccellente! Ciao è un saluto puramente italiano!", "Nooo, Ciao è il modo italiano!"]
        }
      }
    ];

    // 随机选择10道题
    return this.shuffleArray(allQuestions).slice(0, 10);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
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
        <h2>${langData.q}</h2>
        <div class="quiz-options">
          ${langData.opts.map((opt, index) => `
            <button class="quiz-opt" data-index="${index}">
              ${opt}
            </button>
          `).join('')}
        </div>
        <div class="quiz-feedback" style="display: none;"></div>
      </div>
    `;

    this.elements.questionContainer.innerHTML = questionHTML;

    // 绑定选项按钮事件
    const optionButtons = document.querySelectorAll('.quiz-opt');
    optionButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.selectAnswer(parseInt(e.target.dataset.index));
      });
    });

    // 更新分数显示
    this.updateScoreDisplay();
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

    // 自动跳转到下一题（延迟2秒）
    setTimeout(() => {
      if (this.currentQuestion < this.questions.length - 1) {
        this.nextQuestion();
      } else {
        this.showFinalScore();
      }
    }, 2000);
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
    const percentage = (this.score / this.questions.length) * 100;
    const titleCard = this.getTitleCard(percentage);
    
    const finalScoreHTML = `
      <div class="final-score" style="text-align: center; padding: 40px; background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%); border-radius: 20px; border: 3px solid #008C45; box-shadow: 0 8px 32px rgba(0,140,69,0.1);">
        <div style="font-size: 5rem; margin-bottom: 20px;">🎉</div>
        
        <h2 style="color: #CD212A; margin-bottom: 20px; font-family: 'Permanent Marker', cursive; font-size: 2rem;">
          ${this.currentLang === 'it' ? 'Quiz Completato!' : 'Quiz Complete!'}
        </h2>
        
        <div style="background: #e8f5e8; padding: 20px; border-radius: 12px; border: 2px solid #22bb33; margin-bottom: 30px;">
          <h1 style="font-size: 3rem; color: #008C45; margin: 0; font-weight: bold;">
            ${this.score}/${this.questions.length}
          </h1>
          <p style="color: #155724; font-size: 1.2rem; margin: 10px 0 0 0;">
            ${Math.round(percentage)}% ${this.currentLang === 'it' ? 'Correttezza' : 'Accuracy'}
          </p>
        </div>
        
        <div style="background: #fff3cd; padding: 20px; border-radius: 12px; border: 2px solid #ffc107; margin-bottom: 30px;">
          <h3 style="color: #856404; margin-bottom: 15px; font-size: 1.5rem;">🏆 ${titleCard.title}</h3>
          <p style="color: #856404; font-size: 1.1rem; margin: 0; line-height: 1.5;">${titleCard.description}</p>
        </div>
        
        <div style="margin-bottom: 30px;">
          <p style="color: #666; font-size: 1.1rem; line-height: 1.6;">
            ${this.getScoreMessage()}
          </p>
        </div>
        
        <button onclick="location.reload()" style="background: linear-gradient(135deg, #CD212A 0%, #b91c1c 100%); color: white; padding: 18px 36px; border: none; border-radius: 12px; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(205, 33, 42, 0.3);">
          🔄 ${this.currentLang === 'it' ? 'Riprova Quiz' : 'Try Quiz Again'}
        </button>
      </div>
    `;

    this.elements.questionContainer.innerHTML = finalScoreHTML;
    
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

  getTitleCard(percentage) {
    if (this.currentLang === 'it') {
      if (percentage >= 95) {
        return {
          title: "Imperatore del Brainrot Italiano 👑",
          description: "Sei il re supremo dei meme italiani! Nessuno può competere con la tua conoscenza del brainrot!"
        };
      } else if (percentage >= 90) {
        return {
          title: "Maestro del Brainrot Italiano 🎭",
          description: "Hai padroneggiato l'arte del brainrot italiano! Sei un vero esperto riconosciuto!"
        };
      } else if (percentage >= 80) {
        return {
          title: "Esperto di Brainrot Italiano 🍕",
          description: "La tua conoscenza dei meme italiani è impressionante! Continua così!"
        };
      } else if (percentage >= 70) {
        return {
          title: "Apprendista del Brainrot Italiano 🤌",
          description: "Stai imparando bene! Hai una solida base di conoscenza italiana!"
        };
      } else if (percentage >= 50) {
        return {
          title: "Principiante del Brainrot Italiano 📚",
          description: "Hai iniziato il tuo viaggio! Continua a studiare i meme italiani!"
        };
      } else {
        return {
          title: "Esploratore del Brainrot Italiano 🗺️",
          description: "Ogni viaggio inizia con un passo! Non arrenderti, continua a imparare!"
        };
      }
    } else {
      if (percentage >= 95) {
        return {
          title: "Italian Brainrot Emperor 👑",
          description: "You are the supreme king of Italian memes! No one can compete with your brainrot knowledge!"
        };
      } else if (percentage >= 90) {
        return {
          title: "Italian Brainrot Master 🎭",
          description: "You have mastered the art of Italian brainrot! You are a true recognized expert!"
        };
      } else if (percentage >= 80) {
        return {
          title: "Italian Brainrot Expert 🍕",
          description: "Your knowledge of Italian memes is impressive! Keep it up!"
        };
      } else if (percentage >= 70) {
        return {
          title: "Italian Brainrot Apprentice 🤌",
          description: "You're learning well! You have a solid foundation of Italian knowledge!"
        };
      } else if (percentage >= 50) {
        return {
          title: "Italian Brainrot Beginner 📚",
          description: "You've started your journey! Keep studying Italian memes!"
        };
      } else {
        return {
          title: "Italian Brainrot Explorer 🗺️",
          description: "Every journey begins with a step! Don't give up, keep learning!"
        };
      }
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  new BrainrotQuiz();
});

export default BrainrotQuiz; 