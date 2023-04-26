import { Tokenizer } from './tokenizer'
import { Token } from './types'

interface LexerOptions {}

export class Lexer {
   public tokens: Token[]
   private inlineQueue: string[]
   private tokenizer: Tokenizer

   private constructor(options: LexerOptions) {
      this.tokens = []
      this.inlineQueue = [];
      this.tokenizer = new Tokenizer()
   }

   public static lex(src: string, options: LexerOptions) {
      const lexer = new Lexer(options)
      return lexer.lex(src)
   }

   private lex(src: string) {
      const normalizedNewLine = src.replace(/\r\n|\r/g, '\n')

      this.blockTokens(normalizedNewLine, this.tokens)

      return this.tokens
   }

   private blockTokens(src: string, tokens: Token[]) {
      let token: Token | undefined

      while (src) {
         if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }
      }
   }
}
