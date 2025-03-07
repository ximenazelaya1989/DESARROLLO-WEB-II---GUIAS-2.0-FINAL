
const createNotificationSlice = (set) => ({

    notifications: [],

    addNotification: (notification) =>
        set((state) => ({
            notifications: [...state.notifications, notification],
        })),

    removeNotification: (id) =>
        set((state) => ({
            notifications: state.notifications.filter((notification) => notification.id !== id),
        })),

    clearNotifications: () =>
        set({ notifications: [] }),

    handleNotification: (recipe) => {
        
    }

});

export default createNotificationSlice
