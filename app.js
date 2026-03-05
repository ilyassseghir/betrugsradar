// App State
const appState = {
  currentPage: "check",
  currentQuiz: null,
  currentQuestion: 0,
  quizScore: 0,
  quizAnswers: [],
  stats: {
    totalChecks: 0,
    totalReports: 0,
    totalQuizzes: 0,
    blacklistCount: 0
  },
  reportsByCategory: {
    enkeltrick: 0,
    polizei: 0,
    schock: 0,
    bank: 0,
    techsupport: 0,
    gewinnspiel: 0,
    sonstiges: 0
  }
};

// Database Simulation (fallback / local demo)
const database = {
  blacklist: [
    { number: "030 98765432", category: "enkeltrick", reports: 12 },
    { number: "+49 40 12345678", category: "polizei", reports: 8 },
    { number: "0221 555666", category: "gewinnspiel", reports: 15 },
    { number: "089 777888", category: "bank", reports: 6 }
  ],
  whitelist: [
    { number: "110", name: "Polizei Notruf" },
    { number: "112", name: "Feuerwehr Notruf" },
    { number: "116 116", name: "Sperr-Notruf" }
  ],
  reports: []
};

// Learning Content (no emojis)
const learningContent = {
  enkeltrick: {
    title: "Enkeltrick",
    description: "So funktioniert der Enkeltrick und wie Sie sich schützen",
    content: `
      <h2>Was ist der Enkeltrick?</h2>
      <p>Beim Enkeltrick geben sich Betrüger am Telefon als Verwandte aus – oft als Enkel, Nichte oder Neffe. Sie erzählen eine Notlage und fordern Geld.</p>

      <div class="warning-box">
        <h3>Typische Aussagen</h3>
        <ul>
          <li>"Hallo Oma/Opa, rate mal wer dran ist!"</li>
          <li>"Ich hatte einen Unfall und brauche dringend Geld"</li>
          <li>"Ich bin festgenommen worden"</li>
          <li>"Ich brauche schnell Geld für etwas Wichtiges"</li>
        </ul>
      </div>

      <h3>So schützen Sie sich</h3>
      <ul>
        <li><strong>Auflegen.</strong> Echte Verwandte verstehen das.</li>
        <li>Unter der Ihnen bekannten Nummer zurückrufen.</li>
        <li>Keine Namen erraten ("Bist du es, ...?").</li>
        <li>Kein Geld an Fremde übergeben.</li>
        <li>Mit einer Vertrauensperson sprechen.</li>
      </ul>

      <div class="tip-box">
        <h3>Merksatz</h3>
        <p><strong>Bei Geldforderung oder Druck: auflegen und prüfen.</strong></p>
      </div>

      <h3>Im Ernstfall</h3>
      <ul>
        <li>Polizei unter 110 anrufen.</li>
        <li>Nummer melden.</li>
        <li>Familie/Freunde informieren.</li>
      </ul>
    `
  },

  polizei: {
    title: "Falsche Polizisten",
    description: "Erkennen Sie falsche Polizeibeamte",
    content: `
      <h2>Falsche Polizisten</h2>
      <p>Betrüger geben sich als Polizei aus und behaupten, Ihre Wertsachen seien in Gefahr. Sie wollen Geld oder Schmuck "sichern".</p>

      <div class="warning-box">
        <h3>Typische Maschen</h3>
        <ul>
          <li>"In Ihrer Nachbarschaft gab es Einbrüche"</li>
          <li>"Ihr Name steht auf einer Liste"</li>
          <li>"Wir bringen Ihre Wertsachen in Sicherheit"</li>
          <li>"Ein Bankmitarbeiter ist verhaftet worden"</li>
        </ul>
      </div>

      <h3>Wichtig</h3>
      <ul>
        <li>Polizei fordert niemals telefonisch Geld oder Wertsachen.</li>
        <li>Polizei holt kein Bargeld/Schmuck bei Ihnen ab.</li>
        <li>Polizei fragt nie nach PIN/TAN.</li>
        <li>Druck und Zeitnot sind Warnzeichen.</li>
      </ul>

      <div class="tip-box">
        <h3>Merksatz</h3>
        <p><strong>Die echte Polizei holt kein Geld ab.</strong></p>
      </div>

      <h3>Richtig reagieren</h3>
      <ul>
        <li>Auflegen.</li>
        <li>Selbst die 110 anrufen.</li>
        <li>Nichts übergeben, niemanden reinlassen.</li>
      </ul>
    `
  },

  schock: {
    title: "Schockanrufe",
    description: "Schockanrufe erkennen und richtig reagieren",
    content: `
      <h2>Schockanrufe</h2>
      <p>Bei Schockanrufen wird eine dramatische Notsituation vorgetäuscht, um Sie zu schnellen Zahlungen zu bewegen.</p>

      <div class="warning-box">
        <h3>Typische Szenarien</h3>
        <ul>
          <li>"Ihr Kind hatte einen Unfall"</li>
          <li>"Kaution muss sofort bezahlt werden"</li>
          <li>"Ein Familienmitglied wurde festgenommen"</li>
          <li>"Ohne Zahlung droht Gefängnis"</li>
        </ul>
      </div>

      <h3>Woran erkennt man es?</h3>
      <ul>
        <li>Extremer Zeitdruck.</li>
        <li>Geldübergabe wird verlangt.</li>
        <li>Sie sollen niemanden informieren.</li>
      </ul>

      <div class="tip-box">
        <h3>Merksatz</h3>
        <p><strong>Erst stoppen, dann prüfen.</strong></p>
      </div>

      <h3>Richtige Reaktion</h3>
      <ul>
        <li>Auflegen.</li>
        <li>Familienmitglied direkt anrufen.</li>
        <li>Im Zweifel 110 wählen.</li>
      </ul>
    `
  },

  bank: {
    title: "Bank / TAN-Betrug",
    description: "Schützen Sie Ihre Bankdaten",
    content: `
      <h2>Bank- und TAN-Betrug</h2>
      <p>Betrüger geben sich als Bank aus und behaupten, es gäbe Probleme mit Ihrem Konto. Sie wollen Zugangsdaten.</p>

      <div class="warning-box">
        <h3>Typische Aussagen</h3>
        <ul>
          <li>"Wir brauchen Ihre TAN zur Verifizierung"</li>
          <li>"Ihr Konto ist gesperrt, nennen Sie die PIN"</li>
          <li>"Verdächtige Abbuchungen, bestätigen Sie das"</li>
          <li>"Klicken Sie auf diesen Link"</li>
        </ul>
      </div>

      <h3>Wichtig</h3>
      <ul>
        <li>Banken fragen nie nach PIN/TAN.</li>
        <li>Keine Links aus SMS/E-Mails anklicken.</li>
        <li>Selbst bei der Bank anrufen (Nummer von Karte/Website).</li>
      </ul>

      <div class="tip-box">
        <h3>Merksatz</h3>
        <p><strong>PIN und TAN bleiben privat.</strong></p>
      </div>
    `
  },

  techsupport: {
    title: "Tech-Support Betrug",
    description: "Falsche IT-Anrufe erkennen",
    content: `
      <h2>Tech-Support Betrug</h2>
      <p>Betrüger geben sich als IT-Support aus und behaupten, Ihr Gerät sei infiziert. Sie wollen Fernzugriff oder Geld.</p>

      <div class="warning-box">
        <h3>Typische Behauptungen</h3>
        <ul>
          <li>"Ihr Computer ist infiziert"</li>
          <li>"Wir haben verdächtige Aktivitäten"</li>
          <li>"Installieren Sie dieses Programm"</li>
          <li>"Zahlen Sie für die Reparatur"</li>
        </ul>
      </div>

      <h3>Richtig handeln</h3>
      <ul>
        <li>Auflegen.</li>
        <li>Keine Fernwartung zulassen.</li>
        <li>Nichts installieren.</li>
      </ul>

      <div class="tip-box">
        <h3>Merksatz</h3>
        <p><strong>Unaufgeforderter Support ist meist Betrug.</strong></p>
      </div>
    `
  },

  gewinnspiel: {
    title: "Gewinnspiel-Betrug",
    description: "Falsche Gewinnversprechen durchschauen",
    content: `
      <h2>Gewinnspiel-Betrug</h2>
      <p>Sie sollen angeblich etwas gewonnen haben, müssen aber erst Gebühren zahlen. Das ist fast immer Betrug.</p>

      <div class="warning-box">
        <h3>Typische Maschen</h3>
        <ul>
          <li>"Sie haben gewonnen"</li>
          <li>"Nur eine Bearbeitungsgebühr"</li>
          <li>"Steuern im Voraus zahlen"</li>
          <li>"Gutscheine kaufen"</li>
        </ul>
      </div>

      <h3>Wichtig</h3>
      <ul>
        <li>Echte Gewinne kosten nichts.</li>
        <li>Keine Vorauszahlungen.</li>
        <li>Keine persönlichen Daten rausgeben.</li>
      </ul>

      <div class="tip-box">
        <h3>Merksatz</h3>
        <p><strong>Ein Gewinn kostet nichts.</strong></p>
      </div>
    `
  }
};

