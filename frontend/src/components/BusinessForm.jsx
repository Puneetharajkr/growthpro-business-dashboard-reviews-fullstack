import { useContext, useState } from "react";
import { BusinessContext } from "../context/BusinessContext";
import Spinner from "./Spinner";

const BusinessForm = () => {
  const { setBusinessData, setLoading, loading } = useContext(BusinessContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const API_BASE_URL = "https://growthpro-business-dashboard-reviews-usys.onrender.com"; 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location) {
      setError("Both fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/business-data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      });

      const data = await res.json();

      setBusinessData({ ...data, name, location });
    } catch (err) {
      setError(`Something went wrong. Try again: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto my-4">
      <h2 className="text-xl font-bold mb-4">Enter Business Details</h2>
      <input
        type="text"
        placeholder="Business Name"
        className="w-full p-2 border mb-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="w-full p-2 border mb-2 rounded"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? <Spinner /> : "Submit"}
      </button>
    </form>
  );
};

export default BusinessForm;
