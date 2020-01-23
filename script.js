const httpRequest = new XMLHttpRequest();

const get = url => {
  return new Promise((resolve, reject) => {
    httpRequest.open("GET", url);
    httpRequest.onload = () =>
      httpRequest.status === 200
        ? resolve(httpRequest.responseText)
        : reject(Error(httpRequest.status));
    httpRequest.onerror = () => reject(Error("Network Error"));
    httpRequest.send();
  });
};

const tempToF = kelvin => ((kelvin - 273.15) * 1.8 + 32).toFixed(0);

const successHandler = data => {
  const dataObj = JSON.parse(data);
  return `
    <h1>Weather</h1>
    <h2 class="top">
      <img 
        src="https://api.openweathermap.org/img/w/${
          dataObj.weather[0].icon
        }.png"
        alt="${dataObj.weather[0].description}"
        width="50"
        height="50"
      >${dataObj.name}
    </h2>
    <p>
      <span class="tempF">${tempToF(dataObj.main.temp)}&deg;</span> | ${
    dataObj.weather[0].description
  }
    </p>
  `;
};

const failarHandler = status => {
  console.error(status);
};

document.addEventListener("DOMContentLoaded", () => {
  const weatherDiv = document.querySelector("#weather");
  const location = "san+francisco,us";
  const apiKey = "62317242338f3dde29c865ad7b26154d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;

  (async () => {
    try {
      const div = successHandler(await get(url));
      weatherDiv.innerHTML = div;
    } catch (err) {
      failarHandler(err);
    } finally {
      const weatherDiv = document.querySelector("#weather");
      weatherDiv.classList.remove("hidden");
    }
  })();
});
