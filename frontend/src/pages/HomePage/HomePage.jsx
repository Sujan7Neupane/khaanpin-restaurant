import React, { useEffect, useState } from "react";
import "../HomePage/HomePage.css";

import {
  BottomBar,
  DishList,
  Hero,
  Menu,
  MobileDownload,
  Search,
  Whatsapp,
} from "../../components/index";

const HomePage = () => {
  const [category, setCategory] = useState("All");

  // for the bottom bar and whatsapp position issue
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBar(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // for the bottom bar and whatsapp position issue

  return (
    <div>
      <Search />
      <Hero showBar={showBar} />
      <Whatsapp showBar={showBar} />
      <BottomBar showBar={showBar} />
      <Menu category={category} setCategory={setCategory} />
      <DishList category={category} />
      <MobileDownload />
    </div>
  );
};

export default HomePage;
