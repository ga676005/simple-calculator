export default function getTests() {
  return [
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
    },
    {
      keys: '1 + 3 = + 3 Delete - 3 = ',
      expect: '1',
      message: 'Should be 1'
    },
    {
      keys: '1 + 3 = + 3 Delete Delete - 3 = ',
      expect: '-3',
      message: 'Should be -3'
    },
    {
      keys: '1 + 1 = = ',
      expect: '3',
      message: 'Should be 3'
    },
    {
      keys: '1 - 1 = = ',
      expect: '-1',
      message: 'Should be -1'
    },
    {
      keys: '1 * 2 = = ',
      expect: '4',
      message: 'Should be 4'
    },
    {
      keys: '4 / 2 = = ',
      expect: '1',
      message: 'Should be 1'
    },
    {
      keys: '1 . 0 0 0 . 0 0 0 =',
      expect: '1',
      message: 'Should be 1'
    },
    {
      keys: '+ 5 =',
      expect: '5',
      message: '+ 5 = Should be 5'
    },
    {
      keys: '1 + 5 - 3 + - * 2 = = - 5 + ',
      expect: '7',
      message: '1 + 5 - 3 + - * 2 = = - 5 + Should be 7'
    },
    {
      keys: '1 + 5 - 3 + - * 2 = = - 5 + ',
      expect: '7',
      message: '1 + 5 - 3 + - * 2 = = - 5 + Should be 1'
    },
    {
      keys: '. 5 * * 2 - = + 5 = 2 + - 3 =',
      expect: '-1',
      message: '. 5 * * 2 - = + 5 = 2 + - 3 Should be -1'
    },
    {
      keys: '2 * 5 + = - 5 = =',
      expect: '0',
      message: '2 * 5 + = - 5 = =Should be 0'
    },
    {
      keys: '+ 3 + = = ',
      expect: '3',
      message: '+ 3 + = = Should be 3'
    }, {
      keys: '+ 3 = = - = + 3 -',
      expect: '9',
      message: '+ 3 = = - = + 3 -Should be 9'
    }, {
      keys: '/ 0 =',
      expect: '無法除以零',
      message: '/ 0 = Should be 無法除以零'
    }, {
      keys: '3 - 10 - + 1 = = 6 = - 4 = = ',
      expect: '-2',
      message: '3 - 10 - + 1 = = 6 = - 4 = = Should be -2'
    }, {
      keys: 'a b c d 1 2 3 Delete + 5 - - a + 2 = ',
      expect: '7',
      message: 'a b c d 1 2 3 Delete + 5 - - a + 2 = Should be 7'
    }, {
      keys: '5 + z - 3 = = + 6 Delete Delete + 2 ',
      expect: '2',
      message: '5 + z - 3 = = + 6 Delete Delete + 2 Should be 2'
    }, {
      keys: '5 + z - 3 = = + 6 Delete Delete + 2 = ',
      expect: '2',
      message: '5 + z - 3 = = + 6 Delete Delete + 2 = Should be 2'
    }, {
      keys: '5 + z - 3 = = + 6 Delete Delete + 2 = = ',
      expect: '4',
      message: '5 + z - 3 = = + 6 Delete Delete + 2 = = Should be 4'
    },
  ]
}
