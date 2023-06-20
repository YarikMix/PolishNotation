let isDigit = (ch) => /\d/.test(ch);

let isLetter = (ch) => /[a-z]/i.test(ch);

let isOperator = (ch) => /\+|-|\*|\/|\^|\<|\>|\<|\=|\%/.test(ch);

let isLeftParenthesis = (ch) => /\(/.test(ch);

let isRightParenthesis = (ch) => /\)/.test(ch);


export function tokenize(str) {

	function emptyLetterBufferAsVariables() {
		// Пример: xyz => ["x", "*", "y", "*", "z"]

		let l = letterBuffer.length;
		for (let i = 0; i < l; i++) {

			result.push(letterBuffer[i]);

			if (i < l - 1) {
				result.push("*");
			}
		}

		letterBuffer = [];
	}

  	function emptyNumberBufferAsLiteral() {
		// Пример: 100 ... => ["100"]

		if (numberBuffer.length) {
			result.push(numberBuffer.join(""));
			numberBuffer = [];
		}
	}

	function emptyOperatorBuffer() {
		if (operatorBuffer.length) {
			result.push(operatorBuffer.join(""))
			operatorBuffer = []
		}
	}

	str = str.split(""); // конвертировать строку в массив символов

	let result = []; // массив токенов
	let letterBuffer = []; // буфер для хранения букв
	let numberBuffer = []; // буфер для хранения цифр
	let operatorBuffer = []; // буфер для хранения операторов

	str.forEach(function (char, idx) {

		if (isDigit(char)) { //  Если встретилась цифра

			numberBuffer.push(char);

			if (operatorBuffer.length){
				emptyOperatorBuffer();
			}

		} else if (char == ".") { // Если встретилась '.'

 		 	numberBuffer.push(char); // Пример: 100.235

      	} else if (isLetter(char)) { //  Если встретилась буква

			if (numberBuffer.length) { // если буфер для хранения цифр не пуст => очищаем его и добавляем к результату
				emptyNumberBufferAsLiteral();
				result.push("*"); // Пример: 100x => ["100", "*", "x"]
			}

			if (operatorBuffer.length){
				emptyOperatorBuffer(); // Пример: <= x => ["<=", "x"]
			}

			letterBuffer.push(char);

		} else if (isOperator(char)) { //  Если встретился оператор

			emptyNumberBufferAsLiteral(); // если буфер для хранения цифр не пуст => очищаем его и добавляем к результату
			emptyLetterBufferAsVariables(); // если буфер для хранения букв не пуст => очищаем его и добавляем к результату
			operatorBuffer.push(char);

		} else if (isLeftParenthesis(char)) { // Если встретилась '(''

			if (letterBuffer.length) { // Если буфер для хранения букв не пуст

				result.push(letterBuffer.join(""));
				letterBuffer = []; // Пример: sin(... (... => ["sin", "("]

			} else if (numberBuffer.length) { // Если буфер для хранения цифр не пуст

				emptyNumberBufferAsLiteral();
				result.push("*"); // Пример: 200(... => ["200", "("]
				
			} 

			if (operatorBuffer.length){ // Если буфер для хранения операторов не пуст

				emptyOperatorBuffer(); // Пример: >= (... => [">=", "("]

			} 

			result.push(char);

		} else if (isRightParenthesis(char)) { // Если встретилась ')''

			emptyLetterBufferAsVariables(); // опусташаем буфер для хранения букв
			emptyNumberBufferAsLiteral(); // опусташаем буфер для хранения цифр
			result.push(char);

		}
	});

	if (numberBuffer.length) {
		emptyNumberBufferAsLiteral();
	}

	if (letterBuffer.length) {
		emptyLetterBufferAsVariables();
	}

	if (operatorBuffer.length){
		emptyOperatorBuffer();
	}

	return result;
}
