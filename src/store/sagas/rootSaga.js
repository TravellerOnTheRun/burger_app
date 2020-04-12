import { takeEvery, all, takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import { fetchIngredientsSaga } from './burgerBuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order';

export function* watchAuth()
	{
		yield all([
				takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
				takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
				takeEvery(actionTypes.AUTH_USER, authUserSaga),
				takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
			])
	};

export function* watchBurgerBuilder()
	{
		yield takeEvery(actionTypes.FETCH_INGREDIENTS, fetchIngredientsSaga);
	};
export function* watchOrders()
	{
		yield takeLatest( actionTypes.PURCHASE_BURGER, purchaseBurgerSaga );
		yield takeEvery( actionTypes.FETCH_ORDERS, fetchOrdersSaga );
	};