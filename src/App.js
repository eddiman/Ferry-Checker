import './style/css/App.css';
import {useFetch} from "./hooks";
import {useState} from "react";
import {useEffect} from "react";


const App = () => {
  const fetchURL = "https://api.ferja.xyz/ferga/now";
  const { status, data, error } = useFetch(fetchURL);
  const [currentFerry, setCurrentFerry] = useState("arsvagen");
  const [currentFerryData, setCurrentFerryData] = useState(
      {"nextTimeA":[0,0,0,0],"nextTimeM":[0,0,0,0]}
  );
  console.log(currentFerry)
  const getTime = (milli) => {
    const newDate = new Date(milli);
    return newDate;
  }

  const getMinutes = (milli) => {
    const nowDate = new Date();
    const newDate = new Date(milli);
    const diff = Math.abs(new Date(newDate - nowDate));

    return Math.floor((diff/1000)/60);

  };


  const changeFerry = () => {

    switch (currentFerry) {
      case "mortavika":
        setCurrentFerry("arsvagen")
        setCurrentFerryData(data.nextTimeA);
        break;
      case "arsvagen":
        setCurrentFerry("mortavika");
        setCurrentFerryData(data.nextTimeM);
        break;
    }
  };
  useEffect(() => {
    if(status === "fetched") {
      changeFerry();
    }
  }, [data]);

  const correctMinutes = (nextTime) => {
    if (nextTime.getMinutes() < 10) {
      return "0" + nextTime.getMinutes();
    }     else {
      return nextTime.getMinutes();
    }
  };
  const correctHours = (nextTime) => {
    if (nextTime.getHours() < 10) {
      return "0" + nextTime.getHours();
    }     else {
      return nextTime.getHours();
    }
  };



  let nextTime = currentFerryData !== null ? getTime(currentFerryData[0]) : getTime(currentFerryData[0]);
  let nextNextTime = currentFerryData !== null ? getTime(currentFerryData[1]) : getTime(currentFerryData[1]);
  let nextNextNextTime = currentFerryData !== null ? getTime(currentFerryData[2]) : getTime(currentFerryData[2]);
  const months = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

  console.log(currentFerryData);
  return (
      <main className={"main-content"}>
        {status === "fetched"  ?
            <h2 className={"from-destination"}>Fra {currentFerry==="mortavika" ? "Stavanger (Mortavika)" : "Bokn (Arsvågen)" } </h2>:<h2 className={"from-destination"}></h2> }
        <div className={"inner"}>
          <div className={"ferry-container"}>
            <div className={"ferry"}/>
          </div>
          {console.log(window.location.href)}
          <div className={"water"}>
            <div className={"waves"}/>
          </div>
          {status === "fetched"  ? <>
                <h1>{"Ferjå går om " + getMinutes(nextTime) + " minuttar!"}</h1>
                <h2>Den går klokkå {correctHours(nextTime) + ":" + correctMinutes(nextTime) + " den " + nextTime.getDate() + ". " + months[nextTime.getMonth()] + ", " + nextTime.getFullYear()}</h2>
                <h3> De to neste går klokka {correctHours(nextNextTime) + ":" + correctMinutes(nextNextTime)} og {correctHours(nextNextNextTime) + ":" + correctMinutes(nextNextNextTime)}</h3>
                <button className={"change-depart-place-btn"} onClick={() => changeFerry() }>
                  {currentFerry === "mortavika" ?  "Se tiå fra Arsvågen" : "Se tiå fra Mortavika" }
                </button>
              </>
              : <h1>Hente ferjetidene...</h1> }


        </div>
      </main>
  )
}

export default App;
