import { useState } from "react";
import HeadingToggle from "../common/HeadingToggle/HeadingToggle";

export default function Products() {
  const [selectedTab, setSelectedTab] = useState('Books');
  const updateSelectedTab = (value: string) => { setSelectedTab(value) }
  return (
    <>
      <HeadingToggle selectedTab={selectedTab} updateSelectedTab={updateSelectedTab} />
    </>
  )
}
