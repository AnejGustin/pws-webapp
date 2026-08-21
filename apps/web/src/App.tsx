import Dashboard from "./components/dashboard/Dashboard";
import History from "./components/history/History";
import ZambrettiCard from "./components/zambretti/ZambrettiCard";

function App() {
  return (
    <div className="bg-gray-100 p-6 tabular-nums">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Dashboard />
        <ZambrettiCard />
        <History />
      </div>
    </div>
  )
}

export default App;
