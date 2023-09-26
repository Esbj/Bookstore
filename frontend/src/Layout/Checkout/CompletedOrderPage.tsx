import { useParams, useNavigate } from "react-router-dom";
import { OrderContext } from "../../OrderContext";
OrderContext;
import CssBaseline from "@mui/material/CssBaseline";
import "./CheckoutPages.scss";
import Button from "@mui/material/Button";

export default function CompletedOrderPage() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <CssBaseline>
        <div className="container">
          <h2 className="heading">Thank you for your order!</h2>
          <h3>Your order number: {orderId}</h3>
          <Button variant="contained" onClick={handleClick}>
            Return to homepage
          </Button>
        </div>
      </CssBaseline>
    </>
  );
}
