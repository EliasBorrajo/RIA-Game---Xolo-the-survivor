/*Exemple de dynamic typing*/

let y

y = 0
console.log(y)

y = "Textual"
console.log(y)

y = {'key': 'value'}
console.log(y)


/* Function stored in a variable */
const x = function(f, e) { return Math.pow(f, e) * Math.PI }

let result = x(250, 300)
console.log(result)