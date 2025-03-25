
import React from 'react'
import { useAppStore } from '../store/useAppStore'

export default function Notifications() {
    const notifications = useAppStore((state) => state.notifications);
    const removeNotification = useAppStore((state) => state.removeNotification)
    return (
        <div className='fixed top-5 right-5 space-y-2 z-50'>
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-3 rounded-lg text-white shadow-lg ${notification.type === "error" ? "bg-red-500" : "bg-green-500"
                        }`}
                >
                    {notification.message}
                    <button
                        className='ml-2 text-sm'
                        onClick={() => removeNotification(notification.id)}
                    >
                        {notification.type === "success" ? "❤️" : "❎"}

                    </button>
                </div>
            ))}
        </div>
    );
}
