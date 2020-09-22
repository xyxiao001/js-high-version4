export interface InterfaceProblem {
  name: string,
  templateDefault: string,
  testCase: InterfaceTestCase[],
  difficulty: string,
  des: string,
  answer?: string
}

export interface InterfaceTestCase {
  params: any,
  result: any
}

export interface InterfaceProblemAll<T> {
  [key: string]: T,
}

export interface InterfaceWorkerMessage {
  type: string,
  message: string
}