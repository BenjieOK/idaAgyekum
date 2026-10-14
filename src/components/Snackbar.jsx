import { useEffect, useState } from 'react';
import { Mail, X } from 'lucide-react';

export default function Snackbar({ notification, onDismiss }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!notification || paused) return;
    const timer = window.setTimeout(onDismiss, 10000);
    return () => window.clearTimeout(timer);
  }, [notification, onDismiss, paused]);

  return (
    <div className="snackbar-region">
      <div className="snackbar-announcement" role="status" aria-live="polite" aria-atomic="true">
        {notification?.message || ''}
      </div>
      {notification && (
        <div className="snackbar" key={notification.id}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}>
          <Mail size={20} aria-hidden="true" />
          <p>{notification.message}</p>
          <button type="button" className="snackbar-dismiss" aria-label="Dismiss notification"
            title="Dismiss notification" onClick={() => { setPaused(false); onDismiss(); }}>
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
