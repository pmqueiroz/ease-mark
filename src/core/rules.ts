const block = {
   heading: /^ {0,3}(\.|:|\.:|::|\.::|:::)(?=\s|$)(.*)(?:\n+|$)/,
   text: /^[^\n]+/
}

export const rules = {
   block
}
