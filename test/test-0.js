// test-2.js
// https://nodejs.org/api/assert.html#assert_assert

const assert = require( 'assert' )
const { suma, resta } = require( './funcionesMatematicas' )

let resultado, esperado

resultado = suma( 2, 3 )
esperado = 5
assert.strictEqual( resultado, esperado )

resultado = resta( 8, 3 )
esperado = 5
assert.strictEqual( resultado, esperado )


console.log( '¡Test1 OK! 👌' )