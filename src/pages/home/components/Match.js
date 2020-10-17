import React, { Component} from 'react';
import { connect } from 'react-redux';
import { List, Avatar, Button, Skeleton } from 'antd';
import 'antd/es/descriptions/style/css';
import 'antd/es/badge/style/css';
import { Link } from 'react-router-dom';
import {actionCreators} from "../store";

class Match extends Component {

	render() {
		const {list,page,matchInitLoading,matchLoading,hasMatchNextLoading,matchListStatus,addMoreList,confirmDetail,userInfo } = this.props;
		const loadMore =
			matchInitLoading && hasMatchNextLoading? (
				<div
					style={{
						textAlign: 'center',
						marginTop: 12,
						height: 32,
						lineHeight: '32px',
					}}
				>
					<Button onClick={()=>{addMoreList(page,matchListStatus)}}>loading more</Button>
				</div>
			) : null;


		return (
				<List
					className="demo-loadmore-list"
					loading={matchLoading}
					itemLayout="horizontal"
					loadMore={loadMore}
					dataSource={list}
					renderItem={item => (
						<List.Item
							actions={
								userInfo.role==='Student'?
									item.get('studentConfirm')?([<Link key='1' to={'/detail/'+item.get('id')}><a key="list-loadmore-more">More</a></Link>])
									:([<a onClick={()=>confirmDetail(item.get('id'),item.index,true,item.get('teacherConfirm'),list)}>Confirm</a>, <Link key='1' to={'/detail/'+item.get('id')}><a key="list-loadmore-more">More</a></Link>])
								:item.get('teacherConfirm')?([<Link key='1' to={'/detail/'+item.get('id')}><a key="list-loadmore-more">More</a></Link>])
									:([<a onClick={()=>confirmDetail(item.get('id'),item.index,true,item.get('studentConfirm'),list)}>Confirm</a>, <Link key='1' to={'/detail/'+item.get('id')}><a key="list-loadmore-more">More</a></Link>])
							}
						>
							<Skeleton avatar title={false} loading={matchLoading} active>
								<List.Item.Meta
									avatar={
										<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
									}
									title={<a href="https://ant.design">{item.get('courseName')}</a>}
									description={
										<p>time:{item.get('startTime')} teacher:{item.get('teacherName')} student{item.get('studentName')}</p>
									}
								/>
								<div>{item.get('studentConfirm')}</div>
							</Skeleton>
						</List.Item>
					)}
				/>
		);
	}

	componentDidMount() {
		this.props.getInitList();
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'matchList']),
	page: state.getIn(['home', 'matchListNextPage']),
	matchInitLoading:state.getIn(['home', 'matchInitLoading']),
	matchLoading:state.getIn(['home', 'matchLoading']),
	hasMatchNextLoading:state.getIn(['home', 'hasMatchNextLoading']),
	matchListStatus:state.getIn(['home', 'matchListStatus']),
	userInfo:state.getIn(['login','userInfo'])
});

const mapDispatch = (dispatch) => ({
	getInitList() {
		dispatch(actionCreators.initMatchInitListRequest())
	},
	addMoreList(page,dataStatus){
		dispatch(actionCreators.addMatchMoreListRequest(page,dataStatus))
	},
	setListLoading(){
		dispatch(actionCreators.isMatchListLoading())
	},
	confirmDetail(id,index,st,te,list){
		dispatch(actionCreators.confirmDetail(id,index,st,te,list))
	}
});

export default connect(mapState, mapDispatch)(Match);
