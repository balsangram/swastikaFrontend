import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SunnyIcon from '@mui/icons-material/Sunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import DiningIcon from '@mui/icons-material/Dining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

function GraphHome() {
  return (
     <div className=' min-h-[90vh] bg-pink-300 flex justify-center items-center'>

   <div className='grid grid-cols-2 gap-4 '>
      <Button className="h-[4rem] w-[5rem]" variant="contained"><AccessTimeIcon /></Button>
      <Button className="h-[4rem] w-[5rem]" variant="contained"><SunnyIcon /></Button>
      <Button className="h-[4rem] w-[5rem]" variant="contained"><NightlightRoundIcon /></Button>
      <Button className="h-[4rem] w-[5rem]" variant="contained"><RamenDiningIcon /></Button>
      <Button className="h-[4rem] w-[5rem]" variant="contained"><DiningIcon /></Button>
      <Button className="h-[4rem] w-[5rem]" variant="contained"><RestaurantIcon /></Button>
      <Button className="h-[4rem] w-[5rem]" variant="contained"><FitnessCenterIcon /></Button>
    </div>
    </div>
  );
}

export default GraphHome;
