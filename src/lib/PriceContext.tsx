"use client";

import { createContext, useContext } from "react";

type PriceInfo = { price: string; isLocal: boolean };

const LOCAL_PRICE = "9.99";
const INTL_PRICE = "19.99";

const PriceContext = createContext<PriceInfo>({ price: INTL_PRICE, isLocal: false });

export function PriceProvider({
  country,
  children,
}: {
  country: string;
  children: React.ReactNode;
}) {
  const isLocal = country === "PK";
  const value: PriceInfo = { price: isLocal ? LOCAL_PRICE : INTL_PRICE, isLocal };
  return <PriceContext.Provider value={value}>{children}</PriceContext.Provider>;
}

export function usePrice() {
  return useContext(PriceContext);
}
