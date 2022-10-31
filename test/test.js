test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});

test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

/* Bool */

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

/* Number */

test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);
  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  // expect(value).toBe(0.3); 丸め誤差が原因で期待通りに動作しない
  expect(value).toBeCloseTo(0.3);  // 正しくはこう書く
});

/* String */

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

/* Array */

test('the shopping list has milk on it', () => {
  const shoppingList = [
    'diapers',
    'kleenex',
    'trash bags',
    'paper towels',
    'milk',
  ];
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
})

/* Exception */

test('compiling android goes as expected', () => {
  function compileAndroidCode() {
    throw new Error('you are using the wrong JDK!');
  }

  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);
  // 
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK!');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
  // 
  expect(() => compileAndroidCode()).not.toThrow(/^you are using the wrong JDK$/);
  expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/);
});

/* Promise */

function peanutButter(s = '') {
  return new Promise((resolve, reject) => {
    if (s === 'peanut') {
      setTimeout(() => {
        resolve(s += ' butter');
      }, 1000);
    }
    else {
      reject('Error: s is not "peanut"');
    }
  });
}

test('the data is peanut butter', () => {
  peanutButter('peanut')
    .then(data => expect(data).toBe('peanut butter'));
});

/* Async/Await */

test('the data is peanut butter', async () => {
  const data = await peanutButter('peanut');
  expect(data).toBe('peanut butter');
  expect(peanutButter('peanut')).resolves.toBe('peanut butter');
});

test('the peanutButter fails with an error', async () => {
  expect.assertions(2);
  try {
    await peanutButter('asdf');
  }
  catch (e) {
    expect(e).toMatch('Error');
  }
  await expect(peanutButter('asdf')).rejects.toMatch('Error');
});

/* Callback */

function callbackPeanutButter(callback, type = true) {
  setTimeout(() => {
    let s = (type) ? 'peanut butter' : 'asdf';

    s === 'peanut butter'
      ? callback(null, s)
      : callback('Error: s is not "peanut butter"', s)
  }, 1000);
}

test('the data is peanut butter', (done) => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe('peanut butter');
      done();
    }
    catch (error) {
      done(error);
    }
  }
  callbackPeanutButter(callback, true);
});
