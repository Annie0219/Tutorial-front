import React, { PureComponent } from 'react';
import reqwest from 'reqwest';
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
import { List, Tag, Button, Skeleton,Descriptions } from 'antd';
import 'antd/es/list/style/css';
import 'antd/es/avatar/style/css';
import 'antd/es/button/style/css';
import 'antd/es/skeleton/style/css';
import 'antd/es/tag/style/css';
import 'antd/es/descriptions/style/css';
import moment from 'moment';

class Lists extends PureComponent {

	render() {
		const { list ,getMoreList,page,rawInitLoading,rawLoading,setIsRawListLoading,hasNextLoading,matchListStatus} = this.props;
		const loadMore =
			rawInitLoading && hasNextLoading? (
				<div
					style={{
						textAlign: 'center',
						marginTop: 12,
						height: 32,
						lineHeight: '32px',
					}}
				>
					<Button onClick={() => {setIsRawListLoading();getMoreList(page,matchListStatus)}}>loading more</Button>
				</div>
			) : null;

		return (
			<div>
				<List
					className="demo-loadmore-list"
					loading={rawLoading}
					itemLayout="horizontal"
					loadMore={loadMore}
					dataSource={list}
					renderItem={item => (
						<List.Item

							actions={
								item.get('courseState')!=="waiting"?
								[<Link key='1' to={'/detail/'+item.get('id')}><a key="list-loadmore-more">detail</a></Link>]
								:["detail"]

							}
						>
							<Skeleton avatar title={false} loading={rawLoading} active>
								<List.Item.Meta
									description={
										item.get('courseState')==="waiting"?
											item.get('isWeek')===true?
											<div>
												<Descriptions title={item.get('courseName')} >
													<Descriptions.Item label="class time">{item.get('startTime')}</Descriptions.Item>
													<Descriptions.Item label="range">{item.get('startDate')} to {item.get('endDate')}</Descriptions.Item>
												</Descriptions>
												<Tag>{item.get('grade')} grade</Tag><Tag>{item.get('timeCost')} minute</Tag><Tag>{item.get('week').toString().replace("List","")}</Tag><Tag>{item.get('title')}</Tag>
											</div>
												:
												<div>
													<Descriptions title={item.get('courseName')} >
														<Descriptions.Item label="class time">{item.get('startTime')}</Descriptions.Item>
														<Descriptions.Item label="date">{item.get('startDate')}</Descriptions.Item>
													</Descriptions>
													<Tag>{item.get('grade')} grade</Tag><Tag>{item.get('timeCost')} minute</Tag><Tag>{item.get('title')}</Tag>
												</div>
										:<div>
												<Descriptions title={item.get('courseName')} >
													<Descriptions.Item label="date">{moment(item.get('courseStartDatetime')).format('YYYY-MM-DD')}</Descriptions.Item>
													<Descriptions.Item label="time">{ moment(item.get('courseStartDatetime')).format('HH:mm:ss')} to {moment(item.get('courseEndDatetime')).format('HH:mm:ss')}</Descriptions.Item>
												</Descriptions>
												<Tag>{item.get('grade')} grade</Tag><Tag>{item.get('timeCost')} minute</Tag><Tag>{item.get('title')}</Tag>
											</div>
									}
								/>
								<div>
									<Tag color={this.getColor(item.get('courseState'))}>{item.get('courseState')}
									</Tag></div>
							</Skeleton>
						</List.Item>
					)}
				/>
			</div>
		);
	}
	getColor(states){
		if(states==="ready"){
			return "success"
		}
		if(states==="waiting"){
			return "warning"
		}
		if(states==="unconfirmed"){
			return "error"
		}
		if(states==="pending feedback"){
			return "processing"
		}
		if(states==="close"){
			return "default"
		}

	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'rawList']),
	page: state.getIn(['home', 'articlePage']),
	matchListStatus:state.getIn(['home', 'matchListStatus']),
	rawInitLoading:state.getIn(['home', 'rawInitLoading']),
	hasNextLoading:state.getIn(['home', 'hasRawNextLoading']),
	rawLoading:state.getIn(['home', 'rawLoading'])
});

const mapDispatch = (dispatch) => ({
	getMoreList(page,courseStatus) {
		dispatch(actionCreators.getMoreList(page,courseStatus))
	},
	setIsRawListLoading(){
		dispatch(actionCreators.isRawListLoading())
	}
});

export default connect(mapState, mapDispatch)(Lists);