import React from 'react';

function RightMessage({ message, time }) {
  return (
    <div style={styles.container}>
      <div>
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
    justifyContent: 'flex-end',
    margin: '10px 0',
  },
  messageBubble: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '12px',
    maxWidth: '300px',
    wordWrap: 'break-word',
    textAlign: 'left',
  },
  time: {
    fontSize: '10px',
    color: '#ccc',
    marginTop: '4px',
    textAlign: 'right',
  },
};

export default RightMessage;
