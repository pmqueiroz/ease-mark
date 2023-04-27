const rules = {
   heading: /^ {0,3}(\.|:|\.:|::|\.::|:::)(?=\s|$)(.*)(?:\n+|$)/,
   text: /^[^\n]+/,
   fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
   newline: /^(?: *(?:\n|$))+/,
}

export const matcher = (rule: keyof typeof rules, src: string) => rules[rule].exec(src)
