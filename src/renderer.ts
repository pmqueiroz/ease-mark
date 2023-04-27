import { TokensType, Token, FencesToken, HeadingToken, TextToken } from './types'

export const renderMap: Record<TokensType, (token: any) => string> = {
   code: ({ language, content }: FencesToken) => {
      return `<pre><code ${language ? `class="${language}"` : ''}>`  
      + content
      + '</code></pre>'
   },
   heading: ({ depth, text }: HeadingToken) => {
      return `<h${depth}>${text}</h${depth}>`
   },
   text: ({ text }: TextToken) => text,
   space: () => ''
}

export const render = (tokens: Token[]) => {
   return tokens.map(token => renderMap[token.type](token)).join('\n')
}
