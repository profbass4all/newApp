import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from '../MyContext'

function Search() {
  const [text, setText] = useState('')
  const {setSearchTerm, fetchRandom} = useGlobalContext()

  const handleChange = (e)=> setText(e.target.value);
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(text){
      setSearchTerm(text)
      
    }
  }
  const handleRandom =()=>{
    setSearchTerm('')
      setText('')
      fetchRandom()
  }
  return (
    <header className='search-container'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='type your favorite meal' onChange={handleChange} value={text} className='form-input' />
        <button type='submit' className='btn'>Search</button>
        <button type='btn' className='btn btn-hipster' onClick={handleRandom}>Surprise me!</button>
      </form>
    </header>
  )
}

export default Search