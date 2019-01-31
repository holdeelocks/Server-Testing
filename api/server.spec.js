const request = require('supertest');
const server = require('./server');

describe('POST /create', () => {
	it('should respond with status code 201', async () => {
		let response = await request(server)
			.post('/create')
			.send({ name: 'Randy BoBandy', age: 45 });

		expect(response.status).toBe(201);
	});

	it('should respond with 400 if no name or age field', async () => {
		let response = await request(server)
			.post('/create')
			.send({ name: 'Mr. Lahey' });

		expect(response.status).toBe(400);

		response = await request(server)
			.post('/create')
			.send({ age: 190 });
		expect(response.status).toBe(400);
	});

	it('should respond with created item', async () => {
		let response = await request(server)
			.post('/create')
			.send({ name: 'Bubbles', age: 41 });

		expect(response.body).toEqual({ name: 'Bubbles', age: 41 });
	});
});
