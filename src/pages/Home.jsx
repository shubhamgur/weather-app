import Weather from "../components/weather/Weather";

const Home=()=>{
return(
    <div style={{backgroundImage:"url('https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
     backgroundSize: 'cover',
     height:'597px'}}>
    <h2></h2>
    <Weather/>
    </div>
)
}

export default Home;