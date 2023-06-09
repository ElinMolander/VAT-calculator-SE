
const inklusiveInput = document.getElementById ("inklusive-Input")
const exklusiveInput = document.getElementById ("exlusive-Input")
const momsDisplay = document.getElementById ("moms-display")
const moms25Btn = document.getElementById ("moms25")
const moms12Btn = document.getElementById ("moms12")
const moms6Btn = document.getElementById ("moms6")
const copyInklusiveBtn = document.getElementById ("copyInklusiveBtn")
const copyExlusiveBtn = document.getElementById ("copyExlusiveBtn")
const copyMomssummaBtn = document.getElementById ("copyMomssummaBtn")
const copyAllBtn = document.getElementById ("copy-allBtn")

let activeVAT = 1.25
let activeInputfield 
let activeBtn = moms25Btn
let sumMoms = "0,00"

momsDisplay.textContent = sumMoms

moms25Btn.addEventListener("click",setNewVAT)
moms25Btn.vat = 1.25

moms12Btn.addEventListener("click",setNewVAT)
moms12Btn.vat = 1.12

moms6Btn.addEventListener("click",setNewVAT)
moms6Btn.vat = 1.06

exklusiveInput.addEventListener("input", function(){
    calculateInklusive(activeVAT)
    activeInputfield = exklusiveInput
})

inklusiveInput.addEventListener("input", function(){
    calculateExklusive(activeVAT)
    activeInputfield = inklusiveInput
})

function setNewVAT(event){
    activeBtn.classList.remove("active")
    activeBtn = event.currentTarget
    event.currentTarget.classList.add("active")
    activeVAT = activeBtn.vat
    recalculateFields()
}

function recalculateFields(){
    if (activeInputfield === inklusiveInput){
        calculateExklusive(activeVAT)
    } else {
        calculateInklusive(activeVAT)
    }
}

function calculateInklusive(vat){
    const input =  exklusiveInput.value
    const sum = vat * input
    const result = sum.toFixed(2)
    inklusiveInput.value = result 
    const momsSumma = (result - input).toFixed(2).toString()
   
    momsDisplay.textContent = momsSumma.replace(".",",")
}

function calculateExklusive(vat){
    const input = inklusiveInput.value
    const sum = input / vat
    const result = sum
    exklusiveInput.value = result.toFixed(2)
    const momsSumma = (input - result).toFixed(2).toString()
    
    momsDisplay.textContent = momsSumma.replace(".",",")
}

copyInklusiveBtn.addEventListener("click", function(){
    navigator.clipboard.writeText(inklusiveInput.value.replace(".",","))
})

copyExlusiveBtn.addEventListener("click", function(){
    navigator.clipboard.writeText(exklusiveInput.value.replace(".",","))
})

copyMomssummaBtn.addEventListener("click",function(){
    navigator.clipboard.writeText(momsDisplay.textContent.replace(".",","))
})

copyAllBtn.addEventListener("click", function(){
    let values = inklusiveInput.value.replace(".",",") + " " + exklusiveInput.value.replace(".",",") + " " + momsDisplay.textContent.replace(".",",")
    navigator.clipboard.writeText(values)
})






