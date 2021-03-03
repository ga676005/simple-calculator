const calculator = document.querySelector(".calculator-container")
const display = calculator.querySelector("[data-display]")
const operators = [...calculator.querySelectorAll("[data-operator]")]
const equals = calculator.querySelector("[data-equals]")
const allClear = calculator.querySelector("[data-all-clear]")
let enterValue = "",
  currentValue = 0,
  currentOperator = ""

calculator.addEventListener("click", handleNumberEnter)

calculator.addEventListener("click", handOperatorEnter)

equals.addEventListener("click", calculate)

allClear.addEventListener("click", reset)

function handleNumberEnter(e) {
  if (!e.target.closest("[data-num]")) return
  const num = e.target.dataset.num
  if (
    (enterValue.startsWith("0") && !enterValue.includes(".") && num === "0") || //第一個數是0，沒有小數點，輸入的數又是0
    (enterValue.includes(".") && num === ".") || //已經有小數點，又輸入小數點
    enterValue.length > 16 //字串長度
  )
    return

  if (enterValue.length === 0 && num === ".") {
    //第一個輸入是小數點的時候
    enterValue = "0."
  } else {
    if (display.textContent === "0" && num !== ".") {
      //開頭是0，輸入的值不是小數點時，用輸入的值替換掉0
      enterValue = num
    } else {
      enterValue += num
    }
  }
  // enterValue += enterValue.length === 0 && num === "." ? "0." : num
  console.log(num)
  display.textContent = enterValue
}

function handOperatorEnter(e) {
  if (!e.target.closest("[data-operator]")) return
  const operator = e.target.dataset.operator
  highlightOperator(e.target)

  if (currentOperator) {
    calculate()
  } else {
    if (enterValue.length > 0) {
      currentValue = parseFloat(enterValue)
      enterValue = ""
    }
  }

  currentOperator = operator
}

function calculate() {
  if (enterValue.length === 0) return
  operators.forEach((o) => o.classList.remove("is-selected"))

  const value = parseFloat(enterValue)
  if (value === 0) {
    reset()
    display.textContent = "無法除以零"
    return
  }

  switch (currentOperator) {
    case "+":
      currentValue += value
      break
    case "-":
      currentValue -= value
      break
    case "*":
      currentValue *= value
      break
    case "/":
      currentValue /= value
      break
    default:
      return
  }
  enterValue = ""
  display.textContent = currentValue
  currentOperator = ""
}

function reset() {
  operators.forEach((o) => o.classList.remove("is-selected"))
  currentValue = 0
  enterValue = ""
  display.textContent = "0"
  currentOperator = ""
}

function highlightOperator(target) {
  operators.forEach((o) => o.classList.remove("is-selected"))
  target.classList.add("is-selected")
}