// Quiz Questions (same logic; remove emojis in explanation text if you want)
const quizQuestions = {
  enkeltrick: [
    {
      question: 'Ein Anrufer sagt: "Hallo Oma, rate mal wer dran ist!" Was sollten Sie tun?',
      scenario: '"Hallo Oma, ich bin\'s! Rate mal wer dran ist! Ich habe ein großes Problem..."',
      options: [
        'Namen raten: "Bist du es, Michael?"',
        "Sofort auflegen und unter bekannter Nummer zurückrufen",
        "Fragen was passiert ist",
        "Nachfragen wo er anruft"
      ],
      correct: 1,
      explanation:
        "Richtig. Legen Sie auf und rufen Sie unter der Ihnen bekannten Nummer zurück."
    },
    {
      question: 'Ihr "Enkel" braucht dringend 5.000 Euro für einen Autokauf. Was tun?',
      options: [
        "Sofort zur Bank gehen",
        "Auflegen und echten Enkel unter bekannter Nummer anrufen",
        "Fragen ob er das Geld abholen kommt",
        "Nach der Kontonummer fragen"
      ],
      correct: 1,
      explanation:
        "Auflegen und unter bekannter Nummer anrufen. Echte Verwandte fragen nicht am Telefon nach Geld."
    },
    {
      question: "Was ist das wichtigste Warnsignal beim Enkeltrick?",
      options: [
        "Der Anrufer spricht zu schnell",
        "Es wird Geld gefordert und Zeitdruck aufgebaut",
        "Die Nummer ist unterdrückt",
        "Der Anruf kommt vormittags"
      ],
      correct: 1,
      explanation:
        "Geldforderung plus Zeitdruck ist ein typisches Betrugszeichen."
    }
  ],

  polizei: [
    {
      question:
        'Die "Polizei" ruft an und sagt, Einbrecher hätten Ihre Adresse. Sie sollen Wertsachen rausgeben. Was stimmt?',
      scenario:
        '"Guten Tag, hier spricht Kommissar Müller. In Ihrer Nachbarschaft gab es Einbrüche. Wir müssen Ihre Wertsachen in Sicherheit bringen."',
      options: [
        "Das ist normal, die Polizei will helfen",
        "Das ist Betrug - echte Polizei holt kein Geld ab",
        "Ich sollte fragen welche Dienststelle",
        "Ich vereinbare einen Termin"
      ],
      correct: 1,
      explanation:
        "Die echte Polizei holt niemals Bargeld oder Schmuck bei Ihnen ab."
    },
    {
      question:
        "Wie können Sie einen echten Polizisten von einem Betrüger unterscheiden?",
      options: [
        "Echte Polizisten nennen eine Dienstnummer",
        "Echte Polizei fordert niemals Geld am Telefon",
        "Echte Polizisten rufen von 110 an",
        "Echte Polizisten haben einen Ausweis"
      ],
      correct: 1,
      explanation:
        "Die echte Polizei fordert niemals telefonisch Geld oder Zugangsdaten."
    },
    {
      question:
        'Ein "Polizist" steht vor Ihrer Tür und will Schmuck "sicherstellen". Was tun?',
      options: [
        "Tür öffnen und Ausweis zeigen lassen",
        "Tür geschlossen lassen und 110 anrufen",
        "Durch Spion schauen ob Uniform",
        "Nachbarn holen"
      ],
      correct: 1,
      explanation: "Tür zu lassen und selbst die 110 anrufen."
    }
  ],

  bank: [
    {
      question:
        'Ihre "Bank" ruft an und braucht zur Sicherheit Ihre TAN. Richtig oder falsch?',
      scenario:
        '"Guten Tag, hier ist Ihre Sparkasse. Wir haben verdächtige Aktivitäten festgestellt. Zur Verifizierung brauchen wir eine TAN von Ihnen."',
      options: [
        "Richtig - die Bank braucht das zur Sicherheit",
        "Falsch - Banken fragen niemals nach PIN oder TAN",
        "Richtig - aber nur bei Sicherheitsproblemen",
        "Falsch - nur die PIN darf man nennen"
      ],
      correct: 1,
      explanation:
        "Banken fragen niemals nach PIN/TAN. Das ist immer verdächtig."
    },
    {
      question:
        'Sie bekommen eine SMS: "Ihr Konto wurde gesperrt. Klicken Sie hier." Was tun?',
      options: [
        "Sofort auf den Link klicken",
        "SMS löschen und Bank unter bekannter Nummer anrufen",
        "Antworten und nach Details fragen",
        "Link erst am Computer öffnen"
      ],
      correct: 1,
      explanation:
        "SMS löschen und selbst die Bank über eine bekannte Nummer kontaktieren."
    },
    {
      question: 'Woran erkennen Sie einen Betrugsversuch der "Bank"?',
      options: [
        "Zeitdruck und Drohungen",
        "Unbekannte Telefonnummer",
        "Forderung nach PIN/TAN",
        "Alle genannten Punkte"
      ],
      correct: 3,
      explanation:
        "Zeitdruck, unbekannte Nummer und Nachfrage nach Zugangsdaten sind Warnzeichen."
    }
  ],

  allgemein: [
    {
      question: "Was ist der beste Schutz vor Telefonbetrug?",
      options: [
        "Niemals ans Telefon gehen",
        "Bei Geldforderung oder Druck sofort auflegen",
        "Immer nett sein am Telefon",
        "Nur mit Verwandten sprechen"
      ],
      correct: 1,
      explanation: "Bei Druck oder Geldforderung: auflegen und prüfen."
    },
    {
      question:
        "Sie sind unsicher ob ein Anruf echt ist. Was ist am sichersten?",
      scenario:
        "Ein Anrufer behauptet, von einer Behörde zu sein und drängt Sie zu schnellem Handeln.",
      options: [
        "Dem Anrufer vertrauen",
        "Auflegen und selbst die offizielle Nummer anrufen",
        "Nachbarn um Rat fragen",
        "Zurückrufen unter der angezeigten Nummer"
      ],
      correct: 1,
      explanation:
        "Auflegen und selbst bei der offiziellen Stelle anrufen (Nummer aus verlässlicher Quelle)."
    },
    {
      question: "Welche Aussage ist richtig?",
      options: [
        "Polizei holt manchmal Geld zur Sicherheit ab",
        "Microsoft ruft bei Computerproblemen an",
        "Echte Gewinne kosten niemals Geld",
        "Banken fragen nach TAN bei Sicherheitschecks"
      ],
      correct: 2,
      explanation: "Echte Gewinne kosten nichts."
    },
    {
      question:
        'Ein Anrufer setzt Sie unter Zeitdruck: "Sie müssen jetzt entscheiden!" Was bedeutet das?',
      options: [
        "Es ist wirklich dringend",
        "Typisches Zeichen für Betrug",
        "Seriöses Angebot",
        "Ich sollte schnell handeln"
      ],
      correct: 1,
      explanation: "Zeitdruck ist ein typisches Betrugszeichen."
    },
    {
      question: "Was sollten Sie niemals am Telefon weitergeben?",
      options: ["Ihren Vornamen", "PIN, TAN, Passwörter", "Ihre Stadt", "Dass Sie zu Hause sind"],
      correct: 1,
      explanation:
        "PIN, TAN und Passwörter niemals am Telefon nennen."
    }
  ]
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeCheckPage();
  initializeLearnPage();
  initializeQuizPage();
  initializeReportPage();
  initializeAdminPage();
  initializePWA();
  loadStats();
});

