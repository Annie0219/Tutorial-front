import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem } from '../style';
import { Steps } from 'antd';
import 'antd/es/steps/style/css';

const { Step } = Steps;


class Topic extends PureComponent {
	render() {
		const {selectCourse,isSubmitCourse } = this.props;
		return (
			<TopicWrapper>
				{/*{*/}
				{/*	list.map((item) => (*/}
				{/*		<TopicItem key={item.get('id')}>*/}
				{/*			<img*/}
				{/*				className='topic-pic'*/}
				{/*				src={item.get('imgUrl')}*/}
				{/*				alt=''*/}
				{/*			/>*/}
				{/*			{item.get('title')}*/}
				{/*		</TopicItem>*/}
				{/*	))*/}
				{/*}*/}
				<Steps current={""===selectCourse?0: isSubmitCourse?2:1}>
					<Step title="Select" description="Select course." />
					<Step title="Submit" description="Fill in the form." />
					<Step title="Waiting" description="Waiting for match." />
				</Steps>
			</TopicWrapper>
		)
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'topicList']),
	selectCourse:state.getIn(['home', 'selectCourse']),
	isSubmitCourse:state.getIn(['home', 'isSubmitCourse'])
});

export default connect(mapState, null)(Topic);