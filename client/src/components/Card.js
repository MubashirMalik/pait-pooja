import './Card.css';

export default function Card({item}) {
  return (
    <div className="Card">
      <div className="Card-inner">
        <div className="Card-inner-left">
          <img src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" alt="ham"/>
        </div>
        <div className="Card-inner-right">
          <div>
            <div className="title">{item.name}</div>
            <div className="desc">This will be the item description.</div>
          </div>
          <div>
            <div className="price">Rs. {item.price}</div>
            <button>Add to Cart</button>
          </div>
        </div>  
      </div>  
    </div>
  );
}