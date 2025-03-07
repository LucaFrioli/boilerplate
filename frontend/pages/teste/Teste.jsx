async function Teste() {
	const url = '/api/helloWorld';
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		console.log(json);
	} catch (e) {
		console.error(e.message);
	}

	return (
		<>
			<h1>Esta página é para fazer um teste sobre o router</h1>
			<p>a página diz: </p>
		</>
	);
}

export default Teste;
