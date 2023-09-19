import { useState } from "react";
import HeadingToggle from "../../common/HeadingToggle/HeadingToggle";
import { ProductBooks } from "../../Products/ProductBooks";

export default function Products() {
    const [selectedTab, setSElectedTab] = useState("Books")
    const updateSelectedTab = (value: string) => {
        setSElectedTab(value)
    }
    return (
        <>
            <HeadingToggle selectedTab={selectedTab} updateSelectedTab={updateSelectedTab} />
            {selectedTab === "Books" && <ProductBooks />}
        </>
    );
}
