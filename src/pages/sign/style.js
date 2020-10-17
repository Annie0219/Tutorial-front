import styled from 'styled-components';
import loginPic from "../../statics/login.gif";

export const LoginWrapper = styled.div`
	z-index: 0;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 56px;
	background: #eee;
`;
export const BannerImg = styled.div`
	width: 350px;
	height: 120px;
	margin: 5px auto;
	padding-top: 20px;
	background: url(${loginPic});
	background-size: contain;
`;

export const LoginBox = styled.div`
	width: 450px;
	height: 480px;
	margin: 100px auto;
	padding-top: 20px;
	background: #fff;
	box-shadow: 0 0 8px rgba(0,0,0,.1);
`;

export const Input = styled.input`
	display: block;
	width: 340px;
	height: 30px;
	line-height: 30px;
	padding: 0 10px;
	margin: 10px auto;
	color: #777;
`;

export const SelectBox = styled.div`
	display: flow;
	width: 350px;
	height: 30px;
	line-height: 30px;
	padding: 0 5px;
	margin: 5px auto;
	color: #777;
	.text_div{
	width: 80px;
	}
`;


export const Button = styled.div`
	width: 340px;
	height: 30px;
	line-height: 30px;
	color: #fff;
	background: #3194d0;
	border-radius: 15px;
	margin: 10px auto;
	text-align: center;
`;