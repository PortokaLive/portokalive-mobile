import React, { useEffect } from "react";
import { Layout } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { clearActivation } from "../utils/redux/actions/ActionSuccess";
import BottomTabs from "../components/BottomTabs";
import HomePage from "../pages/HomePage";
import LivePage from "../pages/LivePage";
import ProfilePage from "../pages/ProfilePage";

export const HomeScreen = (props: any) => {
  useEffect(() => {
    clearActivation();
  }, []);

  const routes = [
    {
      name: "Home",
      showTab: true,
      component: <HomePage {...props} />,
    },
    {
      name: "Live",
      showTab: false,
      component: <LivePage {...props} />,
    },
    {
      name: "Profile",
      showTab: true,
      component: <ProfilePage {...props} />,
    },
  ];

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <>
      <Layout style={MainTheme.LayoutTheme.container}>
        {routes[selectedIndex].component}
      </Layout>
      {
        <BottomTabs
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      }
    </>
  );
};
