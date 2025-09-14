import { SidebarProvider } from "../_components/ui/sidebar";
import { HomeSidebar } from "@/app/_components/organisms/HomeSidebar";
import { FlowModalProvider } from "@/app/context/FlowModalContext";
import { FlowModal } from "@/app/_components/organisms/FlowModal";
import { ConfirmationModalProvider } from "@/app/context/ConfirmationModalContext";
import { ConfirmationModal } from "@/app/_components/organisms/ConfirmationModal";

export default function HomeTemplate() {
  return (
    <ConfirmationModalProvider>
      <FlowModalProvider>
        <SidebarProvider>
          <HomeSidebar />

          <main className="flex-1 p-4">
            <h1>Welcome to the Home Page</h1>
          </main>

          <FlowModal />
          <ConfirmationModal />
        </SidebarProvider>
      </FlowModalProvider>
    </ConfirmationModalProvider>
  );
}
