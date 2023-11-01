/*
    ----------------------------------------------------------------------------   2024 pay plan   ---------------------
    Base Salary = 12.04% of auctual sales
    
    Years of service
    0-4 = 0%
    5-9 = .25%
    10-19 = .6%
    20-29 = 1.1%
    30+ = 1.5%
    
    Walmart Challenge = $500 per earning. ($6,000 MAX)
    
    Referal Bonus = $1.000 per rep
    
    Sales Increase Bonus Incentive (Back to Dollar ONE!)
        1% = .10%
        3% = .20%
        5% = 1.00%
        7% = 1.10%
        9% = 1.20%
        11% = 1.30%
        13% = 1.40%
        15% = 1.50%
        17% = 1.60%
        19% = 1.70%
        20%+ = 1.80%
        
        ------------------------------------------------------------------------------------- ADD LATER ----
        
    deductions
    
    Salary calculator too?
    New Rep = 7% of the 12.04% of last years sales
    
    New NSS accounts = 20% for first year
    
    Helper Labor Offset 
    $2.50/hr
*/

alert(`DISCLAIMER!
This web app is not maintained by Bonnie Plants, LLC. And any inaccuracies found are not the responseabbility of the company.
Contact tristan.collier@bonnieplants.com to report any issues.`)

// Take control of html elements
const stdEl = document.getElementById('std')
const targetEl = document.getElementById('target-El')
const yearsOfServiceEl = document.getElementById('years-of-service')
const walmartGrowthNumberEl = document.getElementById('walmart-growth-bonuses')
const salesRepsRefferedEl = document.getElementById('sales-Reps-referd')
const btnEl = document.getElementById('btn')
const closeBtnEl = document.getElementById('close-btn')
const modalEl = document.getElementById('overlay');
const resultEl = document.getElementById('result')
const basePayDisplayEl = document.getElementById('salary-display')
const salesIncreaseDisplayEl = document.getElementById('above-target')
const salesRepsRefferedDisplayEl = document.getElementById('sales-Reps-referd-display')
const weeklyWalmartGrowthDisplayEl = document.getElementById('walmart-growth-bonuses-display')
const yearsOfServiceDisplayEl = document.getElementById('years-of-service-display-el')

// Add event listeners
btnEl.addEventListener('click', calculateEarnings)
closeBtnEl.addEventListener('click', reloadPage)
closeBtnEl.addEventListener('click', calculateEarnings)

// Reload page function
function reloadPage() {
    element.classList.toggle("overlay-open");
    window.location.reload(); 
}