// Navigation
function initializeNavigation() {
  const navBtns = document.querySelectorAll(".nav-btn");

  navBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      switchPage(page);

      navBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

function switchPage(pageName) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  const selectedPage = document.getElementById(`${pageName}-page`);
  if (selectedPage) {
    selectedPage.classList.add("active");
    appState.currentPage = pageName;
  }
}

// Check Page
function initializeCheckPage() {
  const checkBtn = document.getElementById("check-btn");
  const phoneInput = document.getElementById("phone-input");

  checkBtn.addEventListener("click", () => checkNumber());
  phoneInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkNumber();
  });
}

async function checkNumber() {
  const input = document.getElementById("phone-input");
  const number = input.value.trim();

  if (!number) {
    alert("Bitte geben Sie eine Telefonnummer ein");
    return;
  }

  showLoading();

  // Supabase if available, else fallback to local analyzeNumber
  let result;
  try {
    if (window.DB && typeof window.DB.checkNumber === "function") {
      result = await window.DB.checkNumber(number);
    } else {
      result = analyzeNumber(number);
    }
  } catch (e) {
    console.warn("DB check failed, using fallback:", e);
    result = analyzeNumber(number);
  }

  hideLoading();
  displayCheckResult(result);

  appState.stats.totalChecks++;
  saveStats();
}

