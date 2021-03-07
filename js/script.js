import getTests from './tests.js'
const calculator = document.querySelector('.calculator-container')
const display = calculator.querySelector('[data-display]')
const operators = [...calculator.querySelectorAll('[data-operator]')]
const equals = calculator.querySelector('[data-equals]')
const clearBtn = calculator.querySelector('[data-clear]')
let enterValue = '',
  currentValue = 0,
  currentOperator = '',
  lastValue,
  lastOperator

document.addEventListener('keydown', e => {
  if (e.repeat) return
  const button = e.key === "Enter"
    ? equals
    : calculator.querySelector(`[data-key="${e.key}"]`)
  button?.click()

  // 解決運算符號按了沒框起來
  if (button?.hasAttribute('data-operator')) highlightOperator(button)
})

calculator.addEventListener('click', handleNumberEnter)

calculator.addEventListener('click', handOperatorEnter)

equals.addEventListener('click', calculate)

clearBtn.addEventListener('click', handleClear)

function handleNumberEnter(e) {
  if (!e.target.closest('[data-num]')) return
  lastValue = null

  const num = e.target.dataset.num
  if (
    (enterValue.startsWith('0') && !enterValue.includes('.') && num === '0') ||
    //第一個數是0，沒有小數點，輸入的數又是0
    (enterValue.includes('.') && num === '.') ||
    //已經有小數點，又輸入小數點
    enterValue.length > 16
    //限制字串長度
  )
    return //出現以上情形不給輸入數字

  if (enterValue.length === 0 && num === '.') {
    //第一個輸入是小數點的時候
    enterValue = '0.'
  } else {
    if (display.textContent === '0' && num !== '.') {
      //開頭是0，輸入的值不是小數點時，用輸入的值替換掉0
      enterValue = num
    } else {
      enterValue += num
    }
  }
  clearBtn.textContent = 'CE'
  display.textContent = enterValue

  if (!currentOperator) display.dataset.display = ``
}

function handOperatorEnter(e) {
  if (!e.target.closest('[data-operator]')) return
  lastOperator = null //按過運算符號就不要再 = = = 累計
  const operator = e.target.dataset.operator
  highlightOperator(e.target)

  if (currentOperator) {
    // 數字 運算符號 數字 運算符號 會跑到這
    calculate()

    // calculate會又把lastOperator加上，處理5 + 10 + = = = 不要連加
    lastOperator = null
  } else {
    if (enterValue.length > 0) {
      currentValue = parseFloat(enterValue)
      enterValue = ''
    }
  }
  currentOperator = operator
  display.dataset.display = `${currentValue} ${currentOperator}`
}

function calculateAgain() {
  const expressionStr = getExpressionString(currentValue, lastOperator, lastValue)
  switch (lastOperator) {
    case '+':
      currentValue += lastValue
      break
    case '-':
      currentValue -= lastValue
      break
    case '*':
      currentValue *= lastValue
      break
    case '/':
      if (lastValue === 0) {
        reset()
        display.textContent = '無法除以零'
        return
      }
      currentValue /= lastValue
      break
  }
  display.dataset.display = expressionStr
  display.textContent = currentValue
}

function getExpressionString(firstValue, operator, secondValue) {
  return `${firstValue} ${operator} ${secondValue} =`
}

function calculate() {
  if (enterValue.length === 0) {
    if (lastValue && lastOperator) calculateAgain()
  } else {
    operators.forEach((o) => o.classList.remove('is-selected'))
    const value = parseFloat(enterValue)
    const expressionStr = getExpressionString(currentValue, currentOperator, value)

    switch (currentOperator) {
      case '+':
        currentValue += value
        break
      case '-':
        currentValue -= value
        break
      case '*':
        currentValue *= value
        break
      case '/':
        if (value === 0) {
          reset()
          display.textContent = '無法除以零'
          return
        }
        currentValue /= value
        break
      default:
        // 沒按加減乘除直接按 = 的時候，把5.變成5，1.000000變成1
        currentValue = value
        display.textContent = currentValue
        return
    }
    //Save value for calculate again
    lastValue = value
    lastOperator = currentOperator

    //update value
    enterValue = ''
    display.dataset.display = expressionStr
    display.textContent = currentValue
    currentOperator = ''
  }
}

function handleClear() {
  if (clearBtn.textContent === 'CE') {
    enterValue = ''
    display.textContent = '0'
    clearBtn.textContent = 'AC'
  } else {
    reset()
  }
}

function reset() {
  operators.forEach((o) => o.classList.remove('is-selected'))
  currentValue = 0
  enterValue = ''
  display.dataset.display = ""
  display.textContent = '0'
  currentOperator = ''
  lastValue = null
  lastOperator = null
}

function highlightOperator(target) {
  operators.forEach((o) => o.classList.remove('is-selected'))
  target.classList.add('is-selected')
}

/**
 * 測試用: 觸發按鍵
 * @param {String} string 字元之間要用空格隔開
 */
function click(string) {
  const clickedKeys = string.split(' ').filter((entry) => entry !== '')
  clickedKeys.forEach((key) => {
    const button = calculator.querySelector(`[data-key="${key.trim()}"]`)
    button?.click()
  })
}

function press(string) {
  const pressedKeys = string.split(' ').filter((entry) => entry !== '')
  pressedKeys.forEach((key) => {
    const button = calculator.querySelector(`[data-key="${key.trim()}"]`)
    button?.click()
  })
}

function getDisplayValue() {
  return calculator.querySelector('[data-display]').textContent
}

function resetCalc() {
  click('Delete Delete')
  console.assert(currentValue === 0, 'currentValue should be 0 after reset')
  console.assert(
    enterValue === '',
    'enterValue should be empty string after reset'
  )
  console.assert(enterValue === '', 'display should show 0 after reset')
  console.assert(
    currentOperator === '',
    'currentOperator should be empty string after reset'
  )
}

/**
 * 跑測試
 * @param {Object} testObject
 * keys: "1 + 2 =", expect: "result", message: "description"
 */
function runClickTest({ keys, expect, message } = {}) {
  if (!keys || !expect || !message) return
  click(keys)
  console.assert(getDisplayValue() === expect, message)
  resetCalc()
}

function runPressTest({ keys, expect, message } = {}) {
  if (!keys || !expect || !message) return
  press(keys)
  console.assert(getDisplayValue() === expect, message)
  resetCalc()
}


const tests = getTests()

tests.forEach(runClickTest)
tests.forEach(runPressTest)