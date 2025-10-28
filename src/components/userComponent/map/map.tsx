import React from "react";
import { GoogleMapsEmbed } from "@next/third-parties/google";
function GoogleMap() {
  return (
    <GoogleMapsEmbed
      id="footermap"
      apiKey={process.env.NEXT_PUBLIC_REVIEWS_API_KEY || ""}
      height={350}
      width="100%"
      mode="place"
      q="Two+Guys+Home+Furnishings+LLC"
    />
  );
}

export default GoogleMap;
