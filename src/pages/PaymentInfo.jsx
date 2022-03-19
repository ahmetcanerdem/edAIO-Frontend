import axios from "axios";
import React, { useEffect, useState } from "react";



const PaymentInfo = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "http://127.0.0.1:1337/payment"
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []
  );



  return (
    <>
    <div>
        <h1>Ödeme Bilgilerim</h1>
        {!!data && data.payments.map((payment) => { 
            const row = [];
    
        row.push(<li key={payment}>
            <ul>
                <li>Date: {payment.date}</li>
                <li>Term: {payment.term}</li>
                <li>Payment Type: {payment.paymentType}</li>
                <li>Fee: {payment.fee}</li>
                <li>Collection: {payment.collection}</li>
            </ul>
        </li>);
      return row;
    }
      
      )}
    </div>
    </>
  );
};

export default PaymentInfo;
