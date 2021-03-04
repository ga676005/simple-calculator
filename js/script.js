const calculator = document.querySelector('.calculator-container')
const display = calculator.querySelector('[data-display]')
const operators = [...calculator.querySelectorAll('[data-operator]')]
const equals = calculator.querySelector('[data-equals]')
const clearBtn = calculator.querySelector('[data-all-clear]')
let enterValue = '',
  currentValue = 0,
  currentOperator = ''

calculator.addEventListener('click', handleNumberEnter)

calculator.addEventListener('click', handOperatorEnter)

equals.addEventListener('click', calculate)

clearBtn.addEventListener('click', handleClear)

function handleNumberEnter(e) {
  if (!e.target.closest('[data-num]')) return
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
}

function handOperatorEnter(e) {
  if (!e.target.closest('[data-operator]')) return
  const operator = e.target.dataset.operator
  highlightOperator(e.target)

  if (currentOperator) {
    calculate()
  } else {
    if (enterValue.length > 0) {
      currentValue = parseFloat(enterValue)
      enterValue = ''
    }
  }

  currentOperator = operator
}

function calculate() {
  if (enterValue.length === 0) return
  operators.forEach((o) => o.classList.remove('is-selected'))

  const value = parseFloat(enterValue)

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
      currentValue = value
      display.textContent = currentValue

      return
  }

  currentValue *= 1
  enterValue = ''
  display.textContent = currentValue
  currentOperator = ''
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
  display.textContent = '0'
  currentOperator = ''
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
  // console.log(clickedKeys)
  clickedKeys.forEach((key) => {
    const button = calculator.querySelector(`[data-key="${key.trim()}"]`)
    // console.log(button)
    button?.click()
  })
}

function getDisplayValue() {
  return calculator.querySelector('[data-display]').textContent
}

function resetCalc() {
  click('ac ac')
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
function runTest({ keys, expect, message } = {}) {
  if (!keys || !expect || !message) return
  click(keys)
  console.assert(getDisplayValue() === expect, message)
  resetCalc()
}

const tests = [
  {
    keys: '1 2 3 - 1 0 0 = ',
    expect: '23',
    message: 'Should be 23'
  },
  {
    keys: '1  0  0  /  0  = ',
    expect: '無法除以零',
    message: 'Should be 無法除以零'
  },
  {
    keys: '* 1 = ',
    expect: '0',
    message: 'Should be 0'
  },
  {
    weirdTest: true,
    ksd: 'app'
  },
  {
    keys: '.',
    expect: '0.',
    message: 'Should be 0.'
  },
  {
    keys: '. . .',
    expect: '0.',
    message: 'Should be 0.'
  },
  {
    keys: '. =',
    expect: '0',
    message: 'Should be 0'
  },
  {
    keys: '5 . =',
    expect: '5',
    message: 'Should be 5'
  },
  {
    keys: '. 3 =',
    expect: '0.3',
    message: 'Should be 0.3'
  },
  {
    keys: '1 + 1 + 1 + 1',
    expect: '1',
    message: 'Should be 1'
  },
  {
    keys: '1 + 1 + 1 + 1 =',
    expect: '4',
    message: 'Should be 4'
  },
  {
    keys: '1 - 1 - 1 - 1',
    expect: '1',
    message: 'Should be 1'
  },
  {
    keys: '1 - 1 - 1 - 1 =',
    expect: '-2',
    message: 'Should be -2'
  },
  {
    keys: '2 * 2 * 2',
    expect: '2',
    message: 'Should be 2'
  },
  {
    keys: '2 * 2 * 2 =',
    expect: '8',
    message: 'Should be 8'
  },
  {
    keys: '2 / 2 / 2 ',
    expect: '2',
    message: 'Should be 2'
  },
  {
    keys: '2 / 2 / 2 =',
    expect: '0.5',
    message: 'Should be 0.5'
  },
  {
    keys: '1 + 3 * 2 / 4',
    expect: '4',
    message: 'Should be 4'
  },
  {
    keys: '1 + 3 * 2 / 4 =',
    expect: '2',
    message: 'Should be 2'
  },
  {
    keys: '1 + 3 * 2 / 4 = 1 2 3',
    expect: '123',
    message: 'Should be 123'
  },
  {
    keys: '1 + 3 * 2 / 4 = 1 2 3 =',
    expect: '123',
    message: 'Should be 123'
  },
  {
    keys: '1 + 3 * 2 / 4 = 1 + = ',
    expect: '1',
    message: 'Should be 1'
  },
  {
    keys: '1 + 3 * 2 / 4 = 1 + = 5 = ',
    expect: '6',
    message: 'Should be 6'
  }
]

tests.forEach(runTest)
