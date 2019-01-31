const express = require('express');

const server = express();
server.use(express.json());

const posts = [];

server.post('/create', async (req, res) => {
	const post = req.body;
	posts.push(post);
	if (post.name && post.age) {
		const found = posts.find(item => item.name === post.name);
		res.status(201).json(found);
	} else {
		res.status(400).end();
	}
});

server.delete('/remove', async (req, res) => {});

module.exports = server;
