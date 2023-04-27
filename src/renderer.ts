import { TokensType, Token, FencesToken, HeadingToken, TextToken } from './types'
import { compile, TemplateDelegate } from 'handlebars'

const renderMap: Record<TokensType, TemplateDelegate> = {
   code: compile(
      '<pre><code{{#if language}} class="{{languagePrefix}}{{language}}"{{/if}}>'
      + '{{ content }}'
      + '\n</code></pre>'
   ),
   heading: compile(
      '<h{{depth}}>{{text}}</h{{depth}}>'
   ),
   text: ({ text }: TextToken) => text,
   space: () => ''
}

export const render = (tokens: Token[]) => {
   return tokens.map(token => renderMap[token.type](token)).join('\n')
}
