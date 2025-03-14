import { readdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import path, { basename, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Obtém o caminho do arquivo atual e o diretório base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definição dos caminhos principais
const mainPaths = {
	migrations: resolve(__dirname, 'src', 'database', 'migrations'),
};

// Função para trocar a extensão dos arquivos dentro do diretório especificado
async function changeExtension(dir, oldExt, newExt) {
	try {
		const files = await readdir(dir); // Lê os arquivos do diretório

		for (const file of files) {
			const filePath = join(dir, file); // Caminho completo do arquivo
			const status = await stat(filePath); // Obtém informações do arquivo

			// Verifica se é um caminho e a extensão ainda é a antiga
			if (status.isFile() && extname(file) === oldExt) {
				// Novo caminho com a nova extensão
				const newFilePath = join(dir, basename(file, oldExt) + newExt);

				if (filePath !== newFilePath) {
					const content = await readFile(filePath, 'utf-8'); // Lê o conteúdo do arquivo
					// Adciona um cabeçalho de regra do eslint ao conteúdo
					const newContent =
						'/* eslint-disable import/no-commonjs */\n' + content;

					// Sobrescreve o conteúddo antigo com o conteúdo novo
					await writeFile(filePath, newContent, 'utf8');
					// Troca finalmente  a extenção do arquivo, salvando-o com a nova
					await rename(filePath, newFilePath);
					// Mostra o resultado da troca de extensão para maior expressividade
					console.info(
						`Renomeado: ${file} -> ${basename(newFilePath)}`,
					);
				}
			}
		}

		console.log('Troca de extenção concluida com sucesso!');
	} catch (e) {
		console.error(e);
	}
}

changeExtension(mainPaths.migrations, '.js', '.cjs');
