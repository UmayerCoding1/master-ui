import React from 'react';

const GridLayout = () => {
    return (
       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

  {/* Grid layout */}
  <div
    className="absolute inset-0 dark:opacity-40"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(0, 0, 0, 0.3) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
  />

  {/* Fade effect (BOTTOM → TOP) */}
  <div className="absolute inset-0 bg-linear-to-t from-white via-white/70 to-transparent pointer-events-none" />

  {/* Content */}
  <div className="relative z-10 text-center px-4">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
      Build Modern Web Apps
    </h1>
    <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
      MERN Stack Developer focused on clean UI & scalable backend
    </p>
  </div>

</section>

    );
};

export default GridLayout;