import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { SectionWrapper, ContentWrapper, LeftSection, RightSection, Temp, SubHeader, WeatherImg, Divider } from './styled/styledComponent';
import useIntervalAsync from '../helpers/useIntervalAsync'
import Spinner from 'react-bootstrap/Spinner';
import { GiSunrise, GiSunset } from "react-icons/gi";
import moment from 'moment';

interface WeatherType {
    main: string;
    icon: string;
    description: string
}

interface MainType {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
}

interface SysType {
    sunrise: number;
    sunset: number;
}
interface WindType {
    speed: number
}

interface WeatherResultState {
    weather: WeatherType[];
    sys: SysType;
    main: MainType;
    name: string;
    wind: WindType;
    visibility: number;
}

function Weather() {
    const [latitude, setLatitude] = useState<number>();
    const [longitude, setLongitude] = useState<number>();
    const [loading, setLoading] = useState<boolean>(true);
    const [result, setResult] = useState<WeatherResultState>({ weather: [{ main: "", icon: "", description: "" }], sys: { sunrise: 0, sunset: 0 }, main: { temp: 0, feels_like: 0, humidity: 0, pressure: 0, temp_max: 0, temp_min: 0 }, name: "", wind: { speed: 0 }, visibility: 0 });

    useEffect(() => {
        getCurrentLocation();
    });

    useEffect(() => {                                                /* eslint-disable */ 
        if (longitude !== undefined && longitude !== undefined) {
            updateWeather();
        }
    }, [latitude, longitude]); 

    const getCurrentLocation = async () => {
        await navigator.geolocation.getCurrentPosition(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude)
        })
    }

    const getWeather = useCallback(async () => {
        if (longitude !== undefined && longitude !== undefined) {
            await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6dc9c2a99870e8a1a5ff5c72ecc15d4e`).then(function (response) {
                setResult(response?.data)
                setLoading(false)
            })
        }
    }, [latitude, longitude]);

    const updateWeather = useIntervalAsync(getWeather, 60000);

    return (
        loading ?
            <Spinner animation="border" />
            :
            <SectionWrapper>
                <div className="mb-3" >
                    <h3 className='mb-4'>Current Weather</h3>
                </div>
                <div style={{ display: "flex", justifyContent: 'space-between' }}>
                    <div>
                        <h5 className='mt-1'>{result.name}</h5>
                        <p>{moment().format('LT')}</p>
                    </div>
                    <div>
                        <p><GiSunrise size={30} color="orange" /><span className='ms-3'>{moment.unix(result.sys.sunrise).format("LT")}</span></p>
                        <p><GiSunset size={30} color="orange" /><span className='ms-3'>{moment.unix(result.sys.sunset).format("LT")}</span></p>
                    </div>
                </div>
                <ContentWrapper>
                    <LeftSection>
                        <div className="today-weather">
                            <WeatherImg src={`https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`} />
                            <Temp>{result.main.temp}&deg;</Temp>
                        </div>
                        <h2>{result.weather[0].main}</h2>
                        <p>{result.weather[0].description}</p>

                        <div className="mt-4 today-temp">
                            <div>
                                <SubHeader>Today's High</SubHeader>
                                <p>{result.main.temp_max}&deg;</p>
                            </div>

                            <div>
                                <SubHeader>Today's Low</SubHeader>
                                <p>{result.main.temp_min}&deg;</p>
                            </div>
                        </div>
                    </LeftSection>
                    <Divider />
                    <RightSection>
                        <ListGroup variant="flush" className="weather-list">
                            <ListGroup.Item className="weather-item"><span>Humidity</span>   <span>{result.main.humidity}%</span></ListGroup.Item>
                            <ListGroup.Item className="weather-item"><span>Wind Speed</span>   <span>{result.wind.speed} km/h</span></ListGroup.Item>
                            <ListGroup.Item className="weather-item"> <span>Pressure</span>  <span>{result.main.pressure} mb</span></ListGroup.Item>
                            <ListGroup.Item className="weather-item"> <span>Visibility</span>   <span>{Math.trunc(result.visibility / 1000)} km</span></ListGroup.Item>
                        </ListGroup>

                    </RightSection>
                </ContentWrapper>

            </SectionWrapper>
    );
}


export default Weather;