function analyzeNumber(number) {
  const whitelisted = database.whitelist.find((item) => item.number === number);
  if (whitelisted) {
    return {
      status: "safe",
      title: "Sicher",
      reason: `Offizielle Nummer: ${whitelisted.name}`,
      category: "Offizielle Nummer",
      action: "Sie können diese Nummer annehmen."
    };
  }

  const blacklisted = database.blacklist.find((item) => item.number === number);
  if (blacklisted) {
    const categoryNames = {
      enkeltrick: "Enkeltrick",
      polizei: "Falsche Polizisten",
      gewinnspiel: "Gewinnspiel-Betrug",
      bank: "Bank-Betrug",
      schock: "Schockanruf",
      techsupport: "Tech-Support"
    };

    return {
      status: "danger",
      title: "Betrug gemeldet",
      reason: `Diese Nummer wurde bereits ${blacklisted.reports} mal gemeldet.`,
      category: `Kategorie: ${categoryNames[blacklisted.category] || "Unbekannt"}`,
      action: "Auflegen, nicht zurückrufen, Nummer blockieren."
    };
  }

  return {
    status: "warning",
    title: "Unbekannt",
    reason: "Diese Nummer ist noch nicht in der Datenbank.",
    category: "Achten Sie auf: Geldforderung, Zeitdruck, Geheimhaltung",
    action: "Bei Verdacht auflegen. Wenn möglich hier melden."
  };
}

