import React from 'react'
import {BsHandThumbsUp} from 'react-icons/bs'

import { useGlobalContext } from '../MyContext'

function Meals() {
  const {meals, loading, selectMeal, selectedMeal, addToFavorite} = useGlobalContext()

  if (loading){
    return <section className='section'>
        <h3>Loading....</h3>
    </section>
  }
   if (meals <1 ){
    return <section className='section'>
        <h3>The meal you searched isn't currently available, check back soon</h3>
    </section>
  }
  return (
      <section className='section-center'>
        {
          meals.map((singleMeal)=>{
            const {idMeal, strMeal: title, strMealThumb: image} = singleMeal
              return(
                <article className='single-meal' key={idMeal}>
                  <img src={image} className='img' onClick={()=> selectMeal(idMeal)} />
                  <footer>
                    <h5>{title}</h5>
                    <button className='like-btn'><BsHandThumbsUp onClick={()=> addToFavorite(idMeal)} /></button>
                  </footer>
                </article>
              )
          })
        }
      </section>
  )
}

export default Meals