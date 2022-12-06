const fs = require('fs/promises');
const path = require('path');
/**
 * Winning rules
 * Rock defeats Scissors
 * Scissors defeats Paper
 * Paper defeats Rock
 * both players choose the same shape then draw
 */

/**
 * ? Extra info
 * 1st column: opponent
 * 2nd will be our
 */

/**
 * ? opponent
 * A = ROCK
 * B = PAPER
 * C = SCISSOR
 */

/**
 * ? what we have to play
 * X = ROCK
 * Y = PAPER
 * Z = SCISSOR
 */

/**
 * ? score for single round would be
 * 1 for rock
 * 2 for paper
 * 3 for scissors
 * and
 * 0 for lost
 * 3 for draw
 * 6 for win
 */
const s = {
	lostScore: 0,
	drawScore: 3,
	winScore: 6,
	rockScore: 1,
	paperScore: 2,
	scissorScore: 3,
};

let totalScore = 0;
let totalDraw = 0;
let totalLose = 0;
let totalWin = 0;
let strategyScore = 0;

async function loadInputData(isRegular = true) {
	let data = await fs.readFile(path.join('input.txt'), 'utf8');

	let rounds = data.split(/\n/);

	for (const [index, round] of rounds.entries()) {
		// exit for condition checking
		// console.log({ index, round });
		// if (index === 6) {
		// 	break;
		// }

		let [opponentValue, ourValue] = round.split(/\s/).map((i) => i.trim());
		if (isRegular) {
			switch (true) {
				case (opponentValue === 'C' && ourValue === 'Z') ||
					(opponentValue === 'B' && ourValue === 'Y') ||
					(opponentValue === 'A' && ourValue === 'X'):
					totalScore += draw(ourValue);
					break;

				case (opponentValue === 'C' && ourValue === 'X') ||
					(opponentValue === 'A' && ourValue === 'Y') ||
					(opponentValue === 'B' && ourValue === 'Z'):
					totalScore += win(ourValue);
					break;

				case (opponentValue === 'A' && ourValue === 'Z') ||
					(opponentValue === 'B' && ourValue === 'X') ||
					(opponentValue === 'C' && ourValue === 'Y'):
					totalScore += lose(ourValue);
					break;
			}
		} else {
			switch (true) {
				case ourValue === 'X':
					switch (true) {
						case opponentValue === 'A':
							strategyScore += lose('Z');
							break;
						case opponentValue === 'B':
							strategyScore += lose('X');
							break;
						case opponentValue === 'C':
							strategyScore += lose('Y');
							break;
						default:
							throw new Error(`something went wrong lose`);
							break;
					}

					break;
				case ourValue === 'Y':
					switch (true) {
						case opponentValue === 'A':
							strategyScore += draw('X');
							break;
						case opponentValue === 'B':
							strategyScore += draw('Y');
							break;
						case opponentValue === 'C':
							strategyScore += draw('Z');
							break;
						default:
							throw new Error(`something went wrong draw`);
							break;
					}
					break;
				case ourValue === 'Z':
					switch (true) {
						case opponentValue === 'A':
							strategyScore += win('Y');
							break;
						case opponentValue === 'B':
							strategyScore += win('Z');
							break;
						case opponentValue === 'C':
							strategyScore += win('X');
							break;
						default:
							throw new Error(`something went wrong win`);
							break;
					}
					break;

				default:
					throw new Error(`something went wrong`);
					break;
			}
		}
	}

	console.log({ totalScore, totalDraw, totalLose, totalWin, strategyScore });
}

function getValue(ourChoice) {
	switch (ourChoice) {
		case 'X':
			return 1;
		case 'Y':
			return 2;
		case 'Z':
			return 3;
		default:
			throw new Error(`choice not found`);
	}
}

function draw(ourChoice) {
	totalDraw++;
	return s.drawScore + getValue(ourChoice);
}

function lose(ourChoice) {
	totalLose++;
	return s.lostScore + getValue(ourChoice);
}

function win(ourChoice) {
	totalWin++;
	return s.winScore + getValue(ourChoice);
}

loadInputData(false);
