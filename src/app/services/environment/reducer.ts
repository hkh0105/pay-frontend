import { EnvironmentActionTypes, SET_ENVIRONMENT } from 'app/services/environment/actions';
import { EnvironmentState, initialEnvironmentState } from 'app/services/environment/reducer.state';

export const environmentReducer = (
  state = initialEnvironmentState,
  action: EnvironmentActionTypes
): EnvironmentState => {
  switch (action.type) {
    case SET_ENVIRONMENT: {
      return { ...state, ...action.payload!.environment };
    }
    default:
      return state;
  }
};
