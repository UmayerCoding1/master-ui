import React from "react";

const GridCard = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-[400px] h-[400px] border border-neutral-400 rounded-lg p-4">
        {/* grid container */}
        <div className="grid grid-cols-5 grid-rows-4 gap-3 h-full">
          {Array.from({ length: 20 }).map((_, i) => {
            const boxNumber = i + 1;

            const isContactLink = [3,7,9,12].includes(boxNumber);
            const isVisible = [2,4].includes(boxNumber);
            

            return (
              <div
                key={i}
                // className={}
              >
                Box {boxNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GridCard;
