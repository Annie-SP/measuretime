'use strict';

const form = document.getElementById('countform');
const buttonClick = document.querySelector('#button_count');
//об'являємо section щоб привязати клас до першого елементу
const result = document.getElementById('result');
const resultDiv = document.querySelector('result_d');
//обявляємо divи де будуть результати
const resultMeasure = document.getElementById('resultMeasure');
const resultDate1 = document.getElementById('resultDate1');
const resultDate2 = document.getElementById('resultDate2');
//коли ми натискаємо на кнопку
//додати дані в локал сторадж


//очистити дані з кнопок, після виведення результату в таблицю


//вибрати проміжок часу


//вибрати дні
// let typeTimes = document.querySelector('period__block_input');

// typeTimes.addEventListener('checked')


form.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
});

function TimeDifference() {
    //define two variables and fetch the input from HTML form  
     let date1 = document.getElementById("firstDate").value;  
     let date2 = document.getElementById("lastDate").value;  

    //define two date object variables to store the date values  
    date1 = Date.parse(date1);
    localStorage.setItem('Date1', new Date(date1.value));
    date2 = Date.parse(date2);
    localStorage.setItem('Date2', new Date(date2.value));

    let difference = Math.abs((date2) - (date1));
    let secondsTime = difference / 1000; 
    let minutesTime = difference / (1000 * 60); 
    let hoursTime = difference / (1000 * 3600); 
    let daysTime = difference / (1000 * 3600 * 24); 
    let selectBlock = document.getElementById("act__block");
    let selectedValue = selectBlock.options[selectBlock.selectedIndex].value;
    console.log(selectedValue);
    let output;
    console.log("тип ", typeof(output));
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
    localStorage.setItem('timeBetween', output)
//повертає в result пораховані дані
    resultMeasure.innerHTML = output;
    resultDate1.innerHTML  = firstDate.value;
    resultDate2.innerHTML = lastDate.value;

};

buttonClick.addEventListener('click', function () {
    // event.preventDefault();
    result.classList.add('result_block');
    TimeDifference();
    
});

// let monthSelect = document.querySelector('#month');
// let weekSelect = document.querySelector('#week');
