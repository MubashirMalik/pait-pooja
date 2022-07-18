import { useState } from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './CheckOut.css'

export default function Checkout({cart, setCart, grandTotal}) {
  const [formData, setFormData] = useState({
    specialInstructions: ""
  })

  function handleChange(event) {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  function removeFromCart(item) {
    setCart((prevCart) => prevCart.filter(i => i._id !== item._id))
  }
   
  function incrementCart(item) {
    setCart((prevCart) => {
      // Save existing item
      let existingItem = prevCart.find(i => i._id === item._id);
      // Filter prevCart, without the existing item
      let newCart = prevCart.filter(i => i._id !== item._id);
      // Return new Array with updated existing item
      return [...newCart, {...existingItem, quantity: existingItem.quantity + 1}]
    })
  }

  function decrementCart(item) {
    setCart((prevCart) => {
      // Save existing item
      let existingItem = prevCart.find(i => i._id === item._id);
      if (existingItem.quantity !== 1) {
        // Filter prevCart, without the existing item
        let newCart = prevCart.filter(i => i._id !== item._id);
        // Return new Array with updated existing item
        return [...newCart, {...existingItem, quantity: existingItem.quantity - 1}]
      } else {
        return prevCart.filter(i => i._id !== item._id)
      }
    })
  }

  function placeOrder(event) {
    event.preventDefault()
    if (cart.length === 0) {
      toast.error('Your cart is empty!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success('🤤 Order Placed!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } 
  }

  const displayCart = cart.map((item) => 
    <div className="details" key={item._id}>
      <div className="r1">
        <div>
          <AddCircleIcon style={{cursor: "pointer"}} onClick={() => incrementCart(item)} />
          <span>{ item.name }</span>
        </div>
        <DeleteIcon style={{cursor: "pointer"}} onClick={() => removeFromCart(item)}/>
      </div>
      <div className="r2">
        <span>{ item.quantity }{ " "}</span>
        <span>This is the description</span>
      </div>
      <div className="r3">
        <RemoveCircleIcon style={{cursor: "pointer"}} onClick={() => decrementCart(item)} />
        <span>Rs. { item.price }</span>
      </div>
    </div>
  )

  return(
    <div className="Form-container">
      <div className="SignUp">
        <div>
          <h1>Your Cart [Invoice]</h1>
          <svg className="cl-ao cl_af" viewBox="0 0 223 17" fill="none">
            <path opacity="0.5" d="M2 11.3686C17.6603 8.02778 33.9464 6.93097 49.9106 6.13771C76.6733 4.80789 103.638 4.48984 130.396 6.01883C154.367 7.38859 178.015 10.6844 201.964 7.92099C208.097 7.21339 216.371 7.08879 222.413 7.08879" stroke="#E7A4D0" strokeWidth="10" strokeLinejoin="round"></path>
          </svg>
        </div>
        <div className="Invoice">
          <h3>Your Cart</h3>
          <h4>Order Items</h4>
          {displayCart}
          <h4>Order Summary</h4>
          <div className="details">
            <div className="r1">
              <span>Grand Total</span>
              <span>{ grandTotal }</span>
            </div>
          </div>
        </div>
        <div>
          <h1>Checkout</h1>
          <svg className="cl-ao cl_af" viewBox="0 0 223 17" fill="none">
            <path opacity="0.5" d="M2 11.3686C17.6603 8.02778 33.9464 6.93097 49.9106 6.13771C76.6733 4.80789 103.638 4.48984 130.396 6.01883C154.367 7.38859 178.015 10.6844 201.964 7.92099C208.097 7.21339 216.371 7.08879 222.413 7.08879" stroke="#E7A4D0" strokeWidth="10" strokeLinejoin="round"></path>
          </svg>
        </div>
        <form>
          <textarea rows="7"
            name="specialInstructions"
            value={formData.specialInstructions}
            onChange={handleChange}
            autoComplete="true"
            placeholder="Add any comments, e.g., No ketchup, Add more cheese"
          />
          <input type="text" value="Payment Method: Cash" disabled />
          <input type="text" value="Delivery Type: Pick Up/Takeaway" disabled />
          <button onClick={placeOrder}>Checkout</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  )
}