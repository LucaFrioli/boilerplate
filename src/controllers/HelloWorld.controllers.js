export default class HelloWorld {
	index(req, res) {
		res.status(200).json({ message: 'hello, world!' });
	}
}
