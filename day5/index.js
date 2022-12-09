/**
 * take the stackInput
 * input which are the moves i have to do on the stack
 * array is inbuilt stack in the js i can use that thing
 * process input and stack input
 */
console.clear();
const fs = require('fs');
const path = require('path');

const data = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.split(/\n/);

let stackData = [];

const inputDataItems = fs
	.readFileSync(path.join(__dirname, 'stackInput.txt'), 'utf8')
	.split(/\n/)
	.map((i) => i.split(','))
	.reverse();

for (const inputData of inputDataItems.values()) {
	for (const [itemIndex, itemValue] of inputData.entries()) {
		if (!stackData[itemIndex]) {
			stackData[itemIndex] = [];
		}
		if (!!itemValue) {
			stackData[itemIndex].push(itemValue);
		}
	}
}

const part1 = (data, stackData) => {
	for (let index = 0; index < data.length; index++) {
		let [size, sourceIndex, destinationIndex] = [
			...data[index].matchAll(/\d+/g),
		].map((i) => i[0]);
		// console.log({ size, sourceIndex, destinationIndex, el: data[index] });

		for (let operationSize = 0; operationSize < size; operationSize++) {
			stackData[destinationIndex - 1].push(stackData[sourceIndex - 1].pop());
		}
	}

	// display stack data
	console.log(stackData.map((i) => i.join(',')));

	let result = stackData.map((i) => i.pop());
	console.log(result.join(''));
};

const part2 = (data, stackData) => {
	for (let index = 0; index < data.length; index++) {
		let [size, sourceIndex, destinationIndex] = [
			...data[index].matchAll(/\d+/g),
		].map((i) => i[0]);

		stackData[destinationIndex - 1] = stackData[destinationIndex - 1].concat(
			...stackData[sourceIndex - 1].slice(-size)
		);
		stackData[sourceIndex - 1] = stackData[sourceIndex - 1].slice(0, -size);
	}

	let result = stackData.map((i) => i[i.length - 1]);
	console.log(result.join(''));
};
part2(data, stackData);

// display stack data
console.log(stackData.map((i) => i.join(',')));
