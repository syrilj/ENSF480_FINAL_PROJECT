import React from 'react';

const Reservation = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Reservation</h2>
      {/* Add your reservation form or content here */}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
  },
};

export default Reservation;
