import { createContext,  useEffect,  useState  } from "react";
// import { vehicle_list } from "../assets/assets";
import axios from 'axios';
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const url ="http://localhost:4001"
    const [token,setToken] = useState("");
    const [vehicle_list,setVehicleList] = useState([]);
    const [bookingList, setBookingList] = useState([]);

    const fetchVehicleList = async () =>{
        const response = await axios.get(url+"/api/car/listactive-car");
        setVehicleList(response.data.data)
    };

    const fetchBookingList = async () => {
        const response = await axios.get(url + "/api/book/listbooking");
        const bookingData = response.data.data.map(booking => ({
          carItemId: booking.caritem.id,
          pickupDate: booking.pickupdate,
          dropoffDate: booking.dropoffdate,
          status:booking.status,
        }));
        setBookingList(bookingData);
      };

    useEffect(()=>{
        async function loadData(){
            await fetchVehicleList();
            await fetchBookingList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
        }
        loadData();
    },[])

    const contextValue = {
        vehicle_list,
        bookingList,
        url,
        token,
        setToken,
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider