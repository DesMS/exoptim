const exoptim = require(`./index.js`);
const express = require(`express`);

const app = express();

app.use(exoptim(/* Options */));

app.get(`/`, (req, res) => {
	res.sendFile(__dirname + `/index.html`);
});

app.listen(3000, () => {
	console.log(`Hello World`);
});
