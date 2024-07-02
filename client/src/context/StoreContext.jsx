import { createContext,  useEffect,  useState  } from "react";
// import { vehicle_list } from "../assets/assets";
import axios from 'axios';
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    const url ="http://localhost:3005"
    const [token,setToken] = useState("");
    const [vehicle_list,setVehicleList] = useState([]);

    const fetchVehicleList = async () =>{
        const response = await axios.get(url+"/api/car/list");
        setVehicleList(response.data.data)
    }

    useEffect(()=>{
        async function loadData(){
            await fetchVehicleList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token")); 
            }
        }
        loadData();
    },[])

    const contextValue = {
        vehicle_list,
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider