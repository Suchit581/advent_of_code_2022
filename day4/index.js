const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8').split(/\n/);

const inRange = (num, num1, num2) => {
	return Math.min(num1, num2) <= num && Math.max(num1, num2) >= num;
};

const part1 = (data) => {
	let countOverlappingPair = 0;
	data.forEach((element) => {
		let rangeDivider = element.indexOf(',');
		let firstRange = element
			.substring(0, rangeDivider)
			.split('-')
			.map((i) => +i);

		let secondRange = element
			.substring(rangeDivider + 1)
			.split('-')
			.map((i) => +i);

		if (
			(inRange(secondRange[1], ...firstRange) &&
				inRange(secondRange[0], ...firstRange)) ||
			(inRange(firstRange[1], ...secondRange) &&
				inRange(firstRange[0], ...secondRange))
		) {
			console.log({ firstRange, secondRange });
			countOverlappingPair++;
		}
	});
	console.log(countOverlappingPair);
};

const part2 = (data) => {
	let countOverlappingPair = 0;
	data.forEach((element) => {
		let rangeDivider = element.indexOf(',');
		let firstRange = element
			.substring(0, rangeDivider)
			.split('-')
			.map((i) => +i);

		let secondRange = element
			.substring(rangeDivider + 1)
			.split('-')
			.map((i) => +i);

		let inRangeValueElement = Array.from(
			Array(Math.max(...firstRange, ...secondRange) + 1).keys()
		);

		let overlappingValues = inRangeValueElement
			.slice(
				Math.min(...firstRange, ...secondRange),
				Math.max(...firstRange, ...secondRange) + 1
			)
			.filter((num) => {
				return inRange(num, ...firstRange) && inRange(num, ...secondRange);
			});
		if (overlappingValues.length) {
			countOverlappingPair++;
		}
	});
	console.log({ countOverlappingPair });
};

part2(data);
