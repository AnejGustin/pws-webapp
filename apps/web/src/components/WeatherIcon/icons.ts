import rain from "@meteocons/svg-static/monochrome/rain.svg";
import cloudy from "@meteocons/svg-static/monochrome/cloudy.svg";
import clearDay from "@meteocons/svg-static/monochrome/clear-day.svg";
import showery from "@meteocons/svg-static/monochrome/mostly-clear-day-rain.svg";
import mostlyClearDay from "@meteocons/svg-static/monochrome/mostly-clear-day.svg";
import becomingUnsettledOvercast from "@meteocons/svg-static/monochrome/overcast-day.svg";
import stormy from "@meteocons/svg-static/monochrome/thunderstorms.svg";
import improving from "@meteocons/svg-static/monochrome/pressure-high.svg";
import worsening from "@meteocons/svg-static/monochrome/pressure-low.svg";
import mist from "@meteocons/svg-static/monochrome/mist.svg";
import snow from "@meteocons/svg-static/monochrome/snow.svg";
import clearNight from "@meteocons/svg-static/monochrome/clear-night.svg";
import mostlyClearNight from "@meteocons/svg-static/monochrome/mostly-clear-night.svg";
import showeryNight from "@meteocons/svg-static/monochrome/mostly-clear-night-rain.svg";
import thunderstormLightRain from "@meteocons/svg-static/monochrome/thunderstorms-drizzle.svg";
import thunderstormRain from "@meteocons/svg-static/monochrome/thunderstorms-rain.svg";
import drizzle from "@meteocons/svg-static/monochrome/drizzle.svg";
import drizzleShower from "@meteocons/svg-static/monochrome/mostly-clear-day-drizzle.svg";
import drizzleShowerNight from "@meteocons/svg-static/monochrome/mostly-clear-night-drizzle.svg";
import freezingRain from "@meteocons/svg-static/monochrome/hail.svg";
import sleet from "@meteocons/svg-static/monochrome/sleet.svg";
import sleetShower from "@meteocons/svg-static/monochrome/mostly-clear-day-sleet.svg";
import sleetShowerNight from "@meteocons/svg-static/monochrome/mostly-clear-night-sleet.svg";
import snowShower from "@meteocons/svg-static/monochrome/mostly-clear-day-snow.svg";
import snowShowerNight from "@meteocons/svg-static/monochrome/mostly-clear-night-snow.svg";
import tornado from "@meteocons/svg-static/monochrome/tornado.svg";
import fogDay from "@meteocons/svg-static/monochrome/fog-day.svg";
import fogNight from "@meteocons/svg-static/monochrome/fog-night.svg";
import wind from "@meteocons/svg-static/monochrome/wind.svg";
import hazeDay from "@meteocons/svg-static/monochrome/haze-day.svg";
import hazeNight from "@meteocons/svg-static/monochrome/haze-night.svg";


