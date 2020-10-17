import React, { PureComponent } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {Form, Input, Button} from 'antd';
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import 'antd/es/button/style/css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { LoginWrapper, LoginBox,BannerImg } from './style';
import { actionCreators } from './store';

class Login extends PureComponent {
	formRef = React.createRef();

	onSubmit = () => {
		this.props.login(this.formRef.current.getFieldValue('email'), this.formRef.current.getFieldValue('password'))
	};

	render() {
		const onFinish = values => {
			console.log('Received values of form: ', values);
		};

		const { loginStatus } = this.props;
		if (!loginStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<BannerImg className='banner-img'/>
						<Form
							ref={this.formRef}
							name="normal_login"
							className="login-form"
							onFinish={onFinish}
						>
							<Form.Item
								name="email"
								rules={[
									{
										required: true,
										message: 'Please input your Email!',
									},
								]}
							>
								<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
							</Form.Item>
							<Form.Item
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your Password!',
									},
								]}
							>
								<Input
									prefix={<LockOutlined className="site-form-item-icon" />}
									type="password"
									placeholder="Password"
								/>
							</Form.Item>

							<Form.Item>
								<Button block type="primary" htmlType="submit" className="login-form-button"
										onClick={this.onSubmit}
								>
									Log in
								</Button>
								or
								<Link to="/sign"><a> register now!</a></Link>
							</Form.Item>
						</Form>
						{/*<Input placeholder='Email' ref={(input) => {this.account = input}}/>*/}
						{/*<Input placeholder='Password' type='password' ref={(input) => {this.password = input}}/>*/}
						{/*<Button onClick={() => this.props.login(this.account, this.password)}>Login</Button>*/}
					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect to='/'/>
		}
	}
}

const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login'])
});

const mapDispatch = (dispatch) => ({

	login(accountElem, passwordElem){
		dispatch(actionCreators.login(accountElem, passwordElem))
	}
});

export default connect(mapState, mapDispatch)(Login);