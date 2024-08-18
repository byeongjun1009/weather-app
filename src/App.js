import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from "react-spinners/ClipLoader";



/**
 * 1. 앱이 실행되자마자 현재위치기반의 날씨가 보인다.
 * 2. 날씨정보에는 도시, 섭씨, 화씨 날씨 상태
 * 3. 5개의 버튼이 있다 (1개는 현재 위치, 4개는 다른 도시)
 * 4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다.
 * 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다
 * 6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
 */
function App() {

  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const cities = ['paris', 'new york', 'tokyo', 'seoul']



  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      // console.log("현재 위치", lat, lon)
      return getWeatherByCurrentLocation(lat, lon)
    });
  }

  useEffect(() => {
    if (city) {
      getWeatherByCity();
    } else {
      getCurrentLocation();
    }
  }, [city])

  const fetchWeatherData = async (url) => {
    try {
      // api는 대부분 json. response에서 json을 추출해야 함.
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      alert("Failed to fetch weather data. Please try again later.");
      return null;
    }
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=775666a21376eb5e342d413c5e3e74c1&units=metric`
    setLoading(true)
    const data = await fetchWeatherData(url);
    if (data) {
      setWeather(data);
    } else {
      setWeather(null);
    }
    setLoading(false);
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=775666a21376eb5e342d413c5e3e74c1&units=metric`
    setLoading(true)
    const data = await fetchWeatherData(url);
    if (data) {
      setWeather(data);
    } else {
      setWeather(null);
    }
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <div className='container'>
          <ClipLoader
            color='#f88c6b'
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader" />
        </div>) :
        (<div className='container'>
          <WeatherBox weather={weather} />
          <WeatherButton cities={cities} selectedCity={city} setCity={setCity} />
        </div>)
      }
    </div>
  );
}

export default App;
