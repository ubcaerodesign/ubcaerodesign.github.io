import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <div>
      <h1>Under Construction</h1>    
    </div>
  );
}
