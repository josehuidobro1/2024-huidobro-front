import React, { useEffect, useState } from "react";
import NavBar from '../../components/NavBar'
import Calendar from "../../components/Calendar";
import { BarChart , LineChart,  PieChart } from "@mui/x-charts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const palette = ['#a1bc1f', '#FA9B6A', '#c3c3c3' ];

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
    const charts=[{label:'Dayly'}, {label:'Weekly'}, {label:'Monthly'}]

    const nextChart=()=>{
        index==(charts.length-1) ? setIndex(0) : setIndex(index+1)
    }

    const previusChart=()=>{
        index==0 ? setIndex(charts.length-1) : setIndex(index-1)
    }


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
