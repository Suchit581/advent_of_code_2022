const fs = require('fs/promises');
const path = require('path');

let totalValue = 0;

async function loadInputData() {
	let data = await fs.readFile(path.join('input.txt'), 'utf8');

	let rucksackLists = data.split(/\n/);

	for (let index = 0; index < rucksackLists.length; index += 3) {
		let first = rucksackLists[index];
		let isFound = false;
		let result = 0;
		first.split('').forEach((char) => {
			if (
				rucksackLists[index + 1].includes(char) &&
				rucksackLists[index + 2].includes(char) &&
				!isFound
			) {
				isFound = true;
				result = calculateValue(char);
			}
		});
		totalValue += result;
	}

	// let priorityValue = calculateValue(commonValue);

	console.log(totalValue);
}

async function firstStar() {
	let data = await fs.readFile(path.join('input.txt'), 'utf8');

	let rucksackLists = data.split(/\n/);

	for (let [index, rucksacks] of rucksackLists.entries()) {
		// exit for condition checking
		// if (index === 10) {
		// 	break;
		// }
		// console.log({ index, rucksack: rucksacks });

		rucksacks = rucksacks.split('');
		rucksacks.splice(rucksacks.length / 2, 0, '$');
		rucksacks = rucksacks.join('');

		let [compartment1, compartment2] = rucksacks
			.split('$')
			.map((i) => i.split(''))
			.map((i) => {
				return [...new Set(i)].sort().join('');
			});

		let commonValue = compartment1.split('').filter((n) => {
			return compartment2.indexOf(n) !== -1;
		});

		let priorityValue = calculateValue(commonValue);
		console.log({ commonValue, priorityValue });
		totalValue += priorityValue;
	}
	console.log({ totalValue });
}

function calculateValue(character) {
	return (
		character.charCodeAt(0) - (character === character.toLowerCase() ? 96 : 38)
	);
}

loadInputData();
