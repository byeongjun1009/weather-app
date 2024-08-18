import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity, selectedCity }) => {
  console.log(cities)
  return (
    <div>
      <Button variant={selectedCity === '' ? 'primary' : 'warning'} onClick={()=>setCity('')}>Current Location</Button>

      {cities.map((item) => (
        <Button variant={selectedCity === item ? 'primary' : "warning"} onClick={()=>setCity(item)}>
          {item}
        </Button>
      ))}
    </div>
  )
}

export default WeatherButton