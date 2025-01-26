import Topbar from "@/components/ui/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import ChatContainer from "./ChatContainer";
import UsersList from "./UsersList";


const ChatPage = () => {
  const {user} = useUser()
  const {messages, fetchMessages, fetchUsers, setSelectedUser} = useChatStore();



  useEffect(() => {
    if(user) fetchUsers();
  }, [fetchUsers, user]);


  useEffect(() => {
    if(setSelectedUser) fetchMessages(setSelectedUser.clerkId);
  }, [setSelectedUser, fetchMessages]);
  return <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
    <Topbar/>
    <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
      <UsersList/>
      <ChatContainer/>
    </div>
  </main>
}

export default ChatPage