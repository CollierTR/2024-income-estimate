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

function returnTierIncentive(incentiveValue, incentiveDict) {
    const counter = 0
    const tier = 0
    const keys = Object.keys(incentiveDict)
    const keyLength = keys.length
    
    while (counter < keyLength) {
        const val = keys[-counter-1]
        const low_bound = keys[-counter-2]
        if (incentiveValue >= val) {
            tier = val
            break;
	
        } else if (incentiveValue >= low_bound) {
            tier = low_bound
            break;
	}
        counter += 1
    }
    return [tier, incentiveDict.tier]
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
    const baseRate = .1204
    const basePay = baseRate * totalSales
    console.log(`Base pay is ${basePay}`)

    // Dispay base pay result in html
    basePayDisplayEl.innerHTML= '$' + basePay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    // -------------------------------------  Error check
    console.log('Calculate base pay passed the check\n  ')

    // Dictionary of Years-of-Service Incentives
    const serviceIncentives = {
	    0: 0,
	    5: 0.0025,
	    10: .006,
	    20: .011,
	    30: .015
    }

    // Converts years of service to nearest incentive tier
    const yosPercent = returnTierIncentive(yearsOfService, serviceIncentives)[1]
    console.log(yearsOfService)

    // Calculating Incentive for Those with 5+ YOS
    if (yosPercent == 0) {
        console.log(`Pay total is still ${basePay}`)
        yearsOfServiceDisplayEl.innerHTML = `$0`
    
    } else {
        const yosValue = yosPercent * totalSales
        basePay += yosValue
        
        console.log(`Pay total is now ${basePay}`)
        yearsOfServiceDisplayEl.innerHTML = `$${yosValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    }

    // -------------------------------------  Error check
    console.log('years of service bonus passed the check\n  ')

    // Walmart station comp bonus
    if (totalOfWalmartBonusesEarned > 0) {
	const walmartValue = Math.min(500 * totalOfWalmartBonusesEarned, 6000)
        console.log(`${basePay} plus ${totalOfWalmartBonusesEarned} Walmart bonuses earned ($500) =`)
        basePay += walmartValue
        console.log(basePay)
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
    const increaseIncentives = {
	    0: 0,
	    1: 0.001,
	    3: 0.002,
	    5: 0.01,
	    7: .011,
	    9: .012,
	    11: .013,
	    13: .014,
	    15: .015,
	    17: .016,
	    19: .017,
	    20: .018
    }
	
    const [increaseTier, increasePercent] = returnTierIncentive(salesIncrease, increaseIncentives)
    if (increasePercent == 0) {
    		salesIncreaseDisplayEl.innerHTML = '$0'
        	console.log(`No Sales increase incentive earned. Pay total is still ${basePay}`)
	} else {
		console.log('${increaseTier}% sales increase detected')

		const increaseValue = increasePercent * totalSales
        	basePay += increaseValue
	        salesIncreaseDisplayEl.innerHTML = `(${increaseTier}% increase) $${increaseValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
	        console.log(`Base pay + ${increasePercent*100}% of total sales = $${basePay}`)
	}
    

    // -------------------------------------  Error check
    console.log('Sales increase incentive passed the check\n  ')

    console.log(basePay + '\n \nThis does not include deductions or the "20% of new NSS accounts incentive."')

    // Dispay values in html 
    resultEl.innerHTML = '$' + basePay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
