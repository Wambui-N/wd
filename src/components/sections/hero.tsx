import React from "react";
import { Button } from "../ui/button";

const hero = () => {
  return (
    <section className="bg-hero-bg relative flex h-screen flex-col items-end justify-end bg-cover pb-12 pt-24 lg:h-screen">
      <div className="responsive">
        <div className="w-1/2 place-items-start">
          <h1 className="text-2xl">Your Healthcare, Your Voice</h1>
          <p className="text-black">
            Welcome to the Wellness Dialogue Community, a community-driven
            platform that aims to democratize healthcare information. Join a
            supportive community sharing real healthcare experiences. Your story
            matters.
          </p>
          <Button
            variant="default"
            className="bg-orange text-black hover:bg-orange"
            title="Join the Community"
          />
        </div>
      </div>
    </section>
  );
};

export default hero;
