import { NotificationCenter } from '../NotificationCenter';

export default function NotificationCenterExample() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <NotificationCenter
        onMarkAsRead={(id) => console.log('Mark as read:', id)}
        onMarkAllRead={() => console.log('Mark all as read')}
        onDismiss={(id) => console.log('Dismiss:', id)}
      />
    </div>
  );
}