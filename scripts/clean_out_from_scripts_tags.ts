// https://nodejs.dev/learn/writing-files-with-nodejs
// https://regexr.com/

import * as fs from 'fs';
import * as path from 'path';

export const cleanOutFromScriptsTags = async () => {
	try {
		const targetPath = path.join(__dirname, '../out/index.html');
		await fs.readFile(targetPath, { encoding: 'utf8' }, (err, data) => {
			if (err) throw err.message;

			const styles: string[] = [];
			let modifiedData = data
				.replace(
					'<!DOCTYPE html>',
					'<!DOCTYPE htmlPUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
				)
				.replace('<html', '<html xmlns="http://www.w3.org/1999/xhtml" ')
				// .replace(/cellSpacing/g, 'cellspacing')
				// .replace(/cellPadding/g, 'cellpadding')
				// .replace(/charSet/g, 'charset')
				.replace(/<\s*script[^>]*>(.*?)<\s*\/\s*script>/g, '')
				.replace(
					/<\s*style[^>]*>(.*?)<\s*\/\s*style>/g,
					(match, offset, string) => {
						styles.push(match);
						return '';
					}
				);

			const nextDivTagStartsIndex = modifiedData.search('<div id="__next">');

			modifiedData =
				modifiedData.slice(0, nextDivTagStartsIndex) +
				modifiedData.slice(nextDivTagStartsIndex + 17);

			const headTagEndsIndex = modifiedData.search('</head>');

			modifiedData =
				modifiedData.slice(0, headTagEndsIndex) +
				styles.join('') +
				modifiedData.slice(headTagEndsIndex);
			const modifiedDataArr = modifiedData.split(' ');

			let i = modifiedDataArr.length - 1;
			for (; i >= 0; i--) {
				if (modifiedDataArr[i].includes('</div>')) {
					modifiedDataArr[i] = modifiedDataArr[i].replace('</div>', '');
					break;
				}
			}

			modifiedData = modifiedDataArr.join(' ');

			// const headTagEndsIndex = modifiedData.search('</head>');

			// modifiedData =
			// 	modifiedData.slice(0, headTagEndsIndex) +
			// 	styles.join('') +
			// 	modifiedData.slice(headTagEndsIndex, modifiedData.length);

			fs.writeFileSync(targetPath, modifiedData);
		});
	} catch (err) {
		console.log(err instanceof Error && err.message);
	}
};

cleanOutFromScriptsTags();
