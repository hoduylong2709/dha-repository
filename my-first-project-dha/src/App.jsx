import "./App.css";
import { useEffect, useState } from "react";
import getImageForWeather from "./utils/getImageForWeather";
import { fetchWeather } from "./utils/api";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({
    location: "Danang",
    weather: "Clear",
    temperature: 24,
  });

  function resetAfterFetching() {
    setCity("");
  }

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  function handleButtonClick(e) {
    handleGetData();
  }

  async function handleGetData() {
    const response = await fetchWeather(city.toLowerCase());

    if (!response) {
      alert("Location not found!");
      return;
    }

    setData(response);

    resetAfterFetching();
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleGetData();
    }
  }

  useEffect(() => {
    console.log("data", data);
  }, [data]);
  return (
    <div className="App">
      <img src={getImageForWeather(data.weather)} alt="" />
      <p>{data.location}</p>
      <p>{data.weather}</p>
      <p>{data.temperature}&#176;C</p>

      <div>
        <input
          value={city}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search city"
        />

        <button onClick={handleButtonClick}>Search</button>
      </div>
    </div>
  );
}

export default App;
