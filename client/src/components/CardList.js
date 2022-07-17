import { useState, useEffect } from "react";
import Card from "./Card";

import './CardList.css'

export default function CardList() {
  const [items, setItems] = useState([]); 

  useEffect(() => {
    async function getItems() {
      const res = await fetch("http://localhost:3001/api/item/get")
      const resData = await res.json()
      resData.message ? console.log(resData.message) : setItems(resData.items)
    }
    getItems()
  }, [])

  const itemsCard = items.map((item) => <Card key={item._id} item={item} />)
  
  return (
    <div className="CardList">{itemsCard}</div>
  )
}