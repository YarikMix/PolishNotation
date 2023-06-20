import {calclulate} from "./index.mjs"


function test(raw, vars){
	let res = calclulate(raw, vars)
	console.log(`calculate: ${res}`) // 1412000
}



// Тесты: 

test("(x + y) <= 8", { "x": 5, "y": 10 })

test("(x + y) <= 8", { "x": 3, "y": 2 })


test("( 100*  x + x*x - 300) *  (x*x - 25 *x +  500) - 20 *x ", { "x": 25 }) // 1412000


test("(234 * x - 1235 * x * (55 + x * x - 234234 + 234243) * (98534 * x * x - 1234 * 5235)) - x * 235 + 653221 ", { "x": 25 }) // -1172640855356804


test("( 100*  x + x*y - 300) *  (x*y - 25 *x +  500) - 20 *x ", { "x": 25, "y": -25 })


test("( 100.5x + x^y - 300 * cos(5)) *  (sin(x*y) - 25 *x +  500) - 20 *x ", { "x": 25, "y": 2 })
