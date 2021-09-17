import React, { Component } from 'react'

const weatherApi = {
    apiKey: process.env.REACT_APP_API_KEY, 
    city: 'Warsaw,pl'
}

export default class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            temp: '',
            sky: ''
            }  
    }
        async componentDidMount(){
            const urlFetch = `http://api.openweathermap.org/data/2.5/weather?q=${weatherApi.city}&units=metric&appid=${weatherApi.apiKey}`;
            const response = await fetch(urlFetch);
            const data = await response.json();
            this.setState({temp: data.main.temp});
        }

    render() {
        return (
            <div className="wetherInfo">
                Temperatura { Math.ceil(this.state.temp)} stopni C
            </div>
        )
    }
}
