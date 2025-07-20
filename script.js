// Языки
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" }
];

// Тексты для двух языков
const translations = {
  en: {
    register: "Register in channel",
    referral: "🎉 Here's the referral link to our partner! 🎉\n\n🚨 Important warning!🚨\n\nIf you don't register using this link, the bot may show incorrect results! ⚠️\n\nDON'T FORGET TO USE PROMO CODE - <span class='promo-code'>CashGen</span> 💸"
  },
  hi: {
    register: "चैनल में रजिस्टर करें",
    referral: "🎉 यहाँ हमारे पार्टनर का रेफरल लिंक है! 🎉\n\n🚨 महत्वपूर्ण चेतावनी!🚨\n\nयदि आप इस लिंक का उपयोग करके रजिस्टर नहीं करते हैं, तो बॉट गलत परिणाम दिखा सकता है! ⚠️\n\nप्रोमो कोड भूलना मत - <span class='promo-code'>CashGen</span> 💸"
  }
};

let currentLang = "en";

// Функция выбора языка
function selectLanguage(code) {
  currentLang = code;
  document.getElementById("language-selection").style.display = "none";
  document.getElementById("register-section").style.display = "block";
  document.getElementById("registerBtn").textContent = translations[currentLang].register;
  document.getElementById("referralText").innerHTML = translations[currentLang].referral;
}

// Навесим обработчики на языковые кнопки
window.onload = function () {
  document.getElementById("language-selection").style.display = "block";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("enBtn").onclick = function() { selectLanguage("en"); };
  document.getElementById("hiBtn").onclick = function() { selectLanguage("hi"); };

  document.getElementById("registerBtn").onclick = function () {
    window.open("https://t.me/+Xp1HJnOy_S1jZmZk", "_blank");
    // После регистрации пользователь возвращается и может играть
    document.getElementById("register-section").style.display = "none";
    document.getElementById("game-section").style.display = "block";
  };
};
// --------- PLINKO GAME CODE ---------
(function () {
  const plinkoRows = 16;
  const multipliers = [10000, 269, 23, 5, 1.9, 0.8, 0.3, 0.2, 0.1, 0.2, 0.3, 0.8, 1.9, 5, 23, 269, 10000];
  let balance = 100.00;

  const board = document.getElementById("plinko-board");
  const multDiv = document.getElementById("plinko-multipliers");
  const resultDiv = document.getElementById("plinko-result");
  const betBtn = document.getElementById("plinko-bet-btn");
  const betInput = document.getElementById("plinko-bet");
  const balanceSpan = document.getElementById("plinko-balance");

  if (!board) return; // Если plinko не на этой странице — не выполняем

  function drawBoard() {
    board.innerHTML = '';
    for (let row = 0; row < plinkoRows; row++) {
      for (let col = 0; col <= row; col++) {
        let dot = document.createElement("div");
        dot.className = "plinko-dot";
        dot.style.left = (board.offsetWidth / 2 - row * 11 + col * 22) + "px";
        dot.style.top = (row * 20 + 10) + "px";
        board.appendChild(dot);
      }
    }
    multDiv.innerHTML = '';
    multipliers.forEach(mul => {
      let d = document.createElement("div");
      d.className = "plinko-mult-cell";
      d.textContent = mul === Math.floor(mul) ? `x${mul}` : `x${mul.toFixed(1)}`;
      multDiv.appendChild(d);
    });
  }
  drawBoard();
  balanceSpan.textContent = balance.toFixed(2);

  betBtn.onclick = function () {
    resultDiv.textContent = "";
    let bet = parseFloat(betInput.value);
    if (isNaN(bet) || bet < 0.01) {
      resultDiv.style.color = "#e22";
      resultDiv.textContent = "Enter valid bet!";
      return;
    }
    if (bet > balance) {
      resultDiv.style.color = "#e22";
      resultDiv.textContent = "Not enough balance!";
      return;
    }
    resultDiv.style.color = "#38f";
    let path = 8;
    let positions = [path];
    for (let row = 0; row < plinkoRows; row++) {
      path += Math.random() < 0.5 ? -1 : 1;
      path = Math.max(0, Math.min(multipliers.length - 1, path));
      positions.push(path);
    }
    animateBall(positions, bet);
  };

  function animateBall(positions, bet) {
    let ball = document.createElement("div");
    ball.className = "plinko-ball";
    board.appendChild(ball);

    let row = 0;
    function step() {
      if (row > plinkoRows) {
        setTimeout(() => {
          board.removeChild(ball);
          showWin(positions[positions.length - 1], bet);
        }, 320);
        return;
      }
      let left = (board.offsetWidth / 2 - plinkoRows * 11 + positions[row] * 22);
      let top = (row * 20 + 2);
      ball.style.left = left + "px";
      ball.style.top = top + "px";
      row++;
      setTimeout(step, 55);
    }
    step();
  }

  function showWin(finalPos, bet) {
    let mul = multipliers[finalPos];
    let win = bet * mul;
    balance += win - bet;
    balanceSpan.textContent = balance.toFixed(2);
    resultDiv.style.color = win >= bet ? "#24e65e" : "#e22";
    resultDiv.textContent = `Your ball landed on x${mul}. You win $${win.toFixed(2)}!`;
  }
})();
