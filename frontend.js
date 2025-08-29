import { useState } from "react";

function App() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", background: "#f5f5f5" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        AI Medical Prescription Verification
      </h1>

      <textarea
        style={{
          width: "50%",
          height: "100px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
        placeholder="Enter symptoms (e.g., fever, cough)..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />

      <br />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify Prescription"}
      </button>

      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "white",
            borderRadius: "6px",
            width: "50%",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Result</h2>
          {result.error ? (
            <p style={{ color: "red" }}>❌ {result.error}</p>
          ) : (
            <pre
              style={{
                background: "#f0f0f0",
                padding: "10px",
                borderRadius: "6px",
                marginTop: "10px",
                fontSize: "14px",
                overflowX: "auto",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
