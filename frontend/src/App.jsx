import BusinessForm from "./components/BusinessForm";
import DisplayCard from "./components/DisplayCard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-center text-3xl font-bold text-blue-700 mb-6">
        GrowthProAI - Business Dashboard
      </h1>
      <BusinessForm />
      <DisplayCard />
    </div>
  );
};

export default App;
