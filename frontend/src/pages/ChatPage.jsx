import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-full mx-auto px-2 sm:px-4">
      <BorderAnimatedContainer>
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* LEFT SIDE */}
          <div
            className={`bg-slate-800/50 backdrop-blur-sm flex flex-col 
            ${selectedUser ? "hidden md:flex" : "flex"} 
            md:w-80 w-full md:max-w-xs`}
          >
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className={`flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm 
            ${!selectedUser ? "hidden md:flex" : "flex"}`}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
export default ChatPage;
