import { FooterComponent } from "../components/footer";
import { HomeComponent } from "../components/home";

export const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeComponent />
      <FooterComponent className="mt-auto" />
    </div>
  );
};