function displayCheckResult(result) {
  const resultDiv = document.getElementById("check-result");
  const resultCard = resultDiv.querySelector(".result-card");

  const statusEl = resultCard.querySelector(".result-status");
  statusEl.className = `result-status ${result.status}`;
  statusEl.textContent = ""; // keep it as a bar, no text

  resultCard.querySelector(".result-title").textContent = result.title;
  resultCard.querySelector(".result-reason").textContent = result.reason;
  resultCard.querySelector(".result-category").textContent = result.category;
  resultCard.querySelector(".result-action").textContent = result.action;

  resultDiv.classList.remove("hidden");
  resultDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Learn Page
function initializeLearnPage() {
  const learnCards = document.querySelectorAll(".learn-card");
  const backBtn = document.querySelector(".back-btn");

  learnCards.forEach((card) => {
    card.addEventListener("click", () => {
      const topic = card.dataset.topic;
      showLearnDetail(topic);
    });
  });

  if (backBtn) {
    backBtn.addEventListener("click", hideLearnDetail);
  }
}

function showLearnDetail(topic) {
  const content = learningContent[topic];
  if (!content) return;

  const detailDiv = document.getElementById("learn-detail");
  const contentDiv = detailDiv.querySelector(".detail-content");

  contentDiv.innerHTML = content.content;

  document.querySelector(".learn-grid").style.display = "none";
  detailDiv.classList.remove("hidden");
  detailDiv.scrollIntoView({ behavior: "smooth" });
}

function hideLearnDetail() {
  document.getElementById("learn-detail").classList.add("hidden");
  document.querySelector(".learn-grid").style.display = "grid";
  document.querySelector(".page-header").scrollIntoView({ behavior: "smooth" });
}

// Quiz Page
function initializeQuizPage() {
  const topicBtns = document.querySelectorAll(".quiz-topic-btn");
  const nextBtn = document.getElementById("quiz-next");
  const restartBtn = document.getElementById("quiz-restart");
  const reviewBtn = document.getElementById("quiz-review");

  topicBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      startQuiz(btn.dataset.quiz);
    });
  });

  nextBtn.addEventListener("click", nextQuestion);
  restartBtn.addEventListener("click", resetQuiz);
  reviewBtn.addEventListener("click", () => resetQuiz());
}

