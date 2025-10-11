import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser, showSidebar } = useChatStore();

  return (
    <div className="relative flex min-h-screen bg-slate-950 p-0 md:p-1">
      <div
        className={`relative w-full ${
          selectedUser ? "md:max-w-none max-w-full" : "max-w-full"
        } flex flex-col md:flex-row overflow-hidden bg-slate-900/40 backdrop-blur-lg`}
      >
        {/* LEFT SIDE - Sidebar */}
        <div
          className={`w-full md:w-72 bg-slate-800/40 backdrop-blur-md flex flex-col overflow-y-auto border-r border-slate-700/40 ${
            selectedUser && !showSidebar ? "md:hidden" : ""
          }`}
          style={{ height: "100vh" }}
        >
          <div className="sticky top-0 z-10 bg-slate-800/60 backdrop-blur-md border-b border-slate-700/40">
            <ProfileHeader />
            <ActiveTabSwitch />
          </div>

          <div className="flex-1 p-2 space-y-3">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Main Chat Area (made wider) */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-md min-h-0 p-0 md:p-1">
          <div className="flex-1 overflow-hidden bg-slate-900/60">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
