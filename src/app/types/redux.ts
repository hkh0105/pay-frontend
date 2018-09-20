export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P> {
  type: T;
  payload: P;
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload };
}

type FunctionType = (...args: any[]) => any;
export type ActionCreatorMap = Record<string, FunctionType>;
export type ActionsUnion<T extends ActionCreatorMap> = ReturnType<T[keyof T]>;
