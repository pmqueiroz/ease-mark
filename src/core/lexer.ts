import { Tokenizer } from './tokenizer'
import { InlineQueue, Token } from './types'

interface LexerOptions {}

export class Lexer {
   public tokens: Token[]
   private inlineQueue: InlineQueue[]
   private tokenizer: Tokenizer

   private constructor(options: LexerOptions) {
      this.tokens = []
      this.inlineQueue = []
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
            src = this.shiftSource(src, token)
            tokens.push(token)
            continue
         }

         if (token = this.tokenizer.fences(src)) {
            src = this.shiftSource(src, token)
            tokens.push(token)
            continue
         }

         if (token = this.tokenizer.space(src)) {
            src = this.shiftSource(src, token)

            if (token.raw.length === 1 && tokens.length > 0) {
               tokens[tokens.length - 1].raw += '\n'
            } else {
               tokens.push(token)
            }
            continue
         }

         if (token = this.tokenizer.text(src)) {
            src = this.shiftSource(src, token)

            tokens.push(token)
            continue
         }

         if (src) {
            throw new Error('infinite loop')
         }
      }
   }

   private shiftSource(src: string, token: Token) {
      return src.substring(token.raw.length)
   }
}
