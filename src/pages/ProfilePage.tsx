import React from "react";
import { Button } from "@ui-kitten/components";
import { logoutUser } from "../utils/redux/actions/ActionAuth";

export default ({ navigation }:any) => (
  <>
    <Button onPress={() => logoutUser(navigation)}>Logout</Button>
  </>
);
