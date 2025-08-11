// Italian Brainrot Quiz - 重构版本
import { utils, languages, sharedData } from './common.js';
import ShareCardGenerator from './share-card.js';

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
    // 意大利脑瘫梗风格100道题，每次随机抽取10题
    const allQuestions = [
      // 1-10: 经典意大利梗
      {
        en: { q: "What do Italians say when something is amazing?", opts: ["Mamma mia!", "Wow!", "Bravo!", "Awesome!"], a: 0, feedback: ["Perfetto! You are a true meme connoisseur!", "Nooo, only 'Mamma mia!' is the real deal!"] },
        it: { q: "Cosa dicono gli italiani quando qualcosa è fantastico?", opts: ["Mamma mia!", "Opa!", "Bravo!", "Kawaii!"], a: 0, feedback: ["Perfetto! Sei un vero intenditore di meme!", "Nooo, solo 'Mamma mia!' è quella giusta!"] }
      },
      {
        en: { q: "Which Italian food is most associated with memes?", opts: ["Pizza", "Sushi", "Tacos", "Burgers"], a: 0, feedback: ["Eccellente! Pizza is the heart of Italian memes!", "Nooo, it's all about the pizza! 🍕"] },
        it: { q: "Quale cibo italiano è più associato ai meme?", opts: ["Pizza", "Sushi", "Tacos", "Hamburger"], a: 0, feedback: ["Eccellente! La pizza è il cuore dei meme italiani!", "Nooo, si tratta tutto della pizza! 🍕"] }
      },
      {
        en: { q: "What's the classic Italian hand gesture?", opts: ["🤌", "👍", "👌", "✌️"], a: 0, feedback: ["Perfetto! 🤌 is the iconic Italian gesture!", "Nooo, 🤌 is the real Italian way!"] },
        it: { q: "Qual è il gesto classico italiano?", opts: ["🤌", "👍", "👌", "✌️"], a: 0, feedback: ["Perfetto! 🤌 è il gesto iconico italiano!", "Nooo, 🤌 è il vero modo italiano!"] }
      },
      {
        en: { q: "What do Italians say when they're excited?", opts: ["Bellissimo!", "Cool!", "Nice!", "Great!"], a: 0, feedback: ["Fantastico! Bellissimo is pure Italian excitement!", "Nooo, Bellissimo is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani quando sono entusiasti?", opts: ["Bellissimo!", "Figo!", "Bello!", "Grande!"], a: 0, feedback: ["Fantastico! Bellissimo è puro entusiasmo italiano!", "Nooo, Bellissimo è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city is famous for art?", opts: ["Firenze", "Tokyo", "Paris", "London"], a: 0, feedback: ["Perfetto! Firenze is the art capital!", "Nooo, Firenze is the Italian art city!"] },
        it: { q: "Quale città italiana è famosa per l'arte?", opts: ["Firenze", "Tokyo", "Parigi", "Londra"], a: 0, feedback: ["Perfetto! Firenze è la capitale dell'arte!", "Nooo, Firenze è la città dell'arte italiana!"] }
      },
      {
        en: { q: "What's the Italian word for 'beautiful'?", opts: ["Bella", "Beautiful", "Bonita", "Jolie"], a: 0, feedback: ["Eccellente! Bella is pure Italian beauty!", "Nooo, Bella is the Italian way!"] },
        it: { q: "Qual è la parola italiana per 'bella'?", opts: ["Bella", "Beautiful", "Bonita", "Jolie"], a: 0, feedback: ["Eccellente! Bella è pura bellezza italiana!", "Nooo, Bella è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian drink is famous worldwide?", opts: ["Espresso", "Tea", "Coffee", "Juice"], a: 0, feedback: ["Perfetto! Espresso is pure Italian culture!", "Nooo, Espresso is the Italian way!"] },
        it: { q: "Quale bevanda italiana è famosa nel mondo?", opts: ["Espresso", "Tè", "Caffè", "Succo"], a: 0, feedback: ["Perfetto! L'Espresso è pura cultura italiana!", "Nooo, l'Espresso è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their mother?", opts: ["Mamma", "Mother", "Mom", "Mama"], a: 0, feedback: ["Perfetto! Mamma is the heart of Italian family!", "Nooo, Mamma is the Italian way!"] },
        it: { q: "Come chiamano gli italiani la loro madre?", opts: ["Mamma", "Madre", "Mamma", "Mama"], a: 0, feedback: ["Perfetto! Mamma è il cuore della famiglia italiana!", "Nooo, Mamma è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian car brand is famous?", opts: ["Ferrari", "Toyota", "BMW", "Mercedes"], a: 0, feedback: ["Perfetto! Ferrari is pure Italian passion!", "Nooo, Ferrari is the Italian way!"] },
        it: { q: "Quale marca di auto italiana è famosa?", opts: ["Ferrari", "Toyota", "BMW", "Mercedes"], a: 0, feedback: ["Perfetto! Ferrari è pura passione italiana!", "Nooo, Ferrari è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'goodbye'?", opts: ["Ciao", "Goodbye", "Bye", "See you"], a: 0, feedback: ["Perfetto! Ciao is pure Italian charm!", "Nooo, Ciao is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'arrivederci'?", opts: ["Ciao", "Arrivederci", "Addio", "Ciao"], a: 0, feedback: ["Perfetto! Ciao è puro fascino italiano!", "Nooo, Ciao è il modo italiano!"] }
      },
      // 11-20: 意大利meme文化
      {
        en: { q: "Which Italian pasta shape is most popular?", opts: ["Spaghetti", "Ramen", "Udon", "Soba"], a: 0, feedback: ["Perfetto! Spaghetti is pure Italian tradition!", "Nooo, Spaghetti is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è più popolare?", opts: ["Spaghetti", "Ramen", "Udon", "Soba"], a: 0, feedback: ["Perfetto! Gli Spaghetti sono pura tradizione italiana!", "Nooo, gli Spaghetti sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'thank you'?", opts: ["Grazie", "Thank you", "Thanks", "Merci"], a: 0, feedback: ["Perfetto! Grazie is pure Italian gratitude!", "Nooo, Grazie is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'grazie'?", opts: ["Grazie", "Grazie", "Grazie", "Merci"], a: 0, feedback: ["Perfetto! Grazie è pura gratitudine italiana!", "Nooo, Grazie è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian opera composer is famous?", opts: ["Verdi", "Mozart", "Beethoven", "Bach"], a: 0, feedback: ["Perfetto! Verdi is pure Italian opera!", "Nooo, Verdi is the Italian way!"] },
        it: { q: "Quale compositore d'opera italiano è famoso?", opts: ["Verdi", "Mozart", "Beethoven", "Bach"], a: 0, feedback: ["Perfetto! Verdi è pura opera italiana!", "Nooo, Verdi è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their grandmother?", opts: ["Nonna", "Grandmother", "Grandma", "Granny"], a: 0, feedback: ["Perfetto! Nonna is pure Italian family love!", "Nooo, Nonna is the Italian way!"] },
        it: { q: "Come chiamano gli italiani la loro nonna?", opts: ["Nonna", "Nonna", "Nonna", "Nonna"], a: 0, feedback: ["Perfetto! Nonna è puro amore familiare italiano!", "Nooo, Nonna è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian dessert is famous?", opts: ["Tiramisu", "Cheesecake", "Chocolate cake", "Ice cream"], a: 0, feedback: ["Perfetto! Tiramisu is pure Italian sweetness!", "Nooo, Tiramisu is the Italian way!"] },
        it: { q: "Quale dolce italiano è famoso?", opts: ["Tiramisu", "Cheesecake", "Torta al cioccolato", "Gelato"], a: 0, feedback: ["Perfetto! Il Tiramisu è pura dolcezza italiana!", "Nooo, il Tiramisu è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'good morning'?", opts: ["Buongiorno", "Good morning", "Hello", "Hi"], a: 0, feedback: ["Perfetto! Buongiorno is pure Italian greeting!", "Nooo, Buongiorno is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'buongiorno'?", opts: ["Buongiorno", "Buongiorno", "Ciao", "Salve"], a: 0, feedback: ["Perfetto! Buongiorno è un saluto puramente italiano!", "Nooo, Buongiorno è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian wine is famous?", opts: ["Chianti", "Beer", "Whiskey", "Vodka"], a: 0, feedback: ["Perfetto! Chianti is pure Italian wine culture!", "Nooo, Chianti is the Italian way!"] },
        it: { q: "Quale vino italiano è famoso?", opts: ["Chianti", "Birra", "Whiskey", "Vodka"], a: 0, feedback: ["Perfetto! Il Chianti è pura cultura del vino italiana!", "Nooo, il Chianti è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their grandfather?", opts: ["Nonno", "Grandfather", "Grandpa", "Granddad"], a: 0, feedback: ["Perfetto! Nonno is pure Italian family love!", "Nooo, Nonno is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro nonno?", opts: ["Nonno", "Nonno", "Nonno", "Nonno"], a: 0, feedback: ["Perfetto! Nonno è puro amore familiare italiano!", "Nooo, Nonno è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian fashion brand is famous?", opts: ["Gucci", "Nike", "Adidas", "Puma"], a: 0, feedback: ["Perfetto! Gucci is pure Italian fashion!", "Nooo, Gucci is the Italian way!"] },
        it: { q: "Quale marca di moda italiana è famosa?", opts: ["Gucci", "Nike", "Adidas", "Puma"], a: 0, feedback: ["Perfetto! Gucci è pura moda italiana!", "Nooo, Gucci è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'good night'?", opts: ["Buonanotte", "Good night", "Sleep well", "Sweet dreams"], a: 0, feedback: ["Perfetto! Buonanotte is pure Italian warmth!", "Nooo, Buonanotte is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'buonanotte'?", opts: ["Buonanotte", "Buonanotte", "Dormi bene", "Sogni d'oro"], a: 0, feedback: ["Perfetto! Buonanotte è puro calore italiano!", "Nooo, Buonanotte è il modo italiano!"] }
      },
      // 21-30: 意大利meme梗
      {
        en: { q: "What do Italians say when surprised?", opts: ["Che cosa!", "What!", "Wow!", "Oh!"], a: 0, feedback: ["Fantastico! Che cosa is pure Italian surprise!", "Nooo, Che cosa is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani quando sono sorpresi?", opts: ["Che cosa!", "Cosa!", "Wow!", "Oh!"], a: 0, feedback: ["Fantastico! Che cosa è pura sorpresa italiana!", "Nooo, Che cosa è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian cheese is most famous?", opts: ["Mozzarella", "Cheddar", "Swiss", "American"], a: 0, feedback: ["Perfetto! Mozzarella is pure Italian cheese!", "Nooo, Mozzarella is the Italian way!"] },
        it: { q: "Quale formaggio italiano è più famoso?", opts: ["Mozzarella", "Cheddar", "Svizzero", "Americano"], a: 0, feedback: ["Perfetto! La Mozzarella è puro formaggio italiano!", "Nooo, la Mozzarella è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'hello'?", opts: ["Ciao", "Hello", "Hola", "Bonjour"], a: 0, feedback: ["Eccellente! Ciao is pure Italian greeting!", "Nooo, Ciao is the Italian way!"] },
        it: { q: "Qual è la parola italiana per 'ciao'?", opts: ["Ciao", "Hello", "Hola", "Bonjour"], a: 0, feedback: ["Eccellente! Ciao è un saluto puramente italiano!", "Nooo, Ciao è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian island is famous?", opts: ["Sicilia", "Hawaii", "Bali", "Maldives"], a: 0, feedback: ["Perfetto! Sicilia is pure Italian beauty!", "Nooo, Sicilia is the Italian way!"] },
        it: { q: "Quale isola italiana è famosa?", opts: ["Sicilia", "Hawaii", "Bali", "Maldive"], a: 0, feedback: ["Perfetto! La Sicilia è pura bellezza italiana!", "Nooo, la Sicilia è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their father?", opts: ["Papà", "Father", "Dad", "Daddy"], a: 0, feedback: ["Perfetto! Papà is pure Italian family love!", "Nooo, Papà is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro padre?", opts: ["Papà", "Padre", "Papà", "Babbo"], a: 0, feedback: ["Perfetto! Papà è puro amore familiare italiano!", "Nooo, Papà è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is famous?", opts: ["Marinara", "Ketchup", "Mustard", "Mayo"], a: 0, feedback: ["Perfetto! Marinara is pure Italian sauce!", "Nooo, Marinara is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è famosa?", opts: ["Marinara", "Ketchup", "Senape", "Maionese"], a: 0, feedback: ["Perfetto! La Marinara è pura salsa italiana!", "Nooo, la Marinara è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'please'?", opts: ["Per favore", "Please", "Por favor", "S'il vous plaît"], a: 0, feedback: ["Perfetto! Per favore is pure Italian politeness!", "Nooo, Per favore is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'per favore'?", opts: ["Per favore", "Per favore", "Por favor", "S'il vous plaît"], a: 0, feedback: ["Perfetto! Per favore è pura educazione italiana!", "Nooo, Per favore è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city has canals?", opts: ["Venezia", "Amsterdam", "Bangkok", "Bruges"], a: 0, feedback: ["Perfetto! Venezia is pure Italian romance!", "Nooo, Venezia is the Italian way!"] },
        it: { q: "Quale città italiana ha i canali?", opts: ["Venezia", "Amsterdam", "Bangkok", "Bruges"], a: 0, feedback: ["Perfetto! Venezia è puro romanticismo italiano!", "Nooo, Venezia è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their sister?", opts: ["Sorella", "Sister", "Sis", "Sissy"], a: 0, feedback: ["Perfetto! Sorella is pure Italian family love!", "Nooo, Sorella is the Italian way!"] },
        it: { q: "Come chiamano gli italiani la loro sorella?", opts: ["Sorella", "Sorella", "Sis", "Sissy"], a: 0, feedback: ["Perfetto! Sorella è puro amore familiare italiano!", "Nooo, Sorella è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian ice cream is famous?", opts: ["Gelato", "Ice cream", "Sorbet", "Sherbet"], a: 0, feedback: ["Perfetto! Gelato is pure Italian sweetness!", "Nooo, Gelato is the Italian way!"] },
        it: { q: "Quale gelato italiano è famoso?", opts: ["Gelato", "Gelato", "Sorbetto", "Sherbet"], a: 0, feedback: ["Perfetto! Il Gelato è pura dolcezza italiana!", "Nooo, il Gelato è il modo italiano!"] }
      },
      // 31-40: 更多意大利文化梗
      {
        en: { q: "What do Italians call their brother?", opts: ["Fratello", "Brother", "Bro", "Bruh"], a: 0, feedback: ["Perfetto! Fratello is pure Italian family love!", "Nooo, Fratello is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro fratello?", opts: ["Fratello", "Fratello", "Bro", "Bruh"], a: 0, feedback: ["Perfetto! Fratello è puro amore familiare italiano!", "Nooo, Fratello è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian bread is famous?", opts: ["Ciabatta", "Baguette", "Sourdough", "Whole wheat"], a: 0, feedback: ["Perfetto! Ciabatta is pure Italian bread!", "Nooo, Ciabatta is the Italian way!"] },
        it: { q: "Quale pane italiano è famoso?", opts: ["Ciabatta", "Baguette", "Pasta madre", "Integrale"], a: 0, feedback: ["Perfetto! La Ciabatta è puro pane italiano!", "Nooo, la Ciabatta è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'excuse me'?", opts: ["Scusi", "Excuse me", "Sorry", "Pardon"], a: 0, feedback: ["Perfetto! Scusi is pure Italian politeness!", "Nooo, Scusi is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'scusi'?", opts: ["Scusi", "Scusi", "Mi dispiace", "Permesso"], a: 0, feedback: ["Perfetto! Scusi è pura educazione italiana!", "Nooo, Scusi è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian mountain range is famous?", opts: ["Alpi", "Himalayas", "Rockies", "Andes"], a: 0, feedback: ["Perfetto! Alpi is pure Italian nature!", "Nooo, Alpi is the Italian way!"] },
        it: { q: "Quale catena montuosa italiana è famosa?", opts: ["Alpi", "Himalaya", "Rocciose", "Ande"], a: 0, feedback: ["Perfetto! Le Alpi sono pura natura italiana!", "Nooo, le Alpi sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their uncle?", opts: ["Zio", "Uncle", "Unc", "Unkie"], a: 0, feedback: ["Perfetto! Zio is pure Italian family love!", "Nooo, Zio is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro zio?", opts: ["Zio", "Zio", "Unc", "Unkie"], a: 0, feedback: ["Perfetto! Zio è puro amore familiare italiano!", "Nooo, Zio è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian coffee drink is famous?", opts: ["Cappuccino", "Latte", "Americano", "Espresso"], a: 0, feedback: ["Perfetto! Cappuccino is pure Italian coffee!", "Nooo, Cappuccino is the Italian way!"] },
        it: { q: "Quale bevanda di caffè italiana è famosa?", opts: ["Cappuccino", "Latte", "Americano", "Espresso"], a: 0, feedback: ["Perfetto! Il Cappuccino è puro caffè italiano!", "Nooo, il Cappuccino è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'congratulations'?", opts: ["Congratulazioni", "Congratulations", "Congrats", "Well done"], a: 0, feedback: ["Perfetto! Congratulazioni is pure Italian joy!", "Nooo, Congratulazioni is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'congratulazioni'?", opts: ["Congratulazioni", "Congratulazioni", "Congrats", "Ben fatto"], a: 0, feedback: ["Perfetto! Congratulazioni è pura gioia italiana!", "Nooo, Congratulazioni è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city is the capital?", opts: ["Roma", "Milano", "Napoli", "Torino"], a: 0, feedback: ["Perfetto! Roma is pure Italian history!", "Nooo, Roma is the Italian way!"] },
        it: { q: "Quale città italiana è la capitale?", opts: ["Roma", "Milano", "Napoli", "Torino"], a: 0, feedback: ["Perfetto! Roma è pura storia italiana!", "Nooo, Roma è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their aunt?", opts: ["Zia", "Aunt", "Aunty", "Auntie"], a: 0, feedback: ["Perfetto! Zia is pure Italian family love!", "Nooo, Zia is the Italian way!"] },
        it: { q: "Come chiamano gli italiani la loro zia?", opts: ["Zia", "Zia", "Aunty", "Auntie"], a: 0, feedback: ["Perfetto! Zia è puro amore familiare italiano!", "Nooo, Zia è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta dish is famous?", opts: ["Carbonara", "Ramen", "Pad Thai", "Pho"], a: 0, feedback: ["Perfetto! Carbonara is pure Italian pasta!", "Nooo, Carbonara is the Italian way!"] },
        it: { q: "Quale piatto di pasta italiano è famoso?", opts: ["Carbonara", "Ramen", "Pad Thai", "Pho"], a: 0, feedback: ["Perfetto! La Carbonara è pura pasta italiana!", "Nooo, la Carbonara è il modo italiano!"] }
      },
      // 41-50: 意大利meme文化扩展
      {
        en: { q: "What do Italians say for 'good luck'?", opts: ["Buona fortuna", "Good luck", "Break a leg", "Fingers crossed"], a: 0, feedback: ["Perfetto! Buona fortuna is pure Italian support!", "Nooo, Buona fortuna is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'buona fortuna'?", opts: ["Buona fortuna", "Buona fortuna", "In bocca al lupo", "Dita incrociate"], a: 0, feedback: ["Perfetto! Buona fortuna è puro supporto italiano!", "Nooo, Buona fortuna è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pizza topping is classic?", opts: ["Margherita", "Pepperoni", "Hawaiian", "BBQ"], a: 0, feedback: ["Perfetto! Margherita is pure Italian pizza!", "Nooo, Margherita is the Italian way!"] },
        it: { q: "Quale condimento di pizza italiano è classico?", opts: ["Margherita", "Pepperoni", "Hawaiiana", "BBQ"], a: 0, feedback: ["Perfetto! La Margherita è pura pizza italiana!", "Nooo, la Margherita è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their cousin?", opts: ["Cugino", "Cousin", "Cuz", "Cous"], a: 0, feedback: ["Perfetto! Cugino is pure Italian family love!", "Nooo, Cugino is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro cugino?", opts: ["Cugino", "Cugino", "Cuz", "Cous"], a: 0, feedback: ["Perfetto! Cugino è puro amore familiare italiano!", "Nooo, Cugino è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian river is famous?", opts: ["Tevere", "Nile", "Amazon", "Mississippi"], a: 0, feedback: ["Perfetto! Tevere is pure Italian history!", "Nooo, Tevere is the Italian way!"] },
        it: { q: "Quale fiume italiano è famoso?", opts: ["Tevere", "Nilo", "Amazzonia", "Mississippi"], a: 0, feedback: ["Perfetto! Il Tevere è pura storia italiana!", "Nooo, il Tevere è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'welcome'?", opts: ["Benvenuto", "Welcome", "Bienvenido", "Bienvenue"], a: 0, feedback: ["Perfetto! Benvenuto is pure Italian hospitality!", "Nooo, Benvenuto is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'benvenuto'?", opts: ["Benvenuto", "Benvenuto", "Bienvenido", "Bienvenue"], a: 0, feedback: ["Perfetto! Benvenuto è pura ospitalità italiana!", "Nooo, Benvenuto è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is long?", opts: ["Spaghetti", "Fusilli", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Spaghetti is pure Italian pasta!", "Nooo, Spaghetti is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è lunga?", opts: ["Spaghetti", "Fusilli", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Gli Spaghetti sono pura pasta italiana!", "Nooo, gli Spaghetti sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their friend?", opts: ["Amico", "Friend", "Buddy", "Pal"], a: 0, feedback: ["Perfetto! Amico is pure Italian friendship!", "Nooo, Amico is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro amico?", opts: ["Amico", "Amico", "Buddy", "Pal"], a: 0, feedback: ["Perfetto! Amico è pura amicizia italiana!", "Nooo, Amico è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian sea is famous?", opts: ["Mediterraneo", "Atlantic", "Pacific", "Indian"], a: 0, feedback: ["Perfetto! Mediterraneo is pure Italian beauty!", "Nooo, Mediterraneo is the Italian way!"] },
        it: { q: "Quale mare italiano è famoso?", opts: ["Mediterraneo", "Atlantico", "Pacifico", "Indiano"], a: 0, feedback: ["Perfetto! Il Mediterraneo è pura bellezza italiana!", "Nooo, il Mediterraneo è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'cheers'?", opts: ["Salute", "Cheers", "Prost", "Kanpai"], a: 0, feedback: ["Perfetto! Salute is pure Italian celebration!", "Nooo, Salute is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'salute'?", opts: ["Salute", "Salute", "Prost", "Kanpai"], a: 0, feedback: ["Perfetto! Salute è pura celebrazione italiana!", "Nooo, Salute è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is creamy?", opts: ["Alfredo", "Marinara", "Pesto", "Arrabbiata"], a: 0, feedback: ["Perfetto! Alfredo is pure Italian creaminess!", "Nooo, Alfredo is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è cremosa?", opts: ["Alfredo", "Marinara", "Pesto", "Arrabbiata"], a: 0, feedback: ["Perfetto! L'Alfredo è pura cremosità italiana!", "Nooo, l'Alfredo è il modo italiano!"] }
      },
      // 51-60: 意大利meme文化深度
      {
        en: { q: "What do Italians say for 'I love you'?", opts: ["Ti amo", "I love you", "Te amo", "Je t'aime"], a: 0, feedback: ["Perfetto! Ti amo is pure Italian love!", "Nooo, Ti amo is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'ti amo'?", opts: ["Ti amo", "Ti amo", "Te amo", "Je t'aime"], a: 0, feedback: ["Perfetto! Ti amo è puro amore italiano!", "Nooo, Ti amo è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is tube-like?", opts: ["Penne", "Spaghetti", "Fettuccine", "Linguine"], a: 0, feedback: ["Perfetto! Penne is pure Italian pasta!", "Nooo, Penne is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è tubolare?", opts: ["Penne", "Spaghetti", "Fettuccine", "Linguine"], a: 0, feedback: ["Perfetto! Le Penne sono pura pasta italiana!", "Nooo, le Penne sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their dog?", opts: ["Cane", "Dog", "Perro", "Chien"], a: 0, feedback: ["Perfetto! Cane is pure Italian pet love!", "Nooo, Cane is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro cane?", opts: ["Cane", "Cane", "Perro", "Chien"], a: 0, feedback: ["Perfetto! Cane è puro amore per gli animali italiano!", "Nooo, Cane è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city is famous for fashion?", opts: ["Milano", "Paris", "London", "New York"], a: 0, feedback: ["Perfetto! Milano is pure Italian style!", "Nooo, Milano is the Italian way!"] },
        it: { q: "Quale città italiana è famosa per la moda?", opts: ["Milano", "Parigi", "Londra", "New York"], a: 0, feedback: ["Perfetto! Milano è puro stile italiano!", "Nooo, Milano è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'goodbye' (formal)?", opts: ["Arrivederci", "Goodbye", "Adiós", "Au revoir"], a: 0, feedback: ["Perfetto! Arrivederci is pure Italian formality!", "Nooo, Arrivederci is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'arrivederci' (formale)?", opts: ["Arrivederci", "Arrivederci", "Adiós", "Au revoir"], a: 0, feedback: ["Perfetto! Arrivederci è pura formalità italiana!", "Nooo, Arrivederci è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is green?", opts: ["Pesto", "Marinara", "Alfredo", "Carbonara"], a: 0, feedback: ["Perfetto! Pesto is pure Italian green!", "Nooo, Pesto is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è verde?", opts: ["Pesto", "Marinara", "Alfredo", "Carbonara"], a: 0, feedback: ["Perfetto! Il Pesto è puro verde italiano!", "Nooo, il Pesto è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their cat?", opts: ["Gatto", "Cat", "Gato", "Chat"], a: 0, feedback: ["Perfetto! Gatto is pure Italian pet love!", "Nooo, Gatto is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro gatto?", opts: ["Gatto", "Gatto", "Gato", "Chat"], a: 0, feedback: ["Perfetto! Gatto è puro amore per gli animali italiano!", "Nooo, Gatto è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is ribbon-like?", opts: ["Fettuccine", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Fettuccine is pure Italian pasta!", "Nooo, Fettuccine is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è a nastro?", opts: ["Fettuccine", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Le Fettuccine sono pura pasta italiana!", "Nooo, le Fettuccine sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'thank you very much'?", opts: ["Grazie mille", "Thank you very much", "Muchas gracias", "Merci beaucoup"], a: 0, feedback: ["Perfetto! Grazie mille is pure Italian gratitude!", "Nooo, Grazie mille is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'grazie mille'?", opts: ["Grazie mille", "Grazie mille", "Muchas gracias", "Merci beaucoup"], a: 0, feedback: ["Perfetto! Grazie mille è pura gratitudine italiana!", "Nooo, Grazie mille è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is spicy?", opts: ["Arrabbiata", "Marinara", "Alfredo", "Pesto"], a: 0, feedback: ["Perfetto! Arrabbiata is pure Italian spice!", "Nooo, Arrabbiata is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è piccante?", opts: ["Arrabbiata", "Marinara", "Alfredo", "Pesto"], a: 0, feedback: ["Perfetto! L'Arrabbiata è puro piccante italiano!", "Nooo, l'Arrabbiata è il modo italiano!"] }
      },
      // 61-70: 意大利meme文化扩展
      {
        en: { q: "What do Italians say for 'good evening'?", opts: ["Buonasera", "Good evening", "Buenas noches", "Bonsoir"], a: 0, feedback: ["Perfetto! Buonasera is pure Italian evening!", "Nooo, Buonasera is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'buonasera'?", opts: ["Buonasera", "Buonasera", "Buenas noches", "Bonsoir"], a: 0, feedback: ["Perfetto! Buonasera è pura serata italiana!", "Nooo, Buonasera è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is small?", opts: ["Orzo", "Spaghetti", "Penne", "Fettuccine"], a: 0, feedback: ["Perfetto! Orzo is pure Italian pasta!", "Nooo, Orzo is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è piccola?", opts: ["Orzo", "Spaghetti", "Penne", "Fettuccine"], a: 0, feedback: ["Perfetto! L'Orzo è pura pasta italiana!", "Nooo, l'Orzo è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their baby?", opts: ["Bambino", "Baby", "Bebé", "Bébé"], a: 0, feedback: ["Perfetto! Bambino is pure Italian cuteness!", "Nooo, Bambino is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro bambino?", opts: ["Bambino", "Bambino", "Bebé", "Bébé"], a: 0, feedback: ["Perfetto! Bambino è pura tenerezza italiana!", "Nooo, Bambino è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city is famous for pizza?", opts: ["Napoli", "Roma", "Milano", "Firenze"], a: 0, feedback: ["Perfetto! Napoli is pure Italian pizza!", "Nooo, Napoli is the Italian way!"] },
        it: { q: "Quale città italiana è famosa per la pizza?", opts: ["Napoli", "Roma", "Milano", "Firenze"], a: 0, feedback: ["Perfetto! Napoli è pura pizza italiana!", "Nooo, Napoli è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'see you later'?", opts: ["A presto", "See you later", "Hasta luego", "À bientôt"], a: 0, feedback: ["Perfetto! A presto is pure Italian farewell!", "Nooo, A presto is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'a presto'?", opts: ["A presto", "A presto", "Hasta luego", "À bientôt"], a: 0, feedback: ["Perfetto! A presto è puro addio italiano!", "Nooo, A presto è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is red?", opts: ["Marinara", "Alfredo", "Pesto", "Carbonara"], a: 0, feedback: ["Perfetto! Marinara is pure Italian red!", "Nooo, Marinara is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è rossa?", opts: ["Marinara", "Alfredo", "Pesto", "Carbonara"], a: 0, feedback: ["Perfetto! La Marinara è puro rosso italiano!", "Nooo, la Marinara è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their house?", opts: ["Casa", "House", "Casa", "Maison"], a: 0, feedback: ["Perfetto! Casa is pure Italian home!", "Nooo, Casa is the Italian way!"] },
        it: { q: "Come chiamano gli italiani la loro casa?", opts: ["Casa", "Casa", "Casa", "Maison"], a: 0, feedback: ["Perfetto! Casa è pura casa italiana!", "Nooo, Casa è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is spiral?", opts: ["Fusilli", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Fusilli is pure Italian pasta!", "Nooo, Fusilli is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è a spirale?", opts: ["Fusilli", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! I Fusilli sono pura pasta italiana!", "Nooo, i Fusilli sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'you're welcome'?", opts: ["Prego", "You're welcome", "De nada", "De rien"], a: 0, feedback: ["Perfetto! Prego is pure Italian politeness!", "Nooo, Prego is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'prego'?", opts: ["Prego", "Prego", "De nada", "De rien"], a: 0, feedback: ["Perfetto! Prego è pura educazione italiana!", "Nooo, Prego è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is white?", opts: ["Alfredo", "Marinara", "Pesto", "Arrabbiata"], a: 0, feedback: ["Perfetto! Alfredo is pure Italian white!", "Nooo, Alfredo is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è bianca?", opts: ["Alfredo", "Marinara", "Pesto", "Arrabbiata"], a: 0, feedback: ["Perfetto! L'Alfredo è puro bianco italiano!", "Nooo, l'Alfredo è il modo italiano!"] }
      },
      // 71-80: 意大利meme文化深度扩展
      {
        en: { q: "What do Italians say for 'how are you'?", opts: ["Come stai", "How are you", "¿Cómo estás?", "Comment allez-vous?"], a: 0, feedback: ["Perfetto! Come stai is pure Italian care!", "Nooo, Come stai is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'come stai'?", opts: ["Come stai", "Come stai", "¿Cómo estás?", "Comment allez-vous?"], a: 0, feedback: ["Perfetto! Come stai è pura cura italiana!", "Nooo, Come stai è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is bow-tie?", opts: ["Farfalle", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Farfalle is pure Italian pasta!", "Nooo, Farfalle is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è a farfalla?", opts: ["Farfalle", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Le Farfalle sono pura pasta italiana!", "Nooo, le Farfalle sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their car?", opts: ["Macchina", "Car", "Coche", "Voiture"], a: 0, feedback: ["Perfetto! Macchina is pure Italian transport!", "Nooo, Macchina is the Italian way!"] },
        it: { q: "Come chiamano gli italiani la loro macchina?", opts: ["Macchina", "Macchina", "Coche", "Voiture"], a: 0, feedback: ["Perfetto! Macchina è puro trasporto italiano!", "Nooo, Macchina è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city is famous for canals?", opts: ["Venezia", "Amsterdam", "Bangkok", "Bruges"], a: 0, feedback: ["Perfetto! Venezia is pure Italian romance!", "Nooo, Venezia is the Italian way!"] },
        it: { q: "Quale città italiana ha i canali?", opts: ["Venezia", "Amsterdam", "Bangkok", "Bruges"], a: 0, feedback: ["Perfetto! Venezia è puro romanticismo italiano!", "Nooo, Venezia è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'goodbye' (informal)?", opts: ["Ciao", "Goodbye", "Adiós", "Au revoir"], a: 0, feedback: ["Perfetto! Ciao is pure Italian informality!", "Nooo, Ciao is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'ciao' (informale)?", opts: ["Ciao", "Ciao", "Adiós", "Au revoir"], a: 0, feedback: ["Perfetto! Ciao è pura informalità italiana!", "Nooo, Ciao è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is meat-based?", opts: ["Bolognese", "Marinara", "Pesto", "Alfredo"], a: 0, feedback: ["Perfetto! Bolognese is pure Italian meat!", "Nooo, Bolognese is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è a base di carne?", opts: ["Bolognese", "Marinara", "Pesto", "Alfredo"], a: 0, feedback: ["Perfetto! La Bolognese è pura carne italiana!", "Nooo, la Bolognese è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their phone?", opts: ["Telefono", "Phone", "Teléfono", "Téléphone"], a: 0, feedback: ["Perfetto! Telefono is pure Italian communication!", "Nooo, Telefono is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro telefono?", opts: ["Telefono", "Telefono", "Teléfono", "Téléphone"], a: 0, feedback: ["Perfetto! Telefono è pura comunicazione italiana!", "Nooo, Telefono è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is large tube?", opts: ["Rigatoni", "Spaghetti", "Penne", "Fettuccine"], a: 0, feedback: ["Perfetto! Rigatoni is pure Italian pasta!", "Nooo, Rigatoni is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è tubo grande?", opts: ["Rigatoni", "Spaghetti", "Penne", "Fettuccine"], a: 0, feedback: ["Perfetto! I Rigatoni sono pura pasta italiana!", "Nooo, i Rigatoni sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'I'm sorry'?", opts: ["Mi dispiace", "I'm sorry", "Lo siento", "Je suis désolé"], a: 0, feedback: ["Perfetto! Mi dispiace is pure Italian apology!", "Nooo, Mi dispiace is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'mi dispiace'?", opts: ["Mi dispiace", "Mi dispiace", "Lo siento", "Je suis désolé"], a: 0, feedback: ["Perfetto! Mi dispiace è pura scusa italiana!", "Nooo, Mi dispiace è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is nut-based?", opts: ["Pesto", "Marinara", "Alfredo", "Carbonara"], a: 0, feedback: ["Perfetto! Pesto is pure Italian nuts!", "Nooo, Pesto is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è a base di noci?", opts: ["Pesto", "Marinara", "Alfredo", "Carbonara"], a: 0, feedback: ["Perfetto! Il Pesto è pura frutta secca italiana!", "Nooo, il Pesto è il modo italiano!"] }
      },
      // 81-90: 意大利meme文化终极扩展
      {
        en: { q: "What do Italians say for 'good afternoon'?", opts: ["Buon pomeriggio", "Good afternoon", "Buenas tardes", "Bon après-midi"], a: 0, feedback: ["Perfetto! Buon pomeriggio is pure Italian afternoon!", "Nooo, Buon pomeriggio is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'buon pomeriggio'?", opts: ["Buon pomeriggio", "Buon pomeriggio", "Buenas tardes", "Bon après-midi"], a: 0, feedback: ["Perfetto! Buon pomeriggio è puro pomeriggio italiano!", "Nooo, Buon pomeriggio è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is flat?", opts: ["Linguine", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Linguine is pure Italian pasta!", "Nooo, Linguine is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è piatta?", opts: ["Linguine", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Le Linguine sono pura pasta italiana!", "Nooo, le Linguine sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their book?", opts: ["Libro", "Book", "Libro", "Livre"], a: 0, feedback: ["Perfetto! Libro is pure Italian knowledge!", "Nooo, Libro is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro libro?", opts: ["Libro", "Libro", "Libro", "Livre"], a: 0, feedback: ["Perfetto! Libro è pura conoscenza italiana!", "Nooo, Libro è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city is famous for cars?", opts: ["Torino", "Milano", "Roma", "Firenze"], a: 0, feedback: ["Perfetto! Torino is pure Italian cars!", "Nooo, Torino is the Italian way!"] },
        it: { q: "Quale città italiana è famosa per le auto?", opts: ["Torino", "Milano", "Roma", "Firenze"], a: 0, feedback: ["Perfetto! Torino è pura auto italiana!", "Nooo, Torino è il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'see you soon'?", opts: ["A presto", "See you soon", "Hasta pronto", "À bientôt"], a: 0, feedback: ["Perfetto! A presto is pure Italian promise!", "Nooo, A presto is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'a presto'?", opts: ["A presto", "A presto", "Hasta pronto", "À bientôt"], a: 0, feedback: ["Perfetto! A presto è pura promessa italiana!", "Nooo, A presto è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is mushroom-based?", opts: ["Funghi", "Marinara", "Pesto", "Alfredo"], a: 0, feedback: ["Perfetto! Funghi is pure Italian mushrooms!", "Nooo, Funghi is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è a base di funghi?", opts: ["Funghi", "Marinara", "Pesto", "Alfredo"], a: 0, feedback: ["Perfetto! I Funghi sono puri funghi italiani!", "Nooo, i Funghi sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians call their food?", opts: ["Cibo", "Food", "Comida", "Nourriture"], a: 0, feedback: ["Perfetto! Cibo is pure Italian sustenance!", "Nooo, Cibo is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il loro cibo?", opts: ["Cibo", "Cibo", "Comida", "Nourriture"], a: 0, feedback: ["Perfetto! Cibo è puro sostentamento italiano!", "Nooo, Cibo è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta shape is ring-like?", opts: ["Anelli", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Anelli is pure Italian pasta!", "Nooo, Anelli is the Italian way!"] },
        it: { q: "Quale forma di pasta italiana è ad anello?", opts: ["Anelli", "Spaghetti", "Penne", "Rigatoni"], a: 0, feedback: ["Perfetto! Gli Anelli sono pura pasta italiana!", "Nooo, gli Anelli sono il modo italiano!"] }
      },
      {
        en: { q: "What do Italians say for 'everything is fine'?", opts: ["Tutto bene", "Everything is fine", "Todo está bien", "Tout va bien"], a: 0, feedback: ["Perfetto! Tutto bene is pure Italian calm!", "Nooo, Tutto bene is the Italian way!"] },
        it: { q: "Cosa dicono gli italiani per 'tutto bene'?", opts: ["Tutto bene", "Tutto bene", "Todo está bien", "Tout va bien"], a: 0, feedback: ["Perfetto! Tutto bene è pura calma italiana!", "Nooo, Tutto bene è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian pasta sauce is the ultimate meme sauce?", opts: ["🍕 Pizza Sauce", "Marinara", "Pesto", "Alfredo"], a: 0, feedback: ["🎉 PERFETTO! Pizza sauce is the ultimate Italian meme!", "Nooo, 🍕 Pizza sauce is the Italian way!"] },
        it: { q: "Quale salsa di pasta italiana è la salsa meme definitiva?", opts: ["🍕 Salsa Pizza", "Marinara", "Pesto", "Alfredo"], a: 0, feedback: ["🎉 PERFETTO! La salsa pizza è il meme italiano definitivo!", "Nooo, 🍕 La salsa pizza è il modo italiano!"] }
      },
      // 91-100: 意大利meme文化终极挑战
      {
        en: { q: "Which Italian landmark is ancient and iconic?", opts: ["Eiffel Tower", "Colosseum", "Big Ben", "Statue of Liberty"], a: 1, feedback: ["Perfetto! The Colosseum is pure Italian history!", "Nooo, the Colosseum is the Italian way!"] },
        it: { q: "Quale monumento italiano è antico e iconico?", opts: ["Torre Eiffel", "Colosseo", "Big Ben", "Statua della Libertà"], a: 1, feedback: ["Perfetto! Il Colosseo è pura storia italiana!", "Nooo, il Colosseo è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian scooter brand is classic?", opts: ["Yamaha", "Honda", "Vespa", "Suzuki"], a: 2, feedback: ["Perfetto! Vespa is pure Italian style!", "Nooo, Vespa is the Italian way!"] },
        it: { q: "Quale marca di scooter italiana è classica?", opts: ["Yamaha", "Honda", "Vespa", "Suzuki"], a: 2, feedback: ["Perfetto! La Vespa è puro stile italiano!", "Nooo, la Vespa è il modo italiano!"] }
      },
      {
        en: { q: "Which pasta shape looks like little ears?", opts: ["Penne", "Fusilli", "Rigatoni", "Orecchiette"], a: 3, feedback: ["Perfetto! Orecchiette is pure Italian cuteness!", "Nooo, Orecchiette is the Italian way!"] },
        it: { q: "Quale forma di pasta sembra piccole orecchie?", opts: ["Penne", "Fusilli", "Rigatoni", "Orecchiette"], a: 3, feedback: ["Perfetto! Le Orecchiette sono pura tenerezza italiana!", "Nooo, le Orecchiette sono il modo italiano!"] }
      },
      {
        en: { q: "Which Italian festival is famous for masks?", opts: ["Carnaval de Rio", "Carnevale di Venezia", "Oktoberfest", "La Tomatina"], a: 1, feedback: ["Perfetto! Carnevale is pure Italian magic!", "Nooo, Carnevale is the Italian way!"] },
        it: { q: "Quale festival italiano è famoso per le maschere?", opts: ["Carnaval de Rio", "Carnevale di Venezia", "Oktoberfest", "La Tomatina"], a: 1, feedback: ["Perfetto! Il Carnevale è pura magia italiana!", "Nooo, il Carnevale è il modo italiano!"] }
      },
      {
        en: { q: "How do Italians call football (soccer)?", opts: ["Football", "Calcio", "Fútbol", "Soccer"], a: 1, feedback: ["Perfetto! Calcio is pure Italian passion!", "Nooo, Calcio is the Italian way!"] },
        it: { q: "Come chiamano gli italiani il calcio?", opts: ["Football", "Calcio", "Fútbol", "Soccer"], a: 1, feedback: ["Perfetto! Il Calcio è pura passione italiana!", "Nooo, il Calcio è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian expression means 'come on!'?", opts: ["Vamos!", "Allez!", "C'mon!", "Ma dai!"], a: 3, feedback: ["Perfetto! Ma dai! is pure Italian vibe!", "Nooo, Ma dai! is the Italian way!"] },
        it: { q: "Quale espressione italiana significa 'dai!'?", opts: ["Vamos!", "Allez!", "C'mon!", "Ma dai!"], a: 3, feedback: ["Perfetto! Ma dai! è pura vibrazione italiana!", "Nooo, Ma dai! è il modo italiano!"] }
      },
      {
        en: { q: "Which Sicilian dessert is iconic?", opts: ["Brownie", "Cannoli", "Donut", "Cupcake"], a: 1, feedback: ["Perfetto! Cannoli is pure Italian sweetness!", "Nooo, Cannoli is the Italian way!"] },
        it: { q: "Quale dessert siciliano è iconico?", opts: ["Brownie", "Cannoli", "Donut", "Cupcake"], a: 1, feedback: ["Perfetto! Il Cannolo è pura dolcezza italiana!", "Nooo, il Cannolo è il modo italiano!"] }
      },
      {
        en: { q: "Which sauce is classic tomato-based?", opts: ["Alfredo", "Pesto", "Pomodoro", "Arrabbiata"], a: 2, feedback: ["Perfetto! Pomodoro is pure Italian classic!", "Nooo, Pomodoro is the Italian way!"] },
        it: { q: "Quale salsa è a base di pomodoro classica?", opts: ["Alfredo", "Pesto", "Pomodoro", "Arrabbiata"], a: 2, feedback: ["Perfetto! Il Pomodoro è un classico italiano!", "Nooo, il Pomodoro è il modo italiano!"] }
      },
      {
        en: { q: "Which Italian city gave name to ragù?", opts: ["Genova", "Verona", "Bologna", "Torino"], a: 2, feedback: ["Perfetto! Bologna is pure Italian flavor!", "Nooo, Bologna is the Italian way!"] },
        it: { q: "Quale città italiana ha dato il nome al ragù?", opts: ["Genova", "Verona", "Bologna", "Torino"], a: 2, feedback: ["Perfetto! Bologna è puro sapore italiano!", "Nooo, Bologna è il modo italiano!"] }
      },
      {
        en: { q: "Which coffee has a spot of milk?", opts: ["Americano", "Latte", "Macchiato", "Mocha"], a: 2, feedback: ["Perfetto! Macchiato is pure Italian coffee art!", "Nooo, Macchiato is the Italian way!"] },
        it: { q: "Quale caffè ha una macchia di latte?", opts: ["Americano", "Latte", "Macchiato", "Mocha"], a: 2, feedback: ["Perfetto! Il Macchiato è pura arte del caffè italiana!", "Nooo, il Macchiato è il modo italiano!"] }
      }
    ];

    // 随机打乱题目并选择前10题
    const shuffled = this.shuffleArray(allQuestions);
    return shuffled.slice(0, 10);
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
      
      if (isCorrect) {
        // 答对了：只高亮选中的正确答案
        if (parseInt(button.dataset.index) === selectedIndex) {
          button.style.background = '#e8f5e8';
          button.style.borderColor = '#22bb33';
          button.style.color = '#155724';
        }
      } else {
        // 答错了：只高亮选中的错误答案，不显示正确答案
        if (parseInt(button.dataset.index) === selectedIndex) {
          button.style.background = '#f8d7da';
          button.style.borderColor = '#CD212A';
          button.style.color = '#721c24';
        }
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

    // 自动跳转到下一题（延迟1.5秒）
    setTimeout(() => {
      if (this.currentQuestion < this.questions.length - 1) {
        this.nextQuestion();
      } else {
        this.showFinalScore();
      }
    }, 1500);
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
        
        <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
          <button onclick="location.reload()" style="background: linear-gradient(135deg, #CD212A 0%, #b91c1c 100%); color: white; padding: 18px 36px; border: none; border-radius: 12px; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(205, 33, 42, 0.3);">
            🔄 ${this.currentLang === 'it' ? 'Riprova Quiz' : 'Try Quiz Again'}
          </button>
          
          <button onclick="this.showShareCard(${this.score}, ${this.questions.length}, '${titleCard.title}', '${titleCard.description}')" style="background: linear-gradient(135deg, #9c27b0 0%, #673ab7 100%); color: white; padding: 18px 36px; border: none; border-radius: 12px; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);">
            📤 ${this.currentLang === 'it' ? 'Condividi Risultato' : 'Share Result'}
          </button>
        </div>
      </div>
    `;

    this.elements.questionContainer.innerHTML = finalScoreHTML;
    
    // 隐藏分数显示和下一题按钮
    if (this.elements.scoreDisplay) this.elements.scoreDisplay.innerHTML = '';
    if (this.elements.nextButton) this.elements.nextButton.style.display = 'none';
  }

  // 显示分享卡片
  showShareCard(score, totalQuestions, title, description) {
    const shareCardHTML = window.shareCardGenerator.getShareCardPreview(score, totalQuestions, title, description);
    
    // 替换内容显示分享卡片
    this.elements.questionContainer.innerHTML = shareCardHTML;
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