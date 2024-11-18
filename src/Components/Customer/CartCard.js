export function CartCard(props) {
  return (
    <>
      <div className="cart-card d-flex justify-content-start">
        {props.src ? (
          <img
            key={props.src}
            className="cartCardImg"
            src={`http://127.0.0.1:8000/storage/${props.src}`}
            width={100}
          />
        ) : (
          <></>
        )}

        {/* <img src={props.src} alt={props.pokemon}  width={100}/> */}
        <div className="cart-details">
          <h5>{props.title}</h5>
          {props.description ? (
            <p className="text-black-50 para">{props.description}</p>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between align-items-center">
            <p className="price"> OMR {props.price}</p>
            <span className="d-flex justify-content-between">
              <button className="btn inc" onClick={props.increase}>
                <i class="bi bi-plus-circle"></i>
              </button>
              <div className="align-self-center">{props.quant}</div>
              <button className="btn dec" onClick={props.decrease}>
                <i class="bi bi-dash-circle"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
