import React from 'react'
import { useGlobalContext } from '../MyContext'

function Modal() {
  const {selectedMeal, closeModal} = useGlobalContext()
  const {strMealThumb: image, strMeal: title, strInstructions: text, strSource: source} =selectedMeal
  return (
    <aside className='modal-overlay'>
      <div className='modal-container'> 
        <img src={image} alt={title} className='img modal-img' />
        <div className='modal-content'>
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p>{text} </p>
          <a href={source} target='_blank'> Original Source</a>
          <button onClick={closeModal} className='close-btn'>Close</button>
        </div>
      </div>
    </aside>
  )
}

export default Modal