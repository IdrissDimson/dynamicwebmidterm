import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../styles/recipe.css';


const apiKey = '1d850fa068051aa89305ad9ab3655823';
const appID = '2fe86ef7';

export default function Recipe(props) {
    const [food, setFood] = useState('');
    const [recipe, setRecipe] = useState({});

    const urlParams = new URLSearchParams(props.location.search);
    const foodParams = urlParams.get('food') ? urlParams.get('food') : 'chicken';

    function queryFoodAPI(queryFood) {
        axios.get(`https://api.edamam.com/search?q=${queryFood}&app_id=${appID}&app_key=${apiKey}`)
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
    useEffect(() => {
        setFood(foodParams);
        queryFoodAPI(foodParams);
    },[foodParams]);

    return (
        <div className="background">
            <h1>Results for: {food} <a href="../">Go Back</a></h1>
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
        </div>
    );
}