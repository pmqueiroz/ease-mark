export interface HeadingToken {
   type: 'heading'
   raw: string
   depth: number
   text: string
}

export type Token = HeadingToken
