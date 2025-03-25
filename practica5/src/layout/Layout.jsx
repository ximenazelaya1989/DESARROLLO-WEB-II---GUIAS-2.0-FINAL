import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useAppStore } from '../store/useAppStore'
import Notifications from '../components/Notifications';

function Layout() {
    const loadFromStorage = useAppStore((state) => state.loadFromStorage)
    useEffect(() => {
        loadFromStorage()
    }, [])

    return (
        <>
            <Header />
            <main className='mx-auto container py-16'>
                <Outlet />
            </main>
            <Notifications />
            <Modal />
        </>
    )
}

export default Layout
