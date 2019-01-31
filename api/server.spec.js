const request = require('supertest');
const server = require('./server');

describe('POST /create endpoint', () => {
	it('should respond with status code 201', async () => {
		let response = await request(server)
			.post('/create')
			.send({ id: 1, name: 'Randy BoBandy', age: 45 });

		expect(response.status).toBe(201);
	});

	it('should respond with 400 if no name or age field', async () => {
		let response = await request(server)
			.post('/create')
			.send({ id: 2, name: 'Mr. Lahey' });

		expect(response.status).toBe(400);

		response = await request(server)
			.post('/create')
			.send({ age: 190 });
		expect(response.status).toBe(400);
	});

	it('should respond with created item', async () => {
		let response = await request(server)
			.post('/create')
			.send({ id: 3, name: 'Bubbles', age: 41 });

		expect(response.body).toEqual({ id: 3, name: 'Bubbles', age: 41 });
	});
});

describe('DELETE /remove endpoint', () => {
	it('should respond with status code 200', async () => {
		const id = 1;
		let response = await request(server).delete(`/remove/${id}`);

		expect(response.status).toBe(200);
	});
	it('should respond with status 500 if no id', async () => {
		const id = 145;
		let response = await request(server).delete(`/remove/${id}`);

		expect(response.status).toBe(404);
	});
});
