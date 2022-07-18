import { useState, useEffect } from "react";
import Card from "./Card";

import './CardList.css'

function CardList({items, setCart}) {
  const itemsCard = items.map((item) => <Card key={item._id} item={item} setCart={setCart}/>)
  
  return (
    <div className="CardList">
      <div className="CardList-heading">
        {items[0] ? items[0].category : "Category"}
      </div>
      <div className="CardList-body">{itemsCard}</div>
    </div>
  )
}

export default function CardLists({setCart}) {
  const [allItems, setAllItems] = useState(
    () => JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    async function getItems() {
      const res = await fetch("http://localhost:3001/api/item/get")
      const resData = await res.json()
      
      if (resData.message) {
        console.log(resData.message)
      } else {
        resData.items = resData.items.map((item) => {
          item.quantity = 0;
          return item;
        })
        const grouped = Object.values(resData.items.reduce((acc, item) => {
          acc[item.category] = [...(acc[item.category] || []), item];
          return acc;
        }, {}))
        setAllItems(grouped)
        localStorage.setItem("items", JSON.stringify(grouped))
      } 
    }

    // Only fetch items from database, if user is visiting for the first time
    if (!localStorage.getItem("items")) {
      console.log("Items loaded from the database")
      getItems()
    }
  }, [])

  const itemsCardList = allItems.map(
    (items) => <CardList key={items[0]._id} items={items} setCart={setCart} />
  ) 

  return(
    <div>
      { itemsCardList }
    </div>
  )
}