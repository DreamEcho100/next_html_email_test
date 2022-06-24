import * as fs from 'fs';
import * as path from 'path';

const cleanOutFromScriptsTags = async () => {
	try {
		const targetPath = path.join(__dirname, '../out/index.html');
		await fs.readFile(targetPath, { encoding: 'utf8' }, (err, data) => {
			if (err) throw err.message;

			fs.writeFileSync(targetPath, data.replace(/<script.+<\/script>/g, ''));
		});
	} catch (err) {
		console.log(err instanceof Error && err.message);
	}
};

cleanOutFromScriptsTags();
