import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar'
import Calendar from "../../components/Calendar";
import { BarChart , LineChart,  PieChart } from "@mui/x-charts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { fetchTotCalByDay, getTotCalUser } from "../../firebaseService";
import { getBottomNavigationUtilityClass } from "@mui/material";

const palette = [
'#a1bc1f', // Original verde oliva
  '#FA9B6A', // Original naranja suave
  '#c3c3c3', // Original gris claro

  '#8FAD1D', // Verde más oscuro
  '#F87D4A', // Naranja coral
  '#A6A6A6', // Gris neutro
  '#F4D06F', // Amarillo suave
  '#7F7F7F', // Gris medio
  '#E88C60', // Salmón
  '#D3E4CD', // Verde menta claro
  '#F7B7A3', // Rosa suave
  '#616161', // Gris oscuro
  '#D5C7BC'  // Beige neutro];
]

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];



export default function Dashboard() {
    const [date, setDate] = useState(new Date());
    const [index, setIndex]=useState(0)
    const [totCal, setTotCal]=useState([])
    const charts=[{label:'Weekly'}, {label:'Monthly'}]
    const [chartSelected, setChartSelected]=useState(charts[0])

    const getWeeklyDates = (selectedDate) => {
        var dayOfStart=new Date(selectedDate)
        const dayOfWeek = date.getDay(); // Obtiene el día de la semana (0 - domingo, 6 - sábado)
        
        // Ajusta la fecha para que sea el lunes de esa semana (lunes = 1)
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        dayOfStartdiff);
        
        const week = [];
        
        for (let i = 0; i < 7; i++) {
            const day = (new Date(date));
            setDate(day.getDate() + i);
            week.push(day.getDate());
        }
        
        return week;
        };
    

    const nextChart=()=>{
        index==(charts.length-1) ? setIndex(0) : setIndex(index+1)
    }

    const previusChart=()=>{
        index==0 ? setIndex(charts.length-1) : setIndex(index-1)
    }

    const fetchData= async ()=>{
        try{
            const totCal=await getTotCalUser()
            const weeklyDates=getWeeklyDates(date)
            const filterTotCal=totCal.filter((item)=>weeklyDates.includes(item.day.getDate()))
            console.log("Que me traee tot Cal : ", filterTotCal)
        }catch(e){
            console.log("Error fetching Total of calories consumed by user: ", e)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])


  return (
    <div className=' w-full flex flex-col justify-center items-center'>
        <NavBar />
        <div className='flex flex-col md:flex-row justify-center items-center md:items-start  w-full lg:w-10/12 md:mt-24 px-2 xs:px-6 pb-10 '>
            <div className="w-full md:w-1/4 my-4 xs:mt-0 bg-white flex flex-col xs:flex-row md:flex-col items-center  md:items-start font-quicksand justify-center md:justify-start  max-h-72">
                <Calendar value={date} onChange={e => setDate(new Date(e))}/>
                <div className="mt-6 flex w-full items-start justify-start">
                <PieChart
                    colors={palette}
                    series={[
                        {
                        data: [
                            { id: 0, value: 10, label: 'series A' , labelStyle: { fontFamily: 'Quicksand' }},
                            { id: 1, value: 15, label: 'series B' , labelStyle: { fontFamily: 'Quicksand' } },
                            { id: 2, value: 20, label: 'series C' , labelStyle: { fontFamily: 'Quicksand' }},
                        ], labelStyle: { fontFamily: 'Quicksand' }
                        },
                    ]}
                    width={window.innerWidth <'768' ? 300 :250}
                    height={130}
                    />

                    </div>
            </div>
            <div className="flex flex-col w-full mt-4 md:mt-0 md:w-3/4 md:ml-12 bg-white font-quicksand ">
                <div className="flex flex-row justify-between w-full p-3 rounded-xl bg-hbGreen items-center  ">
                    <FontAwesomeIcon onClick={()=>previusChart()} icon={faAngleLeft} className="text-darkGray hover:cursor-pointer text-xl px-2 hover:text-healthyDarkGray1"/>
                    <h1 className="text-darkGray  font-belleza text-xl">{charts[index].label} charts</h1>
                    <FontAwesomeIcon onClick={()=>nextChart()} icon={faAngleRight} className="text-darkGray hover:cursor-pointer text-xl px-2 hover:text-healthyDarkGray1"/>
                </div>
                <div className="flex flex-col w-full rounded-xl pt-2">
                    <div className="w-full p-2 bg-healthyGreen rounded-t-xl">
                        <p className="font-belleza text-lg text-darkGray pl-3">Category chart</p>
                    </div>
                    <div className="bg-hbGreen p-2 rounded-b-xl ">
                    <LineChart
                        
                        colors={palette}
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] , labelStyle: { fontFamily: 'Quicksand' }}]}
                        series={[
                            {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            labelStyle: { fontFamily: 'Quicksand' }
                            },
                        ]}
                        height={300}
                    />
                    </div>
                </div>
                <div className="flex flex-col w-full rounded-xl pt-2">
                    <div className="w-full p-2 bg-healthyGreen rounded-t-xl">
                        <p className="font-belleza text-lg text-darkGray pl-3">Catgory chart</p>
                    </div>
                    <div className="bg-hbGreen p-2 rounded-b-xl ">
                        <BarChart
                            
                            colors={palette}
                            xAxis={[
                                {
                                id: 'barCategories',
                                data: ['bar A', 'bar B', 'bar C'],
                                scaleType: 'band',
                                labelStyle: { fontFamily: 'Quicksand' }
                                },
                            ]}
                            series={[
                                {
                                data: [2, 5, 3],
                                },
                            ]}
                            height={300}
                        />
                    </div>
                </div>
                <div className="flex flex-col w-full rounded-xl pt-2">
                    <div className="w-full p-2 bg-healthyGreen rounded-t-xl">
                        <p className="font-belleza text-lg text-darkGray pl-3">Catgory chart</p>
                    </div>
                    <div className="bg-hbGreen p-2 rounded-b-xl ">
                        <BarChart
                            
                            colors={palette}
                            height={300}
                            series={[
                                { data: pData, label: 'pv', id: 'pvId' },
                                { data: uData, label: 'uv', id: 'uvId' },
                            ]}
                            xAxis={[{ data: xLabels, scaleType: 'band' , labelStyle: { fontFamily: 'Quicksand' }}]}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
