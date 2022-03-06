import axios from "axios";
import React, { useEffect, useState } from "react";



const PaymentInfo = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
      axios
        .get(
          "https://e8b0110b-ad1a-49c9-a7e4-7e295e79036f.mock.pstmn.io/students/payment"
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
        <div>Payments</div>
        {!!data && data.paymentInfo.map((payment) => { 
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
