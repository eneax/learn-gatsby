import React from 'react';

import useLatestData from '../utils/useLatestData';

import SEO from '../components/seo';

const CurrentlySlicing = () => (
  <div>
    <p>CurrentlySlicing</p>
  </div>
);

const HotSlices = () => (
  <div>
    <p>HotSlices</p>
  </div>
);

const HomePage = () => {
  const { slicemasters, hotSlices } = useLatestData();

  return (
    <>
      <SEO title="Homepage" />

      <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm Every Single Day</p>
        <div>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
