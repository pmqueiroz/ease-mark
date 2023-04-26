import { Lexer } from "./lexer"

describe('Lexer', () => {
   test('heading', () => {
      const tokens = Lexer.lex('.: Hello World', {})

      console.log(tokens)
   })
})
