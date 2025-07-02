import React from 'react';

function LeftMessage({ message, sender, time }) {
  return (
    <div style={styles.container}>
      <div style={styles.avatar}>{sender?.charAt(0).toUpperCase()}</div>
      <div>
        <div style={styles.sender}>{sender}</div>
        <div style={styles.messageBubble}>
          <span>{message}</span>
        </div>
        <div style={styles.time}>{time}</div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: '10px 0',
  },
  avatar: {
    backgroundColor: '#6c757d',
    color: 'white',
    borderRadius: '50%',
    width: '35px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  sender: {
    fontSize: '12px',
    color: '#555',
    marginBottom: '4px',
  },
  messageBubble: {
    backgroundColor: '#e4e6eb',
    padding: '10px 15px',
    borderRadius: '12px',
    maxWidth: '300px',
    wordWrap: 'break-word',
  },
  time: {
    fontSize: '10px',
    color: '#999',
    marginTop: '4px',
  },
};

export default LeftMessage;
