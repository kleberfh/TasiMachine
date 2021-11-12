import React from "react";
import Home from "./pages/Home";
import {useRecoilValue} from "recoil";
import {userState} from "./recoil/atoms/user";
import {get} from "lodash";
import Machine from "./pages/Machine";

const Index = () => {
  const user = useRecoilValue(userState);

  if (get(user, 'name', null)) {
    return <Machine />
  }

  return (
    <Home />
  )
}

export default Index;