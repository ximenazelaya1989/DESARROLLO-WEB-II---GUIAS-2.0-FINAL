import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import IndexPage from './pages/IndexPage'
import FavoritesPages from './pages/FavoritesPages'
import Layout from './layout/Layout'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/favoritos" element={<FavoritesPages />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
