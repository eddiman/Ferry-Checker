import './style/css/App.css';
import {useFetch} from "./hooks";

const App = () => {
  const fetchURL = "http://37.191.180.48:5000/ferga/now";
  const { status, data, error } = useFetch(fetchURL);

  const getTime = (date) => {
    const newDate = new Date(date);
    return newDate;
  }

  const getMinutes = (milli) => {
    const nowDate = new Date();
    const newDate = new Date(milli);
    const diff = Math.abs(new Date(newDate - nowDate));

    return Math.floor((diff/1000)/60);

  };

  const correctMinutes = (nextTime) => {
    if (nextTime.getMinutes() < 10) {
      return "0" + nextTime.getMinutes();
    }     else {
      return nextTime.getMinutes();
    }

  }

  let nextTime = getTime(data.nexttime);
  const months = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

  return (
      <main className={"main-content"}>
        <div className={"inner"}>
          <div className={"ferry"}/>

          <div className={"water"}>
            <div className={"waves"}/>
          </div>
          {status === "fetched" ? <>
            <h1>{"Ferjå går om " + getMinutes(data.nexttime) + " minuttar!"}</h1>
            <h2>An går klokkå {nextTime.getHours() + ":" + correctMinutes(nextTime) + " den " + nextTime.getDay() + ". " + months[nextTime.getMonth()] + ", " + nextTime.getFullYear()}</h2></> : "" }

        </div>
        { console.log(getTime(data.nexttime))
          /*data?.map((item) =>
            <ul>
              <li>{item.title}</li>
            </ul>
        )*/}
      </main>
  )
}

export default App;
