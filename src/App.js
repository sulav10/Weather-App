import React, { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [item, setItem] = useState({});

  const textChange = (e) => {
    setSearch(e.target.value);
  };

  const date = (d) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = d.getDate();
    const day = d.getDay();
    const month = d.getMonth();
    const year = d.getFullYear();

    return `${days[day]},  ${date},  ${months[month]},  ${year} `;
  };

  const searchText = async (e) => {
    if (e.key === "Enter") {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${search}&unit=metric&APPID=${key}`
      ).then(async (response) => {
        const data = await response.json();
        console.log(data);
        await setItem(data);
      });
    }
  };

  const key = "4bf78dfbde097b68f98f7a03f3864606";

  return (
    <div
      className={
        typeof item.main != "undefined"
          ? item.main.temp - 273.15 > 16
            ? "app-warm"
            : "app-cold"
          : "app-cold"
      }
    >
      <main>
        <div className="searchBox">
          <input
            onChange={textChange}
            type="text"
            className="searchBar"
            placeholder="Search Weather"
            value={search}
            onKeyPress={searchText}
          />
        </div>
        {typeof item.coord == "defined" ? (
          <div className="bodyItem">
            <div className="location">
              {item.name},{item.sys.country}
            </div>
            <div className="date">{date(new Date())}</div>
            <div className="temp">
              <div className="realTemp">
                {Math.round(item.main.temp - 273.15)}°C
              </div>
            </div>
            <div className="weather">{item.weather[0].main}</div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
