import React ,{Component}from "react";
import {connect} from 'react-redux'
import {CSSTransition} from "react-transition-group";
import  {actionCreators}  from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { actionCreators as homeActionCreators } from '../../pages/home/store'
import { Avatar } from 'antd';
import 'antd/es/avatar/style/css';
import {
    HeaderWrapper,
    Nav,
    NavItem,
    NavSearch,
    SearchWrapper,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Logo
} from "./style.js";
import {Link} from "react-router-dom";
class Header extends Component {
    getListArea() {
        const newList = this.props.list.toJS();
        const pageList = [];

        if (newList.length) {
            for (let i = (this.props.page - 1) * 10; i < this.props.page * 10; i++) {
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }

        if (this.props.focused || this.props.mouseIn) {
            return (
                <SearchInfo
                    onMouseEnter={this.props.handleMouseEnter}
                    onMouseLeave={this.props.handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch
                            onClick={() => this.props.handleChangePage(this.props.page, this.props.totalPage, this.spinIcon)}
                        >
                            <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else {
            return null;
        }
    }

    render() {
        const { focused, handleInputFocus, handleInputBlur, list, login, logout,userInfo,changePageListType } = this.props;
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo onClick={()=>changePageListType(true)} />
                </Link>
                <Nav>
                    <Link to='/'>
                    <NavItem onClick={()=>changePageListType(true)} className='left active'>Home</NavItem>
                    </Link>
                    {
                        login ?
                            null:
                            <Link to='/sign'>
                                <NavItem className='right'>sign</NavItem>
                            </Link>

                    }
                    {
                        login ?
                            <div>
                                <Link to='/login'>
                                <NavItem onClick={logout} className='right'>logout</NavItem>
                                </Link>
                                </div>:
                            <Link to='/login'>
                                <NavItem className='right'>login</NavItem>
                            </Link>

                    }

                    {/*<NavItem className='right'>*/}
                    {/*    <i className="iconfont">&#xe636;</i>*/}
                    {/*</NavItem>*/}
                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSearch
                                className={focused ? 'focused': ''}
                                onFocus={() => handleInputFocus(list)}
                                onBlur={handleInputBlur}
                            >
                            </NavSearch>
                        </CSSTransition>
                        <i
                            className={focused?'focused iconfont':'iconfont'}
                        >&#xe687;
                        </i>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header', 'list']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        login:state.getIn(['login','login']),
        userInfo:state.getIn(['login','userInfo'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            (list.size === 0) && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if (originAngle) {
                originAngle = parseInt(originAngle, 10);
            }else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

            if (page < totalPage) {
                dispatch(actionCreators.changePage(page + 1));
            }else {
                dispatch(actionCreators.changePage(1));
            }
        },
        logout(){
            dispatch(loginActionCreators.logout());
            dispatch(loginActionCreators.logoutRequest())
        },
        changePageListType(pageListType) {
            dispatch(homeActionCreators.changeRawListType(pageListType))
        },
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Header)