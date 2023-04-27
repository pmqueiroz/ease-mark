import { Lexer } from "./lexer"
import { render } from "./renderer"

type Placeholder = string | number | (() => string)

const resolvePlaceholder = (placeholder: Placeholder) => {
   if (typeof placeholder === 'function') {
      return placeholder()
   }
   
   if (typeof placeholder === 'number') {
      return `${placeholder}`
   }

   return placeholder
}

interface Parser {
   (content: string): string
   (content: TemplateStringsArray, ...placeholders: Placeholder[]): string
}

const process = (content: string) => {
   const tokens = Lexer.lex(content, {})
   
   return render(tokens)
}

export const parse: Parser = (content, ...placeholders: Placeholder[]) => {
   if(typeof content === 'string') {
      return process(content)
   }

   let parsedLiterals = "";
   
   for (let i = 0; i < placeholders.length; i++) {
      parsedLiterals += content[i];
      parsedLiterals += resolvePlaceholder(placeholders[i])
         .replace(/&/g, '&amp;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#39;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;');
   }

   parsedLiterals += content[content.length - 1];

   return process(parsedLiterals)
}
