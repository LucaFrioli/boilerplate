import app from './app.js';

const port = 3000;
app.listen(port, () => {
	console.log(`Servidor iniciado na porta ${port}`);
	console.log(`Acesse: http://localhost:${port}/api para endpoints da api`);
	console.log(
		`Acesse: http://localhost:${port} para acessar o conteúdo da pasta dist`,
	);
});
