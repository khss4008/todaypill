import * as Notifications from "expo-notifications";

// identifier(string) : 푸시 알림 이름(알림 설정할 때 쓴 identifier와 동일)
export const cancelNotification = (identifier: string) => {
  Notifications.cancelScheduledNotificationAsync(identifier);
};
