import { useState, useEffect, useRef } from "react";

function Converter() {
  const [amount, setAmount] = useState("0");
  const [flipped, setFlipped] = useState(false);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState(0);
  const [select, setSelect] = useState([]);
  const [name, setName] = useState("BTC");
  const reset = () => {
    setAmount("0");
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setSelect(json);
        setCoins(json[coin].quotes.USD.price);
      });
  }, [coin]);
  const ref = useRef(null);
  const onSelectChange = () => {
    const id = ref.current;
    const index = id.selectedIndex;
    setCoin(index);
    setName(select[index].symbol);
  };
  const onChange = (event) => {
    setAmount(event.target.value);
  };
  const onClick = () => {
    setFlipped((prev) => !prev);
  };
  return (
    <div>
      <select onChange={onSelectChange} ref={ref}>
        {select.map((coin) => (
          <option key={coin.id}>
            {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
          </option>
        ))}
      </select>
      <div>
        <label htmlFor="usd">USD</label>
        <input
          type="number"
          id="usd"
          value={String(!flipped ? amount : amount * coins)}
          onChange={onChange}
          disabled={flipped}
        />
      </div>
      <div>
        <label htmlFor="btn">{name}</label>
        <input
          type="number"
          id="btn"
          value={String(flipped ? amount : amount / coins)}
          onChange={onChange}
          disabled={!flipped}
        />
      </div>
      <div>
        <button onClick={onClick}>{!flipped ? "flip" : "turn back"}</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  );
}
export default Converter;
