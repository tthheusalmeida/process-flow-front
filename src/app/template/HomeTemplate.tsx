import { HomeSidebar } from "@/app/_components/organisms/HomeSidebar";
import { FlowModal } from "@/app/_components/organisms/FlowModal";
import { ConfirmationModal } from "@/app/_components/organisms/ConfirmationModal";

import { SidebarProvider } from "../_components/ui/sidebar";
import { FlowModalProvider } from "@/app/context/FlowModalContext";
import { ConfirmationModalProvider } from "@/app/context/ConfirmationModalContext";
import { FlowsDataProvider } from "@/app/context/FlowsDataContext";

import HomeContent from "../_components/organisms/HomeContent";

export default function HomeTemplate() {
  return (
    <FlowsDataProvider>
      <ConfirmationModalProvider>
        <FlowModalProvider>
          <SidebarProvider>
            <HomeSidebar />
            <HomeContent />

            <FlowModal />
            <ConfirmationModal />
          </SidebarProvider>
        </FlowModalProvider>
      </ConfirmationModalProvider>
    </FlowsDataProvider>
  );
}
