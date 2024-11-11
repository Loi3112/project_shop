import React from "react";
import { Provider } from "react-redux";
import store from '../../redux/store';
import PaymentComponents from "@/components/PaymentComponents/PaymentComponents";


const Payment = () => {
    return (
        <Provider store={store}>
            <PaymentComponents />
        </Provider>
    );
};

export default Payment;
