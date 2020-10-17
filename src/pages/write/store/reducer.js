import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	title: '',
	course:'',
	date:'',
	times:'',
	states:false,
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_TITLE:
			return state.set('title', action.value);
		case constants.CHANGE_COURSE:
			return state.set('course', action.value);
		case constants.CHANGE_DATE:
			return state.set('date', action.value);
		case constants.CHANGE_TIMES:
			return state.set('times', action.value);
		case constants.CHANGE_STATES:
			return state.set('times', action.value);
		default:
			return state;
	}
}