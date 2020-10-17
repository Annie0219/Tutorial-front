import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	login: false,
	userInfo:{
		id:null,
		email:"",
		age:0,
		gender:"",
		avatar:"",
		role:"",
		courseHour:"",
		result:false
	}
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
			return state.set('login', action.value);
		case constants.LOGOUT:
			return state.set('login', action.value);
		case constants.USER_INFO:
			return state.set('userInfo', action.value);
		default:
			return state;
	}
}