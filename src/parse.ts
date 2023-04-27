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

export const parse = (literals: TemplateStringsArray, ...placeholders: Placeholder[]) => {
   let parsedLiterals = "";
   
   for (let i = 0; i < placeholders.length; i++) {
      parsedLiterals += literals[i];
      parsedLiterals += resolvePlaceholder(placeholders[i])
         .replace(/&/g, '&amp;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#39;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;');
   }

   parsedLiterals += literals[literals.length - 1];

   const tokens = Lexer.lex(parsedLiterals, {})
   
   return render(tokens)
}
