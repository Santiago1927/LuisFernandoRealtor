// userFetcher.js
async function fetchUsers(apiUrl) {
    const response = await fetch(apiUrl);
    return response.json();
}

// userFetcher.test.js
jest.mock('node-fetch');
const fetch = require('node-fetch');

test('fetchUsers llama a fetch y retorna datos', async () => {
    const users = [{ name: 'John Doe' }];
    fetch.mockResolvedValue({ json: () => Promise.resolve(users) });

    const result = await fetchUsers('http://example.com/api/users');
    expect(result).toEqual(users);
});
