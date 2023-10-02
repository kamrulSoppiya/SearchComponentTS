/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

const LiveSearch = () => {
    const [searchItem , setSearchItem] = useState<string>('');
    const [apiData, setApiData] = useState<any[]>([]);

    const fetchData = async () => {
        try {
    
          const response = await fetch('https://jsonplaceholder.typicode.com/posts');
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          const saveData = jsonData.map((item: typeof jsonData)=>(
            item.title
          ))
          setApiData(saveData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(()=>{
        fetchData()
    },[]);

    // console.log(apiData)

    const handelSubmit = (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
    }

    const filterBySearch = apiData.filter((item) => {
        if (item.toLowerCase().includes(searchItem.toLowerCase())) { return item; }
    })
    return (
        <div>
            <form onSubmit={handelSubmit}>
                <input type="text" value={searchItem} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>setSearchItem(event.target.value)} />
                <button type="submit">Search</button>
            </form>
            {/* {console.log(saveData)} */}
            <ul style={{listStyle:'none'}}>
                {filterBySearch.map((it,index)=>
                    <li key={index}>{it}</li>
                )}
            </ul>
            
        </div>
    )
}

export default LiveSearch
