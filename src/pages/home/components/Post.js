import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MenuFormWrapper } from '../style';
import {Button, DatePicker, Form, Input, Menu, message, Select,Tabs,Checkbox} from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/es/menu/style/css';
import 'antd/es/checkbox/style/css';
import 'antd/es/tabs/style/css';
import 'antd/es/time-picker/style/css';
import {Link} from "react-router-dom";
import {actionCreators} from "../store";
import fetch from "../../../utils/fetch";
import * as urlConstants from "../../../store/urlConstants";
import moment from 'moment';




class Post extends Component {
	formRef = React.createRef();

	onSubmit = () => {
		if(""===this.props.selectCourse){
			message.error("course is null!",3);
		}else{
			// alert("date"+this.formRef.current.getFieldValue('date')+"time"+this.formRef.current.getFieldValue('time'))
			if(this.props.isWeek){
				if(""===this.props.weekStartDateTime || ""===this.props.weekEndDateTime ){
					message.error("DateTime is null!",3);
					return;
				}
			}else{
				if(""===this.props.startDateTime){
					message.error("DateTime is null!",3);
					return;
				}
			}

			fetch.post(urlConstants.CREATE_RAW_COURSE,{
				title:this.props.title,
				courseName:this.props.selectCourse,
				grade:this.props.grade,
				timeCost:this.props.timeCost,
				week:this.props.week,
				isWeek:this.props.isWeek,
				weekStartDateTime:this.props.weekStartDateTime.replace(" ","T"),
				weekEndDateTime:this.props.weekEndDateTime.replace(" ","T"),
				startDateTime:this.props.startDateTime.replace(" ","T")
			}).then((res) => {
				if (res.status===200) {
					this.props.changeIsSubmitCourse(true);
					message.info("send success!",3);
					window.location.href = '#/';
				}
			}).catch()
		}
	};

	// submenu keys of first level
	rootSubmenuKeys = ['sub1', 'sub2', 'sub4','sub5'];

	state = {
		openKeys: [],
	};

	onOpenChange = openKeys => {
		const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
		if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			this.setState({ openKeys });
		} else {
			this.setState({
				openKeys: latestOpenKey ? [latestOpenKey] : [],
			});
		}
	};

	render() {
		const { SubMenu } = Menu;
		const { TabPane } = Tabs;
		const { Option } = Select;
		const plainOptions = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
		const {changeSelectCourse,selectCourse,changeTitleCourse,changeGradeCourse,
			changeTimeCostCourse,changeWeekCourse,changeIsWeekCourse,changeWeekStartDateTimeCourse,
			changeWeekEndDateTimeCourse,changeStartDateTimeCourse } = this.props;
		const { RangePicker } = DatePicker;
		const layout = {
			labelCol: {
				span: 6,
			},
			wrapperCol: {
				span: 30,
			},
		};
		const tailLayout = {
			wrapperCol: {
				offset: 5,
				span: 50,
			},
		};

		return (
			<MenuFormWrapper>
				<Menu className="menu-div"
					mode="inline"
					openKeys={this.state.openKeys}
					onOpenChange={this.onOpenChange}
					onClick={(item)=>{changeSelectCourse(item.key)}}
					style={{ width: 256 }}
				>
					<SubMenu key="sub1" title="Science"
					>
						<Menu.SubMenu key="Physics" title="Physics">
							<Menu.Item key="Introductory Physics">Introductory Physics</Menu.Item>
							<Menu.Item key="AP Physics 1">AP Physics 1</Menu.Item>
							<Menu.Item key="AP Physics 2">AP Physics 2</Menu.Item>
							<Menu.Item key="AP Physics C">AP Physics C</Menu.Item>
						</Menu.SubMenu>
						<Menu.SubMenu key="Chemistry" title="Chemistry">
							<Menu.Item key="Introductory Chemistry">Introductory Chemistry</Menu.Item>
							<Menu.Item key="AP Chemistry">AP Chemistry</Menu.Item>
						</Menu.SubMenu>
						<Menu.SubMenu key="Biology" title="Biology">
							<Menu.Item key="Biology">Biology</Menu.Item>
						</Menu.SubMenu>
						<Menu.SubMenu key="Computer Science" title="Computer Science">
							<Menu.Item key="C">C</Menu.Item>
							<Menu.Item key="C++">C++</Menu.Item>
							<Menu.Item key="Java">Java</Menu.Item>
							<Menu.Item key="JavaScript">JavaScript</Menu.Item>
						</Menu.SubMenu>

					</SubMenu>
					<SubMenu key="sub2" icon={<AppstoreOutlined />} title="English">
						<Menu.Item key="English">English</Menu.Item>
					</SubMenu>
					<SubMenu key="sub4" icon={<SettingOutlined />} title="History">
						<Menu.Item key="World History">World History</Menu.Item>
						<Menu.Item key="US History">US History</Menu.Item>
					</SubMenu>
				</Menu>
				<Form className="form-div"
					{...layout}
					layout="horizontal"
					size="middle"
				>
					<Form.Item
						name="title"
						rules={[
							{
								required: true,
								message: 'Please input title!',
							},
						]}

						label="Title">
						<Input onChange={({ target: {value} }) => {
							changeTitleCourse(value);
						}}/>
					</Form.Item>
					<Form.Item
						label="Course" >
						<Input disabled={true} value={selectCourse}/>
					</Form.Item>

					<Form.Item
						name="grade"
						label="Grade"
						rules={[
							{
								required: true,
							}
						]}>
						<Select onChange={(value)=>{changeGradeCourse(value)}}>
							<Option value="1">1 grade</Option>
							<Option value="2">2 grade</Option>
							<Option value="3">3 grade</Option>
							<Option value="4">4 grade</Option>
							<Option value="5">5 grade</Option>
							<Option value="6">6 grade</Option>
							<Option value="7">7 grade</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="length"
						label="Length"
						rules={[
							{
								required: true,
							}
						]}>
						<Select onChange={(value)=>{changeTimeCostCourse(value)}}>
							<Option value="30">30 minute</Option>
							<Option value="45">45 minute</Option>
							<Option value="60">60 minute</Option>
						</Select>
					</Form.Item>
					<Form.Item
					name="dateTime"
					label="Time"
					>
						<Tabs defaultActiveKey="oneDay" onChange={(key)=>{changeIsWeekCourse(key)}} >
							<TabPane tab="OneDay" key="OneDay">
								<div>
									<DatePicker
										disabledDate={disabledDate}
										disabledTime={disabledRangeTime}
										showTime={{
											hideDisabledOptions: true,
											defaultValue: moment('10:00:00', 'HH:mm:ss')
										}}
										onChange={(value, dateString)=>{changeStartDateTimeCourse(dateString)}}
										onOk={this.onOk} />
								</div>
							</TabPane>
							<TabPane tab="WeekLoop" key="WeekLoop">
								<RangePicker
									disabledTime={disabledRangeTime}
									disabledDate={disabledDate}
									onChange={(value, dateString)=>{changeWeekStartDateTimeCourse(dateString[0]);changeWeekEndDateTimeCourse(dateString[1])}}
									showTime={{
										hideDisabledOptions: true,
										defaultValue: [moment('10:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')]
									}}
								/>
								<div>
									<Checkbox.Group options={plainOptions}  onChange={(value)=>{changeWeekCourse(value)}} />
								</div>
							</TabPane>
						</Tabs>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button block type="primary" htmlType="submit" onClick={this.onSubmit}>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</MenuFormWrapper>


		)
	}


	onOk(value) {
		console.log('onOk: ', value);
	}
	callback(key) {
		console.log(key);
	}
}


