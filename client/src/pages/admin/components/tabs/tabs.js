// base
import React, { useState } from "react";

// external components
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// custom components
import { TabUsers, TabCards, TabCollections } from "./components";

const TabsView = () => {
  const tabsList = [
    {
      label: "Users",
      component: <TabUsers />
    },

    {
      label: "Cards",
      component: <TabCards />
    },
    {
      label: "Collections",
      component: <TabCollections />
    }
  ];

  const [tab, setTab] = useState(0);

  const handleTab = (e, value) => {
    setTab(value);
  };

  return (
    <>
      <Tabs value={tab} onChange={handleTab}>
        {tabsList.map((tab, i) => (
          <Tab key={i} label={tab.label} />
        ))}
      </Tabs>
      {tabsList[tab].component}
    </>
  );
};

export default TabsView;
