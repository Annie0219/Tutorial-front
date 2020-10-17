import fetch from '../../../utils/fetch'
import * as constants from './constants';
import { fromJS } from 'immutable';

const initMatchList = (result) =>({
	type:constants.ADD_MATCH_INIT_LIST,
	matchList:fromJS(result)
});

const addMatchList = (result, nextPage,load) =>({
	type:constants.CHANGE_MATCH_LIST,
	matchList:fromJS(result),
	matchListNextPage:nextPage,
	matchLoading:load
})

const changHomeData = (result,hasNext) => ({
	type: constants.CHANGE_HOME_DATA,
	rawList: fromJS(result),
	hasRawNextLoading:hasNext
});

const addHomeList = (list, nextPage,hasNext) => ({
	type: constants.ADD_ARTICLE_LIST,
	rawList: fromJS(list),
	nextPage:nextPage,
	hasRawNextLoading:hasNext
});

export const getHomeInfo = (courseStatus) => {
	return (dispatch) => {
		fetch.post('https://api.kafkascat.com/course/list',{
			status:courseStatus,
			current:1,
			size:5
		}).then((res) => {
			const result = res.data.records;
			if(res.data.current*res.data.size<res.data.total){
				dispatch(changHomeData(result,true));
			}else{
				dispatch(changHomeData(result,false));
			}
		});
	}
};

export const getMoreList = (page,courseStatus) => {
	return (dispatch) => {
		fetch.post('https://api.kafkascat.com/course/list',{
			status:courseStatus,
			current:page+1,
			size:5
		}).then((res) => {
			const result = res.data.records;
			if(res.data.current*res.data.size<res.data.total){
				dispatch(addHomeList(result, page + 1,true));
			}else{
				dispatch(addHomeList(result, page,false));
			}
		});
	}
};

export const isRawListLoading = ()=>({
	type:constants.RAW_LIST_LOADING
})
export const isMatchListLoading = ()=>({
	type:constants.MATCH_LIST_LOADING
})


export const changeRawListType = (isRawList)=>({
	type:constants.CHANGE_PAGE_LIST_TYPE,
	isRawList
});

export const changeMatchListStatus = (matchListStatus)=>({
	type:constants.CHANGE_PAGE_LIST_STATUS,
	matchListStatus
});

export const changeIsSubmitCourse = (isSubmit)=>({
	type:constants.CHANGE_IS_SUBMIT_COURSE,
	isSubmit
});
export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
});

export const changeSelectCourse = (course) => ({
	type: constants.CHANGE_SELECT_COURSE,
	course
});
export const initMatchInitListRequest = () => {
	return (dispatch) => {
		fetch.post('https://api.kafkascat.com/course/list',{
			current:1,
			size:5
		}).then((res) => {
			const result = res.data.records;
			dispatch(initMatchList(result));
		});
	}
};

export const addMatchMoreListRequest = (page,dataStatus) => {
	return (dispatch) => {
		fetch.post('https://api.kafkascat.com/course/list',{
			current:page+1,
			size:5
		}).then((res) => {
			const result = res.data.records;
			if(res.data.current*res.data.size<res.data.total){
				dispatch(addMatchList(result, page + 1,true));
			}else{
				dispatch(addMatchList(result, page,false));
			}
		});
	}
};

export const updateConfList = (index,st,te) => ({
	type: constants.UPDATE_CONF_LIST,
	index,
	st,te
});

export const confirmDetail = (id,index,st,te) => {
	return (dispatch) => {
		fetch.get('https://api.kafkascat.com/course/matched/confirm/' + id)
			.then((res) => {
				dispatch(initMatchInitListRequest());
			})
	}
};

export const changeTitleCourse = (title) => ({
	type: constants.CHANGE_TITLE,
	title
});
export const changeGradeCourse = (grade) => ({
	type: constants.CHANGE_GRADE,
	grade
});
export const changeTimeCostCourse = (timeCost) => ({
	type: constants.CHANGE_TIME_COST,
	timeCost
});
export const changeWeekCourse = (week) => ({
	type: constants.CHANGE_WEEK,
	week
});
export const changeIsWeekCourse = (isWeek) => ({
	type: constants.CHANGE_IS_WEEK,
	isWeek
});
export const changeWeekStartDateTimeCourse = (weekStartDateTime) => ({
	type: constants.CHANGE_WEEK_START_DATE_TIME,
	weekStartDateTime
});
export const changeWeekEndDateTimeCourse = (weekEndDateTime) => ({
	type: constants.CHANGE_WEEK_END_DATE_TIME,
	weekEndDateTime
});
export const changeStartDateTimeCourse = (startDateTime) => ({
	type: constants.CHANGE_DATE_TIME,
	startDateTime
});