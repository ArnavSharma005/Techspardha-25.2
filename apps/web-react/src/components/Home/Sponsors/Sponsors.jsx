import React, { useEffect, useState, forwardRef } from 'react';
import bgImg from '../../../assets/photos/Sponsors/Container.png';

import sponsor1 from '../../../assets/photos/Sponsors/sponsor1.png';
import sponsor2 from '../../../assets/photos/Sponsors/sponsor2.png';
import sponsor3 from '../../../assets/photos/Sponsors/sponsor3.png';
import sponsor4 from '../../../assets/photos/Sponsors/sponsor4.png';
import sponsor5 from '../../../assets/photos/Sponsors/sponsor5.png';
import sponsor6 from '../../../assets/photos/Sponsors/sponsor6.png';

const cycleMs = 4000;

const Sponsors = forwardRef(({ ...props }, ref) => {
  const sponsorImages = [sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6];

  const groups = [];
  const totalGroups = 3;
  for (let g = 0; g < totalGroups; g++) {
    const start = (g * 3) % sponsorImages.length;
    const rotated = sponsorImages.slice(start).concat(sponsorImages.slice(0, start));
    groups.push(rotated.slice(0, 6));
  }

  const [groupIndex, setGroupIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setGroupIndex(i => (i + 1) % groups.length);
    }, cycleMs);
    return () => clearInterval(id);
  }, [groups.length]);

  const activeGroup = groups[groupIndex];

  return (
    <div
      ref={ref}
      id="sponsors"
      data-section="sponsors"
      className="w-full h-[50vh] md:h-screen bg-customBlack flex items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url(${bgImg})` }}
      {...props}
    >
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary mb-16 font-gta tracking-wide">
          OUR SPONSORS
        </h1>

        <div className="grid grid-cols-3 gap-x-4 md:gap-x-20 gap-y-14 justify-center items-center  md:px-0">
            {activeGroup.map((src, i) => (
              <div
                key={groupIndex + '-' + i}
                className="group flex items-center justify-center animate-rushToScreen will-change-[transform,filter,opacity] min-h-16 min-w-[120px] md:min-h-20 md:min-w-[160px]"
              >
                <img
                  src={src}
                  alt={`Sponsor ${i + 1}`}
                  draggable="false"
                  className="w-24 h-14 md:w-48 md:h-24 object-contain brightness-110 transition-transform duration-[220ms] ease-smoothLift group-hover:-translate-y-1.5 group-hover:scale-[1.04] group-hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)] [backface-visibility:hidden] will-change-transform will-change-filter origin-center [image-rendering:optimizeQuality]"
                />
              </div>
            ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[80vw] max-w-[900px] aspect-square"
        style={{
          background:
            'radial-gradient(circle at 100% 100%, rgba(255,110,30,0.55) 0%, rgba(255,110,30,0.30) 35%, rgba(255,110,30,0.12) 55%, rgba(255,110,30,0.04) 70%, transparent 80%)',
          filter: 'blur(390px)'
        }}
      />
    </div>
  );
});

Sponsors.displayName = 'Sponsors';

export default Sponsors;