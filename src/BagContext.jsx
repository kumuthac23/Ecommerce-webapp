import React, { useContext } from "react";
import { useState, createContext, useEffect } from "react";
export const MyBagContext = createContext();

function BagProvider({ children }) {
  const [mybagCount, setMybagCount] = useState(0);

  const updateMyBagCount = () => {
    const products = localStorage.getItem("items");
    const parsedArray = JSON.parse(products);
    const arrayCount = parsedArray.length;

    var lengthAsNumber = parseInt(arrayCount);
    if (!isNaN(lengthAsNumber)) {
      setMybagCount(lengthAsNumber);
    } else {
      setMybagCount(0);
    }
  };

  useEffect(() => {
    updateMyBagCount();
  }, []);

  const setMyBagCountValue = () => {
    updateMyBagCount();
  };

  return (
    <MyBagContext.Provider
      value={{ mybagCount, setMyBagCountValue }}
    >{children}</MyBagContext.Provider>
  );
}
export function useMyBag() {
  const context = useContext(MyBagContext);
  return context
}

export default BagProvider;
