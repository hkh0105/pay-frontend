import { Action } from 'app/reducers';
import { EnvironmentState } from 'app/services/environment/reducer.state';

export const REQUEST_INITIALIZE_ENVIRONMENT = 'REQUEST_INITIALIZE_ENVIRONMENT';
export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

export interface ActionRequestInitializeEnvironment
  extends Action<typeof REQUEST_INITIALIZE_ENVIRONMENT, {}> {}

export interface ActionSetEnvironment
  extends Action<
      typeof SET_ENVIRONMENT,
      {
        environment: EnvironmentState;
      }
    > {}

export type EnvironmentActionTypes = ActionRequestInitializeEnvironment | ActionSetEnvironment;

export const requestInitializeEnvironment = (): ActionRequestInitializeEnvironment => {
  return { type: REQUEST_INITIALIZE_ENVIRONMENT };
};

export const setEnvironment = (environment: EnvironmentState): ActionSetEnvironment => {
  return { type: SET_ENVIRONMENT, payload: { environment } };
};
