import { useState } from "react";
import HeadingToggle from "../../common/HeadingToggle/HeadingToggle";
import { Books } from "../Books/Books";
import "./Products.scss"
import Authors from "../Authors/Authors";
import Logo from "../../common/Logo";


export default function Products() {
  const [selectedTab, setSelectedTab] = useState('Books');
  const updateSelectedTab = (value: string) => { setSelectedTab(value) }
  return (
    <div className="product-wrapper">
      <Logo />
      <HeadingToggle tab1="Books" tab2="Authors" selectedTab={selectedTab} updateSelectedTab={updateSelectedTab} />
      {selectedTab === "Books" && <Books />}
      {selectedTab === "Authors" && <Authors />}
    </div>
  )
}

