import React, { useState } from "react";

type Props = {};

const MyNonTypeScriptComponent: React.FC<Props> = ({ children }) => {
  const someDeclaration = true;
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>words</p>
      <p>{value}</p>
      <p>{children}</p>
      <button onClick={() => setValue(value + 1)}>click!</button>
    </div>
  );
};

export default MyNonTypeScriptComponent;
