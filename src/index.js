import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Currency from "./Currency.js";
import Converter from "./Converter.js";
import styled from "styled-components";

const Wrapper = styled.div`
  background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  height: 100vh;
  text-align: center;
`;

const Button = styled.button`
  display: inline-block;
  border: 1px solid palevioletred;
  border-radius: 8px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: papayawhip;
  color: palevioletred;
  text-align: center;
  font: 1.2em Montserrat, sans-serif;
`;

export default function App() {
  const [data, setData] = useState([]);
  const [state, setState] = useState("currency");
  const [value, setValue] = useState(() => {
    if (/^en\b/.test(navigator.language)) {
      return "USD";
    } else if (/^ru\b/.test(navigator.language)) return "RUB";
    else return "EUR";
  });

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.coinbase.com/v2/exchange-rates?currency=${value}`
      );
      const curr = await response.json();
      setData(curr.data);
    })();
  }, [value]);

  function handleCurrChange(e) {
    setValue(`${e.target.value}`);
  }

  function toCurrency() {
    setState("currency");
  }

  function toConverter() {
    setState("converter");
  }

  function switchParts(type) {
    switch (type) {
      case "currency":
        return data.rates ? (
          <Currency value={value} data={data} onCurrChange={handleCurrChange} />
        ) : (
          <p>Нет данных</p>
        );

      case "converter":
        return <Converter />;

      default:
        return null;
    }
  }

  return (
    <Wrapper>
      <Button onClick={toCurrency}>Курсы валют</Button>
      <Button onClick={toConverter}>Конвертер</Button>

      <div>{switchParts(state)}</div>
    </Wrapper>
  );
}

render(<App />, document.querySelector("#root"));