function range(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		result.push(i);
	}
	return result;
}

function rangeMin(start, end) {
	const result = [];
	for (let i = start; i < end; i++) {
		if(i%10!==0){
			result.push(i);
		}
	}
	return result;
}
function disabledDate(current) {
	// Can not select days before today and today
	return current < moment().endOf('day').add(-1, 'day');
}

function disabledRangeTime(_, type) {
	if (type === 'end') {
		return {
			disabledHours: () => range(1, 60),
			disabledMinutes: () => range(1, 60),
			disabledSeconds: () => range(1, 60),
		};
	}
	return {
		disabledHours: () => [22,23,0,1,2,3,4,5,6],
		disabledMinutes: () => rangeMin(0, 60),
		disabledSeconds: () => range(1, 60),
	};
}

const mapState = (state) => ({
	list: state.getIn(['home', 'topicList']),
	selectCourse:state.getIn(['home', 'selectCourse']),
	title:state.getIn(['home', 'title']),
	grade:state.getIn(['home', 'grade']),
	timeCost:state.getIn(['home', 'timeCost']),
	week:state.getIn(['home', 'week']),
	isWeek:state.getIn(['home', 'isWeek']),
	weekStartDateTime:state.getIn(['home', 'weekStartDateTime']),
	weekEndDateTime:state.getIn(['home', 'weekEndDateTime']),
	startDateTime:state.getIn(['home', 'startDateTime'])
});
const mapDispatch = (dispatch) => ({
	changeSelectCourse(course){
		dispatch(actionCreators.changeSelectCourse(course))
	},
	changeIsSubmitCourse(isSubmit){
		dispatch(actionCreators.changeIsSubmitCourse(isSubmit))
	},
	changeTitleCourse(isSubmit){
		dispatch(actionCreators.changeTitleCourse(isSubmit))
	},
	changeGradeCourse(isSubmit){
		dispatch(actionCreators.changeGradeCourse(isSubmit))
	},
	changeTimeCostCourse(isSubmit){
		dispatch(actionCreators.changeTimeCostCourse(isSubmit))
	},
	changeWeekCourse(isSubmit){
		dispatch(actionCreators.changeWeekCourse(isSubmit))
	},
	changeIsWeekCourse(isSubmit){
		"WeekLoop"===isSubmit?
		dispatch(actionCreators.changeIsWeekCourse(true))
		:dispatch(actionCreators.changeIsWeekCourse(false));
	},
	changeWeekStartDateTimeCourse(isSubmit){
		dispatch(actionCreators.changeWeekStartDateTimeCourse(isSubmit))
	},
	changeWeekEndDateTimeCourse(isSubmit){
		dispatch(actionCreators.changeWeekEndDateTimeCourse(isSubmit))
	},
	changeStartDateTimeCourse(isSubmit){
		dispatch(actionCreators.changeStartDateTimeCourse(isSubmit))
	}
});
export default connect(mapState, mapDispatch)(Post);