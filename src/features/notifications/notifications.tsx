import { aeonik } from '@/fonts';

import { Grid, Wrapper } from './styled';
import { Notification } from './components';
import { useNotifications } from './hooks';

export function Notifications() {
  const {notifications, removeNotification} = useNotifications()

  return (
    <Wrapper className={aeonik.className}>
      <Grid>
        {notifications.map(({id, type, title, description}) => (
          <Notification
            key={id}
            id={id}
            type={type}
            title={title}
            description={description}
            onExpire={() => removeNotification(id)}
          />
        ))}
      </Grid>
    </Wrapper>
  );
}