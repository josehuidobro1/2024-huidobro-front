import React, { useEffect, useState, useRef } from "react";
import NavBar from '../../components/NavBar'
import Calendar from "../../components/Calendar";
import {  PieChart, LineChart, BarChart } from "@mui/x-charts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faFilter, faXmark} from '@fortawesome/free-solid-svg-icons';
import { fetchAllFoods, formatDate, getCaloriesByCategories,getCategoriesAndDefaults,getDrinkData,getFilterData,getTotCalUser } from "../../firebaseService";
import Loading from "../../components/Loading";
import Data from "../Data";
import { EmptyChart } from "./components/EmptyChart";
  


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
    const [currentDate, setCurrentDate] = useState(new Date());
    const [index, setIndex]=useState(0)
    const [weeklyCal, setWeeklyCal]=useState([])
    const charts=[{label:'Weekly'}, {label:'Monthly'}, {label:'Annual'}]
    const [monthlyCal, setMonthlyCal]=useState([])
    const [annualCal, setAnnualCal]=useState([])
    const [loading, setLoading]=useState(true)
    const chartRef = useRef(null);
    const [chartWidth, setChartWidth] = useState(300);
    const [openFilter, setOpenFilter]=useState(false)
    const [filters, setFilters]=useState()
    const [categories, setCategories]=useState([])
    const [userCalories, setUserCalories]=useState([])
    const [drinksData, setDrinksData]=useState([])
    const [drinksDay, setDrinksDay]=useState([])
    const icons=Data.iconOptions
    const [dataReady, setDataReady]=useState(false)
    

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

    const getAnnualDates = (userCalories=[]) => {
        const graphic = {
            dates: [],
            general: [],
            categories: [] 
        };
        if (!userCalories || userCalories.length === 0) { return graphic
        }else{
            const months = Array.from({ length: 12 }, () => ({ total: 0, categories: {} }));
            userCalories.forEach(item => {
                const [day, month, year] = item.day.split('/').map(Number);  
                const itemDate = new Date(year, month - 1, day); 
                if (itemDate.getFullYear() === new Date(currentDate).getFullYear() ) {
                    months[month - 1].total += Number(item.total);
                    item.categories.forEach(category => {
                        if (!months[month - 1].categories[category.label]) {
                            months[month - 1].categories[category.label] = 0;
                        }
                        months[month - 1].categories[category.label] += Number(category.value);
                    });
                }
            });
        
            const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            monthLabels.forEach((month, index) => {
                graphic.dates.push(month);  
                graphic.general.push(months[index].total);  
                
                const categoriesArray = categories.map(item => ({
                    label: item.name,
                    value: months[index].categories[item.name] || 0  // Si no existe en ese mes, asigna 0
                }));
                graphic.categories.push(categoriesArray);  
            });
        }
        return graphic;
    };
    
    
    const calculateWeeklyCalories = (userCalories=[]) => {
        const weeklyDates = getWeeklyDates(currentDate);
        
    
        const weeklyGraphic = {
            dates: [],
            general:[],
            categories:[]

        };

        if(userCalories){
            userCalories.forEach(item => {
                var formattedDate = (item.day);
                if (weeklyDates.includes(formattedDate)) {
                    weeklyGraphic.dates.push(formattedDate);
                    weeklyGraphic.general.push(Number(item.total));
                    weeklyGraphic.categories.push(item.categories || [])
                }
            });
        }else{
            console.log('por aca es el error? ')

        }
    
        return weeklyGraphic;
    };

    const nextChart=()=>{
        index==(charts.length-1) ? setIndex(0) : setIndex(index+1)
    }

    const previusChart=()=>{
        index==0 ? setIndex(charts.length-1) : setIndex(index-1)
    }

    const calculateMonthlyCalories = (userCalories=[]) => {
        const monthlyGraphic = {
            dates: [],
            general:[],
            categories:[]

        };
        if (!userCalories || userCalories.length === 0) return monthlyGraphic; 
        if(userCalories.length>0){
            const monthlyDates = userCalories.filter(
                item => {
                    const [day, month, year] = item.day.split('/').map(Number);
                    const itemDate = new Date(year, month - 1, day);
                    return (itemDate.getMonth() === currentDate.getMonth() &&
                    itemDate.getFullYear() === currentDate.getFullYear())}
            );


            monthlyDates.forEach(item=>{
                monthlyGraphic.dates.push(item.day)
                monthlyGraphic.general.push(item.total)
                monthlyGraphic.categories.push(item.categories || [])
            });
        }

        return monthlyGraphic

    };

    const fetchData= async ()=>{
        try{
            const categoriesData = await getCategoriesAndDefaults()
            setCategories(categoriesData)
            const data = await getFilterData()
            data.calories && setUserCalories(data.calories)
            data.calories && fetchDailyData(data.calories)
            data.drinks && setDrinksData(data.drinks)
            data.drinks && setDrinksDay(data.drinks.filter((item)=>new Date(item.date_ingested).getDate()===new Date(currentDate).getDate() && new Date(item.date_ingested).getMonth()===new Date(currentDate).getMonth() && new Date(item.date_ingested).getFullYear()===new Date(currentDate).getFullYear()))
            data && setLoading(false) && setDataReady(true)
        }catch(e){
            console.log("Error fetching Total of calories consumed by user: ", e)
        }
    }

    const fetchDailyData=(userCalories)=>{
        if(userCalories){
            const monthlyGraphic = calculateMonthlyCalories(userCalories);
            setMonthlyCal(monthlyGraphic);

            // Calcular calorías semanales
            const weeklyGraphic = calculateWeeklyCalories(userCalories);
            setWeeklyCal(weeklyGraphic);

            const annualGraphic=getAnnualDates(userCalories)
            setAnnualCal(annualGraphic)

            setLoading(false)
        }else{
            fetchData()
            setLoading(true)
        }           
        
    }

    const filterTypeDrinks=()=>{
        if (!drinksDay || drinksDay.length === 0) return { types: [], sugarData: [], caffeineData: [], caloriesData: [] };
        const drinkTypes = {};
        drinksDay.forEach(drink => {
            const type = drink.type;
            if (!drinkTypes[type]) {
                drinkTypes[type] = {
                    sugar: 0,
                    caffeine: 0,
                    calories: 0
                };
            }
            drinkTypes[type].sugar += drink.sugar;
            drinkTypes[type].caffeine += drink.caffeine;
            drinkTypes[type].calories += drink.calories;
        });
        const types = Object.keys(drinkTypes); // Los tipos de bebida serán las etiquetas del eje X
        const sugarData = types.map(type => drinkTypes[type].sugar);
        const caffeineData = types.map(type => drinkTypes[type].caffeine);
        const caloriesData = types.map(type => drinkTypes[type].calories);
        return {types:types,sugarData:sugarData, caffeineData:caffeineData, caloriesData:caloriesData}
    }

    useEffect(()=>{
        fetchDailyData(userCalories)
    },[userCalories])

    useEffect(()=>{
        setLoading(true)
        fetchData()
    },[])

    
    useEffect(()=>{
        dataReady ? fetchDailyData()  : fetchData()
        const handleResize=(()=>{chartRef.current && setChartWidth(chartRef.current.offsetWidth)})
        window.addEventListener('resize', handleResize);
        drinksData && setDrinksDay(drinksData.filter((item)=>new Date(item.date_ingested).getDate()===new Date(currentDate).getDate() && new Date(item.date_ingested).getMonth()===new Date(currentDate).getMonth() && new Date(item.date_ingested).getFullYear()===new Date(currentDate).getFullYear()))
        
        return () => window.removeEventListener('resize', handleResize);
    },[currentDate])


  return (
    <div className=' w-full xs:flex  xs:flex-col xs:justify-around lg:items-center sm:h-full lg:h-screen overflow-y-hidden'>
        <NavBar  className='z-50'/>
        {loading ? <Loading />
        :<div className='flex flex-col lg:flex-row justify-start  lg:justify-center md:items-start lg:mt-24 items-start md:pt-24  lg:pt-8  w-full   px-2 xs:px-6 overflow-y-scroll  '>
            <div className="w-full lg:w-2/5 mt-4 xs:mt-8 md:mt-0  flex flex-col  items-center font-quicksand justify-center  ">
                <div className="flex justify-center items-center w-full ">
                    <Calendar value={currentDate} onChange={e => setCurrentDate(new Date(e))}/>
                </div>
                {userCalories && userCalories.find(item=>item.day===formatDate(currentDate)) ?
                <div className="xs:mt-6 mt-0 flex flex-col   w-full  items-center justify-start ">
                    <PieChart
                        colors={palette}
                        series={[{data: userCalories.find(item=> item.day===formatDate(currentDate)).categories}]}
                        width={window.innerWidth<'400' ? chartWidth*1.68 : chartWidth*1.9}
                        height={window.innerWidth<'400' ? chartWidth*0.9 : chartWidth }
                    />
                    {(drinksDay && drinksDay.length > 0 && userCalories.find(item=>item.day===formatDate(currentDate))) ? 
                    <table className="w-full  mx-2 xs:mx-0 font-quicksand text-sm xs:text-md  my-6 lg:my-12 border-spacing-2  table-fixed border-collapse font-normal text-healthyDarkOrange rounded-lg border border-healthyDarkOrange ">
                        <thead>
                            <tr className="bg-healthyDarkOrange w-full text-white font-bold text-center px-2 py-2 rounded-t-md">
                                <th className="py-2   w-3/12 ">Drink Name</th>
                                <th className="py-2   w-3/12 ">Sugar</th>
                                <th className="py-2    w-3/12">Caffeine</th>
                                <th className="py-2    w-3/12">Calories</th>
                                <th className="py-2   w-3/12">Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drinksDay.map((drink, index)=>
                            <tr key={index} className=" px-2 py-2 w-full ">
                                <th className=" border-2 border-healthyOrange/20 text-left  w-3/12  px-2 py-2">{drink.name}</th>
                                <th className=" border-2 border-healthyOrange/20  px-2 py-2 w-1/12">{drink.sugar}</th>
                                <th className=" border-2 border-healthyOrange/20  px-2 py-2 w-1/12">{drink.caffeine}</th>
                                <th className=" border-2 border-healthyOrange/20  px-2 py-2 w-1/12">{drink.calories}</th>
                                <th className=" border-2 border-healthyOrange/20 text-right w-3/12  px-2 py-2">{drink.type}</th>
                            </tr>
                            )}
                        </tbody>
                    
                    </table>:
                    <p className="font-quicksand text-sm font-semibold text-healthyGray1 text-center mt-4 md:w-fulls md:my-10 lg:mt-12">There are no drinks recorded from&nbsp;{formatDate(currentDate)}</p>
                    }
                </div>
                :
                <p className="font-quicksand text-sm font-semibold text-healthyGray1 text-center mt-4 md:w-3/5 md:my-10 lg:mt-4" >There are no meals recorded from&nbsp;{formatDate(currentDate)}</p>}
                
            </div>
            <div className="flex flex-col overflow-y-auto lg:w-3/5 w-full md:mt-4 lg:mt-0 pb-32 xs:pb-0 lg:ml-2 lg:overflow-x-hidden ">
                <div className="flex flex-col xs:flex-row lg:ml-8 items-center lg:items-start justify-center  lg:justify-start ">
                    <div className="flex flex-col w-11/12 lg:mt-0 md:w-10/12   font-quicksand  ">
                        <div className="flex flex-row justify-between w-full p-3 rounded-xl bg-hbGreen items-center  ">
                            <FontAwesomeIcon onClick={()=>previusChart()} icon={faAngleLeft} className="text-darkGray hover:cursor-pointer text-xl px-2 hover:text-healthyDarkGray1"/>
                            <h1 className="text-darkGray  font-belleza text-xl">{charts[index].label} charts</h1>
                            <FontAwesomeIcon onClick={()=>nextChart()} icon={faAngleRight} className="text-darkGray hover:cursor-pointer text-xl px-2 hover:text-healthyDarkGray1"/>
                        </div>
                        <div className="flex flex-col w-full rounded-xl pt-2 ">
                            <div className=" w-full p-2 bg-healthyGreen rounded-t-xl">
                                <p className="font-belleza text-lg text-darkGray pl-3">Category chart</p>
                            </div>
                            <div className="bg-hbGreen p-2 rounded-b-xl w-full flex  ">
                            {(index===0 && weeklyCal.general.length===0) || (index===1 && monthlyCal.general.length===0) || (index===2 && annualCal.general.length===0) ?
                            <EmptyChart />
                            :
                            <LineChart
                                colors={palette}

                                xAxis={[{ scaleType: 'point',dataKey: 'date', data: index ===0 ? weeklyCal.dates : index===1 ? monthlyCal.dates : annualCal.dates, labelStyle: { fontFamily: 'Quicksand' }}]}
                                series={[
                                    {
                                    data: index===0 ?  weeklyCal.general : index===1 ? monthlyCal.general : annualCal.general,
                                    labelStyle: { fontFamily: 'Quicksand' }
                                    },
                                    {
                                    data: index===0 ? ( !filters ? weeklyCal.general :  weeklyCal.categories.map((item)=>item.find((i)=>i.label===filters.name ).value) ) : index===1 ? ( !filters ? monthlyCal.general : monthlyCal.categories.map((item)=>item.find((i)=>i.label===filters.name ).value) ) : ( !filters ? annualCal.general : annualCal.categories.map((item)=>item.find((i)=>i.label===filters.name ).value)),
                                    labelStyle: { fontFamily: 'Quicksand' }
                                    },
                                ]}
                                height={300}
                            />}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row xs:flex-col  justify-center  m-1 items-center w-10/12 xs:w-1/12 ">
                        <FontAwesomeIcon onClick={()=>setOpenFilter(!openFilter)} icon={faFilter} className={` hover:bg-healthyDarkOrange cursor-pointer text-white text-xl p-3   shadow-sm ${openFilter ?  'bg-healthyDarkOrange rounded-tl-full rounded-bl-full xs:rounded-bl-none  xs:rounded-tr-full' : 'bg-healthyOrange rounded-full'} `}/>
                        {openFilter &&
                            <div className="flex flex-row xs:flex-col w-full max-w-44 overflow-x-auto justify-start xs:justify-center items-center shadow-sm  rounded-r-full xs:rounded-b-full">
                                {categories.map((cat, index)=>(
                                    <FontAwesomeIcon key={index} onClick={()=>setFilters(cat)} icon={(icons.find((i)=>i.name===cat.icon)).icon} className=" px-2 xs:px-0  w-full py-2 text-xl text-healthyDarkOrange bg-white hover:bg-healthyGray2 cursor-pointer text-center"/>
                                ))

                                }
                            </div>
                        }
                        {
                            filters && 
                            <div className="flex relative ">
                                <FontAwesomeIcon icon={(icons.find((i)=>i.name===filters.icon)).icon} className="text-white  text-xl p-3   shadow-sm m-2 bg-healthyGray1 rounded-full " />
                                <FontAwesomeIcon onClick={()=>setFilters(null)} icon={faXmark} className="absolute right-0 bottom-0 p-1 text-sm border-2 border-white text-white bg-healthyGray1 hover:bg-healthyDarkGray1 cursor-pointer rounded-full "/>
                            </div>

                        }
                    </div>
                </div>
                <div className="w-full flex justify-start items-center ml-8 mt-12 mb-12 ">
                    <div className="flex flex-col  rounded-xl pt-2 w-11/12 md:w-10/12">
                        <div className=" w-full p-2 bg-healthyGreen rounded-t-xl">
                            <p className="font-belleza text-lg text-darkGray pl-3">Drink chart</p>
                        </div>
                        <div className="bg-hbGreen p-2 rounded-b-xl flex justify-center items-center " >
                            {drinksDay && drinksDay.length>0 ? <BarChart
                                xAxis={[{ scaleType: 'band', data: filterTypeDrinks().types }]}
                                series={[{ data: filterTypeDrinks().sugarData, label:'Sugar' }, { data: filterTypeDrinks().caffeineData , label:'Caffeine' }, { data: filterTypeDrinks().caloriesData, label:'Calories'  }]}
                                colors={palette}
                                height={window.innerWidth>'400' ? 400: 300 }
                                width={window.innerWidth>'400' ? 700: 300}
                            />:
                            <EmptyChart/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </div>

  )
}
