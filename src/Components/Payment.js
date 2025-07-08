import InnerTabNav from "./InnerTabNav";
import 'bootstrap/dist/css/bootstrap.min.css'
import Paymentform from "./PaymentPage";

const Payment =()=>{
    return(
        <div className="border border-1 rounded-3 mt-0" style={{width:"80%" ,height:"72vh"}}>
            <InnerTabNav/>
            
            <Paymentform/>
            
        </div>
    );
}
export default Payment;