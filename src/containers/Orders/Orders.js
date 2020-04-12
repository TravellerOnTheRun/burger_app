import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const  Orders = props => {

	const { onFetchOrders } = props;

	useEffect(() => {
		onFetchOrders(props.token, props.userId);
	}, [ onFetchOrders ])

			let orders = <Spinner />;
			if(!props.loading) {
				orders = props.orders.map(order => (
					<Order 
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}/>
					))
				
			};
			return(
				<div>
					{orders}
				</div>
			);


};
const mapStateToProps = state => {
		return {
			orders: state.or.orders,
			loading: state.or.loading,
			token: state.ar.token,
			userId: state.ar.userId
		};
};

const mapDispatchToProps = dispatch =>{
		return {
			onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
		};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); 