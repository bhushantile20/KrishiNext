import React, { useState } from "react";
import Heading from "../../components/heading/Heading";
import Spinner from "../../components/loading/Spinner";
import useAI from "../../hooks/ai/useAI";
import InputTag from "../../components/input/InputTag";

const CropSenseAI = () => {
  const [prediction, setPrediction] = useState([]);
  const { predictCrops, isLoading } = useAI();

  const [formData, setFormData] = useState({
    soil: "",
    altitude: "",
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const cropPrediction = async () => {
    try {
      const res = await predictCrops(formData);
      let parsed;

      if (Array.isArray(res)) {
        parsed = res;
      } else if (typeof res === "string") {
        const match = res.match(/\[\s*{[\s\S]*?}\s*\]/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          console.warn("No valid JSON array found in response.");
          parsed = [];
        }
      } else {
        console.warn("Unknown response format");
        parsed = [];
      }

      setPrediction(parsed);
    } catch (err) {
      console.error("Prediction failed:", err);
      setPrediction([]);
    }
  };

  return (
    <>
      <Heading text={"Crop Predictor"} textAlign="text-left" />
      <div className="container max-w-screen-lg mx-auto">
        <div className="bg-white px-4">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-full">
              <form
                className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  cropPrediction();
                }}
              >
                <div className="md:col-span-6">
                  <label htmlFor="soil">Soil</label>
                  <select
                    name="soil"
                    required
                    value={formData.soil}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) =>
                      setFormData({ ...formData, soil: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select Soil
                    </option>
                    <option value="sandy soil">Sandy Soil</option>
                    <option value="clay soil">Clay Soil</option>
                    <option value="silt soil">Silt Soil</option>
                    <option value="peat soil">Peat Soil</option>
                    <option value="chalk soil">Chalk Soil</option>
                    <option value="loam soil">Loam Soil</option>
                  </select>
                </div>

                <div className="md:col-span-6">
                  <InputTag
                    label={"Altitude (in km)"}
                    type={"number"}
                    min="0"
                    max="10"
                    placeholder={"Between 0 and 10 (kilometers)"}
                    value={formData.altitude}
                    setFormData={setFormData}
                    toUpdate={"altitude"}
                  />
                </div>

                <div className="md:col-span-2">
                  <InputTag
                    label={"Temperature (in °C)"}
                    type={"number"}
                    min="-50"
                    max="50"
                    placeholder={"Between -50 and 50 (°Celsius)"}
                    value={formData.temperature}
                    setFormData={setFormData}
                    toUpdate={"temperature"}
                  />
                </div>

                <div className="md:col-span-2">
                  <InputTag
                    label={"Humidity (in %)"}
                    type={"number"}
                    min="0"
                    max="100"
                    placeholder={"Between 0 and 100 (%)"}
                    value={formData.humidity}
                    setFormData={setFormData}
                    toUpdate={"humidity"}
                  />
                </div>

                <div className="md:col-span-2">
                  <InputTag
                    label={"Rainfall (in mm)"}
                    type={"number"}
                    min="0"
                    max="1000"
                    placeholder={"Between 0 and 1000 (mm)"}
                    value={formData.rainfall}
                    setFormData={setFormData}
                    toUpdate={"rainfall"}
                  />
                </div>

                <div className="md:col-span-6 my-2 text-right">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex justify-center items-center font-semibold py-2 px-4 rounded text-white ${
                      isLoading
                        ? "bg-green-500 cursor-not-allowed opacity-60"
                        : "bg-green-500 hover:bg-green-700"
                    }`}
                  >
                    {isLoading && (
                      <span className="mr-2">
                        <Spinner width="w-5" color="#ffffff" />
                      </span>
                    )}
                    Predict Crops
                  </button>
                </div>

                <div className="md:col-span-full">
                  {prediction?.length > 0 ? (
                    <div className="border p-4 mt-1 rounded bg-gray-50">
                      <h3 className="text-lg font-semibold mb-2">
                        🌾 Recommended Crops
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {prediction.map((item, index) => (
                          <li key={index}>
                            <strong>{item.crop}</strong>: {item.reason}
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-gray-500 mt-4">
                        Note: This prediction may not be accurate. Please consult
                        an expert for better results. Powered by Gemini AI.
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">
                      Prediction results will appear here after submitting the
                      form.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CropSenseAI;
