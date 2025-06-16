const apiKey = '25fc17e9e691e569af7f954da5ea28f1';

const elements = {
  input: document.getElementById('city-input'),
  searchBtn: document.getElementById('search-btn'),
  weatherCard: document.getElementById('weather-card'),
  cityName: document.getElementById('city-name'),
  tempEl: document.getElementById('temperature'),
  descEl: document.getElementById('description'),
  humidityEl: document.getElementById('humidity'),
  windEl: document.getElementById('wind'),
  iconEl: document.getElementById('weather-icon'),
  errorEl: document.getElementById('error-message'),
};

elements.searchBtn.addEventListener('click', () => {
  const city = elements.input.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

elements.input.addEventListener('keyup', e => {
  if (e.key === 'Enter') elements.searchBtn.click();
});

async function fetchWeather(city) {
  elements.errorEl.classList.add('hidden');
  try {
    const resp = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    );
    if (!resp.ok) throw new Error('City not found');
    const data = await resp.json();
    updateUI(data);
  } catch (err) {
    showError(err.message);
  }
}

function updateUI(data) {
  elements.cityName.textContent = `${data.name}, ${data.sys.country}`;
  elements.tempEl.textContent = Math.round(data.main.temp);
  elements.descEl.textContent = data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
  elements.humidityEl.textContent = data.main.humidity;
  elements.windEl.textContent = data.wind.speed;
  elements.iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  elements.weatherCard.classList.remove('hidden');
}

function showError(msg) {
  elements.errorEl.textContent = msg;
  elements.errorEl.classList.remove('hidden');
  elements.weatherCard.classList.add('hidden');
}
