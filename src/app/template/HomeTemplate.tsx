import { SidebarProvider, SidebarTrigger } from "../_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/organisms/AppSidebar";

export default function HomeTemplate() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarTrigger className="m-4" />
        <h1>Welcome to the Home Page aaa</h1>
      </SidebarProvider>
    </>
  );
}
