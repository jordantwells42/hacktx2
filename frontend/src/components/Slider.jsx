import React from 'react'

export default function Rating (props) {
    selected = props.selected
    return (
        <div className='flex-row h-40'>
            <button 
            className={'bg-black h-20 w-20 rounded-full border mr-5'}
            style = {{backgroundColor: selected === 1 ? 'blue' : 'white'}}
            onClick = {() => {setSelected(1)}}>
                1
            </button>

            <button 
            className={'bg-black h-20 w-20 rounded-full border mr-5'}
            style = {{backgroundColor: selected === 2 ? 'blue' : 'white'}}
            onClick = {() => {setSelected(2)}}>
                2
            </button>

            <button 
            className={'bg-black h-20 w-20 rounded-full border mr-5'}
            style = {{backgroundColor: selected === 3 ? 'blue' : 'white'}}
            onClick = {() => {setSelected(3)}}>
                3
            </button>

            <button 
            className={'bg-black h-20 w-20 rounded-full border mr-5'}
            style = {{backgroundColor: selected === 4 ? 'blue' : 'white'}}
            onClick = {() => {setSelected(4)}}>
                4
            </button>

            <button 
            className={'bg-black h-20 w-20 rounded-full border mr-5'}
            style = {{backgroundColor: selected === 5 ? 'blue' : 'white'}}
            onClick = {() => {setSelected(5)}}>
                5
            </button>

            
        </div>
    )
}