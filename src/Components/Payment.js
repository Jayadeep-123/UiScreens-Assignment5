import InnerTabNav from "./InnerTabNav";
import 'bootstrap/dist/css/bootstrap.min.css';
import Paymentform from "./PaymentPage";

const Payment = () => {
  return (
    <div
      className="border border-1 rounded-3 mt-0"
      style={{
        width: "80%",
        height: "70vh",          // fixed height at 75% of viewport
        overflowY: "auto"        // vertical scroll when content overflows
      }}
    >
      <InnerTabNav />
      <Paymentform />
    </div>
  );
}

export default Payment;
