import React from "react";
import { useState, useEffect } from "react";
import Heading from "../../components/heading/Heading";
import AreaGraph from "../../components/graphs/AreaGraph";
import BarGraph from "../../components/graphs/BarGraph";
import GraphSkeleton from "../../components/skeleton/GraphSkeleton";
import useGraph from "../../hooks/graph/useGraph";
import EmptyStateText from "../../components/empty_state/EmptyStateText";

function SellerOverview() {
  const { visualizeSalesData, isLoading } = useGraph();

  const [dateVsSales, setDateVsSales] = useState([]);
  const [categoryVsSales, setCategoryVsSales] = useState([]);

  const visualizeData = async () => {
    let graphData = await visualizeSalesData();
    setDateVsSales(graphData.dateVsSales);
    setCategoryVsSales(graphData.categoryVsSales);
  };

  useEffect(() => {
    visualizeData();
  }, []);

  return (
    <>
      {/* Table Header */}
      <Heading text={"Visualize Your Sales"} textAlign="text-left" />
      {isLoading ? (
        <GraphSkeleton noOfBoxes={2} />
      ) : dateVsSales.length === 0 ? (
        <EmptyStateText text="No orders have been placed. Check back soon!" />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg">
          <AreaGraph
            title="Date v/s Sales"
            lineData={dateVsSales}
            color="#A3DC9A"
            xKey="date"
            yKey="totalSales"
            gridStroke="#000000"
            axisStroke="#000000"
          />
          <BarGraph
            title="Category v/s Sales"
            data={categoryVsSales}
            color="#A3DC9A"
            xKey="category"
            yKey="totalSales"
            gridStroke="#000000"
            axisStroke="#000000"
          />
        </div>
      )}
    </>
  );
}

export default SellerOverview;
