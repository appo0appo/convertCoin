import { useState, useEffect } from "react";
import Converter from "./Converter";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>the coins {loading ? null : `(${coins.length})`}</h1>
      <hr />
      {loading ? <strong>loading...</strong> : <Converter />}
    </div>
  );
}

export default App;
