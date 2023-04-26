import { Lexer } from "./lexer"

const code = `\
\`\`\`js
salve
\`\`\`\
`

describe('Lexer', () => {
   test('heading', () => {
      const tokens = Lexer.lex(code, {})

      console.log(tokens)
   })
})
