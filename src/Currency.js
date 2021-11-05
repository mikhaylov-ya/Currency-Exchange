import React from "react";
import styled from "styled-components";

// Стили
const Par = styled.p`
  font: 1.05rem Montserrat, sans-serif;
  margin: 1.5rem 0;
`;

const ValueName = styled.h2`
  font: 1.6rem Montserrat, sans-serif, bold;
`;

const Currency = ({ value, data, onCurrChange }) => {
  const usd = Number(data.rates.USD, 10);
  const eur = Number(data.rates.EUR, 10);
  const rub = Number(data.rates.RUB, 10);
  const btc = Number(data.rates.BTC, 10);

  function currentValue() {
    if (value === "USD") {
      return (
        <>
          <ValueName>{value}</ValueName>
          <Par>1 RUB = {(1 / rub).toFixed(3)}</Par>
          <Par>1 EUR = {(1 / eur).toFixed(3)}</Par>
          <Par>1 BTC = {(1 / btc).toFixed(3)}</Par>
        </>
      );
    } else if (value === "RUB") {
      return (
        <>
          <ValueName>{value}</ValueName>
          <Par>1 USD = {(1 / usd).toFixed(3)}</Par>
          <Par>1 EUR = {(1 / eur).toFixed(3)}</Par>
          <Par>1 BTC = {(1 / btc).toFixed(3)}</Par>
        </>
      );
    } else if (value === "EUR") {
      return (
        <>
          <ValueName>{value}</ValueName>
          <Par>1 USD = {(1 / usd).toFixed(3)}</Par>
          <Par>1 RUB = {(1 / rub).toFixed(3)}</Par>
          <Par>1 BTC = {(1 / btc).toFixed(3)}</Par>
        </>
      );
    }
  }

  return (
    <>
      <select onChange={onCurrChange} defaultValue={value}>
        <option value="USD">USD</option>
        <option value="RUB">RUB</option>
        <option value="EUR">EUR</option>
      </select>
      {currentValue()}
    </>
  );
};

export default Currency;
