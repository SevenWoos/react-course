import RobotProfileImage from '.././assets/robot.png';
// import UserProfileImage from '.././assets/user.png';
import UserProfileImage from '.././assets/malcolm.png';
import dayjs from 'dayjs';
import './ChatMessage.css';

// ChatMessage Component
export function ChatMessage({ message, sender, time }) {
  return (
    <div className= 
      {sender === 'user'
      ? 'chat-message-user'
      : 'chat-message-robot'}
    >
      {sender === 'robot' && (
        <img src={RobotProfileImage} 
          className="chat-message-profile"/>
      )}

      <div className="chat-messages-text">
        {message}
      </div>

      {time && (
        <div className="chat-message-time">
          {dayjs(time).format('h:ma')}
        </div>
      )}

      {sender === 'user' && (
        <img src={UserProfileImage} 
          className="chat-message-profile"/>
      )}
    </div>
  );

};

export default ChatMessage;