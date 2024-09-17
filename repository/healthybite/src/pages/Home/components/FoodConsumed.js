import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns';

const FoodConsumed = ({ usfood, handleDeleteMeal }) => {
    console.log(usfood.id)

    return (
        <div className="flex justify-between items-center w-full py-1 px-4 rounded-2xl bg-hbGreen font-quicksand my-1">
            <div className="flex flex-col items-start justify-center">
                <p className="text-md text-darkGray font-semibold text-left">{usfood.name}</p>
                <p className="text-xs text-darkGray">{usfood.amount_eaten} {usfood.measure}</p>
            </div>
            <div className='flex flex-row items-center justify-end'>
                <div className="flex flex-col items-end justify-center pr-2">
                    <p className="text-md">
                        {Math.ceil((usfood.calories_portion * usfood.amount_eaten) / usfood.measure_portion)} cal
                    </p>
                    {/* Correct date handling here */}
                    <p className="text-xs">{format(new Date(usfood.date_ingested), "HH:mm")}</p>
                </div>
                <button 
                    onClick={() => {
                        console.log('Delete button clicked for:', usfood.id); // Log for debugging
                        handleDeleteMeal(usfood.id);
                    }} 
                    className="text-red-500 hover:text-red-700 ml-2"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
};


export default FoodConsumed
