import CurrentConditionsCard from "./components/current_conditions/CurrentConditionsCard";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import History from "./components/history/History";
import MoonCard from "./components/moon/MoonCard";
import ZambrettiCard from "./components/zambretti/ZambrettiCard";

function App() {
  return (
    <div className="bg-gray-100 p-6 tabular-nums">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Dashboard />
        <CurrentConditionsCard />
        <History />
        <div className="grid grid-cols-1 grid-rows-2 gap-6">
          <ZambrettiCard />
          <MoonCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
