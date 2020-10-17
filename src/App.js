import React, {Component,Fragment} from 'react';
import Header from "./common/header";
import {GlobalStyleFont} from './statics/iconfont/iconfont'
import {Provider} from 'react-redux'
import {Route,HashRouter} from "react-router-dom";
import Home from './pages/home'
import Detail from "./pages/detail/loadable.js";
import Login from './pages/login';
import Write from './pages/write';
import Sign from './pages/sign'
import store from "./store";

class App extends Component{

    render() {
        return (
            <Fragment>
                <Provider store={store}>
                    <HashRouter>
                        <Header />
                        <Route path='/' exact component={Home}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/sign' exact component={Sign}/>
                        <Route path='/write' exact component={Write}/>
                        <Route path='/detail/:id' exact component={Detail}/>
                    </HashRouter>
                </Provider>
                <GlobalStyleFont />

            </Fragment>
        );
    }
}

export default App;
