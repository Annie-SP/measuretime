

const form = document.getElementById('countform');
const buttonClick = document.querySelector('#button_count');

form.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
});

let date1 = document.querySelector('#firstDate');
// Handle date changes
firstDate.addEventListener('input', function () {
  // Get the date
  let firstDate = new Date(date1.value);
  console.log(firstDate);
});

let date2 = document.querySelector('#lastDate');
// Handle date changes
lastDate.addEventListener('input', function () {
  // Get the date
  let lastDate = new Date(date2.value);
  console.log(lastDate);
});

buttonClick.addEventListener('input', function () {
    //let difference = firstDate - lastDate;
    console.log( firstDate - lastDate);
});


// let monthSelect = document.querySelector('#month');
// let weekSelect = document.querySelector('#week');


//об'являємо section щоб привязати клас до першого елементу
const result = document.querySelector('result');
const resultDiv = document.querySelector('result_d');
//обявляємо divи де будуть результати
const resultMeasure = document.querySelector('resultMeasure');
const resultDate1 = document.querySelector('resultDate1');
const resultDate2 = document.querySelector('resultDate2');
//коли ми натискаємо на кнопку


    buttonClick.addEventListener('input', count);
    //об'являємо кнопку


    function count() {
    // resultDiv.ClassList.remove('result_d');
        resultDiv.ClassList.add('result_block');
        console.log("class add");
        //повертає в result пораховані дані
        resultDate1.innerHTML  = firstDate.value;
        resultDate2.innerHTML = Date2.value;
    };

    // (function() {
    //     document.querySelector("#startDate").valueAsDate = new Date();
    //     document.querySelector("#endDate").valueAsDate = new Date();
    //     document.querySelector("#endDate").min = new Date()
    //       .toISOString()
    //       .substr(0, 10);
    //     document.querySelector("#startDate").addEventListener("change", function() {
    //       var val = this.value;
    //       document.querySelector("#endDate").min = new Date(val)
    //         .toISOString()
    //         .substr(0, 10);
    //     });
    //   })();


//       var a = document.getElementById("first").value;
// var b = document.getElementById("second").value;
// var firstDate = a.split('/');
// var secondDate = b.split('/');
// var n = new Date(firstDate[2], firstDate[0]-1, firstDate[1]);
// var p = new Date(secondDate[2], secondDate[0]-1, secondDate[1]);
// console.log("result: "+ (p-n)/(1000*60*60*24) );

// function durationBetweenDates (start, end, typeTimes) {

//     let firstDate = new Date(start);
//     let lastDate = new Date(end);
    
    
//     let difference = Math.abs((lastDate) - (firstDate));
    
//     if (typeTimes === 'seconds') {
//         return (difference / 1000 ) + ' seconds';
//     } else if (typeTimes === 'minutes') {
//         return  (difference / (1000*60) )  + ' minutes';
//     } else if (typeTimes === 'hours') {
//         return (difference / (1000 * 3600)) + ' hours';
//     } else if (typeTimes === 'days') {
//         return (difference / (1000 * 3600 * 24)) + ' days';
//     };
        
//     };
    