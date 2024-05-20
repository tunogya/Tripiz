import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useEffect} from "react";
import {initialize} from "../reducers/user/userSlice";

const CheckUser = () => {
  const { address } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("address: ", address)

    if (!address) {
      dispatch(initialize())
    }
  }, [address])

  return null;
}

export default CheckUser;