const fs = require('fs/promises');
const path = require('path');

async function loadInputData() {
	let inputDataList = [];

	let data = await fs.readFile(path.join('input.txt'), 'utf8');

	data.split(/\n\n/).forEach((lineData, index) => {
		inputDataList.push({
			index,
			data: lineData
				.split(/\n/)
				.map((i) => +i)
				.filter((i) => i)
				.reduce((previousValue, currentValue) => {
					return +previousValue + +currentValue;
				}),
		});
	});

	inputDataList = inputDataList
		.filter((i) => i?.data)
		.sort((a, b) => {
			return +b.data - +a.data;
		});

	// print top max element sum
	console.log(
		inputDataList
			.splice(0, 3)
			.map((item) => +item.data)
			.reduce((p, c) => {
				return +p + +c;
			})
	);
}

loadInputData();