// Calculator function
function calculateEarnings () {

    modalEl.classList.toggle("overlay-open");

    // grab input values
    const lastYearsSales = targetEl.valueAsNumber
    const totalSales = stdEl.valueAsNumber
    const yearsOfService = yearsOfServiceEl.valueAsNumber
    const totalOfWalmartBonusesEarned = walmartGrowthNumberEl.valueAsNumber
    const salesRepsReffered = salesRepsRefferedEl.valueAsNumber

    const salesIncrease = ((totalSales - lastYearsSales) / lastYearsSales) * 100

    console.log(`Last year's sales were ${lastYearsSales}.
    This year's sales were ${totalSales}.
    The sales increase was ${salesIncrease}% over last year's sales.
    `)

    // Calculate base pay
    basePay = (12.04 / 100) * totalSales
    console.log(`Base pay is ${basePay}`)

    // Dispay base pay result in html
    basePayDisplayEl.innerHTML= '$' + basePay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    // -------------------------------------  Error check
    console.log('Calculate base pay passed the check\n  ')

    // years of service bonus
    if (yearsOfService >= 30) {
        console.log(yearsOfService)
        basePay += (1.5 / 100) * totalSales
        console.log(`Pay total is now ${basePay}`)
        const yosValue = (1.5 / 100) * totalSales
        yearsOfServiceDisplayEl.innerHTML = `$${yosValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

    } else if (yearsOfService >= 20) {
        console.log(yearsOfService)
        basePay += (1.1 / 100) * totalSales
        console.log(`Pay total is now ${basePay}`)
        const yosValue = (1.1 / 100) * totalSales
        yearsOfServiceDisplayEl.innerHTML = `$${yosValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

    } else if (yearsOfService >= 10) {
        console.log(yearsOfService)
        basePay += (0.6 / 100) * totalSales
        console.log(`Pay total is now ${basePay}`)
        const yosValue = (0.6 / 100) * totalSales
        yearsOfServiceDisplayEl.innerHTML = `$${yosValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

    } else if (yearsOfService >= 5) {
        console.log(yearsOfService)
        basePay += (0.25 / 100) * totalSales
        console.log(`Pay total is now ${basePay}`)
        const yosValue = (0.25 / 100) * totalSales
        yearsOfServiceDisplayEl.innerHTML = `$${yosValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`

    } else {
        console.log('No years of service')
        console.log(`Pay total is still ${basePay}`)
        yearsOfServiceDisplayEl.innerHTML = `$0`
    }

    // -------------------------------------  Error check
    console.log('years of service bonus passed the check\n  ')

    // Walmart station comp bonus
    if (totalOfWalmartBonusesEarned > 0 & totalOfWalmartBonusesEarned <= 12) {
        console.log(`${basePay} plus ${totalOfWalmartBonusesEarned} Walmart bonuses earned ($500) =`)
        basePay += 500 * totalOfWalmartBonusesEarned
        console.log(basePay)
        const walmartValue = 500 * totalOfWalmartBonusesEarned
        weeklyWalmartGrowthDisplayEl.innerHTML = `$${walmartValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    } else {
        weeklyWalmartGrowthDisplayEl.innerHTML = `$0`
        console.log(`No Walmart incentive earned. Pay total is still ${basePay}`)
    }

    // -------------------------------------  Error check
    console.log('Walmart station comp bonus passed the check\n  ')

    // Sales Reps refferal bonus 
    if (salesRepsReffered > 0) {
        console.log(`${basePay} plus ${salesRepsReffered} sales reps reffered ($1000) = $${salesRepsReffered * 1000}`)
        basePay += salesRepsReffered * 1000
        const repValue = salesRepsReffered * 1000
        salesRepsRefferedDisplayEl.innerHTML = `$${repValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Pay total is now ${basePay}`)
    } else {
        salesRepsRefferedDisplayEl.innerHTML = '$0'
        console.log(`No sales rep referal incentive earned. Pay total is still ${basePay}`)
    }

    // -------------------------------------  Error check
    console.log('Sales Reps refferal bonus passed the check\n  ')


    // Sales increase incentive
    if (salesIncrease >= 20) {
        console.log('20%+ sales increase detected')
        basePay += (1.80 / 100) * totalSales
        const functionResult = (1.80 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(20%+ increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.80% of total sales = $${basePay}`)

    } else if (salesIncrease >= 19) {
        console.log('19% sales increase detected')
        basePay += (1.70 / 100) * totalSales
        const functionResult = (1.70 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(19% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.70% of total sales = $${basePay}`)

    } else if (salesIncrease >= 17) {
        console.log('17% sales increase detected')
        basePay += (1.60 / 100) * totalSales
        const functionResult = (1.60 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(17% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.60% of total sales = $${basePay}`)

    } else if (salesIncrease >= 15) {
        console.log('15% sales increase detected')
        basePay += (1.50 / 100) * totalSales
        const functionResult = (1.50 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(15% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.50% of total sales = $${basePay}`)

    } else if (salesIncrease >= 13) {
        console.log('13% sales increase detected')
        basePay += (1.40 / 100) * totalSales
        const functionResult = (1.40 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(13% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.40% of total sales = $${basePay}`)

    } else if (salesIncrease >= 11) {
        console.log('11% increase detected')
        basePay += (1.30 / 100) * totalSales
        const functionResult = (1.30 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(11% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.30% of total sales = $${basePay}`)

    } else if (salesIncrease >= 9) {
        console.log('9% sales increase detected')
        basePay += (1.20 / 100) * totalSales
        const functionResult = (1.20 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(9% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.20% of total sales = $${basePay}`)

    } else if (salesIncrease >= 7) {
        console.log('7% sales increase detected')
        basePay += (1.10 / 100) * totalSales
        const functionResult = (1.10 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(7% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.10% of total sales = $${basePay}`)

    } else if (salesIncrease >= 5) {
        console.log('5% sales increase detected')
        basePay += (1.00 / 100) * totalSales
        const functionResult = (1.00 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(5% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 1.00% of total sales = $${basePay}`)

    } else if (salesIncrease >= 3) {
        console.log('3% sales increase detected')
        basePay += (0.20 / 100) * totalSales
        const functionResult = (0.20 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(3% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 0.20% of total sales = $${basePay}`)

    } else if (salesIncrease >= 1) {
        console.log('1% sales increase detected')
        basePay += (0.10 / 100) * totalSales
        const functionResult = (0.10 / 100) * totalSales
        salesIncreaseDisplayEl.innerHTML = `(1% increase) $${functionResult.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        console.log(`Base pay + 0.10% of total sales = $${basePay}`)

    } else {
        salesIncreaseDisplayEl.innerHTML = '$0'
        console.log(`No Sales increase incentive earned. Pay total is still ${basePay}`)
    }


    // -------------------------------------  Error check
    console.log('Sales increase incentive passed the check\n  ')

    console.log(basePay + '\n \nThis does not include deductions or the "20% of new NSS accounts incentive."')

    // Dispay values in html 
    resultEl.innerHTML = '$' + basePay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}