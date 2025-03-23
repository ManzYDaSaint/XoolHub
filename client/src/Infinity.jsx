import { InfinitySpin } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div style={styles.container}>
      <InfinitySpin width="200" color="#007BFE" />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen height
    width: '100vw',
    backgroundColor: '#f8f9fa', // Optional: Background color
  },
};

export default LoadingSpinner;