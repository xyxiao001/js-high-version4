export interface InterfaceProblem {
  name: string,
  templateDefault: string,
  testCase: InterfaceTestCase[]
}

export interface InterfaceTestCase {
  params: any,
  result: any
}

export interface InterfaceProblemAll<T> {
  [key: string]: T,
}