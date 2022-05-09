import React from "react";
import { mintStartTime } from "../lib/config";

import MintModule from "../components/Mint/MintModule";
import Layout from "../components/Layout/Layout";
import Logo from "../components/Logo/Logo";
import CountDown from "../components/Count/CountDown";

const IndexPage = () => {
  return (
    <>
      <Layout title="Anim4rt - Mint">
        <div className="hero h-full text-white bg-hero-pattern">
          <div className="flex flex-col align-center justify-center gap-1 w-4/5 md:w-1/3 md:max-w-screen-sm">
            <Logo />
            {mintStartTime > Date.now() ? (
              <CountDown endTime={mintStartTime} />
            ) : (
              <MintModule />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;
