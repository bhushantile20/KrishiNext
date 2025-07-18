import React from "react";
import useHttpClient from "../api/useHttpClient";
import { CROP_PREDICTOR } from "../../constants/apiEndpoints";

const useAI = () => {
  const { sendRequest, isLoading } = useHttpClient();

  const predictCrops = async (formData) => {
    console.log('form data : ', formData);
    
    const resp = await sendRequest(
      CROP_PREDICTOR(
        formData.soil,
        formData.altitude,
        formData.temperature,
        formData.humidity,
        formData.rainfall
      ),
      "GET",
      null, 
      null,
      false
    );
    return resp.data.message;
  };

  return { isLoading, predictCrops };
};

export default useAI;
