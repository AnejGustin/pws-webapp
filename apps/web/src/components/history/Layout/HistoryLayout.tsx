import {
    numberToMonth,
    weatherDataPeriodToString
} from "../../../utils/utils";
import Dropdown from "../../Dropdown/Dropdown";
import FetchButton from "../FetchButton/FetchButton";
import type { HistoryLayoutProps } from "./types";

export default function HistoryLayout(props: HistoryLayoutProps) {
    return (
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold">History</h2>

            <div className="flex flex-wrap items-center gap-3">
                <Dropdown
                    value={props.selectedWeatherParameter}
                    options={props.weatherParameterOptions}
                    onChange={props.weatherParameterDropdownOnChange}
                />

                <Dropdown
                    value={props.selectedPeriod}
                    options={props.weatherPeriodOptions}
                    onChange={props.weatherPeriodDropdownOnChange}
                    formatDisplay={weatherDataPeriodToString}
                />

                <Dropdown
                    value={props.selectedDay}
                    options={props.dayParameterOptions}
                    onChange={props.dayParameterDropdwonOnChange}
                    hide={props.selectedPeriod === "all_time" || props.selectedPeriod === "year" || props.selectedPeriod === "month"}
                />

                <Dropdown
                    value={numberToMonth(props.selectedMonth)}
                    options={props.monthParameterOptions}
                    onChange={props.monthParameterDropdwonOnChange}
                    hide={props.selectedPeriod === "all_time" || props.selectedPeriod === "year"}
                />

                <Dropdown
                    value={props.selectedYear}
                    onChange={props.yearParameterDropdwonOnChange}
                    options={props.yearParameterOptions}
                    hide={props.selectedPeriod === "all_time"}
                />

                <FetchButton
                    onClick={() => {
                        props.setAppliedWeatherParameter(props.selectedWeatherParameter);
                        props.setAppliedPeriod(props.selectedPeriod);
                        props.setAppliedDay(props.selectedDay);
                        props.setAppliedMonth(props.selectedMonth);
                        props.setAppliedYear(props.selectedYear);
                    }}
                    loading={props.statsQuery.isFetching || props.historyQuery.isFetching}
                />
            </div>

            {props.children}
            
        </div>
    )
}