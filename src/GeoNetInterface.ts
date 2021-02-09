import fetch from "node-fetch";

interface Properties {
  publicID: string;
  time: string;
  depth: number;
  magnitude: number;
  mmi: number;
  locality: string;
  quality: string;
}

interface Feature {
  geometry: { coordiantes: [number, number] };
  properties: Properties;
}

interface GeoJSON {
  features: Feature[];
}

interface GeoNet {
  fetchQuakes: (MMI: number) => Promise<GeoJSON>;
  getAverage: (quakes: Feature[], property: "depth" | "magnitude") => number;
}

export default function GeoNetInterface(): GeoNet {
  return {
    async fetchQuakes(MMI: number): Promise<GeoJSON> {
      const res = await fetch(`https://api.geonet.org.nz/quake?MMI=${MMI}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    },
    getAverage(quakes, property): number {
      return (
        quakes.reduce(
          (accumVal, val) => accumVal + val.properties[property],
          0
        ) / quakes.length
      );
    },
  };
}
