import { useState } from "react";
import HeadingToggle from "../common/HeadingToggle/HeadingToggle";
import { Books } from "../Books/Books";
import "./Products.scss"
import homeLogo from '../assets/books-logo.svg'
import { Link } from "react-router-dom";

export default function Products() {
  const [selectedTab, setSelectedTab] = useState('Books');
  const updateSelectedTab = (value: string) => { setSelectedTab(value) }
  return (
    <div className="product-wrapper">
      <Link to={"/"}><img className="logo" src={homeLogo} alt="" /></Link>
      <HeadingToggle selectedTab={selectedTab} updateSelectedTab={updateSelectedTab} />
      {selectedTab === "Books" && <Books />}
      {/* {selectedTab === "Authors" && <ProductAuthors />} */}
    </div>
  )
}

