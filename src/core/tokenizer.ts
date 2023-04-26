import { rules } from './rules'
import { HeadingToken } from './types'

export class Tokenizer {
   constructor() {}

   heading(src: string): HeadingToken | undefined {
      const cap = rules.block.heading.exec(src)

      if(cap) {
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
            type: 'heading',
            raw: rawCap,
            depth,
            text: rawTest.trim(),
          }
      }
   }
}
