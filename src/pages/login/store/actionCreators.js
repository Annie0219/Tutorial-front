import * as constants from './constants';
import fetch from '../../../utils/fetch'
import * as urlConstants from '../../../store/urlConstants';
import {message} from "antd";
const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
});
const setUserInfo = (userInfo) => ({
	type: constants.USER_INFO,
	value: userInfo
});

export const logout = () => ({
	type: constants.LOGOUT,
	value: false
});

export const login = (accout, password) => {
	return (dispatch) => {
		fetch.post(urlConstants.LOGIN,{
			email:accout,
			password:password
		}).then((res) => {
			if (res.status===200 && res.data.result===true) {
				message.info("welcome",3);
				dispatch(changeLogin());
				dispatch(setUserInfo(res.data))
			}else {
				message.error("false",2);
			}
		})
	}
};

export const getUserInfo = () => {
	return (dispatch) => {
		fetch.get("https://api.kafkascat.com/user/info")
			.then((res) => {
			if (res.status===200 && res.data.result===true) {
				dispatch(changeLogin());
				dispatch(setUserInfo(res.data))
			}else {
				message.error("please sign in",2);
			}
		})
	}
};

export const logoutRequest = ()=>{
	return (dispatch) =>{
		fetch.get("https://api.kafkascat.com/user/logout")
			.then((res)=>{
				if (res.status===200){
					message.info("goodbye",3);
				}
			})
	}
}