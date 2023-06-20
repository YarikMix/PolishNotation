/*
1. Если токен является операндом, то добавить его в конец выходного списка.
2. Если токен является левой скобкой, положить его в opstack.
3. Если токен является правой скобкой, то выталкивать элементы из opstack пока не будет найдена соответствующая левая скобка. 
   Каждый оператор добавлять в конец выходного списка.
4. Если токен является оператором *, /, + или -, поместить его в opstack. 
   Однако, перед этим вытолкнуть любой из операторов, уже находящихся в opstack, если он имеет больший или 
   равный приоритет, и добавить его в результирующий список.
*/

const ops = {
    '<': -1,
    '>': -1,
    '<=': -1,
    '>=': -1,
    '==': -1,
    '(': 0,
    '+': 1,
    '-': 1,
    '%': 1,
    '/': 2,
    '*': 2,
    '^': 3,
    "sin": 3,
    "cos": 3,
    "abs": 3,
};

let isNumeric = (num) => !isNaN(num)

let peek = (arr) => arr[arr.length - 1]


export function infixToPostfix(tokenList) {

    let opStack = [] // буфер для хранения операторов
    let postfixList = [] // выходной список

    for (let token of tokenList) {

        if (isNumeric(token)){ 

            // Если токен является числом, то добавить его в конец выходного списка.

            postfixList.push(token)

        } else if (token == '('){ 

            // Если токен является левой скобкой, положить его в opstack.

            opStack.push(token)

        } else if (token == ')') { 

           // Если токен является правой скобкой, то выталкивать элементы из opstack пока не будет найдена соответствующая левая скобка. 
           // Каждый оператор добавлять в конец выходного списка.

            let topToken = opStack.pop()
            while (topToken != '('){
                postfixList.push(topToken)
                topToken = opStack.pop()                
            }

        } 
        else {

            // Если токен является оператором *, /, + или -, поместить его в opstack. 
            // Однако, перед этим вытолкнуть любой из операторов, уже находящихся в opstack, если 
            // он имеет больший или равный приоритет, и добавить его в результирующий список.
            

            while (opStack.length > 0 && ops[peek(opStack)] >= ops[token]){
                postfixList.push(opStack.pop())
            }

            opStack.push(token)
        }
    }

    // Когда входное выражение будет полностью обработано, проверить opstack. 
    // Любые операторы, всё ещё находящиеся в нём, следует вытолкнуть и добавить в конец итогового списка.
    
    while (opStack.length > 0){
        postfixList.push(opStack.pop())
    }

    return postfixList
}