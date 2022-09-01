import React from "react";

export default function Transaction({ data }) {
  // console.log(data[0]?.concept)
  if (data.length === 0) {
    return (
      <div>
        <h1 className="text-2xl text-white">No hay transacciones</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 flex-col ">
      {data?.map((trans, i) => (
      <div key={i} className="">
        <div className="flex justify-between">
          <h1>{trans.concept}</h1>
          <h1>{trans.amount}</h1>
        </div>
        <div>{trans.type}</div>
      </div>
    ))}
    </div>
  );
}
