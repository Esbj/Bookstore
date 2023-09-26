import Typography from '@mui/material/Typography';
import './headingToggle.scss'

type Props = {
  selectedTab: string,
  updateSelectedTab: (value: string) => void,
  tab1: string,
  tab2: string
}

export default function HeadingToggle({ selectedTab, updateSelectedTab, tab1, tab2 }: Props) {
  return (
    <div className="toggleWrapper">
      <Typography variant="h2" className={selectedTab === tab1 ? 'selected' : ''} onClick={() => updateSelectedTab(tab1)}>{tab1}</Typography>
      <Typography variant="h2" className={selectedTab === tab2 ? 'selected' : ''} onClick={() => updateSelectedTab(tab2)}>{tab2}</Typography>
    </div>
  )
}