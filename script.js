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
    (enterValue.length === 0 && num === "0") ||
    (enterValue.includes(".") && num === ".") ||
    enterValue.length > 17
  )
    return

  enterValue += num
  console.log(enterValue)
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
      break
  }
  enterValue = ""
  display.textContent = currentValue
  currentOperator = ""
}

function reset() {
  currentValue = 0
  enterValue = ""
  display.textContent = "0"
  currentOperator = ""
}

function highlightOperator(target) {
  operators.forEach((o) => o.classList.remove("is-selected"))
  target.classList.add("is-selected")
}
