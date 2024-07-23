// Задание 1

// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)

const musicCollection = {
    [0]: {
        title: "Название 1",
        artist: "Исполнитель 1",
        year: "Год выпуска 1"
    },
    [1]: {
        title: "Название 2",
        artist: "Исполнитель 2",
        year: "Год выпуска 2"
    },
    [2]: {
        title: "Название 3",
        artist: "Исполнитель 3",
        year: "Год выпуска 3"
    },
};

function makeIterable(obj) {
    if (!(Symbol.iterator in obj)) {
        obj[Symbol.iterator] = function () {
            return Object.entries(this).values();
        };
    }
    return obj;
}

for (let index = 0; index <= Object.keys(musicCollection).length - 1; index++) {
    makeIterable(musicCollection[index]);
    str = "";
    for (const [key, val] of musicCollection[index]) {
        if (key == "title") {
            str += val + " - ";
        }
        else if (key == "artist") {
            str += val + " ";
        }
        else if (key == "year") {
            str += "(" + val + ")";
        }
    }
    console.log(str);
}


// Задание 2

// Вы управляете рестораном, в котором работают разные повара, специализирующиеся на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.

// Необходимо создать систему управления этими заказами, которая позволит:

// • Отслеживать, какой повар готовит какое блюдо.
// • Записывать, какие блюда заказал каждый клиент.

// Используйте коллекции Map для хранения блюд и их поваров, а также для хранения заказов каждого клиента. В качестве ключей для клиентов используйте объекты.

// Повара и их специализации:

// Виктор - специализация: Пицца.
// Ольга - специализация: Суши.
// Дмитрий - специализация: Десерты.

// Блюда и их повара:

// Пицца "Маргарита" - повар: Виктор.
// Пицца "Пепперони" - повар: Виктор.
// Суши "Филадельфия" - повар: Ольга.
// Суши "Калифорния" - повар: Ольга.
// Тирамису - повар: Дмитрий.
// Чизкейк - повар: Дмитрий.

// Заказы:

// Клиент Алексей заказал: Пиццу "Пепперони" и Тирамису.
// Клиент Мария заказала: Суши "Калифорния" и Пиццу "Маргарита".
// Клиент Ирина заказала: Чизкейк.

const People = [
    { name: "Виктор", specialization: "Пицца" },
    { name: "Ольга", specialization: "Суши" },
    { name: "Дмитрий", specialization: "Десерты" }
];

const Food = [
    { name: "Маргарита", specialization: "Пицца" },
    { name: "Пепперони", specialization: "Пицца" },
    { name: "Филадельфия", specialization: "Суши" },
    { name: "Калифорния", specialization: "Суши" },
    { name: "Тирамису", specialization: "Десерты" },
    { name: "Чизкейк", specialization: "Десерты" }
];

function getObjByName(val, tab) {
    let res;
    tab.forEach(element => {
        if (element.name === val) {
            res = element;
        }
    });
    return res;
}

function getByValueFromMap(map, searchValue) {
    let res;
    for (let [key, value] of map.entries()) {
        value.forEach(element => {
            if (element === searchValue) {
                res = key;
            }
        });

    }
    return res;
}

const myMapPeopleFood = new Map();
let objToInsert = [];
for (let i = 0; i <= Object.keys(People).length - 1; i++) {
    for (let j = 0; j <= Object.keys(Food).length - 1; j++) {
        if (People[i].specialization == Food[j].specialization) {
            if (objToInsert[i] == null) {
                objToInsert[i] = []
            }
            objToInsert[i][objToInsert[i].length] = Food[j];
        }
    }
}

for (let index = 0; index < objToInsert.length; index++) {
    myMapPeopleFood.set(People[index], objToInsert[index]);
}

console.log(myMapPeopleFood);

const myMapOrders = new Map();

const Customers = [
    { name: "Алексей", order: ["Пепперони", "Тирамису"] },
    { name: "Мария", order: ["Калифорния", "Маргарита"] },
    { name: "Ирина", order: ["Чизкейк"] }
];

objToInsert = [];

for (let i = 0; i <= Object.keys(Customers).length - 1; i++) {
    for (let j = 0; j < Customers[i].order.length; j++) {
        if (objToInsert[i] == null) {
            objToInsert[i] = []
        }
        objToInsert[i][objToInsert[i].length] = getObjByName(Customers[i].order[j], Food);
    }
}

for (let index = 0; index < objToInsert.length; index++) {
    myMapOrders.set(Customers[index], objToInsert[index]);
}

console.log(myMapOrders);

for (let index = 0; index < myMapOrders.get(Customers[0]).length; index++) {
    console.log(myMapOrders.get(Customers[0])[index]);
    console.log(getByValueFromMap(myMapPeopleFood, myMapOrders.get(Customers[0])[index]));
}
