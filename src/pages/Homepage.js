import React, {useState,useEffect} from 'react';
import Search from '../components/search';
import Picture from '../components/Picture';

const HomePage = () => {
    const [input, setInput]=useState("");
    let [data, setData]=useState(null);
    let [page, setPage]=useState(1);
    let [currentSearch, setcurrentSearch]=useState("");
    const auth="563492ad6f917000010000017a637fb0bb86465687172ea79575f8a5";
    const initialURL="https://api.pexels.com/v1/curated?page=1&per_page=15";
    const searchURL=`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`;

    const search = async (url) => {
        setPage(2);
        const dataFetch=await fetch(url,{
            method:"GET",
            headers:{
                Accept:"application/json",
                Authorization:auth,
            }, 
        });
        let parseData=await dataFetch.json();
        setData(parseData.photos);
    };

    const morepicture= async()=>{
        let newURL;
        if(currentSearch===""){
            newURL=`https://api.pexels.com/v1/curated?page=${page}&per_page=15`;  
        }else{
            newURL=`https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
        }
        setPage(page+1);

        const dataFetch=await fetch(newURL,{
            method:"GET",
            headers:{
                Accept:"application/json",
                Authorization:auth,
            }, 
        });
        let parseData=await dataFetch.json();
        setData(data.concat(parseData.photos));
    };

    useEffect(()=>{
        search(initialURL);
    },[]);

    useEffect(()=>{
        if(currentSearch===""){
            search(initialURL);
        }
        else{
            search(searchURL);
        }
    },[currentSearch]);

    return (
        <div className='main'>
            <Search search={()=>{setcurrentSearch(input);}} setInput={setInput}/>
            <div className="pictures">
                {
                    data&&data.map((d) => {
                        return <Picture data={d}/>;
                    })
                }
            </div>
            <div className='morePicture'>
                <button onClick={morepicture}>Load More</button>
            </div>
        </div>
    );
};

export default HomePage;
