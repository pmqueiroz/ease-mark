export enum TokensType {
   heading = 'heading',
   code = 'heading',
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
   content: string
}

export type Token = HeadingToken | FencesToken
