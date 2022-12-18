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
let selectedTime;

//очистити дані з кнопок, після виведення результату в таблицю

//вибрати проміжок часу


//вибрати дні
// function periodTimes(){
//     let typeTimes = document.querySelectorAll('period__block_input');

//     for (let i = 0; i < typeTimes.length; i++)
//         if (typeTimes[i].checked){
//             period = typeTimes[i].value;
//             break;
//         }
//         console.log(period);
// }

form.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
});

let date1 = document.getElementById("firstDate");  
let date2 = document.getElementById("lastDate"); 

date1.addEventListener('change', ()=> {
    date1 = new Date(date1.value);
            console.log('date1value', date1);
            
            date1 = new Date( date1.setDate(date1.getDate())); 
            console.log('date1value+7', date1);
            date2.value = null;
            date2.valueAsDate = date1;
            date2.setAttribute("min", date2.valueAsDate);
});

function periodSelect(){
    let btnMonth = document.getElementById("period__month");
    let btnWeek = document.getElementById("period__week");

          btnMonth.addEventListener('click', function(){
            date1 = new Date(date1.value);
            console.log('date1value', date1);
            
            date1 = new Date( date1.setDate(date1.getDate() + 30)); 
            console.log('date1value+30', date1);
            date2.value = null;
            date2.valueAsDate = date1;
            //date2.value = date2; 
            console.log('date2', date2);
            console.log('date2', date2.value);
        });

        btnWeek.addEventListener('click', function(){
            date1 = new Date(date1.value);
            console.log('date1value', date1);
            
            date1 = new Date( date1.setDate(date1.getDate() + 7)); 
            console.log('date1value+7', date1);
            date2.value = null;
            date2.valueAsDate = date1;
        });

// active second date only after first
date2.setAttribute("disabled", "true"); 

    date1.onclick = function(e)
    {
        if(e.target == date1)
        {
            date2.removeAttribute("disabled");
        }
        else
            date2.setAttribute("disabled", "true");
          
    };

}

date1.addEventListener('click', periodSelect());



//function TimeDifference

function TimeDifference() {
    // //об'являємо дати 
    // let date1 = document.getElementById("firstDate");  
    // let date2 = document.getElementById("lastDate");  
   // date2.setAttribute("disabled", "true");

    //переобразуємо їх
    date1 = Date.parse(date1.value);
    localStorage.setItem('Date1', new Date(date1));
    date2 = Date.parse(date2.value);
    localStorage.setItem('Date2', new Date(date2));
    //різницю між датами
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
    timeSelect();
    //в залежності від того який тип виведе різний результат
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
    }  
   // ще не працює  
    if (selectedTime === "weekends") {
        if (selectedValue === 'seconds') {
            output = secondsTime + ' seconds';
        } else if (selectedValue === 'minutes') {
            output = minutesTime  + ' minutes';
        } else if (selectedValue === 'hours') {
            output = hoursTime + ' hours';
        } else if (selectedValue === 'days') {
            output = daysTime + ' days';
        };  
    } 
    if (selectedTime === "workdays") {
       
        if (selectedValue === 'seconds') {
            output = secondsTime + ' seconds';
        } else if (selectedValue === 'minutes') {
            output = minutesTime  + ' minutes';
        } else if (selectedValue === 'hours') {
            output = hoursTime + ' hours';
        } else if (selectedValue === 'days') {
            output = outputDays + ' days';
        };  
    }    
    console.log(output);
    localStorage.setItem('timeBetween', output)
//повертає в result пораховані дані
    resultMeasure.innerHTML = output;
    resultDate1.innerHTML  = firstDate.value;
    resultDate2.innerHTML = lastDate.value;
     
};

// let dayWeek = [7, 1, 2, 3, 4, 5, 6][date1.getDay()];
// console.log(dayWeek);


//
// function getWeekDay(date) {
//     let days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
//   if (days[0] )
//     return days[date.getDay()] - days[date.getDay()];
//   }


// let days = [
//     'Неділя',
//     'Понеділок',
//     'Вівторок',
//     'Середа',
//     'Четвер',
//     'Пятниця',
//     'Субота'
//   ];
//   var d = new Date(date1);
//   var n = d.getDay();
//   console.log(days[n]);

//without weekends
// function workDays(){
//     const daysWithOutWeekEnd = [];
//     for (let currentDate = new Date(date1); 
//     currentDate <= date2; 
//     currentDate.setDate(currentDate.getDate() + 1)) {
//     console.log('currentDate', currentDate);
//     if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
//         daysWithOutWeekEnd.push(new Date(currentDate));
//     }
//     }
//     daysWithOutWeekEnd.length-1;
//     console.log( daysWithOutWeekEnd.length-1);
// }
// let outputDays = workDays();
// console.log( 'outputDays', outputDays);


const timeRadioButtons = document.querySelectorAll('input[name="typeTime"]');

function timeSelect(){
    for (const timeRadioButton of timeRadioButtons) {
        if (timeRadioButton.checked) {
            selectedTime = timeRadioButton.value;
            break;
         }
     }
}

buttonClick.addEventListener('click', function () {
    // event.preventDefault();
    result.classList.add('result_block');
    TimeDifference();
    // periodTimes();
    
});

// let monthSelect = document.querySelector('#month');
// let weekSelect = document.querySelector('#week');


// const firstDate = new Date("December 16, 2022");
// const secondDate = new Date("December 21, 2022");
// const daysWithOutWeekEnd = [];
// for (var currentDate = new Date(firstDate); 
// currentDate <= secondDate; 
// currentDate.setDate(currentDate.getDate() + 1)) {
//    console.log(currentDate);
//   if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
//     daysWithOutWeekEnd.push(new Date(currentDate));
//   }
// }
// console.log( daysWithOutWeekEnd.length-1);