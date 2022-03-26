
import React, {useEffect, useState} from 'react';
import axios from "axios";

function AdminPage(props) {
    const [keywords, setKeywords] = useState('')
    const [fetchedData, setFetchedData] = useState('')

    async function fetchData() {
        const { data } = await axios.post(
            'http://127.0.0.1:1337/admin',

            {"item": keywords}
        )
        setFetchedData(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        fetchData();
        console.log(fetchedData.response);
    }

    return (
        <>
        
        <div>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        placeholder="type"
                        type="text"
                        value={keywords}
                        onChange={e => setKeywords((e.target.value))}
                    />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default AdminPage;



// import {useState, useEffect} from 'react';
// import axios from 'axios';
// function AdminPage (){
    
//     const [info, setInfo] = useState(null);

    
    
  
    
//     const [data, setData] = useState(null);
// 	useEffect(() => {
// 		axios
// 			.post(
// 				"http://localhost:1337/appointments", {data}
// 			)
// 			.then((response) => {
//                 console.log(response);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
// 	}, []
// 	);

//     const handleSubmit = () => {
//         setInfo(info)
//       };
    
//       return (
//         <form >
//           <label>
//             Name:
//             <input type="text" value={info} />
//           </label>
//           <button onClick={handleSubmit()}>Submit</button>
//         </form>
//       );
    
// };
//   export default AdminPage;