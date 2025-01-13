import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";


const RightLayout = () => {
  const {users,fetchUsers} = useChatStore();
  const {user} = useUser();

  useEffect(() => {
    if(user) fetchUsers();
  }, [fetchUsers, user]);

  const isPlaying = false;



  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      <div className="p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0"/>
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>
      {!user &&<LoginPrompt/>}

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {users.map((user) => (
            <div key={user._id} className="cursor-pointer hover:bg-zinc-800/50 rounded-md p-3 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="w-12 h-12 border-zinc-800">
                    <AvatarImage
                      src={user.imageUrl}
                      alt={user.fullName}
                      />
                       <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-500`}  aria-hidden="true"/>

                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-white">{user.fullName}</span>
                      {
                        isPlaying && (
                          <Music className="size-4 text-[#6c63ff] shrink-0">
                          </Music>
                        )
                      }
                    </div>
                    {
                      isPlaying ? (
                        <div className="mt-1">
                          <div className="mt-1 text-sm text-white font-medium truncate">
                            Cardign
                          </div>
                          <div className="text-xs text-zinc-400 truncate">by Cardign</div>
                        </div>
                      ) : (
                        <div className="mt-1 text-xs text-zinc-400">Idle</div>
                      )
                    }
                  </div>
                </div >
              </div>
          ))}
        </div>
        </ScrollArea>
    </div>
  )
}

export default RightLayout;

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      <div
        className="absolute -inset-1 bg-gradient-to-b from-[#6c63ff] via-[#2c2b8e] to-[#2c2b8e] rounded-full blur-lg
        opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-[#6c63ff]" />
      </div>
    </div>
    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">See What Friends Are Playing</h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
