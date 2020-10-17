import {combineReducers} from "redux-immutable";
import {reducer as headerReducer} from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as signReducer } from '../pages/sign/store';
import { reducer as writeReducer } from '../pages/write/store';

const reducer = combineReducers(
    {
        header: headerReducer,
        home: homeReducer,
        detail: detailReducer,
        login: loginReducer,
        sign:signReducer,
        write:writeReducer
    }
);

export default reducer;