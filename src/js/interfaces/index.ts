export type ServerData = Array<{ [key: string]: any }>;
export type SomeObj = { [key: string]: any }

export interface IClass {
  new(arg: SomeObj): SomeObj
}
