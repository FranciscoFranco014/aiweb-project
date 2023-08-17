import { Suspense, useState, lazy } from 'react'
import { Router, Route, Link } from 'midu-router'
import './App.css'


const lazyHomePage = lazy(() => import('./pages/Home.jsx'))
const lazyAboutPage = lazy(() => import('./pages/About.jsx'))
const lazyChatPage = lazy(() => import('./pages/Chat.jsx'))
const lazyImagePage = lazy(() => import('./pages/Image.jsx'))


function App() {
  return (
    <main>
      <Suspense fallback={<h4>Loading...</h4>}>
        <Router>
          <Route path='/' Component={lazyHomePage}/>
          <Route path='/about' Component={lazyAboutPage}/>
          <Route path='/image' Component={lazyImagePage}/>
          <Route path='/chat' Component={lazyChatPage}/>
          
        </Router>
      </Suspense>
    </main>
  )
}

export default App
