import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	sign: false
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SEND_CODE:
			return state.set('sign', action.value);
		case constants.SIGN_UP:
			return state.set('sign', action.value);
		default:
			return state;
	}
}