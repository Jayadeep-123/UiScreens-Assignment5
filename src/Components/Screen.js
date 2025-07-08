import 'bootstrap/dist/css/bootstrap.min.css'
import MainNavbar from './MainNavBar';
import InnerHeading from './InnerHeading';
import Payment from './Payment';
const Screen = () =>{
    return(
        <div className=' w-100'>
            <MainNavbar/>
            <InnerHeading/>
            <div className='mt-4'>
            <Payment/>
            </div>
        </div>
       
    );
}
export default Screen;