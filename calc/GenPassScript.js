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