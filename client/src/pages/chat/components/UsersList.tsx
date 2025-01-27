import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import UserListSkelton from "@/components/skeltons/userListSkelton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersList = () => {
  const {users, selectedUser,isLoading,setSelectedUser,onlineUsers} = useChatStore();
  return (
    <div className="border-r border-zinc-700">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-2 p-4">
            {
              isLoading ? (
                <UserListSkelton/>
              ) : (
                users.map((user) => (
                  <div
                  key={user.clerkId}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser?.clerkId === user.clerkId ? "bg-[#2d2b51]" : "hover:bg-zinc-800/50"
                  }`}>
                     <div className="relative">
                      <Avatar className="size-8 md:size-12">
                        <AvatarImage src={user.imageUrl} />
                        <AvatarFallback>{user.fullName [0]}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-3 h-3
                      ring-2 ring-zinc-900 rounded-full ${onlineUsers.has(user.clerkId) ? "bg-[#6c63ff]" : "bg-zinc-500"}`}/>

                     </div>
                    <div className="flex-1 min-w-0 lg:block hidden">
                      <span className="font-medium truncate">{user.fullName}</span>
                    </div>

                  </div>
                ))
              )
            }
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default UsersList