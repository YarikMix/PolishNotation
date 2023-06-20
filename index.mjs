import {tokenize} from "./tokenization.mjs"
import {infixToPostfix} from "./infixToPostfix.mjs"
import {evalRPN} from "./evalRPN.mjs"

let isDebug = false

export function calclulate(raw, values) {
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


