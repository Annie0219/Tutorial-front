import * as constants from './constants';
import fetch from "../../../utils/fetch";
import {message} from "antd";

const changeDetail = (detail) => ({
	type: constants.CHANGE_DETAIL,
	detail
});

const changeCallBack = (callback) =>({
	type:constants.CHANGE_CALLBACK,
	callback
});

export const getDetail = (id) => {
	return (dispatch) => {
		fetch.get('https://api.kafkascat.com/course/' + id)
			.then((res) => {
			const result = res.data;
			dispatch(changeDetail(result));
		})
	}
};

export const changeCallback = (callback)=>{
	return (dispatch) =>{
		dispatch(changeCallBack(callback));
	}
}

export const submitCallback = (id,callback)=>{
	return (dispatch) => {
		fetch.post('https://api.kafkascat.com/course/callback',{
			"courseId": id,
			"callBack": callback
		}).then((res) => {
			if (res.status===200){
				message.info("save success",2);
			}
			})
	}
}