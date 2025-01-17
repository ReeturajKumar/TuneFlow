import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftLayout from "./Components/LeftLayout";
import RightLayout from "./Components/RightLayout";
import AudioPlayer from "./Components/AudioPlayer";
import { PlaybackControls } from "./Components/PlayBackControls";
import { useEffect, useState } from "react";


const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  })
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
        <AudioPlayer/>
        <ResizablePanel defaultSize={20} maxSize={20}>
          <LeftLayout/>
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet/>
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {!isMobile && (
          <>
          <ResizablePanel defaultSize={20} minSize={0} maxSize={20} collapsedSize={0}>
            <RightLayout/>
          </ResizablePanel>
        </>
        )}
      </ResizablePanelGroup>
      <PlaybackControls/>
    </div>
  )
}

export default MainLayout