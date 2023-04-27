export interface InlineQueue {
   src: string
   tokens: Token[]
}

export enum TokensType {
   heading = 'heading',
   code = 'code',
   text = 'text',
   space = 'space'
}

export interface TextToken {
   type: TokensType.text,
   raw: string,
   text: string
}

export interface SpaceToken {
   type: TokensType.space,
   raw: string,
}

export interface HeadingToken {
   type: TokensType.heading
   raw: string
   depth: number
   text: string
}

export interface FencesToken {
   type: TokensType.code
   raw: string
   language: string
   languagePrefix: string
   content: string
}

export type Token = HeadingToken | FencesToken | TextToken | SpaceToken
