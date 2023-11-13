import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'

export const AppContext = React.createContext()
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavoriteFromLocalStorage = ()=>{
    let favorites = localStorage.getItem('favorites');

    if(favorites){
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }else{
        favorites = []
    }
    return favorites
} 

function MyContext({children}) {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] =useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedmeal] = useState(null)
    const [favorites, setFavorites] =useState(getFavoriteFromLocalStorage())

    const fetchMeal = async (url)=>{
                setLoading(true)
                try {
                    const {data} = await axios(url)
                    if(data.meals){
                        setMeals(data.meals)
                    }else{
                        setMeals([])
                    }   
                } catch (error) {
                    console.log(error.response)
                }
                setLoading(false)
            }
const addToFavorite = (idMeal)=>{
    const alreadyFavorite = favorites.find((meal)=> meal.idMeal===idMeal);
    if(alreadyFavorite) return
    const meal = meals.find((meal)=>meal.idMeal === idMeal)
    const updatedFavorite = [...favorites, meal];
    setFavorites(updatedFavorite);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorite)) 
}

const removeFromFavorite = (idMeal)=>{
    const updatedFavorite = favorites.filter((meal)=> meal.idMeal !== idMeal)
    setFavorites(updatedFavorite)
    localStorage.setItem('favorites', JSON.stringify(updatedFavorite))

}
const fetchRandom = ()=>{
    fetchMeal(randomMealUrl)
}
const selectMeal=(idMeal, favoriteMeal)=>{
    let meal;
    if(favoriteMeal){
        meal = favorites.find((meal)=> meal.idMeal === idMeal)
    }else{
        meal = meals.find((meal)=> meal.idMeal === idMeal)
    }
    setSelectedmeal(meal)
    setShowModal(true)
}
const closeModal =()=>{
    setShowModal(false)
}
    useEffect(()=>{       
        fetchMeal(allMealsUrl);
    }, [])

    useEffect(()=>{  
        if(!searchTerm) return
        fetchMeal(`${allMealsUrl}${searchTerm}`);
        
    }, [searchTerm])


  return (
    <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandom, 
    showModal, selectMeal, selectedMeal, closeModal, addToFavorite, removeFromFavorite, favorites}}>
        {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext= ()=>{
    return(
            useContext(AppContext)
    )
}

export default MyContext