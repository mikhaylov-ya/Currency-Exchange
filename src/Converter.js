import React, { useState } from "react";
import styled from "styled-components";

// Стили
const Wrapper = styled.form`
  display: flex;
  flex-flow: column nowrap;
  width: 40vw;
  gap: 0.5rem;
  margin: auto;
`;

const Label = styled.p`
  font: 1.2rem Montserrat, sans-serif;
  line-height: 1.3rem;
  flex-basis: 1;
`;

const Button = styled.button`
  border-radius: 8px;
  border: 0.5px navy rigid;
  padding: 0.5rem 0;
  width: 60%;
  align-self: center;
  background-color: palegoldenrod;
  font: calc(0.3rem + 1vw) Georgia;
`;

const Input = styled.input`
  width: 80%;
  align-self: center;
  line-height: 1.5rem;
  font: 1rem Georgia, serif;
`;

const Result = styled.p`
  font: 2rem Georgia, serif;
`;

const Converter = () => {
  const [string, setString] = useState("");
  const [result, setResult] = useState("");

  // * Логика - расшифровываем инпут, делаем запрос к Coindesk
  // * и сохраняем результат;
  // * input в формате 15 usd in rub - обязательно "in"

  function toCurr(str) {
    const currs = str.split(" ");
    const amount = currs[0];
    const from = currs[1].toUpperCase();
    const to = currs[3].toUpperCase();
    (async () => {
      const response = await fetch(
        `https://api.coinbase.com/v2/exchange-rates?currency=${from}`
      );
      const curr = await response.json();
      if (curr.data === undefined) {
        setResult(`What is ${from}?`);
      } else if (curr.data.rates[to] === undefined) {
        setResult(`What is ${to}?`);
      } else {
        const sum = (curr.data.rates[to] * amount).toFixed(3);
        setResult(`${sum} ${to}`);
      }
    })();
  }

  function handleInput(e) {
    e.preventDefault();
    console.log(string);
    toCurr(string);
  }

  return (
    <>
      <Wrapper onSubmit={handleInput}>
        <Label>Конвертация</Label>
        <Input
          type="text"
          id="conv"
          value={string}
          onChange={(e) => setString(e.target.value)}
        />
        {/*блокируем кнопку если нет инпута
        или если инпут в неверном формате
        */}
        <Button
          type="submit"
          disabled={
            !string ||
            isNaN(parseInt(string, 10)) ||
            string.split(" ").length < 4
          }
        >
          Конвертировать
        </Button>
      </Wrapper>
      <Result>{result}</Result>
    </>
  );
};

export default Converter;
