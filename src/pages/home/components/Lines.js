import React, { PureComponent } from 'react';
import { WriterWrapper } from '../style';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined,UserOutlined } from '@ant-design/icons';
import { actionCreators } from '../../login/store'

import 'antd/es/card/style/css';
import 'antd/es/avatar/style/css';
import {connect} from "react-redux";

class Lines extends PureComponent {

	render() {
		const { login, userInfo } = this.props;
		const { Meta } = Card;
		return (
			<WriterWrapper>
				<Card
					style={{ width: 300}}

					// actions={[
					// 	<SettingOutlined key="setting" />,
					// 	<EditOutlined key="edit" />,
					// 	<EllipsisOutlined key="ellipsis" />,
					// ]}
				>
					<Avatar size={64} icon={<UserOutlined />} src={userInfo.avatar} />
					<Meta
						title={userInfo.name}
						description={userInfo.email}
					/>
					{userInfo.role}<br/>
					{userInfo.courseHour} minute
				</Card>
			</WriterWrapper>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		login:state.getIn(['login','login']),
		userInfo:state.getIn(['login','userInfo'])
	}
};

export default connect(mapStateToProps,null)(Lines)
