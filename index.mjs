import {tokenize} from "./tokenization.mjs"
import {infixToPostfix} from "./infixToPostfix.mjs"
import {evalRPN} from "./evalRPN.mjs"

let isDebug = true

function calclulate(raw, values) {
	if (raw.includes("&")){
		return raw.split("&").every(exp => calclulate(exp, values))
	}

	let infix = tokenize(raw)
	
	if (isDebug) console.log(infix.join("  "))

	for (const [key, value] of Object.entries(values)){
		infix = infix.map(token => token === key ? value : token);
	}

	if (isDebug) console.log(infix.join("  "))

	let postfix = infixToPostfix(infix)

	if (isDebug) console.log(postfix.join(" , "))

	if (isDebug) console.log(evalRPN(postfix))

	return evalRPN(postfix)
}


let raw = "(x + y) <= 8"


let vars = {
	"x": 25, 
	"y": 8
}

console.log(calclulate(raw, vars))


/*
for (var x = 1; x < 6; x++){
	for (var y = 1; y < 6; y++){
		let vars = {
			"x": x, 
			"y": y
		}

		if (calclulate(raw, vars)){
			console.log("(" + x + " " + y + ")")
		}
	}
}
*/

/*
Тесты: 


let res = calclulate("( 100*  x + x*x - 300) *  (x*x - 25 *x +  500) - 20 *x ", { "x": 25 })
console.log(`calculate: ${res}`) // 1412000


let res = calclulate("(234 * x - 1235 * x * (55 + x * x - 234234 + 234243) * (98534 * x * x - 1234 * 5235)) - x * 235 + 653221 ", { "x": 25 })
console.log(`calculate: ${res}`) // -1172640855356804


let res = calclulate("( 100*  x + x*y - 300) *  (x*y - 25 *x +  500) - 20 *x ", { "x": 25, "y": -25 })
console.log(`calculate: ${res}`)

let res = calclulate("( 100.5x + x^y - 300 * cos(5)) *  (sin(x*y) - 25 *x +  500) - 20 *x ", { "x": 25, "y": 2 })
console.log(`calculate: ${res}`)

*/