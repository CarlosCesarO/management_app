import "./App.css";
import Membersbar from "./components/Membersbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home/Home";
import Projects from "./pages/Projects/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { ThemeProvider } from "./providers/ThemeProvider";
import { useAuthContext } from "./hooks/useAuthContext";
import Loading from "./components/Loading";
import Profile from "./pages/Profile/Profile";
import Chat from "./components/Chat";
import ChatButton from "./components/ChatButton";
import { useState } from "react";
import { useCollection } from "./hooks/useCollection";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [chatIsOpen, setChatIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const { documents: chats } = useCollection("chats");

  if (!authIsReady) return <Loading />;

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="App flex ">
        <BrowserRouter>
          {user ? (
            <>
              <Sidebar />
              <div className="flex-grow">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </div>
              <Membersbar
                chats={chats}
                setSelectedChat={setSelectedChat}
                setChatIsOpen={setChatIsOpen}
              />
              {chatIsOpen && <Chat chats={chats} selectedChat={selectedChat} />}
              <ChatButton
                setChatIsOpen={setChatIsOpen}
                setSelectedChat={setSelectedChat}
              />
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/*" element={<Signup />} />
            </Routes>
          )}
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
