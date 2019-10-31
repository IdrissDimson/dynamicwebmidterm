import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import '../styles/recipe.css';


const apiKey = '1d850fa068051aa89305ad9ab3655823';
const appID = '2fe86ef7';

export default function Recipe(props) {
    const [food, setFood] = useState('');
    const [recipe, setRecipe] = useState({});

    const urlParams = new URLSearchParams(props.location.search);
    const foodParams = urlParams.get('food') ? urlParams.get('food') : 'chicken';
    const pageHistory = urlParams.get('page') ? urlParams.get('page') : '0';

    let history = useHistory();
    let numSwitch = parseInt(pageHistory, 10);
    let page = numSwitch * 10;
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function queryFoodAPI(queryFood) {
        axios.get(`https://api.edamam.com/search?q=${queryFood}&app_id=${appID}&app_key=${apiKey}&from=${page}`)
        .then(function(response){
            console.log('response', response.data);            
            setRecipe(response.data);
            return response;
        })
        .catch(function(error){
            console.log("error", error);
            return error;
        });
    }
    
    function newPage(){
        numSwitch += 1;
        history.push(`/search?food=${food}&page=${numSwitch}`);
        document.location.reload();
    }
    function previousPage(){
        numSwitch -= 1;
        history.push(`/search?food=${food}&page=${numSwitch}`);
        document.location.reload();
    }

    useEffect(() => {
        setFood(foodParams);
        queryFoodAPI(foodParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foodParams]);

    return (
        <div>
            <h1>Results for: {food} <a href="../">Back to Search</a></h1>
            <div>
                <button className="button" onClick={previousPage} disabled={numSwitch < 1}>Previous Page</button>
                <button className="button" onClick={newPage} disabled={!recipe.more}>Next Page</button>
            </div>
            {recipe.hits && recipe.hits.map((image,i) => (
                <div className="article" key={i}>
                    <h1>{image.recipe.label}</h1>
                    <img src={image.recipe.image} alt={food} />
                    <h2 className="collapsible" onClick={() => {
                        let content = document.getElementById(`${i}`);
                        if (content.style.display === "block") {
                            content.style.display = "none";
                        } else {
                            content.style.display = "block";
                        }
                    }}>
                        Ingredients
                    </h2>
                    <div className="content" id={i}>
                        {image.recipe.ingredientLines.map((food,i) => (
                            <li key={i}>{food}</li>
                        ))}
                    </div>
                    <p>Learn how to make it here: <a href={image.recipe.url}>{image.recipe.label}</a></p>
                </div>
            ))}
            {!recipe.more && <div className="error-body"><h1>Whoops!</h1>You either reached the end of the recipes or entered the wrong recipe.</div>}
        </div>
    );
}