import { useState, useEffect } from 'react';

const useLatestData = () => {
  // hot slices and slicemasters
  const [hotSlices, setHotSlices] = useState();
  const [slicemasters, setSlicemasters] = useState();

  // Use a side effect to fetch the data from the graphql endpoint
  useEffect(() => {
    // when the component loads, fetch the data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                name
              }
              hotSlices {
                name
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: check for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
  }, []);

  return {
    hotSlices,
    slicemasters,
  };
};

export default useLatestData;