function startQuiz(topic) {
  appState.currentQuiz = topic;
  appState.currentQuestion = 0;
  appState.quizScore = 0;
  appState.quizAnswers = [];

  document.getElementById("quiz-start").style.display = "none";
  document.getElementById("quiz-container").classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  const questions = quizQuestions[appState.currentQuiz];
  const question = questions[appState.currentQuestion];

  document.getElementById("current-q").textContent = appState.currentQuestion + 1;
  document.getElementById("total-q").textContent = questions.length;
  document.getElementById("question-text").textContent = question.question;

  const progress = (appState.currentQuestion / questions.length) * 100;
  document.querySelector(".progress-fill").style.width = `${progress}%`;

  const scenarioDiv = document.getElementById("quiz-scenario");
  if (question.scenario) {
    scenarioDiv.textContent = question.scenario;
    scenarioDiv.classList.remove("hidden");
  } else {
    scenarioDiv.classList.add("hidden");
  }

  const optionsDiv = document.getElementById("quiz-options");
  optionsDiv.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionBtn = document.createElement("button");
    optionBtn.className = "quiz-option";
    optionBtn.type = "button";
    optionBtn.textContent = option;
    optionBtn.addEventListener("click", () => selectAnswer(index));
    optionsDiv.appendChild(optionBtn);
  });

  document.getElementById("quiz-feedback").classList.add("hidden");
  document.getElementById("quiz-next").classList.add("hidden");
}

function selectAnswer(selectedIndex) {
  const questions = quizQuestions[appState.currentQuiz];
  const question = questions[appState.currentQuestion];
  const options = document.querySelectorAll(".quiz-option");

  options.forEach((opt) => opt.classList.add("disabled"));

  options[selectedIndex].classList.add("selected");

  const isCorrect = selectedIndex === question.correct;

  if (isCorrect) {
    options[selectedIndex].classList.add("correct");
    appState.quizScore++;
  } else {
    options[selectedIndex].classList.add("incorrect");
    options[question.correct].classList.add("correct");
  }

  const feedbackDiv = document.getElementById("quiz-feedback");
  feedbackDiv.className = `quiz-feedback ${isCorrect ? "correct" : "incorrect"}`;
  feedbackDiv.innerHTML = `
    <h3>${isCorrect ? "Richtig" : "Falsch"}</h3>
    <p>${question.explanation}</p>
  `;
  feedbackDiv.classList.remove("hidden");

  document.getElementById("quiz-next").classList.remove("hidden");

  appState.quizAnswers.push({
    question: question.question,
    selected: selectedIndex,
    correct: question.correct,
    isCorrect: isCorrect
  });
}

function nextQuestion() {
  const questions = quizQuestions[appState.currentQuiz];

  if (appState.currentQuestion < questions.length - 1) {
    appState.currentQuestion++;
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const questions = quizQuestions[appState.currentQuiz];
  const percentage = (appState.quizScore / questions.length) * 100;

  let message = "";
  if (percentage === 100) {
    message = "Sehr gut. Alles richtig.";
  } else if (percentage >= 80) {
    message = "Gute Leistung. Sie kennen die wichtigsten Regeln.";
  } else if (percentage >= 60) {
    message = "Okay. Die Lernmodule helfen beim Wiederholen.";
  } else {
    message = "Bitte wiederholen Sie die Lernmodule und versuchen Sie es nochmal.";
  }

  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("quiz-results").classList.remove("hidden");
  document.getElementById("final-score").textContent = appState.quizScore;
  document.getElementById("total-q").textContent = questions.length;
  document.getElementById("results-message").textContent = message;

  appState.stats.totalQuizzes++;
  saveStats();
}

function resetQuiz() {
  document.getElementById("quiz-results").classList.add("hidden");
  document.getElementById("quiz-start").style.display = "block";
  appState.currentQuiz = null;
}

// Report Page
function initializeReportPage() {
  const submitBtn = document.getElementById("submit-report");
  const newReportBtn = document.getElementById("new-report");

  submitBtn.addEventListener("click", submitReport);
  newReportBtn.addEventListener("click", resetReportForm);
}

async function submitReport() {
  const phone = document.getElementById("report-phone").value.trim();
  const category = document.getElementById("report-category").value;
  const details = document.getElementById("report-details").value.trim();

  if (!phone) {
    alert("Bitte geben Sie eine Telefonnummer ein");
    return;
  }

  showLoading();

  let success = false;
  try {
    if (window.DB && typeof window.DB.reportNumber === "function") {
      success = await window.DB.reportNumber(phone, category, details);
    } else {
      // local fallback
      database.reports.push({ phone, category, details, createdAt: Date.now() });
      success = true;
    }
  } catch (e) {
    console.error("Report failed:", e);
    success = false;
  }

  hideLoading();

  if (success) {
    document.querySelector(".report-form").style.display = "none";
    document.querySelector(".report-info").style.display = "none";
    document.getElementById("report-success").classList.remove("hidden");

    appState.stats.totalReports++;
    if (category) appState.reportsByCategory[category]++;
    saveStats();
  } else {
    alert("Fehler beim Melden der Nummer");
  }
}

function resetReportForm() {
  document.getElementById("report-phone").value = "";
  document.getElementById("report-category").value = "";
  document.getElementById("report-details").value = "";

  document.querySelector(".report-form").style.display = "block";
  document.querySelector(".report-info").style.display = "flex";
  document.getElementById("report-success").classList.add("hidden");
}

// Admin Page
function initializeAdminPage() {
  const adminTabs = document.querySelectorAll(".admin-tab");

  adminTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.tab;

      adminTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      document.querySelectorAll(".admin-tab-content").forEach((content) => {
        content.classList.remove("active");
      });
      document.getElementById(`${tabName}-tab`).classList.add("active");

      if (tabName === "stats") {
        updateStatsDisplay();
      } else if (tabName === "numbers") {
        updateNumbersList();
      }
    });
  });

  updateStatsDisplay();

  const refreshBtn = document.getElementById("refresh-numbers");
  if (refreshBtn) refreshBtn.addEventListener("click", () => updateNumbersList());

  const searchInput = document.getElementById("number-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const term = searchInput.value.trim();
      updateNumbersList(term);
    });
  }
}

