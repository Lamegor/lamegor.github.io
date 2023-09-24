// Функция для генерации случайного пароля
function generatePassword(length) {
    const charset_a = "abcdefghijklmnopqrstuvwxyz";
    const charset_A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charset_0 = "0123456789";
    const charset_$ = "!@#$%^&*()_+{}[]|<>?";

    let charset_Final = "";

    if (document.getElementById('checkbox_a').checked) {
        charset_Final += charset_a;
    }
    if (document.getElementById('checkbox_A').checked) {
        charset_Final += charset_A;
    }
    if (document.getElementById('checkbox_0').checked) {
        charset_Final += charset_0;
    }
    if (document.getElementById('charset_$').checked) {
        charset_Final += charset_$;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset_Final.length);
        password += charset_Final.charAt(randomIndex);
    }
    return password;
}

// Обработчик события нажатия на кнопку
document.getElementById("generateButton").addEventListener("click", function () {
    const passwordInput = document.getElementById("passwordInput");
    let length = document.getElementById("passLength").value;
    const generatedPassword = generatePassword(length); // Длина пароля 12 символов (можно изменить)
    passwordInput.value = generatedPassword; // Выводим сгенерированный пароль в поле ввода
});

function calculatePasswordEntropy(password) {
    const charset_a = "abcdefghijklmnopqrstuvwxyz";
    const charset_A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charset_0 = "0123456789";
    const charset_$ = "!@#$%^&*()_+{}[]|<>?";
    var charset = 0; // Размер алфавита (ASCII символов)
    var is_a = false; // Есть ли в пароле буквы в нижнем регистре
    var is_A = false; // Есть ли в пароле буквы в верхнем регистре
    var is_0 = false; // Есть ли в пароле цифры
    var is_$ = false; // Есть ли в пароле спецсимволы
    for (var i = 0; i < password.length; i++) {
      /* Проверяем каждый символ пароля на принадлежность к тому или иному типу */
      if (!is_a && charset_a.indexOf(password[i]) != -1) is_a = true;
      else if (!is_A && charset_A.indexOf(password[i]) != -1) is_A = true;
      else if (!is_0 && charset_0.indexOf(password[i]) != -1) is_0 = true;
      else if (!is_$ && charset_$.indexOf(password[i]) != -1) is_$ = true;
    }
    if (is_a) charset += 26; // Если в пароле есть символы в нижнем регистре, то увеличиваем рейтинг сложности
    if (is_A) charset += 26; // Если в пароле есть символы в верхнем регистре, то увеличиваем рейтинг сложности
    if (is_0) charset += 10; // Если в пароле есть цифры, то увеличиваем рейтинг сложности
    if (is_$) charset += 20; // Если в пароле есть спецсимволы, то увеличиваем рейтинг сложности
    const length = password.length;

    if (length === 0) {
        return 0; // Пароль пустой
    }

    let entropy = 0;
    for (let i = 0; i < length; i++) {
        const charCode = password.charCodeAt(i);
        if (charCode >= 33 && charCode <= 126) {
            entropy += Math.log2(charset); // Добавляем логарифм размера алфавита
        }
    }
    

    return entropy;
}

function updateProgressBar() {
    const passwordInput = document.getElementById("passwordCheck");
    const progressBar = document.getElementById("progressBar");
    const strengthText = document.getElementById("strengthText");

    const password = passwordInput.value;
    const entropy = calculatePasswordEntropy(password);
    const maxEntropy = 128; // Максимальная энтропия (примерное значение)

    const strengthPercentage = (entropy / maxEntropy) * 100;
    progressBar.style.width = strengthPercentage + "%";
    progressBar.setAttribute("aria-valuenow", strengthPercentage);

    // Определение уровня сложности и добавление класса с цветом
    if (entropy < 40) {
        strengthText.textContent = "Слабый";
        progressBar.classList.remove("moderate", "strong", "ikit");
        progressBar.classList.add("weak");
    } else if (entropy < 80) {
        strengthText.textContent = "Средний";
        progressBar.classList.remove("weak", "strong", "ikit");
        progressBar.classList.add("moderate");
    } else if (entropy < maxEntropy){
        strengthText.textContent = "Сильный";
        progressBar.classList.remove("weak", "moderate", "ikit");
        progressBar.classList.add("strong");
    } else {
        strengthText.textContent = "ИКИТ";
        progressBar.classList.remove("weak", "moderate", "strong");
        progressBar.classList.add("ikit");
    }
}


var infoButton = document.getElementById("infoGenButton");
var infoModal = document.getElementById("infoModal");
var closeButton = document.getElementsByClassName("close")[0];

// При клике на кнопку "Инфо", показываем всплывающее окно
infoButton.onclick = function() {
    infoModal.style.display = "block";
    setTimeout(function() {
        infoModal.style.opacity = "1"; // Плавно устанавливаем непрозрачность в 1
    }, 10);
}

// При клике на кнопку закрытия, скрываем всплывающее окно
closeButton.onclick = function() {
    infoModal.style.opacity = "0"; // Плавно устанавливаем непрозрачность в 0
    setTimeout(function() {
        infoModal.style.display = "none";
    }, 300); // Добавляем задержку для плавного закрытия
}

// При клике вне всплывающего окна, скрываем его
window.onclick = function(event) {
    if (event.target == infoModal) {
        infoModal.style.opacity = "0"; // Плавно устанавливаем непрозрачность в 0
        setTimeout(function() {
            infoModal.style.display = "none";
        }, 300); // Добавляем задержку для плавного закрытия
    }
}
