import Head from 'next/head'
import NavBar from './layout/NavBar'
import HeroBanner from './elements/HeroBanner'
import SubNav from './layout/SubNav'
import ReviewerGrid from './layout/ReviewerGrid'

function Layout() {
  return (
    <div className=''>
      <NavBar/>
      <HeroBanner providers={undefined}/>
      {/* <SubNav/> */}
    </div>
  )
}

export default Layout
