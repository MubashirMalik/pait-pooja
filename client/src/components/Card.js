import { useEffect, useState, memo } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Card.css';

function Card({item, setCart}) {
  const [imageURL, setImageURL] = useState("")
    
  useEffect(() => {
    import(`../assets/images/${item._id}.jpg`).then((module) => {
      setImageURL(module.default);
    });
  })

  function addToCart() {
    setCart((prevCart) => {
     let existingItemIndex = prevCart.findIndex(i => i._id === item._id);
     if (existingItemIndex !== -1) {
      // Save existing item
      let existingItem = prevCart.find(i => i._id === item._id);
      // Filter prevCart, without the existing item
      let newCart = prevCart.filter(i => i._id !== item._id);
      // Return new Array with updated existing item
      return [...newCart, {...existingItem, quantity: existingItem.quantity + 1}]
     } else {
      return [...prevCart, {...item, quantity: 1}]
     } 
    })

    toast.success('🤤 Added to cart!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="Card">
      <div className="Card-inner">
        <div className="Card-inner-left">
          <img src={imageURL} alt={item.name}/>
        </div>
        <div className="Card-inner-right">
          <div>
            <div className="title">{item.name}</div>
            <div className="desc">This will be the item description.</div>
          </div>
          <div>
            <div className="price">Rs. {item.price}</div>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>  
      </div>
      <ToastContainer />  
    </div>
  );
}

export default memo(Card);