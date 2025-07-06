import { useContext } from "react";
import { BusinessContext } from "../context/BusinessContext";
import Spinner from "./Spinner";


const API_BASE_URL = "https://growthpro-business-dashboard-reviews-usys.onrender.com"; 
const DisplayCard = () => {
  const { businessData, setBusinessData, loading, setLoading } = useContext(BusinessContext);

  const regenerateHeadline = async () => {
    if (!businessData?.name || !businessData?.location) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/regenerate-headline?name=${encodeURIComponent(
          businessData.name
        )}&location=${encodeURIComponent(businessData.location)}`
      );

      const data = await res.json();

      setBusinessData({ ...businessData, headline: data.headline });
    } catch (err) {
      console.error("Error regenerating headline:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!businessData) return null;

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-4">
      <h3 className="text-xl font-semibold mb-2">Business Overview</h3>
      <p><strong>Rating:</strong> {businessData.rating} ⭐</p>
      <p><strong>Reviews:</strong> {businessData.reviews}</p>
      <p><strong>SEO Headline:</strong> {businessData.headline}</p>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={regenerateHeadline}
      >
        Regenerate SEO Headline
      </button>
    </div>
  );
};

export default DisplayCard;
