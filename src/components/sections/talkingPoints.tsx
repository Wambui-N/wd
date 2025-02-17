import React from "react";

const points = [
  {
    point: "Awareness",
    text: "Share your experiences with excellent doctors and clinics.",
  },
  {
    point: "Experiences",
    text: "The good, the bad, and the ugly—every story matters.",
  },
  {
    point: "Appreciation",
    text: "Celebrate healthcare workers who embody empathy and excellence.",
  },
  {
    point: "Service Gaps",
    text: "Highlight unmet needs to inspire improvement.",
  },
  {
    point: "Humor",
    text: "Because laughter truly is the best medicine.",
  },
];

const talkingPoints = () => {
  return (
    <section className="responsive my-6 space-y-4">
      <h1 className="font-semibold normal-case">
        We invite contributions from all walks of life to share your stories,
        insights, and reflections on the wellness journey:
      </h1>
      <div className=" gap-x-8 gap-y-4">
        {points.map((item, index) => (
            <div key={index} className="flex gap-4">
                <h3 className="normal-case basis-1/3">{item.point}:</h3>
                <p className="basis-2/3">{item.text}</p>
            </div>
        ))}
      </div>
    </section>
  );
};

export default talkingPoints;