import rainAnimated from "@meteocons/svg/monochrome/rain.svg";
import cloudyAnimated from "@meteocons/svg/monochrome/cloudy.svg";
import clearDayAnimated from "@meteocons/svg/monochrome/clear-day.svg";
import showeryAnimated from "@meteocons/svg/monochrome/mostly-clear-day-rain.svg";
import mostlyClearDayAnimated from "@meteocons/svg/monochrome/mostly-clear-day.svg";
import becomingUnsettledOvercastAnimated from "@meteocons/svg/monochrome/overcast-day.svg";
import stormyAnimated from "@meteocons/svg/monochrome/thunderstorms.svg";
import improvingAnimated from "@meteocons/svg/monochrome/pressure-high.svg";
import worseningAnimated from "@meteocons/svg/monochrome/pressure-low.svg";
import mistAnimated from "@meteocons/svg/monochrome/mist.svg";
import snowAnimated from "@meteocons/svg/monochrome/snow.svg";
import clearNightAnimated from "@meteocons/svg/monochrome/clear-night.svg";
import mostlyClearNightAnimated from "@meteocons/svg/monochrome/mostly-clear-night.svg";
import showeryNightAnimated from "@meteocons/svg/monochrome/mostly-clear-night-rain.svg";
import thunderstormLightRainAnimated from "@meteocons/svg/monochrome/thunderstorms-drizzle.svg";
import thunderstormRainAnimated from "@meteocons/svg/monochrome/thunderstorms-rain.svg";
import drizzleAnimated from "@meteocons/svg/monochrome/drizzle.svg";
import drizzleShowerAnimated from "@meteocons/svg/monochrome/mostly-clear-day-drizzle.svg";
import drizzleShowerNightAnimated from "@meteocons/svg/monochrome/mostly-clear-night-drizzle.svg";
import freezingRainAnimated from "@meteocons/svg/monochrome/hail.svg";
import sleetAnimated from "@meteocons/svg/monochrome/sleet.svg";
import sleetShowerAnimated from "@meteocons/svg/monochrome/mostly-clear-day-sleet.svg";
import sleetShowerNightAnimated from "@meteocons/svg/monochrome/mostly-clear-night-sleet.svg";
import snowShowerAnimated from "@meteocons/svg/monochrome/mostly-clear-day-snow.svg";
import snowShowerNightAnimated from "@meteocons/svg/monochrome/mostly-clear-night-snow.svg";
import tornadoAnimated from "@meteocons/svg/monochrome/tornado.svg";
import fogDayAnimated from "@meteocons/svg/monochrome/fog-day.svg";
import fogNightAnimated from "@meteocons/svg/monochrome/fog-night.svg";
import windAnimated from "@meteocons/svg/monochrome/wind.svg";
import hazeDayAnimated from "@meteocons/svg/monochrome/haze-day.svg";
import hazeNightAnimated from "@meteocons/svg/monochrome/haze-night.svg";


import unknown from "@meteocons/svg-static/monochrome/not-available.svg";

import type { IconName, IconObject } from "./types";

