import Cover from './components/Cover.jsx'
import Greeting from './components/Greeting.jsx'
import DdayCalendar from './components/DdayCalendar.jsx'
import Gallery from './components/Gallery.jsx'
import Location from './components/Location.jsx'
import Accounts from './components/Accounts.jsx'
import Guestbook from './components/Guestbook.jsx'
import Share from './components/Share.jsx'
import Footer from './components/Footer.jsx'
import { useToast } from './lib.jsx'

export default function App() {
  const [notify, toast] = useToast()
  return (
    <main className="app">
      <Cover />
      <Greeting />
      <DdayCalendar />
      <Gallery />
      <Location notify={notify} />
      <Accounts notify={notify} />
      <Guestbook notify={notify} />
      <Share notify={notify} />
      <Footer />
      {toast}
    </main>
  )
}
