import fetch from '../../../utils/fetch'
import * as constants from './constants';
import * as urlConstants from '../../../store/urlConstants';
import {message} from "antd";

export const changeTitle = (value) => ({
	type: constants.CHANGE_TITLE,
	value: value
});
export const changeCourse = (value) => ({
	type: constants.CHANGE_COURSE,
	value: value
});
export const changeDate = (value) => ({
	type: constants.CHANGE_DATE,
	value: value
});
export const changeTimes= (value) => ({
	type: constants.CHANGE_TIMES,
	value: value
});
export const changeStates = (value) => ({
	type: constants.CHANGE_STATES,
	value: value
});


export const postCourse = (title,course,date,times) => {
	return (dispatch) => {
		fetch.post(urlConstants.SIGN,{

		}).then((res) => {
			if (res.status===200) {
				message.info("success",2);
				dispatch(changeStates(true))
			}
		})
	}
};