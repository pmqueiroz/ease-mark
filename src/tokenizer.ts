import { matcher } from './rules'
import { FencesToken, HeadingToken, TokensType, TextToken, SpaceToken } from './types'

export class Tokenizer {
   constructor() {}

   heading(src: string): HeadingToken | undefined {
      const matchResult = matcher('heading', src)

      if(!matchResult) return

      const [rawMatch, headLevel, rawTest] = matchResult

      const depth = {
         '.': 1,
         ':': 2,
         '.:': 3,
         '::': 4,
         '.::': 5,
         ':::': 6,
      }[headLevel] ?? 1

      return {
         type: TokensType.heading,
         raw: rawMatch,
         depth,
         text: rawTest.trim(),
      }
   }

   fences(src: string, languagePrefix: string): FencesToken | undefined {
      const matchResult = matcher('fences', src)

      if(!matchResult) return

      const [raw,, language, content] = matchResult

      return {
        type: TokensType.code,
        raw,
        language: language,
        languagePrefix,
        content
      }
   }

   text(src: string): TextToken | undefined  {
      const matchResult = matcher('text', src)
      
      if(!matchResult) return

      const [raw] = matchResult

      return {
         type: TokensType.text,
         raw: raw,
         text: raw
      }
   }

   space(src: string): SpaceToken | undefined {
      const matchResult = matcher('newline', src)
      
      if (matchResult && matchResult[0].length > 0) {
         const [raw] = matchResult

         return {
            type: TokensType.space,
            raw: raw
         }
      }
   }
}
