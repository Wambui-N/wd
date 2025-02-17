import React from "react";
import { Button } from "../ui/button";

const cta = () => {
  return (
    <section className="responsive my-6">
      <div className="flex max-w-xl flex-col items-center">
        <h3 className="text-center font-semibold">
          Want to share your story? Join our community and inspire others.
        </h3>
        <Button
            variant="default"
            className="bg-[#020c12] text-white hover:bg-[#020c12]"
            title="Submit Your Story"
          />
      </div>
    </section>
  );
};

export default cta;
