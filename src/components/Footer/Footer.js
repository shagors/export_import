import React from "react";
import { BsLinkedin, BsWechat, BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer py-10 bg-slate-200 mt-auto px-8">
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Social</span>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://bd.linkedin.com/company/thtuepz"
              className="cursor-pointer"
              target="_blank">
              <BsLinkedin className="w-7 h-7 rounded" />
            </a>
            <a
              href="https://www.facebook.com/thtUEPZ/"
              className="cursor-pointer"
              target="_blank">
              <FaFacebookSquare className="w-7 h-7 rounded" />
            </a>
            <a>
              <BsWechat className="w-7 h-7 rounded" />
            </a>
          </div>
          <p className=" mt-5 font-semibold text-lg">
            &copy; 2023. All rights and reserved by THT-space electrical company
            Ltd.
            <div className="flex gap-2">
              <BsFillTelephoneFill />
              09638-322304
            </div>
            <div className="flex gap-2">
              <AiOutlineMail className="w-7 h-7 rounded" />
              thtuepz@gmail.com
            </div>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
