import React,{ useEffect, useState } from "react";
import axios from 'axios';
import Transaction from "./Transaction";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  // const [isRecharge, setIsRecharge] = useState(false);

  useEffect(() => {

    const fetching = async () => await axios.get('http://localhost:3001/operations');
    fetching().then(response => setTransactions(response.data))
    // if(transactions.length) setIsRecharge(true)
  },[])

  // console.log(transactions)
  
  return (
    <div className="flex flex-col bg-gray-200 h-40 w-full ">
      <div>
        <h1 className="font-bold">Transactions</h1>
      </div>
      <div>
        <Transaction data={transactions}/>
      </div>
    </div>
  );
}
