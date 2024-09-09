import React,{ useState} from 'react'
import Input from '../../../components/Input'

const NewFood = ({setAddFood,setNewFood}) => {
    const [inValidation,setInValidation]=useState(false)
    const [name,setName]=useState('')
    const [measure, setMeasure]=useState('')
    const [amount,setAmount]=useState(0)
    const [calories,setCalories]=useState(0)

    const save=()=>{
        setInValidation(true)
        setNewFood({name:name,measure:measure, amount:amount,calories:calories})
        setName('')
        setMeasure('')
        setCalories(0)
        setAmount(0)
        setAddFood(false)
    }

  return (
    <div className='w-full mt-2 flex flex-row justify-between items-start h-20 overflow-y-scroll'>
        <div className='flex flex-col justify-around sticky top-0 items-around font-quicksand w-1/4 h-20 '>
            <button onClick={save} className=' bg-healthyGreen px-3 py-1 hover:cursor-pointer hover:bg-healthyDarkGreen rounded-md  text-white font-semibold'>Save</button>
            <button onClick={()=>setAddFood(false)}  className=' bg-healthyOrange px-3 py-1 hover:cursor-pointer hover:bg-healthyDarkOrange rounded-md  text-white font-semibold'>Cancel</button>
        </div>
        <div className=' p-2 rounded-md w-3/4 flex flex-row flex-wrap '>
            <Input required={inValidation && name==''} label='Name' placeholder='Chicken' value={name} inputType='text' onChange={e=>setName(e.target.value)}/>
            <Input required={inValidation && measure==''} label='Measure' placeholder='gr' value={measure} inputType='text' onChange={e=>setMeasure(e.target.value)}/>
            <Input required={inValidation && amount==''} label="Amount" placeholder='250' value={amount} inputType='number' onChange={e=>setAmount(e.target.value)}/>
            <Input required={inValidation && calories==''} label="Calories" placeholder="448" value={calories} inputType='number' onChange={e=>setCalories(e.target.value)}/>
        </div>
    </div>
  )
}

export default NewFood