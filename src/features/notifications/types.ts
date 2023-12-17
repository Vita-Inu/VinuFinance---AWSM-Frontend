export enum NOTIFICATION_TYPE {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING'
}

export type Notification = {
  id: string
  type: NOTIFICATION_TYPE,
  title: string,
  description?: string
}