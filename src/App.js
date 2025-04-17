import React, { useState } from 'react';
import './App.css';
import FriendsList from './components/FriendsList';
import ChatWindow from './components/ChatWindow';

function App() {
  // Sample data for friends
  const initialFriends = [
    { id: 1, name: 'Alice', avatar: '👩' },
    { id: 2, name: 'Bob', avatar: '👨' },
    { id: 3, name: 'Charlie', avatar: '🧑' },
    { id: 4, name: 'Diana', avatar: '👱‍♀️' },
  ];

  // Initial empty chat messages for each friend
  const initialChats = {
    1: [],
    2: [],
    3: [],
    4: [],
  };

  const [friends] = useState(initialFriends);
  const [chats, setChats] = useState(initialChats);
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showChat, setShowChat] = useState(false);

  // Handle window resize for responsive design
  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to handle sending a new message
  const handleSendMessage = (message) => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChats(prevChats => ({
      ...prevChats,
      [selectedFriend.id]: [...prevChats[selectedFriend.id], newMessage],
    }));
  };

  // Handle friend selection with mobile view consideration
  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    if (isMobileView) {
      setShowChat(true);
    }
  };

  // Go back to friends list in mobile view
  const handleBackToFriends = () => {
    setShowChat(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Messenger App</h1>
      </header>
      <div className="messenger-container">
        {/* In mobile view, we toggle between friends list and chat */}
        {isMobileView ? (
          !showChat ? (
            <FriendsList 
              friends={friends} 
              selectedFriend={selectedFriend} 
              onSelectFriend={handleSelectFriend} 
            />
          ) : (
            <ChatWindow 
              friend={selectedFriend} 
              messages={chats[selectedFriend.id]} 
              onSendMessage={handleSendMessage} 
              isMobileView={true}
              onBack={handleBackToFriends}
            />
          )
        ) : (
          // In desktop view, we show both components
          <>
            <FriendsList 
              friends={friends} 
              selectedFriend={selectedFriend} 
              onSelectFriend={handleSelectFriend} 
            />
            <ChatWindow 
              friend={selectedFriend} 
              messages={chats[selectedFriend.id]} 
              onSendMessage={handleSendMessage} 
              isMobileView={false}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;