import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Lists from './components/Lists';
import Recommend from './components/Recommend';
import Lines from './components/Lines';
import Post from './components/Post';
import Topic from './components/Topic';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators} from '../login/store';
import { BackTop } from './style';

import { 
	HomeWrapper,
	HomeLeft,
	HomeRight
} from './style';
import Match from "./components/Match";

class Home extends PureComponent {

	handleScrollTop() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<HomeWrapper>
				<Topic />
				<HomeLeft>
					<Post/>
					{this.props.pageListType ? <Lists /> :<Match/>}
				</HomeLeft>
				<HomeRight>
					<Recommend />
					<Lines />
				</HomeRight>
				{ this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>BackTop</BackTop> : null}
			</HomeWrapper>
		)
	}

	componentDidMount() {
		this.props.getUserInfo();
		this.props.changeHomeData("");
		this.bindEvents();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.changeScrollTopShow);
	}

	bindEvents() {
		window.addEventListener('scroll', this.props.changeScrollTopShow);
	}

}

const mapState = (state) => ({
	showScroll: state.getIn(['home', 'showScroll']),
	pageListType:state.getIn(['home','isRawList'])
});

const mapDispatch = (dispatch) => ({
	changeHomeData(courseStatus) {
		dispatch(actionCreators.getHomeInfo(courseStatus));
	},
	changeScrollTopShow() {
		if (document.documentElement.scrollTop > 100) {
			dispatch(actionCreators.toggleTopShow(true))
		}else {
			dispatch(actionCreators.toggleTopShow(false))
		}
	},
	getUserInfo(){
		dispatch(loginActionCreators.getUserInfo())
	}
});

export default connect(mapState, mapDispatch)(Home);
