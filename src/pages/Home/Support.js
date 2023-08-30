import React from "react";
import {
  HiOutlinePhone,
  HiArrowSmRight,
  HiChip,
  HiSupport,
} from "react-icons/hi";
import support from "../../assets/support.jpg";

const Support = () => {
  return (
    <div className="w-full h-screen mt-24 mb-11">
      <div className="w-full h-[600px] bg-gray-900/90 absolute">
        <img
          src={support}
          alt="Support Team"
          className="w-full h-full object-cover mix-blend-overlay"
        />
      </div>
      <div className="max-w-[1240px]">
        <div className="">
          <h2>Support</h2>
          <p>
            We are always support our customer with big support team and we
            always wait for our customer's Call
          </p>
        </div>
        <div>
          <div>
            <div>
              <HiOutlinePhone />
              <h3>Support</h3>
              <p>
                After-sales support involves assisting customers post-purchase.
                It includes services like technical help, repairs, and
                addressing concerns. Effective support boosts customer
                satisfaction, trust, and loyalty, strengthening brand reputation
                and fostering lasting relationships.
              </p>
            </div>

            <div>
              <div>
                <HiSupport />
                <h3>Sales</h3>
                <p>
                  After-sales support involves assisting customers
                  post-purchase. It includes services like technical help,
                  repairs, and addressing concerns. Effective support boosts
                  customer satisfaction, trust, and loyalty, strengthening brand
                  reputation and fostering lasting relationships.
                </p>
              </div>
              <div>
                <p>
                  Contact Us <HiArrowSmRight />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
