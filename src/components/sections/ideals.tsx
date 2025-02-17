import React from "react";
import DetailCard from "../ui/detailCard";

const ourIdeals = [
  {
    ideal: "The Patient’s Perspective",
    content:
      "The platform chronicles the healthcare experience through the eyes of the patient – who is the focal point of healthcare services.",
  },
  {
    ideal: "Advancing Awareness",
    content:
      "Patients have a forum to share likes and dislikes, advising fellow patients on which practitioners and hospitals to avoid.",
  },
  {
    ideal: "Empowered Community",
    content:
      "Our ultimate aim is to create an empowered healing community that collectively lobbies for better healthcare by condemning poor services and celebrating good ones.",
  },
  {
    ideal: "Welcomes Humor",
    content:
      "Laughter remains the best medicine. We aim to create a platform for sharing humor from our diverse experiences in the wellness journey.",
  },
  {
    ideal: "Respect and Ethics",
    content:
      "We shall mention, celebrate, and fault healthcare providers with honor and respect. Our forum upholds ethics and legality and will never support malicious slander or ridicule of medical professionals and institutions.",
  },
];

const ideals = () => {
  return (
    <section className="responsive my-6">
      <h2>Ideals that drive us</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {ourIdeals.map((ideal, index) => (
          <DetailCard key={index} title={ideal.ideal} text={ideal.content} />
        ))}
      </div>
    </section>
  );
};

export default ideals;
