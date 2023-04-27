import { Lexer } from './lexer'
import { render } from './renderer'

const sampleCode = `\
. Hello

some paragraph

\`\`\`js
   const someJSCode = 'hello'

   function() {
      console.log('world')
   }
\`\`\`

\`\`\`
   cleiton cleiton
\`\`\`
`

const expectedHtml = `\
<h1>Hello</h1>
<p>some paragraph</p>

<pre><code class="language-js">   const someJSCode &#x3D; &#x27;hello&#x27;

   function() {
      console.log(&#x27;world&#x27;)
   }
</code></pre>

<pre><code>   cleiton cleiton
</code></pre>\
`

describe('render', () => {
   it('should be a function', () => {
      expect(render).toBeInstanceOf(Function)
   })

   it('should render each token and return a compiled html', () => {
      const tokens = Lexer.lex(sampleCode, {})

      expect(render(tokens)).toBe(expectedHtml)
   })
})
