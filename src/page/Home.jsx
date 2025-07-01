import React from 'react'
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IncompleteCircleIcon from '@mui/icons-material/IncompleteCircle';
import MessageIcon from '@mui/icons-material/Message';
import { useNavigate } from 'react-router-dom';
import SunnyIcon from '@mui/icons-material/Sunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DiningIcon from '@mui/icons-material/Dining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import GroupsIcon from '@mui/icons-material/Groups';

function Home() {
  const Navigate  = useNavigate();
  return (
    <div className=' min-h-[90vh] bg-pink-300 flex justify-center items-center'>

    <div className='grid grid-cols-2 gap-4 '>
     <Button className='h-[4rem] w-[5rem]' variant="contained"
     onClick={() =>{
      Navigate("/timer");
     }}
     ><AccessTimeIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"
     onClick={()=>{
        Navigate("/todoList");
     }}
     ><TaskAltIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"
     onClick={() =>{
      Navigate("/note")
     }}
     ><EditNoteIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"
          onClick={() =>{
      Navigate("/graphHome")
     }}
     ><IncompleteCircleIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><MessageIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><GroupsIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><SunnyIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><NightlightRoundIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><RamenDiningIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><DiningIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><RestaurantIcon /></Button>
     <Button className='h-[4rem] w-[5rem]' variant="contained"><FitnessCenterIcon /></Button>
    </div>
 
 </div>
  )
}

export default Home