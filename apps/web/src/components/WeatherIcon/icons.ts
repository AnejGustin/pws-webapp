import rain from "@meteocons/svg-static/monochrome/rain.svg";
import cloudy from "@meteocons/svg-static/monochrome/cloudy.svg";
import clearDay from "@meteocons/svg-static/monochrome/clear-day.svg";
import showery from "@meteocons/svg-static/monochrome/mostly-clear-day-rain.svg";
import mostlyClearDay from "@meteocons/svg-static/monochrome/mostly-clear-day.svg";
import becomingUnsettled from "@meteocons/svg-static/monochrome/overcast-day.svg";
import stormy from "@meteocons/svg-static/monochrome/thunderstorms.svg";
import improving from "@meteocons/svg-static/monochrome/pressure-high.svg";
import worsening from "@meteocons/svg-static/monochrome/pressure-low.svg";
import mist from "@meteocons/svg-static/monochrome/mist.svg";
import snow from "@meteocons/svg-static/monochrome/snow.svg";
import clearNight from "@meteocons/svg-static/monochrome/clear-night.svg";
import mostlyClearNight from "@meteocons/svg-static/monochrome/mostly-clear-night.svg";
import showeryNight from "@meteocons/svg-static/monochrome/mostly-clear-night-rain.svg";

import unknown from "@meteocons/svg-static/monochrome/not-available.svg";

import rainAnimated from "@meteocons/svg/monochrome/rain.svg";
import cloudyAnimated from "@meteocons/svg/monochrome/cloudy.svg";
import clearDayAnimated from "@meteocons/svg/monochrome/clear-day.svg";
import showeryAnimated from "@meteocons/svg/monochrome/mostly-clear-day-rain.svg";
import mostlyClearDayAnimated from "@meteocons/svg/monochrome/mostly-clear-day.svg";
import becomingUnsettledAnimated from "@meteocons/svg/monochrome/overcast-day.svg";
import stormyAnimated from "@meteocons/svg/monochrome/thunderstorms.svg";
import improvingAnimated from "@meteocons/svg/monochrome/pressure-high.svg";
import worseningAnimated from "@meteocons/svg/monochrome/pressure-low.svg";
import mistAnimated from "@meteocons/svg/monochrome/mist.svg";
import snowAnimated from "@meteocons/svg/monochrome/snow.svg";
import clearNightAnimated from "@meteocons/svg/monochrome/clear-night.svg";
import mostlyClearNightAnimated from "@meteocons/svg/monochrome/mostly-clear-night.svg";
import showeryNightAnimated from "@meteocons/svg/monochrome/mostly-clear-night-rain.svg";

export const icons = {
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
        normal: becomingUnsettled,
        animated: becomingUnsettledAnimated
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
    "unknown": {
        normal: unknown,
        animated: unknown
    },
};