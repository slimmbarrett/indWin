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
