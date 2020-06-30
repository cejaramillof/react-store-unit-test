afterEach(() => {
  console.log('Despues de cada prueba');
});

afterAll(() => {
  console.log('Despues de todas las pruebas');
});

beforeEach(() => {
  console.log('Antes de cada prueba');
});

beforeAll(() => {
  console.log('Antes de todas las pruebas');
});

const text = 'Hola Mundo';

test('Debe contener un texto', () => {
  expect(text).toMatch(/Hola/);
});

const fruits = ['manzana', 'melon', 'banana'];

test('¿Tenemos una banana?', () => {
  expect(fruits).toContain('banana');
});

test('Mayor que', () => {
  expect(10).toBeGreaterThan(9);
});

test('Verdadero', () => {
  expect(true).toBeTruthy();
});

const reverseString = (str, callback) => {
  callback(
    str
      .split('')
      .reverse()
      .join('')
  );
};

test('Probar un callback', () => {
  reverseString('Hola', str => expect(str).toBe('aloH'));
});

const reverseStringPromise = str => {
  return new Promise((resolve, reject) => {
    if (!str || str == '') {
      reject(new Error('Error'));
    } else {
      resolve(
        str
          .split('')
          .reverse()
          .join('')
      );
    }
  });
};

test('Probar una promesa', () => {
  return reverseStringPromise('Hola').then(string => expect(string).toBe('aloH'));
});

test('Probar async/await', async () => {
  const string = await reverseStringPromise('hola');
  expect(string).toBe('aloh');
});

const animals = [
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🐻',
  '🐼',
  '🐨',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
];

const randomAnimalString = () => {
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return animal;
};

describe('Probar funcionalidades de randomAnimals', () => {
  test('Probar la funcionalidad', () => {
    expect(typeof randomAnimalString()).toBe('string');
  });

  test('Probar que no existe un animal', () => {
    expect(randomAnimalString()).not.toMatch(/🦓/);
  });
});
