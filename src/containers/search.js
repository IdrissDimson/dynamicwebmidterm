import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import '../styles/search.css';

export default function Search() {
    const collection = '251966';
    const number = getRandomNumber(0,9);

    let [foodPic, setFoodPic] = useState({});
    let queryWord = '';
    let history = useHistory();
    let querytext = document.getElementById("queryText");
    

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
    function handleClick(){
        queryWord = querytext.value;
        history.push(`/search?food=${queryWord}`);
    }
    function queryPicAPI(queryPic) {
        axios.get(`https://api.unsplash.com/collections/${queryPic}/photos/?client_id=cb1f777bccf37e7cff6f910a65e8d166d841da85f108db436cd0695ae01be144`)
        .then(function(response){
            console.log('response', response.data);
            setFoodPic(response.data);
            return response;
        })
        .catch(function(error){
            console.log('error', error);
            return error;
        })
    }
    useEffect(() => {
        queryPicAPI(collection);
    },[collection]);

    return(
        <div className="search-body" style={{backgroundImage: `url(${foodPic[number] && foodPic[number].urls.full})`}}>
            <section className="search-section">
                <h1>My Recipe Book</h1>
                <div className="search">
                    <input type="text" 
                        className="search-bar" 
                        id="queryText" 
                        placeholder="What do you want to make today?"
                        onKeyPress={ event => {
                            if (event.key === 'Enter') {
                                handleClick();
                            }
                        }}
                        />
                    <button type="button" className="search-button" onClick={ handleClick }>Food Search</button>
                </div>
            </section>
            <footer>
                <p><strong>Food:</strong> {foodPic[number] && foodPic[number].alt_description}</p>
                <p><strong>Photo by:</strong> {foodPic[number] && foodPic[number].user.name}</p>
                <p><strong>Made by:</strong> Idriss Dimson</p>
            </footer>
        </div>
    );
}