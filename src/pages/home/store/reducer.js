import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	topicList: [],
	articleList: [],
	recommendList: [],
	articlePage: 1,
	showScroll: false,
	isRawList:true,
	matchListStatus:"",
	rawList:[],
	matchListNextPage:1,
	rawInitLoading:false,
	rawLoading:true,
	matchList:[],
	matchInitLoading:false,
	matchLoading:false,
	hasMatchNextLoading:false,
	hasRawNextLoading:false,
	title:"",
	grade:"",
	timeCost:0,
	week:[],
	isWeek:false,
	weekStartDateTime:"",
	weekEndDateTime:"",
	startDateTime:"",
	selectCourse:"",
	isSubmitCourse:false
});

const changeHomeData = (state, action) => {
	return state.merge({
		rawList: action.rawList,
		rawInitLoading:true,
		articlePage:1,
		hasRawNextLoading:action.hasRawNextLoading,
		rawLoading:false
	});
};

const addArticleList = (state, action) => {
	return state.merge({
		'rawList': state.get('rawList').concat(action.rawList),
		'articlePage': action.nextPage,
		'hasRawNextLoading':action.hasRawNextLoading,
		'rawLoading':false
	});
};

const initMatchList = (state, action) => {
	return state.merge({
		matchList: action.matchList,
		matchInitLoading:true,
		matchListNextPage:1,
		hasMatchNextLoading:action.matchLoading,
		matchLoading:false
	});
};

const addMatchList = (state, action) => {
	const { matchList } = state
	matchList[action.index].studentConfirm = true;
	return {
		...state,
		matchList
	}
};
const updateList = (state, action) => {
	return state.merge({
		'matchList': state.get('matchList').concat(action.matchList),
		'matchListNextPage': action.matchListNextPage,
		'hasMatchNextLoading':action.matchLoading,
		'matchLoading':false
	});
};
export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_HOME_DATA:
			return changeHomeData(state, action);
		case constants.ADD_ARTICLE_LIST:
			return addArticleList(state, action);
		case constants.ADD_MATCH_INIT_LIST:
			return initMatchList(state, action);
		case constants.CHANGE_MATCH_LIST:
			return addMatchList(state, action);
		case constants.TOGGLE_SCROLL_TOP:
			return state.set('showScroll', action.show);
		case constants.RAW_LIST_LOADING:
			return state.set('rawLoading', true);
		case constants.MATCH_LIST_LOADING:
			return state.set('matchLoading', true);
		case constants.CHANGE_PAGE_LIST_TYPE:
			return state.set('isRawList', action.isRawList);
		case constants.CHANGE_PAGE_LIST_STATUS:
			return state.set('matchListStatus', action.matchListStatus);
		case constants.UPDATE_CONF_LIST:
			return updateList(state, action);
		case constants.CHANGE_SELECT_COURSE:
			return state.set('selectCourse', action.course);
		case constants.CHANGE_IS_SUBMIT_COURSE:
			return state.set('isSubmitCourse', action.isSubmit);
		case constants.CHANGE_TITLE:
			return state.set('title', action.title);
		case constants.CHANGE_GRADE:
			return state.set('grade', action.grade);
		case constants.CHANGE_TIME_COST:
			return state.set('timeCost', action.timeCost);
		case constants.CHANGE_WEEK:
			return state.set('week', action.week);
		case constants.CHANGE_IS_WEEK:
			return state.set('isWeek', action.isWeek);
		case constants.CHANGE_WEEK_START_DATE_TIME:
			return state.set('weekStartDateTime', action.weekStartDateTime);
		case constants.CHANGE_WEEK_END_DATE_TIME:
			return state.set('weekEndDateTime', action.weekEndDateTime);
		case constants.CHANGE_DATE_TIME:
			return state.set('startDateTime', action.startDateTime);
		default:
			return state;
	}
}