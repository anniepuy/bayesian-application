import React, { useState } from 'react';
import Papa from 'papaparse';
import FeatureSelection from './components/FeatureSelection';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        setCsvData(result.data);
        setHeaders(Object.keys(result.data[0])); // Extract headers from the first row
      },
    });
  };

  return (
    <div className="App">
      <h1>Bayesian Model Feature Selection</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
      />
      {headers.length > 0 && (
        <FeatureSelection headers={headers} />
      )}
    </div>
  );
}

export default App;
