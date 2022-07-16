import './Card.css';

export default function Card(props) {
  return (
    <div className="Card">
      <div className="Card-inner">
        <div className="Card-inner-left">
          <img src="https://img.freepik.com/premium-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?w=2000" alt="ham"/>
        </div>
        <div className="Card-inner-right">
          <div>
            <div className="title">Musalli Cheese</div>
            <div className="desc">Talli cheese lroeum isumafjsdbgkjhjsdf</div>
          </div>
          <div>
            <div className="price">Rs. 100</div>
            <button>Add to Cart</button>
          </div>
        </div>  
      </div>  
    </div>
  );
}