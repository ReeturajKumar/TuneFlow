import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Library } from "lucide-react"
import { Button } from '@/components/ui/button';
import AlbumsTable from "./AlbumsTable";


const AlbumTabContent = () => {
  return (
    <div className="bg-zinc-800/50 border-zinc-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="size-5 text-violet-500"/>
              Album Library
            </CardTitle>
            <CardDescription>Manage your music albums</CardDescription>
          </div>
          <Button>+</Button>
        </div>
      </CardHeader>

      <CardContent>
        <AlbumsTable/>
      </CardContent>
    </div>
  )
}

export default AlbumTabContent