import { useEffect } from "react";
import { FooterComponent } from "../components/footer";
import { HomeComponent } from "../components/home";

export const HomePage = () => {
  useEffect(() => {
    const startApis = async () => {
      try {
        const generateAsk = await fetch(
          "https://anki-convert-file-api.onrender.com/start",
          {
            method: "GET",
          }
        );
        const convertToApkg = await fetch(
          "https://api-dackify-ia-1.onrender.com/",
          {
            method: "GET",
          }
        );

        const generateAskData = await generateAsk.json();
        const convertToApkgData = await convertToApkg.json();

        console.log("Generate Ask API started:", generateAskData);
        console.log("Convert to Apkg API started:", convertToApkgData);
      } catch (error) {
        console.error("Error starting APIs:", error);
      }
    };

    startApis();

    const intervalId = setInterval(startApis, 30000);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <HomeComponent />
      <FooterComponent className="mt-auto" />
    </div>
  );
};
