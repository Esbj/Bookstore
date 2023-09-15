import { useState } from 'react';
import './headingToggle.scss'
import Typography from '@mui/material/Typography';
export default function HeadingToggle() {
  const [selectedTab, setSelectedTab] = useState('Books');

  return (
    <div className='toggleWrapper'>
      <Typography variant="h2" className={selectedTab === 'Books' ? 'selected' : ''} onClick={() => setSelectedTab('Books')}>Books</Typography>
      <Typography variant="h2" className={selectedTab === 'Authors' ? 'selected' : ''} onClick={() => setSelectedTab('Authors')}>Authors</Typography>
    </div>
  )
}