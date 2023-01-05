
document.addEventListener('DOMContentLoaded', loadDates);
const buttonClick = document.querySelector('#button_count');
const form = document.getElementById('countform');

//об'являємо section щоб привязати клас до першого елементу
const result = document.getElementById('result');
//обявляємо divи де будуть результати
const resultMeasure = document.getElementById('result_measure__list');
const resultStartDate = document.getElementById('result_date1__list');
const resultLastDate = document.getElementById('result_date2__list');

//додати дані в локал сторадж
let selectedTime = document.querySelectorAll('period__block_name');
let output;

//об'являємо дати
let date1 = document.getElementById("firstDate"); 
let date2 = document.getElementById("lastDate"); 

date1.addEventListener('submit', createStartDate);

// date2.addEventListener('change', periodSelect());


buttonClick.addEventListener('click', function (event) {
    event.preventDefault();
    TimeDifference(); 
    createStartDate();
    storeStartDateInLocalStorage();
});


buttonClick.addEventListener('dblclick', function (event) {
     localStorage.removeItem('startDate');
     localStorage.removeItem('lastDate');
     localStorage.removeItem('result');

});

function loadDates() {
    // оголошуємо змінну яка буде використовуватись для списку завдань
    let firstDates;
    let lastDates;
    let resultTime;

    // перевіряємо чи є у ЛокалСтораджі вже які данні завдань
    if(localStorage.getItem('startDate') !== null || localStorage.getItem('lastDate') !== null || localStorage.getItem('result') !== null) {
        // якщо вони там є - витягуємо їх і присвоюємо змінній
        firstDates = JSON.parse(localStorage.getItem('startDate'));
        lastDates = JSON.parse(localStorage.getItem('lastDate'));
        resultTime = JSON.parse(localStorage.getItem('result'));
    } else {
        // якщо їх там нема - присвоюємо змінній значення порожнього масиву
        firstDates = [];
        lastDates = [];
        resultTime = [];
    }

    // для кожної задачі яка є Date1
    firstDates.forEach(function(data1) {
        // створюємо елемент списку
        const li = document.createElement('li');
        // додаємо йому класс
        li.className = 'result__item_start';
        // всередині цього елементу списку створюємо текстову ноду з описом завдання
        li.appendChild(document.createTextNode(data1));
        // запихуємо цей елемент списку в список
        resultStartDate.appendChild(li);
    })
        // для кожної задачі яка є Date2
    lastDates.forEach(function(data2) {
        // створюємо елемент списку
        const li = document.createElement('li');
        // додаємо йому класс
        li.className = 'result__item_finish';
        // всередині цього елементу списку створюємо текстову ноду з описом завдання
        li.appendChild(document.createTextNode(data2));
        // запихуємо цей елемент списку в список
        resultLastDate.appendChild(li);
    })
        // для кожної задачі яка є Result
        resultTime.forEach(function(output) {
        // створюємо елемент списку
        const li = document.createElement('li');
        // додаємо йому класс
        li.className = 'result__item_measure';
        // всередині цього елементу списку створюємо текстову ноду з описом завдання
        li.appendChild(document.createTextNode(output));
        // запихуємо цей елемент списку в список
        resultMeasure.appendChild(li);
    })
}

function createStartDate(event) {
    // якщо значення в інпуті порожнє  - то не додаємо нове завдання і не даємо виконатись дефолтній поведінці
    if(date1.value.trim() === '' || date2.value.trim() === ''|| output.trim() === '') {
        event.preventDefault();
        return null;
    }

    // створюємо елемент списку
    let li = document.createElement('li');
    let liLast = document.createElement('li');
    let liResult = document.createElement('li');
    // додаємо йому класс
    li.className = 'result__item_start';
    liLast.className = 'result__item_finish';
    liResult.className = 'result__item_measure';
    // всередині цього елементу списку створюємо текстову ноду з описом завдання
    li.appendChild(document.createTextNode(date1.value));
    liLast.appendChild(document.createTextNode(date2.value));
    liResult.appendChild(document.createTextNode(output));
    // запихуємо цей елемент списку в список
    resultStartDate.appendChild(li);
    resultLastDate.appendChild(liLast);
    resultMeasure.appendChild(liResult);
    // викликаємо функцію яка буде додавати завдання до ЛокалСтораджа
    storeStartDateInLocalStorage(new Date(date1.value), new Date(date2.value), output);

    // очищуємо вміст інпуту для створення завдання
    date1.value = '';
    date2.value = '';
    // // блокуємо дефолтну поведінку сабміта
    event.preventDefault();
}

