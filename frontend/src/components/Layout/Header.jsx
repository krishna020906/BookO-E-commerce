import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="data:image/png;base64,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"
                alt=""
                
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#8B3DFF] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            >/</AiOutlineSearch>
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#8A3CFE] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#000] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#000] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="data:image/png;base64,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"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#8B3DFF] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#8B3DFF] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
