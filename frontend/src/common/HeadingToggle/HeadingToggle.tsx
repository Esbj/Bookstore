import Typography from '@mui/material/Typography';
import './headingToggle.scss'

type Props = {
  selectedTab: string,
  updateSelectedTab: (value: string) => void
}
export default function HeadingToggle({ selectedTab, updateSelectedTab }: Props) {


  return (
    <div className='toggleWrapper'>
      <Typography variant="h2" className={selectedTab === 'Books' ? 'selected' : ''} onClick={() => updateSelectedTab('Books')}>Books</Typography>
      <Typography variant="h2" className={selectedTab === 'Authors' ? 'selected' : ''} onClick={() => updateSelectedTab('Authors')}>Authors</Typography>
    </div>
  )
}