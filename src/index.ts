import CommandLineInteface from "./CommandLineInterface";
import GeoNetInterface from "./GeoNetInterface";

const run = () => {
  const [min, max] = [1, 8];
  const CLI = CommandLineInteface();
  const GeoNet = GeoNetInterface();
  console.log("This application provides information earthquakes in NZ \n");
  CLI.promptUserForInt(
    `What is the minimum Modified Mercalli Intensity? (Input: ${min}-${max}, Default: 3)\n`,
    async (input) => {
      const quakes = await GeoNet.fetchQuakes(input);
      const validQuakes = quakes.features.filter(
        (quake) => quake.properties.quality !== "deleted"
      );
      const avgDepth = GeoNet.getAverage(validQuakes, "depth");
      const avgMagnitude = GeoNet.getAverage(validQuakes, "magnitude");

      validQuakes.forEach((quake) => {
        const { time, magnitude, depth, mmi, locality } = quake.properties;
        const currTime = new Date(time);
        console.log(
          `${currTime} \t magnitude: ${
            Math.round(magnitude * 100) / 100
          }   \t depth: ${
            Math.round(depth * 100) / 100
          }  \t  mmi: ${mmi} \t ${locality}`
        );
      });

      console.log(
        `Average Magnitude: \t ${avgMagnitude} | Average Depth: \t ${avgDepth}`
      );
    },
    {
      min,
      max,
    }
  );
};

run();