async function updateStatsDisplay() {
  let stats = { totalReports: appState.stats.totalReports, totalNumbers: 0, byCategory: {} };
  let allNumbers = [];

  try {
    if (window.DB && typeof window.DB.getStatistics === "function") {
      stats = await window.DB.getStatistics();
      allNumbers = await window.DB.getAllNumbers();
    } else {
      // local fallback
      stats.totalReports = database.reports.length;
      stats.byCategory = database.reports.reduce((acc, r) => {
        const k = r.category || "sonstiges";
        acc[k] = (acc[k] || 0) + 1;
        return acc;
      }, {});
      stats.totalNumbers = database.blacklist.length;
      allNumbers = database.blacklist.map((b) => ({
        phone: b.number,
        category: b.category,
        reports_count: b.reports
      }));
    }
  } catch (e) {
    console.warn("Stats load failed:", e);
  }

  document.getElementById("total-checks").textContent = appState.stats.totalChecks;
  document.getElementById("total-reports").textContent = stats.totalReports ?? appState.stats.totalReports;
  document.getElementById("total-quizzes").textContent = appState.stats.totalQuizzes;
  document.getElementById("blacklist-count").textContent = stats.totalNumbers ?? appState.stats.blacklistCount;

  displayCategoryStats(stats.byCategory || {});
  displayRecentNumbers((allNumbers || []).slice(0, 5));
}

async function updateNumbersList(searchTerm = "") {
  const listDiv = document.getElementById("numbers-list");
  if (!listDiv) return;

  listDiv.innerHTML = '<p style="padding: 2rem; text-align: center;">Lade Daten...</p>';

  try {
    let numbers = [];

    if (window.DB) {
      numbers = searchTerm
        ? await window.DB.searchNumbers(searchTerm)
        : await window.DB.getAllNumbers();
    } else {
      // local fallback
      const all = database.blacklist.map((b) => ({
        phone: b.number,
        category: b.category,
        reports_count: b.reports
      }));

      if (searchTerm) {
        numbers = all.filter((n) => n.phone.includes(searchTerm));
      } else {
        numbers = all;
      }
    }

    if (!numbers || numbers.length === 0) {
      listDiv.innerHTML = '<p style="padding: 2rem; text-align: center;">Keine Nummern gefunden</p>';
      return;
    }

    listDiv.innerHTML = "";

    numbers.forEach((num) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "number-item";

      const categoryLabel = getCategoryName(num.category);
      const count = num.reports_count ?? 0;

      const status =
        count >= 5 ? "danger" :
        count >= 3 ? "warning" :
        "safe";

      const statusLabel =
        status === "danger" ? "Gefahr" :
        status === "warning" ? "Verdächtig" :
        "Unauffällig";

      itemDiv.innerHTML = `
        <div>
          <strong>${num.phone}</strong><br>
          <small>${categoryLabel} | ${count} Meldungen | ${statusLabel}</small>
        </div>
      `;

      listDiv.appendChild(itemDiv);
    });
  } catch (err) {
    console.error("Fehler beim Laden der Nummern:", err);
    listDiv.innerHTML =
      '<p style="padding: 2rem; text-align: center;">Fehler beim Laden (RLS/Netzwerk).</p>';
  }
}

