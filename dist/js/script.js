'use strict'

document.addEventListener('DOMContentLoaded', loadDates);
const buttonClick = document.querySelector('#button_count');

const buttonClean = document.getElementById('button_clean');
const form = document.getElementById('countform');

//об'являємо section щоб привязати клас до першого елементу
const result = document.getElementById('result');
//обявляємо divи де будуть результати
let resultMeasure = document.getElementById('result_measure__list');
let resultStartDate = document.getElementById('result_date1__list');
let resultLastDate = document.getElementById('result_date2__list');

const timeRadioButtons = document.querySelectorAll('input[name="typeTime"]');

//додати дані в локал сторадж
let selectedTime = document.querySelectorAll('period__block_name');
let output;

//об'являємо дати
let date1 = document.getElementById("firstDate"); 
let date2 = document.getElementById("lastDate"); 


date1.addEventListener('change', setAtrrMin);
date1.addEventListener('click', periodSelect());
date2.addEventListener('change', setAtrrMax);

buttonClick.addEventListener('click', function (event) {
    event.preventDefault();
    TimeDifference(); 
    createStartDate();
    storeStartDateInLocalStorage();
});


buttonClean.addEventListener('click', function (event) {
    event.preventDefault();
    removeAllDatesFromLocalStorage();
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

    // console.log('output near trim', output.value);
    // якщо значення в інпуті порожнє  - то не додаємо нове завдання і не даємо виконатись дефолтній поведінці
    if(date1.value.trim() === '' || date2.value.trim() === '' || output.trim() === '' ) {
        event.preventDefault();
        return null;
    }
// || output.trim() === ''
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

    // // очищуємо вміст інпуту для створення завдання
    date1.value = '';
    date2.value = '';

    // // // блокуємо дефолтну поведінку сабміта
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

function removeAllDatesFromLocalStorage() {
    localStorage.clear();
    resultMeasure ='';
    resultStartDate = '';
    resultLastDate = '';
}


function setAtrrMin(){
    date2.removeAttribute('disabled'); 
    date2.setAttribute("min", date1.value);
}

function setAtrrMax(){
    date1.setAttribute("max", date2.value);
}


function periodSelect(){
    let btnMonth = document.getElementById("period__month");
    let btnWeek = document.getElementById("period__week");

          btnMonth.addEventListener('click', function(event){
            event.preventDefault();
            let date3 = new Date(date1.value);
            date3 = new Date( date3.setDate(date3.getDate() + 30)); 
            date2.value = null;
            date2.valueAsDate = date3;
        });

        btnWeek.addEventListener('click', function(event){
            event.preventDefault();
            let date3 = new Date(date1.value);
            date3 = new Date( date3.setDate(date3.getDate() + 7)); 
            date2.value = null;
            date2.valueAsDate = date3;
        });
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
    let weekTime = difference / (1000 * 3600 * 24 * 7); 
    
    let selectBlock = document.getElementById("act__block");
    let selectedValue = selectBlock.options[selectBlock.selectedIndex].value;
    console.log(selectedValue);
    timeSelect(); 


    //якщо обрані всі дні
    if (selectedTime === "alldays") {
         if (selectedValue === 'seconds') {
        output = secondsTime + ' seconds';
        } else if (selectedValue === 'minutes') {
            output = minutesTime  + ' minutes';
        } else if (selectedValue === 'hours') {
            output = hoursTime + ' hours';
        } else if (selectedValue === 'days') {
            output = daysTime + ' days';
        }; 
        console.log('alldays output',output);
    }  

    //якщо обрано вихідні
    if (selectedTime === "weekends") {  
        let weekend = Math.floor((lastDate.getDay() + daysTime) / 7);

        if (selectedValue === 'days') {
                output =  2 * weekend + (firstDate.getDay() == 0) - (lastDate.getDay() == 6) + ' days';
        } else if (selectedValue === 'seconds') {
            output = (2 * weekend + (firstDate.getDay() == 0) - (lastDate.getDay() == 6))*24*60*60 + ' seconds';
        } else if (selectedValue === 'minutes') {
            output =  (2 * weekend + (firstDate.getDay() == 0) - (lastDate.getDay() == 6))*24*60 + ' minutes';
        } else if (selectedValue === 'hours') {
            output =  (2 * weekend + (firstDate.getDay() == 0) - (lastDate.getDay() == 6))*24 + ' hours';
        }; 

        console.log('weekends output',output);
    }

   // якщо обрано Будні дні 
    if (selectedTime === "workdays") {           
            let weekDay1 = firstDate.getDay(); // day of week
            let weekDay2 = lastDate.getDay();

        weekDay1 = (weekDay1 == 0) ? 7 : weekDay1; // change Sunday from 0 to 7
        weekDay2 = (weekDay2 == 0) ? 7 : weekDay2;

        weekDay1 = (weekDay1 > 5) ? 5 : weekDay1; // only count weekdays
        weekDay2 = (weekDay2 > 5) ? 5 : weekDay2;

        weekTime = Math.floor(weekTime);


        if (weekDay1 <= weekDay2) {
            if (selectedValue === 'days') {
                output =  (weekTime * 5) + (weekDay2 - weekDay1) + ' days';
            } else if (selectedValue === 'seconds') {
                output = ((weekTime * 5) + (weekDay2 - weekDay1) )* 24 * 60 * 60 + ' seconds';
            } else if (selectedValue === 'minutes') {
                output =  ((weekTime * 5) + (weekDay2 - weekDay1)) * 24 *60 + ' minutes';
            } else if (selectedValue === 'hours') {
                output = ((weekTime * 5) + (weekDay2 - weekDay1)) * 24 + ' hours';
            }
            output = output ;
        }
        console.log('workdays output',output);

    }

}

function timeSelect(){
    for (const timeRadioButton of timeRadioButtons) {
        if (timeRadioButton.checked) {
            selectedTime = timeRadioButton.value;
            break;
         }
     }
}
