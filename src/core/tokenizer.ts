import { rules } from './rules'
import { FencesToken, HeadingToken, TokensType, TextToken, SpaceToken } from './types'

export class Tokenizer {
   constructor() {}

   heading(src: string): HeadingToken | undefined {
      const cap = rules.block.heading.exec(src)

      if(!cap) return

      const [rawCap, headLevel, rawTest] = cap

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
         raw: rawCap,
         depth,
         text: rawTest.trim(),
      }
   }

   fences(src: string): FencesToken | undefined {
      const cap = rules.block.fences.exec(src)

      if(!cap) return

      const [raw,, language, content] = cap

      return {
        type: TokensType.code,
        raw,
        language,
        content
      }
   }

   text(src: string): TextToken | undefined  {
      const cap = rules.block.text.exec(src)
      
      if(!cap) return

      const [raw] = cap

      return {
         type: TokensType.text,
         raw: raw,
         text: raw
      }
   }

   space(src: string): SpaceToken | undefined {
      const cap = rules.block.newline.exec(src)
      
      if (cap && cap[0].length > 0) {
         const [raw] = cap

         return {
            type: TokensType.space,
            raw: raw
         }
      }
   }
}
