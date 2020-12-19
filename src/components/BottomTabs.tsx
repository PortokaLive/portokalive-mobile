import React from "react";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";

const HomeIcon = (props: any) => <Icon {...props} name="home-outline" />;
const LiveIcon = (props: any) => <Icon {...props} name="video-outline" />;
const ProfileIcon = (props: any) => <Icon {...props} name="person-outline" />;

export default ({ selectedIndex, setSelectedIndex }: any) => {
  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={(index) => setSelectedIndex(index)}
    >
      <BottomNavigationTab icon={HomeIcon} title="Home" />
      <BottomNavigationTab icon={LiveIcon} title="Go Live" />
      <BottomNavigationTab icon={ProfileIcon} title="Profile" />
    </BottomNavigation>
  );
};
