// ===== PUSH NOTIFICATIONS =====
class PushNotificationManager {
    constructor() {
        this.isSupported = 'Notification' in window && 'serviceWorker' in navigator;
        this.isSubscribed = false;
        this.vapidPublicKey = 'YOUR_VAPID_PUBLIC_KEY'; // Replace with your key
    }

    // Check if notifications are supported
    isSupported() {
        return this.isSupported;
    }

    // Request permission
    async requestPermission() {
        if (!this.isSupported) {
            console.warn('❌ Push notifications not supported');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('✅ Notification permission granted');
                this.isSubscribed = true;
                return true;
            } else {
                console.warn('❌ Notification permission denied');
                return false;
            }
        } catch (error) {
            console.error('❌ Error requesting permission:', error);
            return false;
        }
    }

    // Send a notification
    sendNotification(title, options = {}) {
        if (!this.isSupported) return false;
        if (Notification.permission !== 'granted') {
            console.warn('❌ Notification permission not granted');
            return false;
        }

        try {
            const notification = new Notification(title, {
                icon: '/assets/images/icon-192x192.png',
                badge: '/assets/images/icon-72x72.png',
                vibrate: [200, 100, 200],
                ...options
            });

            // Handle click
            notification.onclick = function() {
                window.focus();
                this.close();
                
                // Navigate to URL if provided
                if (options.data && options.data.url) {
                    window.location.href = options.data.url;
                }
            };

            return true;
        } catch (error) {
            console.error('❌ Error sending notification:', error);
            return false;
        }
    }

    // Send result notification
    sendResultNotification(studentName, subject, score) {
        return this.sendNotification(
            `📊 Result Published: ${studentName}`,
            {
                body: `${studentName} scored ${score}% in ${subject}`,
                data: {
                    url: '/pages/student-profile.html'
                },
                tag: 'result-published'
            }
        );
    }

    // Send attendance alert
    sendAttendanceAlert(studentName, date, status) {
        return this.sendNotification(
            `📋 Attendance Alert`,
            {
                body: `${studentName} was ${status} on ${date}`,
                data: {
                    url: '/pages/attendance.html'
                },
                tag: 'attendance-alert'
            }
        );
    }

    // Send report card notification
    sendReportCardNotification(studentName, term) {
        return this.sendNotification(
            `📄 Report Card Ready`,
            {
                body: `Report card for ${studentName} (${term} term) is ready to download`,
                data: {
                    url: '/pages/student-profile.html'
                },
                tag: 'report-card'
            }
        );
    }

    // Send system notification
    sendSystemNotification(title, message, type = 'info') {
        const icons = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌'
        };
        
        return this.sendNotification(
            `${icons[type] || '📢'} ${title}`,
            {
                body: message,
                tag: 'system-notification',
                requireInteraction: true
            }
        );
    }

    // Subscribe to push (requires server)
    async subscribeToPush() {
        if (!this.isSupported || !('PushManager' in window)) {
            console.warn('❌ Push not supported in this browser');
            return null;
        }

        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.vapidPublicKey
            });

            console.log('✅ Push subscription successful:', subscription);
            this.isSubscribed = true;
            return subscription;
        } catch (error) {
            console.error('❌ Push subscription failed:', error);
            return null;
        }
    }

    // Unsubscribe from push
    async unsubscribeFromPush() {
        if (!this.isSupported) return false;

        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            
            if (subscription) {
                await subscription.unsubscribe();
                console.log('✅ Unsubscribed from push');
                this.isSubscribed = false;
                return true;
            }
            return false;
        } catch (error) {
            console.error('❌ Unsubscribe failed:', error);
            return false;
        }
    }
}

// Initialize
const notificationManager = new PushNotificationManager();

// Request permission on page load (if enabled)
document.addEventListener('DOMContentLoaded', () => {
    // Auto-request if user has interacted
    const hasRequested = localStorage.getItem('notification-requested');
    if (!hasRequested) {
        // Don't auto-request, let user click a button
        console.log('🔔 Click "Enable Notifications" to get alerts');
    }
});

console.log('🔔 Push Notification Manager loaded');