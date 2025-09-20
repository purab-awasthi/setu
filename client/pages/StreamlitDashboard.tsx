import React from "react";

const StreamlitDashboard = () => {
  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Smart Allocation Dashboard</h1>
      <iframe
        src="http://localhost:8501"
        width="100%"
        height="800px"
        style={{ border: "none" }}
        title="Streamlit Dashboard"
      ></iframe>
    </div>
  );
};

export default StreamlitDashboard;
