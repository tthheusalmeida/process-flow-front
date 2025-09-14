import { HomeSidebar } from "@/app/_components/organisms/HomeSidebar";
import { FlowModal } from "@/app/_components/organisms/FlowModal";
import { ConfirmationModal } from "@/app/_components/organisms/ConfirmationModal";

import { SidebarProvider } from "../_components/ui/sidebar";
import { FlowModalProvider } from "@/app/context/FlowModalContext";
import { ConfirmationModalProvider } from "@/app/context/ConfirmationModalContext";
import { FlowsDataProvider } from "@/app/context/FlowsDataContext";
import Welcome from "../_components/organisms/Welcome";

export default function HomeTemplate() {
  return (
    <FlowsDataProvider>
      <ConfirmationModalProvider>
        <FlowModalProvider>
          <SidebarProvider>
            <HomeSidebar />

            <main className="flex-1">
              <Welcome />
            </main>

            <FlowModal />
            <ConfirmationModal />
          </SidebarProvider>
        </FlowModalProvider>
      </ConfirmationModalProvider>
    </FlowsDataProvider>
  );
}
