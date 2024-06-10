import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#8A3CFE] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#000]">Subscribe</span> us for get news{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[] hover:bg-black duration-300 px-5 py-2.5 rounded-md text-whie md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 sm:gird-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="data:image/png;base64,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 "
            alt=""
            
          />
          <br />
          <p>Reading Is Essential For Those Who Seek To Rise Above The Ordinary - Jim Rohn</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link,index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 bookO. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
