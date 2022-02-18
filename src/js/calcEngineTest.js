//"use strict";

//Массив типов сайта
let websiteTypes = [
    "Сайт-визитка",
    "Корпоративный информационный web-сайт",
    "Корпоративный имиджевый web-сайт",
    "Интернет-магазин",
    "Информационный сайт",
    "Игровой портал",
    "Контент-проект",
    "Промо-сайт",
    "Сайт-форум",
    "Блог",
    "Персональный проект"
];
let websiteTypesTime = [
    5,
    10,
    10,
    14,
    7,
    14,
    7,
    5,
    12,
    10,
    10
]

//Массив дизайнов? (тут явно что-то не то)
let designTypes = [
    "Уникальный",
    "По шаблону"
];

let designTypesTime = [
    5,
    0
];

//(и тут тоже)
let adaptabilityTypes = [
    "Для ПК",
    "Для ПК и мобильных устройств"
];

let adaptabilityTypesTime = [
    1,
    1.5
];

//Более красивый вывод массива
function listDisplay(arr) {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        str += i + 1 + ". " + arr[i] + "\n";
    }
    return str;
};

//Ввод только для чисел
function protectedNumberInput(returnFunc, listDisplay, lowBorder, highBorder) {
    let protection = false;
    while (!protection) {
        if (returnFunc === null) {
            didUserWantToChooseWebsite = false;
            //хоть такой функции и нет, но она работает(хоть и ломает весь код)
            exit;
        }
        if ((!isNaN(parseFloat(returnFunc)) && isFinite(returnFunc)) && (lowBorder <= returnFunc && highBorder >= returnFunc)) {
            protection = true;
        } 
        else {
            returnFunc = prompt("Введите число из списка ниже!\n\n" + listDisplay, returnFunc);
        } 
    }
    return returnFunc;
};

//Хочет ли пользователь выбрать сайт?
let didUserWantToChooseWebsite = confirm("Привет! Вы зашли на сайт веб-разработчика Андрея Брауна, к сожалению, в данный момент расчет стоимости находится в процессе разработки, потому я вынужден расспросить о желаемом вас сайте прежде чем вы увидите страницу.\n\nЕсли вам не нужен сайт, нажмите \"Отмена\"");
//если хочет, то идет сбор данных
if (didUserWantToChooseWebsite) {
    let calcEngine = {
        typeWebsite: protectedNumberInput(prompt("Какой тип сайта вам нужен?\n\nВведите номер сайта:\n" + listDisplay(websiteTypes)), listDisplay(websiteTypes), 1, websiteTypes.length), 
        designWebsite: protectedNumberInput(prompt("Какой дизайн сайта вам нужен?\n\nВведите номер дизайна:\n" + listDisplay(designTypes)), listDisplay(designTypes), 1, designTypes.length),
        adaptabilityWebsite: protectedNumberInput(prompt("Для какого устройства вам нужен сайт?\n\nВведите номер дизайна:\n" + listDisplay(adaptabilityTypes)), listDisplay(adaptabilityTypes), 1, adaptabilityTypes.length)
    };  

    let time = websiteTypesTime[calcEngine.typeWebsite - 1] * adaptabilityTypesTime[calcEngine.adaptabilityWebsite - 1] + designTypesTime[calcEngine.designWebsite - 1];
    let price = time * 400;

    let doesUserAgree = confirm("Выбранные вами параметры:\nТип сайта: " + websiteTypes[calcEngine.typeWebsite - 1] + "\nДизайн: " + designTypes[calcEngine.designWebsite - 1] + "\nАдаптивность: " + adaptabilityTypes[calcEngine.adaptabilityWebsite - 1] + "\n\nСроки: " + time + " дней\nЦена: " + price + " рублей");
    if (doesUserAgree) {
        alert("Типо переход на страничку оплаты\n(возможно это уже лишнее)")
    }
};
