import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	title: '',
	content: '',
	id: 0,
	courseName: "",
	studentName: "",
	teacherName: "",
	startTime: "",
	endTime: "",
	studentConfirm: true,
	teacherConfirm: false,
	callBack: "",
	isCallBack: true,
	createTime: "",
	courseState:"",
	timeCost:0,
	grade:0,
	courseStartDatetime:"",
	courseEndDatetime:""
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_DETAIL:
			return state.merge({
				id: action.detail.id,
				title:action.detail.title,
				grade:action.detail.grade,
				timeCost:action.detail.timeCost,
				courseName: action.detail.courseName,
				studentName: action.detail.studentName,
				teacherName: action.detail.teacherName,
				startTime: action.detail.startTime,
				endTime: action.detail.endTime,
				studentConfirm: action.detail.studentConfirm,
				teacherConfirm: action.detail.teacherConfirm,
				callBack: action.detail.callBack,
				isCallBack: action.detail.isCallBack,
				createTime: action.detail.createTime,
				courseState:action.detail.courseState,
				courseStartDatetime:action.detail.courseStartDatetime,
				courseEndDatetime:action.detail.courseEndDatetime
			});
		case constants.CHANGE_CALLBACK:
			return state.set("callBack",action.callback)
		default:
			return state;
	}
}