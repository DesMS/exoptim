const exoptim = require(`exoptim`);
const express = require(`express`);

const app = express();

app.use(exoptim({/* options */}));

app.get(`/`, (req, res) => {
	console.log(req.exip);
	res.send(`<!DOCTYPE HTML>\n<html lang="en">\n<head>\n<title>Test</title>\n</head>\n</html>`)
	// res.sendFile(__dirname + `/index.html`);
});

app.listen(3000, () => {
	console.log(`Hello World`);
});