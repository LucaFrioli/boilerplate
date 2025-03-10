import { useEffect, useState } from 'react';

function Teste() {
	const [mensagem, setMensagem] = useState(''); // Estado para armazenar a resposta da API

	useEffect(() => {
		async function fetchData() {
			const url = '/api/helloWorld';
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}
				const json = await response.json();
				setMensagem(json.message); // Atualiza o estado com a resposta da API
			} catch (e) {
				console.error(e.message);
				setMensagem('Erro ao buscar dados.');
			}
		}

		fetchData();
	}, []); // O array vazio faz com que o efeito rode apenas uma vez (quando o componente for montado)

	return (
		<>
			<h1>Esta página é para fazer um teste sobre o router</h1>
			<p>A página diz: {mensagem}</p>
		</>
	);
}

export default Teste;
