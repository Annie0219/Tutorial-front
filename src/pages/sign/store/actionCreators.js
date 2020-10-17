import axios from 'axios';
import fetch from '../../../utils/fetch'
import * as constants from './constants';
import * as urlConstants from '../../../store/urlConstants';
import {message} from "antd";

const changeSignStatus = () => ({
	type: constants.SIGN_UP,
	value: true
});

export const changeSignDefault = () => ({
	type: constants.SIGN_UP,
	value: false
});


export const signUp = (name, email,gender,role,password, verification) => {
	return (dispatch) => {
		fetch.post(urlConstants.SIGN,{
			name:name,
			email:email,
			gender:gender,
			role:role,
			password:password,
			verification:verification
		}).then((res) => {
			if (res.status===200) {
				message.info("sign up",2);
				dispatch(changeSignStatus())
			}
		})
	}
};

export const sendEmail = (email,name) => {
	return () => {
		fetch.post(urlConstants.VERIFY,{
			name:name,
			email:email
		}).then((res) => {
			message.info("send success，please check your email",3);
		})
	}
};