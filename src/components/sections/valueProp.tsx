import React from "react";
import DetailCard from "../ui/detailCard";

const values = [
  {
    title: "Authentic Patient Stories",
    text: "Gain valuable insights from real people who’ve walked your path. No filters, just honest experiences.",
  },
  {
    title: "Community Support",
    text: "Join a network of individuals who understand and share your journey, fostering connection and solidarity.",
  },
  {
    title: "Accessible Healthcare Insights",
    text: "Explore curated resources and practical advice to navigate your healthcare challenges with confidence.",
  },
  {
    title: "Ethical Information Sharing",
    text: "Your privacy is our priority. Share and engage in a space built on trust and respect.",
  },
];

const valueProp = () => {
  return (
    <section className="responsive my-6 space-y-4">
      <h1 className="font-semibold normal-case">
        Wellness Dialogues connects you to authentic patient experiences,
        empowering you to make informed healthcare decisions in a supportive and
        ethical community.
      </h1>
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {values.map((item, index) => (
          <DetailCard key={index} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
};

export default valueProp;
