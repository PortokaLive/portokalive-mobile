import React, { useEffect } from "react";
import { Layout } from "@ui-kitten/components";
import { MainTheme } from "../theme";
import { clearActivation } from "../utils/redux/actions/ActionSuccess";
import BottomTabs from "../components/BottomTabs";
import HomePage from "../pages/HomePage";
import LivePage from "../pages/LivePage";
import ProfilePage from "../pages/ProfilePage";
import OtherLivePage from "../pages/OtherLivePage";

export const HomeScreen = (props: any) => {
  useEffect(() => {
    clearActivation();
  }, []);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedLive, setSelectedLive] = React.useState();

  const routes = [
    {
      name: "Home",
      showTab: true,
      component: (
        <HomePage
          {...props}
          navigate={setSelectedIndex}
          setSelectedLive={setSelectedLive}
        />
      ),
    },
    {
      name: "Live",
      showTab: true,
      component: <LivePage {...props} navigate={setSelectedIndex} />,
    },
    {
      name: "Profile",
      showTab: true,
      component: <ProfilePage {...props} />,
    },
    {
      name: "OtherLive",
      showTab: true,
      component: <OtherLivePage {...props} getLive={() => selectedLive} />,
    },
  ];

  return (
    <>
      <Layout style={MainTheme.LayoutTheme.container}>
        {routes[selectedIndex].component}
      </Layout>
      {routes[selectedIndex]?.showTab && (
        <BottomTabs
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </>
  );
};
