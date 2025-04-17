import React from 'react';

function FriendsList({ friends, selectedFriend, onSelectFriend }) {
  return (
    <div className="friends-list">
      <div className="friends-header">
        <h2>Chats</h2>
      </div>
      <div className="friends-content">
        {friends.map(friend => (
          <div 
            key={friend.id} 
            className={`friend-item ${selectedFriend.id === friend.id ? 'selected' : ''}`}
            onClick={() => onSelectFriend(friend)}
          >
            <div className="friend-avatar">{friend.avatar}</div>
            <div className="friend-name">{friend.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendsList;