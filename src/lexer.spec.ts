import { Lexer } from "./lexer"

const code = `Before starting coding something I must have a entry point, and guess what, I had no ideia where to start. My first approach was search for the source code of other languages that I know most like Javascript, Python, Lua, etc. Digging all this code I found one common thing: the **tokens**.

My first impression was that tokens are kind of a way to represent a small piece of the code with it value and name for what this code does basically. I was sure that I have made nice discovery when I reach this point so I decide to search something about this tokens and how they work or something.

Eg.:

\`\`\`umbra
str name <- "Pedro"
\`\`\`
`

describe('Lexer', () => {
   test('heading', () => {
      Lexer.lex(code, {})
   })
})
