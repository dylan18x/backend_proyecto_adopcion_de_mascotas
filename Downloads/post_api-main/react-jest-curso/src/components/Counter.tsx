import React, { useState } from "react";

type Props = {
  initial?: number;
};

export default function Counter({ initial = 0 }: Props) {
  const [count, setCount] = useState(initial);

  return (
    <div>
      <h3>Counter</h3>

      <div aria-label="count-value">{count}</div>

      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
      <button onClick={() => setCount(initial)}>Reset</button>
    </div>
  );
}