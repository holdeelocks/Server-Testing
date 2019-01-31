const express = require('express');

const server = express();
server.use(express.json());

const posts = [];

server.post('/create', async (req, res) => {
	const post = req.body;
	if (post.name && post.age) {
		posts.push(post);
		const found = posts.find(item => item.name === post.name);
		res.status(201).json(found);
	} else {
		res.status(400).end();
	}
});

server.delete('/remove/:id', async (req, res) => {
	const { id } = req.params;
	let index = posts.findIndex(post => post.id === parseInt(id, 10));
	if (index !== -1) {
		const removed = posts.splice(index, 1);
		console.log(removed[0], posts);
		res.status(200).json(removed[0]);
	} else {
		res.status(404).end();
	}
});

module.exports = server;
