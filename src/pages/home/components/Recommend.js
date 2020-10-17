import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RecommendWrapper, RecommendItem } from '../style';
import {Link} from "react-router-dom";
import {actionCreators} from "../store";

class Recommend extends PureComponent {

	render() {
		const {changeHomeData,pageListStatus} = this.props;
		return (
			<RecommendWrapper>
				{/*<Link to='/write'>*/}
				{/*	<RecommendItem className='post' imgUrl="https://website-static-resources.oss-cn-shanghai.aliyuncs.com/static/post.png">POST</RecommendItem>*/}
				{/*</Link>*/}
				<RecommendItem onClick={()=>{changeHomeData("");pageListStatus("")}} className='all' imgUrl="https://website-static-resources.oss-cn-shanghai.aliyuncs.com/static/all.png">ALL POST</RecommendItem>
				<RecommendItem onClick={()=>{changeHomeData("undone");pageListStatus("undone")}} className='unfinished' imgUrl="https://website-static-resources.oss-cn-shanghai.aliyuncs.com/static/unfinished.png">UNFINISHED</RecommendItem>
				<RecommendItem onClick={()=>{changeHomeData("close");pageListStatus("close")}} className='finished' imgUrl="https://website-static-resources.oss-cn-shanghai.aliyuncs.com/static/finished.png">FINISHED</RecommendItem>
			</RecommendWrapper>
		)
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'recommendList'])
});

const mapDispatch = (dispatch) => ({
	changeHomeData(courseStatus) {
		dispatch(actionCreators.getHomeInfo(courseStatus));
	},
	changePageListType(pageListType) {
		dispatch(actionCreators.changeRawListType(pageListType))
	},
	pageListStatus(pageListStatus) {
		dispatch(actionCreators.changeMatchListStatus(pageListStatus))
	}
});

export default connect(mapState, mapDispatch)(Recommend);