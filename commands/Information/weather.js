async function getWeather(cityname) {
    try {
      const city = cityname;
      const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '16bcfd0889mshbf074185edcf163p1d4724jsn484db61bccb0',
          'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
      };
  
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data.');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('An error occurred while fetching weather data.');
    }
  }
  
  function getWeatherSuggestion(temperature, cloudiness) {
    let suggestion = "Enjoy the day! ☀️"; // Default suggestion for neutral weather
  
    if (temperature > 25 && cloudiness < 30) {
      suggestion = "It's a perfect day for a picnic! 🧺🌳";
    } else if (temperature > 30) {
      suggestion = "Stay cool and hydrated! 🍹🌊";
    } else if (temperature < 10 && cloudiness > 70) {
      suggestion = "Cozy up indoors with a hot cup of cocoa! ☕️🔥";
    } else if (temperature < 5) {
      suggestion = "Bundle up and embrace the winter wonderland! ❄️⛄️";
    }
  
    return suggestion;
  }
  
  const { SlashCommandBuilder } = require('discord.js');
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName('getweather')
      .setDescription('Get weather info of any city around the world')
      .addStringOption(option =>
        option
          .setName('city')
          .setDescription('The city for which you wish to get the weather')
          .setRequired(true))
    ,
    async execute(interaction) {
      try {
        const city = interaction.options.getString('city');
        const data = await getWeather(city);
  
        const sunriseTime = new Date(data.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(data.sunset * 1000).toLocaleTimeString();
        const message = `🌤️ Current Weather: ${data.temp}°C\n\n`
          + `Feels Like: ${data.feels_like}°C\n`
          + `Cloudiness: ${data.cloud_pct}%\n`
          + `Wind Direction: ${data.wind_degrees}°\n`
          + `Sunrise: ${sunriseTime}\n`
          + `Sunset: ${sunsetTime}\n\n`
          + `${getWeatherSuggestion(data.temp, data.cloud_pct)}`;
  
        await interaction.reply(message);
      } catch (error) {
        await interaction.reply('Failed to fetch weather data. Please try again later.');
      }
    },
  };
  