function storeStartDateInLocalStorage(data1, data2, output ) {
    // оголошуємо змінну яка буде використовуватись для списку завдань
    let firstDates;
    let lastDates;
    let resultTime;

    // перевіряємо чи є у ЛокалСтораджі вже які данні завдань
    if(localStorage.getItem('startDate') !== null || localStorage.getItem('lastDate') !== null || localStorage.getItem('result') !== null) {
        // якщо вони там є - витягуємо їх і присвоюємо змінній
        firstDates = JSON.parse(localStorage.getItem('startDate'));
        lastDates = JSON.parse(localStorage.getItem('lastDate'));
        resultTime = JSON.parse(localStorage.getItem('result'));
    } else {
        // якщо їх там нема - присвоюємо змінній значення порожнього масиву
        firstDates = [];
        lastDates = [];
        resultTime = [];
    }

    data1 = document.getElementById("firstDate").value;
    data2 = document.getElementById("lastDate").value;
    // output = output;
    // додаємо до списку нове завдання
    firstDates.push(data1);
    lastDates.push(data2);
    resultTime.push(output);
    // зберігаємо список завданнь в ЛокалСТорадж
    localStorage.setItem('startDate', JSON.stringify(firstDates));
    localStorage.setItem('lastDate', JSON.stringify(lastDates));
    localStorage.setItem('result', JSON.stringify(resultTime));
}



//function TimeDifference
function TimeDifference() {
    // periodSelect();
    const firstDate = new Date(date1.value);
    console.log(firstDate);
        
    const lastDate = new Date(date2.value);
    console.log(lastDate);
    //різницю між датами
    let difference = Math.abs((lastDate) - (firstDate));
    console.log(difference);
    let secondsTime = difference / 1000; 
    let minutesTime = difference / (1000 * 60); 
    let hoursTime = difference / (1000 * 3600); 
    let daysTime = difference / (1000 * 3600 * 24);   
    let selectBlock = document.getElementById("act__block");
    let selectedValue = selectBlock.options[selectBlock.selectedIndex].value;
    console.log(selectedValue);


    if (selectedValue === 'seconds') {
        output = secondsTime + ' seconds';
    } else if (selectedValue === 'minutes') {
        output = minutesTime  + ' minutes';
    } else if (selectedValue === 'hours') {
        output = hoursTime + ' hours';
    } else if (selectedValue === 'days') {
        output = daysTime + ' days';
    }; 
    console.log(output);
}



function daysSelected(){
    //в залежності від того який тип виведе різний результат
    if (selectedTime === "alldays") {
      TimeDifference();
    }  
   // ще не працює  
    if (selectedTime === "weekends") {

// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
// let day = new Date().getDay(); //today
// document.getElementById('addDay').addEventListener('click', function() {
//   document.getElementById("demo").innerHTML = days[day++ % 7]; // move the ++ to ++day to show tomorrow on first click
// })
        TimeDifference();
    } 
    if (selectedTime === "workdays") {       
      TimeDifference();
    }    
}


date2.addEventListener('change', periodSelect());

function periodSelect(){
    let btnMonth = document.getElementById("period__month");
    let btnWeek = document.getElementById("period__week");

          btnMonth.addEventListener('click', function(){

            date3 = new Date(date1.value);
            date3 = new Date( date3.setDate(date3.getDate() + 30)); 
            date2.value = null;
            date2.valueAsDate = date3;

        });

        btnWeek.addEventListener('click', function(){

            date3 = new Date(date1.value);
            date3 = new Date( date3.setDate(date3.getDate() + 7)); 
            date2.value = null;
            date2.valueAsDate = date3;
        });
}


