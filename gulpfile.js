/* eslint-disable @typescript-eslint/no-var-requires */

const gulp = require('gulp');
const path = require('path');
const fs = require('fs');

const iconsPath = 'src/nodes'; // Correct path to the nodes source directory

function findIconFiles(dir, filelist = []) {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filepath = path.join(dir, file);
		const stat = fs.statSync(filepath);

		if (stat.isDirectory()) {
			filelist = findIconFiles(filepath, filelist);
		} else if (file.endsWith('.node.icon.svg')) {
			filelist.push(filepath);
		}
	});

	return filelist;
}

function buildIcons() {
	const iconFiles = findIconFiles(path.join(__dirname, iconsPath));
	const iconData = {};

	iconFiles.forEach((filepath) => {
		const fileContent = fs.readFileSync(filepath, 'utf8');
		// Extract node name from path, assuming structure like /nodes/ResourceName/ResourceName.node.icon.svg
		const parts = filepath.split(path.sep);
		const nodeName = parts[parts.length - 2]; // Get the directory name
		if (nodeName) {
			// Use a convention like 'node-icon:ResourceName'
			iconData[`node-icon:${nodeName}`] = fileContent;
		}
	});

	const outputFile = path.join(__dirname, 'dist', 'icons.json');
	fs.mkdirSync(path.dirname(outputFile), { recursive: true });
	fs.writeFileSync(outputFile, JSON.stringify(iconData, null, 2));

	return Promise.resolve(); // Indicate task completion
}

gulp.task('build:icons', buildIcons);

// Default task (optional)
gulp.task('default', gulp.series('build:icons'));
