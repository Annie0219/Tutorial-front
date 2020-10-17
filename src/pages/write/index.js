import React, { PureComponent } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { HomeImage,HomeWrapper,WBox,DivCenter } from './style';
import {
	Form,
	Input,
	Button,
	Select,
	DatePicker,
	TimePicker, message,

} from 'antd';
import 'antd/es/form/style/css';
import 'antd/es/input/style/css';
import 'antd/es/button/style/css';
import 'antd/es/select/style/css';
import 'antd/es/date-picker/style/css';
import 'antd/es/time-picker/style/css';
import 'moment/locale/zh-cn';
import {actionCreators} from "../write/store";
import fetch from "../../utils/fetch";
import * as urlConstants from "../../store/urlConstants";

class Write extends PureComponent {
	// formRef = React.createRef();
	//
	// onReset = () => {
	// 	this.formRef.current.resetFields();
	// };
	//
	// onSubmit = () => {
	// 	alert("date"+this.formRef.current.getFieldValue('date')+"time"+this.formRef.current.getFieldValue('time'))
	// 	fetch.post(urlConstants.CREATE_RAW_COURSE,{
	// 		title:this.formRef.current.getFieldValue('title'),
	// 		courseName:this.formRef.current.getFieldValue('course'),
	// 		dateRange:this.formRef.current.getFieldValue('date'),
	// 		timeRange:this.formRef.current.getFieldValue('time')
	// 	}).then((res) => {
	// 		if (res.status===200) {
	// 			message.info("send success!",3);
	// 			window.location.href = '#/';
	// 		}
	// 	})
	// };
	//
	// render() {
	// 	const { RangePicker } = DatePicker;
	//
	// 	const layout = {
	// 		labelCol: {
	// 			span: 5,
	// 		},
	// 		wrapperCol: {
	// 			span: 16,
	// 		},
	// 	};
	// 	const tailLayout = {
	// 		wrapperCol: {
	// 			offset: 5,
	// 			span: 50,
	// 		},
	// 	};
	//
	// 	return (
	// 		<HomeWrapper>
	// 			<WBox>
	// 				<HomeImage src="https://website-static-resources.oss-cn-shanghai.aliyuncs.com/static/title.jpg"/>
	// 				<div>
	// 					<DivCenter>
	// 						<Form
	// 							ref={this.formRef}
	// 							{...layout}
	// 							layout="horizontal"
	// 							size="middle"
	// 						>
	// 							<Form.Item
	// 								name="title"
	// 								rules={[
	// 									{
	// 										required: true,
	// 										message: 'Please input title!',
	// 									},
	// 								]}
	//
	// 								label="Title">
	// 								<Input ref={value => {this.title = value}}/>
	// 							</Form.Item>
	// 							<Form.Item
	// 								name="course"
	// 								rules={[
	// 									{
	// 										required: true,
	// 									},
	// 								]}
	// 								label="Course">
	// 								<Select
	// 									placeholder="Select a option and change input text above"
	// 									allowClear
	// 								>
	// 									<Select.Option value="C++">C++</Select.Option>
	// 									<Select.Option value="Java">Java</Select.Option>
	// 									<Select.Option value="Python">Python</Select.Option>
	// 									<Select.Option value="GO">GO</Select.Option>
	// 									<Select.Option value="R">R</Select.Option>
	// 								</Select>
	// 							</Form.Item>
	//
	// 							<Form.Item
	// 								name="date"
	// 								rules={[
	// 									{
	// 										required: true,
	// 									},
	// 								]}
	// 								label="Date" >
	// 								<RangePicker />
	// 							</Form.Item>
	//
	// 							<Form.Item
	// 								name="time"
	// 								rules={[
	// 									{
	// 										required: true,
	// 									},
	// 								]}
	// 								label="Time" >
	// 								<TimePicker.RangePicker />
	// 							</Form.Item>
	// 							<Form.Item {...tailLayout}>
	// 								<Button type="primary" htmlType="submit" onClick={this.onSubmit}>
	// 									Submit
	// 								</Button>
	// 								<Button htmlType="button" onClick={this.onReset}>
	// 									Reset
	// 								</Button>
	// 								<Button type="link" htmlType="button" >
	// 									<Link to={"/"}>Cancel</Link>
	// 								</Button>
	// 							</Form.Item>
	// 						</Form>
	//
	// 					</DivCenter>
	//
	// 				</div>
	//
	// 			</WBox>
	// 		</HomeWrapper>
	// 	)
	// }

}

const mapState = (state) => ({

});
const mapDispatch = (dispatch) => ({

});
export default connect(mapState, mapDispatch)(Write);