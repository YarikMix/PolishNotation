/*
1. Заводим стек (st = [])

2. Бежим по токенам
	2.1 Если это число --> просто кладем в стек
	2.2 Если это операция (*, +, -, /) --> достаём со стека два числа и 
		вычисляем в соответствии с операцией, и кладём назад в стек!

3. В самом конце должен остаться один элемент на стеке

["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
*/

const unaryOps = [ "sin", "cos", "abs" ]

const binaryOps = [ "(", "+", "-", "%", "/", "*", "^" ]

const neravOps = [ "<", ">", "<=", ">=", "==" ]


function evalUnary(x, op) {
	if (op === "sin") {
		return Math.sin(+x)
	} 

	if (op === "cos") {
		return Math.cos(+x)
	} 

	if (op === "abs") {
		return Math.abs(+x)
	} 

	throw Error("Unsupported operation!")
}

function evalBinary(x, y, op) {
	// второе <-- y
	// первое <-- x 
	if (op === "+") {
		return +x + +y
	} 

	if (op === "-") {
		return +x - +y
	} 

	if (op === "*") {
		return +x * +y
	} 

	if (op === "%") {
		return x % y
	} 

	if (op === "/") {
		return +x / +y
	}	

	if (op === "^") {
		return Math.pow(+x, +y)
	} 

	throw Error("Unsupported operation!")
}

function evalNerav(x, y, op) {
	if (op === "<") {
		return +x < +y
	} 		

	if (op === ">") {
		return +x > +y
	} 		

	if (op === "<=") {
		return +x <= +y
	}	

	if (op === ">=") {
		return +x >= +y
	}	

	if (op === "==") {
		return +x == +y
	}
}

export function evalRPN(tokens) {

	// tokens: 25  15  +  12  *


	let res = []

	for (let token of tokens) {

		if (unaryOps.includes(token)) { // Если встретился унарный оператор (sin, cos, abs)

			let x = res.pop()
			res.push(evalUnary(x, token))

		} else if (binaryOps.includes(token)){ // Если встретился бинарный оператор (+, -, *, /, ^)

			let y = res.pop()
			let x = res.pop()
				
			res.push(evalBinary(x, y, token))

		} else if (neravOps.includes(token)){ // Если встретился отношение порядка (<, >, <=, >=, ==)

			let y = res.pop()
			let x = res.pop()
			
			return evalNerav(x, y, token)

		} else { // Иначе, если встретилось число, то добавляем его в res

			res.push(token)
			
		}

	}


	if (res.lenght > 1) { 

		// В конце концов в стэке res должен остаться один элемент, если нет - то выражение с ошибкой

		throw Error("Expressions is not valid!")

	}

	
	return res.pop()
}