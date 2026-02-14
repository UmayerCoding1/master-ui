import React from 'react';

const GridBoxLayout = () => {
    return (
    <div className="min-h-screen bg-gray-50 p-4">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">

    {/* <!-- Left column - contains div1 + div2 + div4 stacked --> */}
    <div className="md:col-span-2 grid grid-rows-[1fr_1fr_auto] gap-4">

      {/* <!-- Top row: div1 + div2 side by side --> */}
      <div className="grid grid-cols-2 gap-4 h-64 md:h-90">
        <div className="bg-blue-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
          Div1
        </div>
        <div className="bg-teal-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-md">
          div2
        </div>
      </div>

      {/* <!-- Bottom full-width div4 --> */}
      <div className="bg-purple-600 text-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-md h-48 md:h-64">
        div4
      </div>

    </div>

    {/* <!-- Right column - div3 takes full height --> */}
    <div className="bg-amber-500 text-white rounded-xl flex items-center justify-center text-3xl font-bold shadow-md min-h-[300px] md:min-h-full">
      div3s
    </div>

  </div>
</div>


    );
};

export default GridBoxLayout;