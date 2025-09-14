import { HomeSidebar } from "@/app/_components/organisms/HomeSidebar";
import { FlowModal } from "@/app/_components/organisms/FlowModal";
import { ConfirmationModal } from "@/app/_components/organisms/ConfirmationModal";

import { SidebarProvider } from "../_components/ui/sidebar";
import { FlowModalProvider } from "@/app/context/FlowModalContext";
import { ConfirmationModalProvider } from "@/app/context/ConfirmationModalContext";
import { FlowsDataProvider } from "@/app/context/FlowsDataContext";

export default function HomeTemplate() {
  return (
    <FlowsDataProvider>
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
    </FlowsDataProvider>
  );
}
