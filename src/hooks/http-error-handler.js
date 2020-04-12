import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError ] = useState(null);

		const requestInterseptor = httpClient.interceptors.request.use(req => {
			setError(null);
			return req;
		});

		const responseInterceptor = httpClient.interceptors.response.use(res => res, err => {
            setError(err);
		});

		useEffect(()=> {
			return () => {
				httpClient.interceptors.request.eject(requestInterseptor);
				httpClient.interceptors.response.eject(responseInterceptor);
			};
		}, [requestInterseptor, responseInterceptor]);
	
		const errorConfirmedHandler = () => {
			setError(null);
        };
    return [ error, errorConfirmedHandler ];
};