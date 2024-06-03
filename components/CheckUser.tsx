import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {memo, useEffect} from "react";
import {initialize} from "../reducers/account/accountSlice";

const CheckUser = () => {
  const { publicKey, privateKey } = useSelector((state: RootState) => state.account)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!publicKey || !privateKey) {
      dispatch(initialize())
    }
  }, []);

  return null;
}

export default memo(CheckUser);