import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const [dollar, setDollar] = useState(0);
  const [index, setIndex] = useState(0);
  const [coinNum, setCoinNum] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, []);

  const onInputChange = (event) => {
    setDollar(event.target.value);
    getCoinNum();
  };

  const onSelectChange = (event) => {
    setIndex(event.target.value);
    getCoinNum();
  };

  function getCoinNum() {
    const price = coins[index].quotes.USD.price;
    const result = Math.round(dollar / price * 100) / 100;
    if(result !== NaN && result > 0) {
      setCoinNum(result);
    }
  }

  return (
    <div>
      <h1>The Coins ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : 
        <div>          
            If you buy{" "}
            <select onChange={onSelectChange}>
            {coins.map((coin, index) => (
              <option key={coin.id} value={index}>          
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}
              </option>
            ))}
            </select>
            <br/>
            with{" "}
            <input id="dollar" onChange={onInputChange} placeholder="input dollars..."/> dollars
          <hr />
          You can get <input id="coinNum" value={coinNum} readOnly={true}/> coins
        </div>
      } 
    </div>
  )
}

export default App;
