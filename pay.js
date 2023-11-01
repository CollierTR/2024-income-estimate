

// Take control of html elements
let std = document.getElementById('std');
let targetEl = document.getElementById('target-El');
let deductionsInputValue = document.getElementById('deductions');


//-- Variables to get target ids

// Bonus
var safety = (0.25 / 100) * totalSalesInput;
var rookie = 1000;

//-- Add event listeners
std.addEventListener('input', () => {
    totalSalesInput = std.valueAsNumber;
});
var totalSalesInput = std.valueAsNumber;

targetEl.addEventListener('input', () => {
    target = targetEl.valueAsNumber;
});
var target = targetEl.valueAsNumber;

deductionsInputValue.addEventListener('input', () => {
    deductionsInput = deductionsInputValue.valueAsNumber;
});
var deductionsInput = deductionsInputValue.valueAsNumber;


//-- This variable will display total earnings
var income = 0;

// Update aboveTargetIncentive based on the latest totalSalesInput value
aboveTargetIncentive = (18.4 / 100) * (totalSalesInput - target);

var element = document.getElementById('overlay');

function generatePay() {

    element.classList.toggle("overlay-open");

    let rookieEl = document.getElementById('rookie');
    var rookieInput = rookieEl.value;

    let safetyEl = document.getElementById('safety');
    var safetyInput = safetyEl.value;

    // Calculate safety value using totalSalesInput
    var safety = (0.25 / 100) * totalSalesInput;

    //--Pay plan
    var baseSalary = (8.62 / 100) * target;
    var belowTargetIncentive = (2.60 / 100) * target;
    var aboveTargetIncentive = (18.4 / 100) * (totalSalesInput - target);

    income += baseSalary + belowTargetIncentive;

    if (totalSalesInput > target) {
        income += aboveTargetIncentive;
        document.getElementById('above-target').innerText = '$' + aboveTargetIncentive.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    if (safetyInput === 'YES') {
        income += safety;
        document.getElementById('safety-display').innerText = '$' + safety.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        document.getElementById('safety-display').innerText = '$' + "0";
    }

    if (rookieInput === "YES") {
        income += rookie;
    }

    income -= deductionsInput;

    /*
    // Testing 
    console.log("Safety = " + safety);
    console.log('Rookie = ' + rookie);
    console.log('Salary = ' + baseSalary); 
    console.log('<Incentive = ' + belowTargetIncentive); 
    console.log('>Incentive = ' + aboveTargetIncentive); 
    console.log('Income = ' + income); 
    */

   /*
    document.getElementById('result').innerText = '$' + income.toFixed(2);
    document.getElementById('salary-display').innerText = '$' + baseSalary.toFixed(2);
    document.getElementById('below-target').innerText = '$' + belowTargetIncentive.toFixed(2);
    */

    document.getElementById('result').innerText = '$' + income.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('salary-display').innerText = '$' + baseSalary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById('below-target').innerText = '$' + belowTargetIncentive.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    income = 0;
}

function reloadPage() {
    window.location.reload(); 
}