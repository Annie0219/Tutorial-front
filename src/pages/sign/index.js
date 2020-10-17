import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LoginWrapper, LoginBox, Input, Button,SelectBox} from './style';
import { actionCreators } from './store';
import {BannerImg} from "../sign/style";
import { Radio,message } from 'antd';
import 'antd/es/message/style/css';
import 'antd/es/radio/style/css';

class Sign extends PureComponent {
	state = {
		gender: 'Male',
		role: 'Student',
	};


	render() {
		const { signStatus,changeSignDefault } = this.props;
		const genderOptions = ['Male', 'Female'];
		const roleOptions = ['Student', 'Teacher','Guardian'];
		message.config({
			top: 50,
			duration: 2,
			maxCount: 3,
			rtl: false,
		});
		if (!signStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<BannerImg className='banner-img'/>
						<Input placeholder='Username(6+characters)'  ref={(input) => {this.userName = input}}/>
						<SelectBox>
							<div className='text_div'>Gender：</div>
							<Radio.Group options={genderOptions} onChange={this.onGenderChange} value={this.state.gender}/>

						</SelectBox>
						<SelectBox>
							<div className='text_div'>Role：</div>
							<Radio.Group options={roleOptions} onChange={this.onRoleChange} value={this.state.role}/>

						</SelectBox>
						<Input placeholder='Email' ref={(input) => {this.email = input}}/>
						<Input placeholder='Password(6+characters)' type='password' ref={(input) => {this.password = input}}/>

						<Input placeholder='Email Verification Code'  ref={(input) => {this.verCode = input}}/>
						<Button onClick={() => this.props.sendEmail(this.email,this.userName)}>Send Code To Email</Button>
						<Button onClick={() => this.props.signUp(this.userName, this.email,this.state.gender,this.state.role,this.password,this.verCode)}>Sign Up</Button>
					</LoginBox>
				</LoginWrapper>
			)
		}else {
			changeSignDefault();
			return <Redirect to='/login'/>
		}
	}

	onGenderChange = e => {
		this.setState({
			gender: e.target.value,
		});
	};
	onRoleChange = e => {
		this.setState({
			role: e.target.value,
		});
	};
}

const mapState = (state) => ({
	signStatus: state.getIn(['sign', 'sign'])
});


const mapDispatch = (dispatch) => ({

	signUp(name, email,gender,role,password, verification){
		const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if(name.value===""||name.value.length<6){
			message.error("userName is null or size less than 6");
		}else if(password.value===""||password.value.length<6){
			message.error("email is null!!!");
		}else if(email.value===""){
			message.error("email is null!!!");
		}else if(verification.value===""){
			message.error("email is null!!!");
		}else if(!reg.test(email.value)){
			message.error("email format is incorrect");
		}else {
			dispatch(actionCreators.signUp(name.value, email.value, gender, role, password.value, verification.value))
		}
	},
	sendEmail(email,name){
		const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		if(name.value===""||name.value.length<3){
			message.error("userName is null or size less than 3");
		}else if(email.value===""){
			message.error("email is null!!!");
		}else if(!reg.test(email.value)){
			message.error("email format is incorrect");
		}else{
			dispatch(actionCreators.sendEmail(email.value,name.value))
		}
	},
	changeSignDefault(){
		dispatch(actionCreators.changeSignDefault())
	}
});

export default connect(mapState, mapDispatch)(Sign);