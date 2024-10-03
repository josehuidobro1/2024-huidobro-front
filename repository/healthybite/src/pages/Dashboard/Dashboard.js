import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar'
import Calendar from "../../components/Calendar";
import { LineChart,  PieChart } from "@mui/x-charts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { getCaloriesByCategories, getTotCalUser } from "../../firebaseService";


const palette = [
'#a1bc1f', // Original verde oliva
  '#FA9B6A', // Original naranja suave
  '#c3c3c3', // Original gris claro

  '#a2e8d6', // Verde más oscuro
  '#ffb5fa', // Naranja coral
  '#efef70', // Gris neutro
  '#F4D06F', // Amarillo suave
  '#ffaaaa', // Gris medio
  '#f78c8c', // Salmón
  '#aaa3ff', // Verde menta claro
  '#F7B7A3', // Rosa suave
  '#616161', // Gris oscuro
  '#D5C7BC'  // Beige neutro];
]

export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    const [index, setIndex]=useState(0)
    const [weeklyCal, setWeeklyCal]=useState([])
    const charts=[{label:'Weekly'}, {label:'Monthly'}]
    const [monthlyCal, setMonthlyCal]=useState([])
    const [loading, setLoading]=useState(true)
    const [calByCat, setCalByCat]=useState([]) // Calories by Category
    
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso sumamos 1
        const year = date.getFullYear(); // Obtiene el año completo

        return `${day}/${month}/${year}`; // Retorna la fecha en formato dd/mm/yyyy
    };

    const getWeeklyDates = (selectedDate) => {
        let dayOfStart = new Date(selectedDate);
        const dayOfWeek = dayOfStart.getDay(); // Obtiene el día de la semana (0 - domingo, 6 - sábado)
        // Ajusta la fecha para que sea el lunes de esa semana (lunes = 1)
        const diff = dayOfStart.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        dayOfStart.setDate(diff); // Corrige el inicio de la semana
        const week = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(dayOfStart); // Crea una nueva fecha para cada día de la semana
            day.setDate(dayOfStart.getDate() + i); // Avanza por los días de la semana
            week.push(formatDate(day)); // Agrega el día completo, no solo el número
        }
        return week; // Retorna el array de fechas completas
        };

    const nextChart=()=>{
        index==(charts.length-1) ? setIndex(0) : setIndex(index+1)
    }

    const previusChart=()=>{
        index==0 ? setIndex(charts.length-1) : setIndex(index-1)
    }

    const fetchData= async ()=>{
        try{
            //categories
            const caloriesByCategories= await getCaloriesByCategories(date)
            console.log('CALORIAS POR CATEGORIA: ', caloriesByCategories)
            setCalByCat(caloriesByCategories)
            //calories
            const userCalories = (await getTotCalUser()).sort((a,b)=>{
                if(a.day < b.day) return -1 
                if(a.day > b.day ) return 1 
                return  0})

            let graphic={dates:[],calories:[]}
            const monthlyDates=(userCalories.filter((item)=>(new Date(item.day)).getMonth()===date.getMonth() && (new Date(item.day)).getFullYear()===date.getFullYear()))
            monthlyDates.forEach((item)=>{
                graphic.dates.push(formatDate(new Date(item.day)))
                graphic.calories.push(Number(item.totCal))
            })
            setMonthlyCal(graphic)
            
            const weeklyDates=getWeeklyDates(date)
            graphic={dates:[],calories:[]}
            userCalories.forEach((item)=>weeklyDates.includes(formatDate((new Date(item.day)))) && graphic.dates.push(formatDate((new Date(item.day)))) && graphic.calories.push(Number(item.totCal)))
            setWeeklyCal(graphic)
            graphic && setLoading(false)
            
        }catch(e){
            console.log("Error fetching Total of calories consumed by user: ", e)
        }
    }

    useEffect(()=>{
        setLoading(true)
        fetchData()
    },[date])

    const emptySeries = {
        series: [],
        margin: { top: 10, right: 10, left: 25, bottom: 25 },
        height: 150,
      };

  return (
    <div className=' w-full flex flex-col justify-center items-center md:overflow-y-hidden'>
        <NavBar  className='z-50'/>
        {loading ?
            <div className="w-full flex justify-center items-center h-screen  ">
                <h1 className="text-3xl font-belleza  text-healthyDarkGreen">Loading...</h1>
            </div>
        :<div className='flex flex-col md:flex-row justify-center items-center md:items-start md:pt-8  w-full lg:w-10/12 md:mt-24 px-2 xs:px-6 md:overflow-y-hidden'>
            <div className="w-full z-0 md:w-2/5 my-4 xs:mt-8 md:mt-0 bg-white flex flex-col  items-center   font-quicksand justify-center   ">
                <Calendar value={date} onChange={e => setDate(new Date(e))}/>
                {calByCat && calByCat.reduce((acc, value)=>acc+=value.value,0)>0 ?
                <div className="mt-6 flex  w-full h-full items-start justify-start">
                
                    <PieChart
                        {...emptySeries}
                        colors={palette}
                        series={[{data: calByCat}]}
                        height={  window.innerWidth > 680 ? 250: window.innerWidth > 490 ? 240 : 130}
                        width={window.innerWidth > 680 ? 520 : window.innerWidth > 490 ? 600 : 580 }
                    />

                </div>:
                <p className="font-quicksand text-sm font-semibold text-healthyGray1 text-center mt-4 md:w-3/5" >There are no meals recorded from&nbsp;{formatDate(date)}</p>}
            </div>
            <div className="flex flex-col w-full mt-4 md:mt-0 md:w-3/5 md:ml-12 bg-white font-quicksand ">
                <div className="flex flex-row justify-between w-full p-3 rounded-xl bg-hbGreen items-center  ">
                    <FontAwesomeIcon onClick={()=>previusChart()} icon={faAngleLeft} className="text-darkGray hover:cursor-pointer text-xl px-2 hover:text-healthyDarkGray1"/>
                    <h1 className="text-darkGray  font-belleza text-xl">{charts[index].label} charts</h1>
                    <FontAwesomeIcon onClick={()=>nextChart()} icon={faAngleRight} className="text-darkGray hover:cursor-pointer text-xl px-2 hover:text-healthyDarkGray1"/>
                </div>
                <div className="flex flex-col w-full rounded-xl pt-2">
                    <div className=" w-full p-2 bg-healthyGreen rounded-t-xl">
                        <p className="font-belleza text-lg text-darkGray pl-3">Category chart</p>
                    </div>
                    <div className="bg-hbGreen p-2 rounded-b-xl ">
                    <LineChart
                        colors={palette}
                        xAxis={[{ scaleType: 'point',dataKey: 'date', data: index == 0 ? weeklyCal.dates : monthlyCal.dates, labelStyle: { fontFamily: 'Quicksand' }}]}
                        series={[
                            {
                            data: index==0 ?  weeklyCal.calories : monthlyCal.calories,
                            labelStyle: { fontFamily: 'Quicksand' }
                            },
                        ]}
                        height={300}
                    />
                    </div>
                </div>
            </div>
        </div>}
    </div>

  )
}
