import { SidebarProvider } from "../_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/organisms/AppSidebar";

export default function HomeTemplate() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <h1>Welcome to the Home Page aaa</h1>
      </SidebarProvider>
    </>
  );
}
