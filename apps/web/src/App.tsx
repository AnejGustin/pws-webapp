import AlertsCard from "./components/alerts/AlertsCard";
import CurrentConditionsCard from "./components/current_conditions/CurrentConditionsCard";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import History from "./components/history/History";
import MoonCard from "./components/moon/MoonCard";
import PrecipitationRadar from "./components/precipitation_radar/PrecipitationRadar";
import Satellite from "./components/satellite/Satellite";
import SunCard from "./components/sun/SunCard";
import ZambrettiCard from "./components/zambretti/ZambrettiCard";

function App() {
  return (
    <div className="bg-[var(--color-bg)] p-6 tabular-nums">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Dashboard />
        <CurrentConditionsCard />
        <PrecipitationRadar />
        <Satellite />
        <AlertsCard />
        <SunCard />
        <MoonCard />
        <ZambrettiCard />
        <History />
      </div>
      <Footer />
    </div>
  );
}

export default App;
