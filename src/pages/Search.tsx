import React from 'react'
import {  useParams } from 'react-router-dom';

interface SearchParam  {
    search:string;
}

 const Search= () => {
    const location = useParams<SearchParam>();
    console.log(location);
    return (
        <div>
            this is the search page
            {location.search}
             </div>
    )
}

export default Search