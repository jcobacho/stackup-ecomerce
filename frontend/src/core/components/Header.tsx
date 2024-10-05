
import { useAppSelector } from "../../store";
import WithSubnavigation from "./Navbar";

function Header({openDrawer}) {

    const authState = useAppSelector((state) => state.auth);
    const isAuthenticated = authState.user !== null && authState.token !== null;

    return ( 

        <WithSubnavigation openDrawer={openDrawer} isAuthenticated={isAuthenticated} authState={authState}/>

     );
}

export default Header;