function removeFromBlacklist(number) {
  const index = database.blacklist.findIndex((item) => item.number === number);
  if (index > -1) {
    database.blacklist.splice(index, 1);
    updateNumbersList();
    appState.stats.blacklistCount = database.blacklist.length;
    saveStats();
  }
}

// Stats Management
function saveStats() {
  localStorage.setItem("betrugsschutz_stats", JSON.stringify(appState.stats));
  localStorage.setItem("betrugsschutz_categories", JSON.stringify(appState.reportsByCategory));
}

function loadStats() {
  const savedStats = localStorage.getItem("betrugsschutz_stats");
  const savedCategories = localStorage.getItem("betrugsschutz_categories");

  if (savedStats) {
    appState.stats = JSON.parse(savedStats);
  }

  if (savedCategories) {
    appState.reportsByCategory = JSON.parse(savedCategories);
  }

  updateStatsDisplay();
}

// PWA Functions
function initializePWA() {
  let deferredPrompt;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    const installPrompt = document.getElementById("install-prompt");
    if (!installPrompt) return;

    installPrompt.classList.remove("hidden");

    const installBtn = document.getElementById("install-btn");
    if (installBtn) {
      installBtn.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
        installPrompt.classList.add("hidden");
      });
    }

    const closeBtn = document.querySelector(".install-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        installPrompt.classList.add("hidden");
      });
    }
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").catch((err) => {
      console.log("Service Worker registration failed:", err);
    });
  }
}

// Utility Functions
function showLoading() {
  const el = document.getElementById("loading");
  if (el) el.classList.remove("hidden");
}

function hideLoading() {
  const el = document.getElementById("loading");
  if (el) el.classList.add("hidden");
}

// Make removeFromBlacklist globally available
window.removeFromBlacklist = removeFromBlacklist;

// Admin UI helpers (no emojis)
function displayCategoryStats(byCategory) {
  const list = document.getElementById("category-list");
  if (!list) return;

  list.innerHTML = "";

  const categories = [
    { key: "enkeltrick", name: "Enkeltrick" },
    { key: "polizei", name: "Falsche Polizisten" },
    { key: "schock", name: "Schockanruf" },
    { key: "bank", name: "Bank-Betrug" },
    { key: "techsupport", name: "Tech-Support" },
    { key: "gewinnspiel", name: "Gewinnspiel" },
    { key: "sonstiges", name: "Sonstiges" }
  ];

  categories.forEach((cat) => {
    const count = byCategory[cat.key] || 0;
    const item = document.createElement("div");
    item.className = "category-item";
    item.innerHTML = `
      <span style="flex: 1;">${cat.name}</span>
      <span style="font-weight: 700;">${count}</span>
    `;
    list.appendChild(item);
  });
}

function displayRecentNumbers(numbers) {
  const list = document.getElementById("recent-numbers");
  if (!list) return;

  list.innerHTML = "";

  if (!numbers || numbers.length === 0) {
    list.innerHTML = "<p>Noch keine Nummern gemeldet</p>";
    return;
  }

  numbers.forEach((num) => {
    const item = document.createElement("div");
    item.style.cssText = "padding: 10px; border-bottom: 1px solid #eee;";
    item.innerHTML = `
      <strong>${num.phone}</strong><br>
      <small>${getCategoryName(num.category)} - ${num.reports_count ?? 0} Meldungen</small>
    `;
    list.appendChild(item);
  });
}

function getCategoryName(category) {
  const names = {
    enkeltrick: "Enkeltrick",
    polizei: "Falsche Polizisten",
    schock: "Schockanruf",
    bank: "Bank-Betrug",
    techsupport: "Tech-Support",
    gewinnspiel: "Gewinnspiel",
    sonstiges: "Sonstiges"
  };
  return names[category] || "Unbekannt";
}
