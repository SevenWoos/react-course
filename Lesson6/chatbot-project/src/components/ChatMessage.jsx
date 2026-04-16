import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/malcolm.png';
import './ChatMessage.css';
import dayjs from 'dayjs';

// ChatMessage Component
function ChatMessage({ message, sender, time }) {
  return (
    <div className= 
      {sender === 'user'
      ? 'chat-message-user'
      : 'chat-message-robot'
      }
    >
      {sender === 'robot' && (
        <img src={RobotProfileImage}
          className="chat-message-profile"/>
      )}

      <div className="chat-messages-text">
        {message}

        {time && (
          <div className="chat-message-time">
            {dayjs(time).format('h:mma')}
          </div>
        )}
      </div>

      {sender === 'user' && (
        <img src={UserProfileImage}
          className="chat-message-profile"/>
      )}
    </div>
  );

};
 export default ChatMessage;

console.log(UserProfileImage);