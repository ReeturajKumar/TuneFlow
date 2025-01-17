import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Album, Music } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumTabContent from "./components/AlbumTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";


const AdminPage = () => {
  const {isAdmin, isLoading, error} = useAuthStore();
  const {fetchAlbums, fetchSongs, fetchStats} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums,fetchSongs,fetchStats]);

  

  if(!isAdmin && !isLoading) return <div>{error}</div>;

  return (
  <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-zinc-100 p-8">
    <Header/>
    <DashboardStats/>
    <Tabs defaultValue="songs" className="space-y-8">
      <TabsList className="p-3 bg-zinc-800/50">
        <TabsTrigger  value="songs" className="data-[state=active]:bg-zinc-700 w-full ">
          <Music className="mr-2 size-4" /> Songs
        </TabsTrigger>
        <TabsTrigger  value="albums" className="data-[state=active]:bg-zinc-700 w-full ">
          <Album className="mr-2 size-4" /> Albums
        </TabsTrigger>
      </TabsList>

      <TabsContent value="songs">
        <SongsTabContent/>
      </TabsContent>

      <TabsContent value="albums">
        <AlbumTabContent/>
      </TabsContent>
    </Tabs>
  </div>
  )
}

export default AdminPage