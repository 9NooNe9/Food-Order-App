import React, {useEffect, useState} from "react";
import classes from './AvailableMeals.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [errorHttp, setErrorHttp] = useState();

    useEffect(() => {
        const fetchDataHandler = async () => {
            const response = await fetch(
                "https://react-demo-food-app-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
            );

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const data = await response.json();

            let loadedMeals = [];

            for (let key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                })
            }

            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchDataHandler().catch(error => {
            setIsLoading(false);
            setErrorHttp(error.message);
        })
    }, [])
    if (isLoading) {
        return (
            <section className={classes.loading}>
                <p>loading ...</p>
            </section>
        )
    }

    if (errorHttp) {
        return (
            <section className={classes.MealsError}>
                <p>{errorHttp}</p>
            </section>
        )
    }

    const mealsList = meals.map(meal => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeals