/**
 *
 */
console.clear();
console.log(`--------------------------------------------------`);

const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

const part1 = (data) => {
	let start = 4;
	let result = 0;
	console.log(data);
	for (let first = 1; first <= data.length; first++) {
		let isFourChar = first - start >= 0 ? true : false;
		let searchString = data.substring(first - start, first);
		// console.log(
		// 	first,
		// 	data[first - 1],
		// 	isFourChar,
		// 	data.substring(first - start, first),
		// 	[...new Set(searchString)].join(''),
		// 	searchString.length === [...new Set(searchString)].join('').length
		// );

		if (
			isFourChar &&
			searchString.length === [...new Set(searchString)].join('').length
		) {
			result = first;
			break;
		}
	}
	console.log(result);
};

const part2 = (data) => {
	let start = 14;
	let result = 0;
	console.log(data);
	for (let first = 1; first <= data.length; first++) {
		let isFourTeenChar = first - start >= 0 ? true : false;
		let searchString = data.substring(first - start, first);
		// console.log(
		// 	first,
		// 	data[first - 1],
		// 	isFourTeenChar,
		// 	data.substring(first - start, first),
		// 	[...new Set(searchString)].join(''),
		// 	searchString.length === [...new Set(searchString)].join('').length
		// );

		if (
			isFourTeenChar &&
			searchString.length === [...new Set(searchString)].join('').length
		) {
			result = first;
			break;
		}
	}
	console.log(result);
};

part2(data);
