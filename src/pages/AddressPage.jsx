import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";



const AddressPage = () => {

  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get(
        "http://localhost:1337/addresses"
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
        <h1>Adres ve İletişim Bilgilerim</h1>
        {!!data && data.addresses.map((address) => {
          const row = [];
          row.push(<li key={address}>
            <ul>
              <li>{address.type}</li>
              <li>{address.address}</li>
              <li>{address.city}</li>
              <li>{address.district}</li>
              <li>{address.postalCode}</li>
            </ul>
          </li>);
          return row;
        }
        )}
        {!!data && data.contacts.map((contact) => {
          const row2 = [];
          row2.push(<li key={contact}>
            <ul>
              <li>{contact.type}</li>
              <li>{contact.value}</li>
            </ul>
          </li>);
          return row2;
        })}

      </div>
    </>
  );
};

export default AddressPage;
