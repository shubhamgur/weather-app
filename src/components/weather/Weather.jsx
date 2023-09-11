import { useState } from "react";
import { useEffect } from "react";
import style from './Weather.module.css'


const Weather=()=>{

const [city,setCity]=useState('')
const [weater,setWeater]=useState('')
const [temp,setTemp]=useState('')
const [min,setMin]=useState('')
const [max,setMax]=useState('')
const [newCity,setNewCity]=useState('')
const [loder,setLoder]=useState(false);
const [error,setError]=useState(false);

    const key= '6241f2f5c18acf96b2e90567831a45a2'
    
    useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
    const latitude=position.coords.latitude
    const longitude=position.coords.longitude
setLoder(true)
       fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`)
        .then((res)=>res.json()).then((data)=>{setCity(data.name);
             setWeater(data.weather[0].description);
            setTemp(data.main.temp);
            setMax(data.main.temp_max);
            setMin(data.main.temp_min)
            setLoder(false)
            })
    })
    },[])


const tempDegree=Math.floor(temp-273.15);
const minTemp=Math.floor(min-273.15);
const maxTemp=Math.floor(max-273.15);

const btnClick=()=>{

    setLoder(true)
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${key}`)
        .then((res)=>res.json()).then((data)=>{
            setCity(data.name);
             console.log(data);
             setWeater(data.weather[0].description);
            setTemp(data.main.temp);
            setMax(data.main.temp_max);
            setMin(data.main.temp_min);
            setLoder(false)
            setError(false)
        }).catch(()=>{setLoder(false)
            setError(true)})

 setNewCity('');
}

return(
    <>
    <input type='text' value={newCity} onChange={(e)=>{setNewCity(e.target.value)}} className={style.inputstyle}/>
    <button className={style.btn} disabled={!newCity.trim()} onClick={btnClick}>Get Weater</button>
    
    {!loder && (
        <>
        {error && (
            <h1 className={style.error}>City Not Found....</h1>
        )}
        {!error && (
    <div>
        <h1 className={style.sizefontcity}>{city}</h1>
        <h1 className={style.sizefontDegree}>{tempDegree} C</h1>
        <h1 className={style.sizefont}>Max Temp :- {maxTemp} C</h1>
        <h1 className={style.sizefont}>Min Temp :- {minTemp} C</h1>
        <h1 className={style.sizefont}> Weather:- {weater}</h1>
    </div>
        )}
        </>
    )}
    
    {loder && (
        <h2 className={style.loder}>Plase wait is loding.....</h2>
    )}
    
    </>
)
}

export default Weather;