import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content } from './style';
import { actionCreators } from './store';
import { Descriptions, Badge,Input,Button } from 'antd';
import 'antd/es/descriptions/style/css';
import 'antd/es/badge/style/css';
import 'antd/es/input/style/css';
import 'antd/es/button/style/css';
import {actionCreators as loginActionCreators} from "../login/store";
import moment from 'moment';

class Detail extends PureComponent {

	render() {

		const { TextArea } = Input;
		const {detailId,courseName,studentName,teacherName,courseStartDatetime,courseEndDatetime,grade,timeCost,title,courseState,callBack,userInfo,submitCall} = this.props;
		return (
			<DetailWrapper>
				{/*<Header>{this.props.title}</Header>*/}
				<Descriptions title={courseName} layout="vertical" bordered>
					<Descriptions.Item label="Title">{title}</Descriptions.Item>
					<Descriptions.Item label="Student">{studentName}</Descriptions.Item>
					<Descriptions.Item label="Teacher">{teacherName}</Descriptions.Item>
					<Descriptions.Item label="Date">{moment(courseStartDatetime).format('YYYY-MM-DD')}</Descriptions.Item>
					<Descriptions.Item label="TimeCost">{timeCost}</Descriptions.Item>
					<Descriptions.Item label="Grade">{grade}</Descriptions.Item>
					<Descriptions.Item label="Start">{moment(courseStartDatetime).format('HH:mm:ss')}</Descriptions.Item>
					<Descriptions.Item label="End" span={2}>{moment(courseEndDatetime).format('HH:mm:ss')}</Descriptions.Item>
					<Descriptions.Item label="Status" span={3}>
						<Badge status="processing" text={courseState} />
					</Descriptions.Item>
					<Descriptions.Item label="Feedback">
						{userInfo.role==="Student"?callBack:
						<div>
						<div style={{ margin: '24px 0' }} />
						<TextArea
							value={callBack}
							onChange={this.onChange}
							placeholder="Controlled autosize"
							autoSize={{ minRows: 3, maxRows: 5 }}
						/>
						<Button block type="primary" onClick={()=>{submitCall(detailId,callBack)}}>Submit</Button>
						</div>}
					</Descriptions.Item>
				</Descriptions>
			</DetailWrapper>
		)
	}

	componentDidMount() {
		this.props.getUserInfo();
		this.props.getDetail(this.props.match.params.id);
	}

	onChange = ({ target: {value} }) => {
		this.props.changeCallback(value);
	};
}

const mapState = (state) => ({
	detailId: state.getIn(['detail', 'id']),
	courseName: state.getIn(['detail', 'courseName']),
	studentName: state.getIn(['detail', 'studentName']),
	teacherName: state.getIn(['detail', 'teacherName']),
	startTime: state.getIn(['detail', 'startTime']),
	endTime: state.getIn(['detail', 'endTime']),
	studentConfirm: state.getIn(['detail', 'studentConfirm']),
	teacherConfirm: state.getIn(['detail', 'teacherConfirm']),
	callBack: state.getIn(['detail', 'callBack']),
	createTime: state.getIn(['detail', 'createTime']),
	isCallBack: state.getIn(['detail', 'isCallBack']),
	courseState:state.getIn(['detail', 'courseState']),
	userInfo:state.getIn(['login', 'userInfo']),
	title:state.getIn(['detail', 'title']),
	grade:state.getIn(['detail', 'grade']),
	timeCost:state.getIn(['detail', 'timeCost']),
	courseStartDatetime:state.getIn(['detail', 'courseStartDatetime']),
	courseEndDatetime:state.getIn(['detail', 'courseEndDatetime']),
});

const mapDispatch = (dispatch) => ({
	getDetail(id) {
		dispatch(actionCreators.getDetail(id));
	},
	getUserInfo(){
		dispatch(loginActionCreators.getUserInfo())
	},
	changeCallback(callback){
		dispatch(actionCreators.changeCallback(callback))
	},
	submitCall(id,callback){
		dispatch(actionCreators.submitCallback(id,callback))
	}
});

export default connect(mapState, mapDispatch)(withRouter(Detail));