export const icons: Record<IconName, IconObject> = {
    "rain": {
        normal: rain,
        animated: rainAnimated
    },
    "cloudy": {
        normal: cloudy,
        animated: cloudyAnimated
    },
    "clearDay": {
        normal: clearDay,
        animated: clearDayAnimated
    },
    "showery": {
        normal: showery,
        animated: showeryAnimated
    },
    "mostlyClearDay": {
        normal: mostlyClearDay,
        animated: mostlyClearDayAnimated
    },
    "becomingUnsettled": {
        normal: becomingUnsettledOvercast,
        animated: becomingUnsettledOvercastAnimated
    },
    "stormy": {
        normal: stormy,
        animated: stormyAnimated
    },
    "improving": {
        normal: improving,
        animated: improvingAnimated
    },
    "worsening": {
        normal: worsening,
        animated: worseningAnimated
    },
    "clear sky": {
        normal: clearDay,
        animated: clearDayAnimated
    },
    "few clouds": {
        normal: mostlyClearDay,
        animated: mostlyClearDayAnimated
    },
    "scattered clouds": {
        normal: mostlyClearDay,
        animated: mostlyClearDayAnimated
    },
    "broken clouds": {
        normal: mostlyClearDay,
        animated: mostlyClearDayAnimated
    },
    "shower rain": {
        normal: showery,
        animated: showeryAnimated
    },
    "thunderstorm": {
        normal: stormy,
        animated: stormyAnimated
    },
    "snow": {
        normal: snow,
        animated: snowAnimated
    },
    "mist": {
        normal: mist,
        animated: mistAnimated
    },
    "thunderstorm with light rain": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "thunderstorm with rain": {
        normal: thunderstormRain,
        animated: thunderstormRainAnimated
    },
    "thunderstorm with heavy rain": {
        normal: thunderstormRain,
        animated: thunderstormRainAnimated
    },
    "light thunderstorm": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "heavy thunderstorm": {
        normal: thunderstormRain,
        animated: thunderstormRainAnimated
    },
    "ragged thunderstorm": {
        normal: thunderstormRain,
        animated: thunderstormRainAnimated
    },
    "thunderstorm with light drizzle": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "thunderstorm with drizzle": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "thunderstorm with heavy drizzle": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "light intensity drizzle": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "drizzle": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "heavy intensity drizzle": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "light intensity drizzle rain": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "drizzle rain": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "heavy intensity drizzle rain": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "shower rain and drizzle": {
        normal: drizzleShower,
        animated: drizzleShowerAnimated
    },
    "heavy shower rain and drizzle": {
        normal: drizzleShower,
        animated: drizzleShowerAnimated
    },
    "shower drizzle": {
        normal: drizzleShower,
        animated: drizzleShowerAnimated
    },
    "light rain": {
        normal: rain,
        animated: rainAnimated
    },
    "moderate rain": {
        normal: rain,
        animated: rainAnimated
    },
    "heavy intensity rain": {
        normal: rain,
        animated: rainAnimated
    },
    "very heavy rain": {
        normal: rain,
        animated: rainAnimated
    },
    "extreme rain": {
        normal: rain,
        animated: rainAnimated
    },
    "light intensity shower rain": {
        normal: showery,
        animated: showeryAnimated
    },
    "heavy intensity shower rain": {
        normal: showery,
        animated: showeryAnimated
    },
    "ragged shower rain": {
        normal: showery,
        animated: showeryAnimated
    },
    "freezing rain": {
        normal: freezingRain,
        animated: freezingRainAnimated
    },
    "light snow": {
        normal: snow,
        animated: snowAnimated
    },
    "heavy snow": {
        normal: snow,
        animated: snowAnimated
    },
    "sleet": {
        normal: sleet,
        animated: sleetAnimated
    },
    "light shower sleet": {
        normal: sleetShower,
        animated: sleetShowerAnimated
    },
    "shower sleet": {
        normal: sleetShower,
        animated: sleetShowerAnimated
    },
    "light rain and snow": {
        normal: sleet,
        animated: sleetAnimated
    },
    "rain and snow": {
        normal: sleet,
        animated: sleetAnimated
    },
    "light shower snow": {
        normal: snowShower,
        animated: snowShowerAnimated
    },
    "shower snow": {
        normal: snowShower,
        animated: snowShowerAnimated
    },
    "heavy shower snow": {
        normal: snowShower,
        animated: snowShowerAnimated
    },
    "overcast clouds": {
        normal: becomingUnsettledOvercast,
        animated: becomingUnsettledOvercastAnimated
    },
    "smoke": {
        normal: hazeDay,
        animated: hazeDayAnimated
    },
    "haze": {
        normal: hazeDay,
        animated: hazeDayAnimated
    },
    "sand/dust whirls": {
        normal: tornado,
        animated: tornadoAnimated
    },
    "fog": {
        normal: fogDay,
        animated: fogDayAnimated
    },
    "sand": {
        normal: hazeDay,
        animated: hazeDayAnimated
    },
    "dust": {
        normal: hazeDay,
        animated: hazeDayAnimated
    },
    "volcanic ash": {
        normal: hazeDay,
        animated: hazeDayAnimated
    },
    "squalls": {
        normal: wind,
        animated: windAnimated
    },
    "tornado": {
        normal: tornado,
        animated: tornadoAnimated
    },
    "clear sky night": {
        normal: clearNight,
        animated: clearNightAnimated
    },
    "few clouds night": {
        normal: mostlyClearNight,
        animated: mostlyClearNightAnimated
    },
    "scattered clouds night": {
        normal: mostlyClearNight,
        animated: mostlyClearNightAnimated
    },
    "broken clouds night": {
        normal: mostlyClearNight,
        animated: mostlyClearNightAnimated
    },
    "shower rain night": {
        normal: showeryNight,
        animated: showeryNightAnimated
    },
    "thunderstorm night": {
        normal: stormy,
        animated: stormyAnimated
    },
    "snow night": {
        normal: snow,
        animated: snowAnimated
    },
    "mist night": {
        normal: mist,
        animated: mistAnimated
    },
    "thunderstorm with light rain night": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "thunderstorm with rain night": {
        normal: thunderstormLightRain,
        animated: thunderstormRainAnimated
    },
    "thunderstorm with heavy rain night": {
        normal: thunderstormRain,
        animated: thunderstormRainAnimated
    },
    "light thunderstorm night": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "heavy thunderstorm night": {
        normal: thunderstormRain,
        animated: thunderstormRainAnimated
    },
    "ragged thunderstorm night": {
        normal: thunderstormRain,
        animated: thunderstormRainAnimated
    },
    "thunderstorm with light drizzle night": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "thunderstorm with drizzle night": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "thunderstorm with heavy drizzle night": {
        normal: thunderstormLightRain,
        animated: thunderstormLightRainAnimated
    },
    "light intensity drizzle night": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "drizzle night": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "heavy intensity drizzle night": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "light intensity drizzle rain night": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "drizzle rain night": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "heavy intensity drizzle rain night": {
        normal: drizzle,
        animated: drizzleAnimated
    },
    "shower rain and drizzle night": {
        normal: drizzleShowerNight,
        animated: drizzleShowerNightAnimated
    },
    "heavy shower rain and drizzle night": {
        normal: drizzleShowerNight,
        animated: drizzleShowerNightAnimated
    },
    "shower drizzle night": {
        normal: drizzleShowerNight,
        animated: drizzleShowerNightAnimated
    },
    "light rain night": {
        normal: rain,
        animated: rainAnimated
    },
    "moderate rain night": {
        normal: rain,
        animated: rainAnimated
    },
    "heavy intensity rain night": {
        normal: rain,
        animated: rainAnimated
    },
    "very heavy rain night": {
        normal: rain,
        animated: rainAnimated
    },
    "extreme rain night": {
        normal: rain,
        animated: rainAnimated
    },
    "light intensity shower rain night": {
        normal: showeryNight,
        animated: showeryNightAnimated
    },
    "heavy intensity shower rain night": {
        normal: showeryNight,
        animated: showeryNightAnimated
    },
    "ragged shower rain night": {
        normal: showeryNight,
        animated: showeryNightAnimated
    },
    "freezing rain night": {
        normal: freezingRain,
        animated: freezingRainAnimated
    },
    "light snow night": {
        normal: snow,
        animated: snowAnimated
    },
    "heavy snow night": {
        normal: snow,
        animated: snowAnimated
    },
    "sleet night": {
        normal: sleet,
        animated: sleetAnimated
    },
    "light shower sleet night": {
        normal: sleetShowerNight,
        animated: sleetShowerNightAnimated
    },
    "shower sleet night": {
        normal: sleetShowerNight,
        animated: sleetShowerNightAnimated
    },
    "light rain and snow night": {
        normal: sleet,
        animated: sleetAnimated
    },
    "rain and snow night": {
        normal: sleet,
        animated: sleetAnimated
    },
    "light shower snow night": {
        normal: snowShowerNight,
        animated: snowShowerNightAnimated
    },
    "shower snow night": {
        normal: snowShowerNight,
        animated: snowShowerNightAnimated
    },
    "heavy shower snow night": {
        normal: snowShowerNight,
        animated: snowShowerNightAnimated
    },
    "overcast clouds night": {
        normal: becomingUnsettledOvercast,
        animated: becomingUnsettledOvercastAnimated
    },
    "smoke night": {
        normal: hazeNight,
        animated: hazeNightAnimated
    },
    "haze night": {
        normal: hazeNight,
        animated: hazeNightAnimated
    },
    "sand/dust whirls night": {
        normal: tornado,
        animated: tornadoAnimated
    },
    "fog night": {
        normal: fogNight,
        animated: fogNightAnimated
    },
    "sand night": {
        normal: hazeNight,
        animated: hazeNightAnimated
    },
    "dust night": {
        normal: hazeDay,
        animated: hazeDayAnimated
    },
    "volcanic ash night": {
        normal: hazeDay,
        animated: hazeDayAnimated
    },
    "squalls night": {
        normal: wind,
        animated: windAnimated
    },
    "tornado night": {
        normal: tornado,
        animated: tornadoAnimated
    },
    "unknown": {
        normal: unknown,
        animated: unknown
    },
};