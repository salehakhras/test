import { useState } from "react";
import type { tabsContent } from "../../utils/constants/tabsContent";
import React from "react";

interface TabsProps {
  tabs: Record<string, tabsContent>;
}

const Tabs = ({ tabs }: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    Object.keys(tabs)[0] // first key as default
  );
  return (
    <div role="tablist" className="tabs tabs-border h-full">
      {Object.entries(tabs).map(([key, tab]) => {
        return (
        <React.Fragment key={key}>
            <input
              type="radio"
              name="settings"
              className={`tab hover:text-primary ${selectedTab === key ? "text-primary" : ""}`}
              aria-label={tab.title}
              checked={selectedTab === key}
              onChange={() => setSelectedTab(key)}
            />
            <div className="tab-content rounded-md ">
              {tab.content}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Tabs;
