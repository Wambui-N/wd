'use client';

import React, { useEffect } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Button, ButtonLink } from "../ui/button";

const HeroComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isRegistered = checkUserRegistration();
    if (isRegistered && window.location.pathname === "/login") {
      navigate("/dashboard"); // Redirect to dashboard if already registered
    }
  }, [navigate]);

  return (
    <section className="relative flex h-screen flex-col items-end justify-end bg-hero-bg bg-cover pb-12 pt-24 lg:h-screen">
      <div className="responsive">
        <div className="w-1/2 place-items-start">
          <h1 className="text-2xl">Your Healthcare, Your Voice</h1>
          <p className="text-black">
            Welcome to the Wellness Dialogue Community, a community-driven
            platform that aims to democratize healthcare information. Join a
            supportive community sharing real healthcare experiences. Your story
            matters.
          </p>
          <ButtonLink
            variant="default"
            className="bg-orange text-black hover:bg-orange"
            title="Join the Community"
            href="/dialogues"
          />
        </div>
      </div>
    </section>
  );
};

const checkUserRegistration = () => {
  // Placeholder function to check if the user is registered
  return true; // Simulate that the user is registered
};

const Hero = () => (
  <Router>
    <HeroComponent />
  </Router>
);

export default Hero;
