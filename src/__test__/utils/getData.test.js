import getData from '../../utils/getData';

describe('Fetch API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('Llamar una API y retornar datos', () => {
    fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));

    fetch.mock;

    getData('https://google.com')
      .then((response) => {
        expect(response.data).toEqual('12345');
      });
    expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
  });

  test('Llamar fallar la llamada a la API', () => {
    fetch.mockRejectOnce(JSON.stringify({ message: 'ERR0R' }));

    fetch.mock;

    getData('https://google.com')
      .catch((error) => {
        expect(error.message).toEqual('12345');
      });
    expect(fetch.mock.calls[0][0]).toEqual('https://google.com');
  });

});
