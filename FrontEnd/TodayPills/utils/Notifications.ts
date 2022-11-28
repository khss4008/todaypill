// import * as Notifications from "expo-notifications";
// import Expo from "expo";

// export const getDeviceToken = async () => {
//   const token = (await Notifications.getDevicePushTokenAsync()).data;
//   const token1 = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log(token1, "토큰");
//   await fetch("https://fcm.googleapis.com/fcm/send", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `key=AAAAKPzc1sc:APA91bFzN5Dzlbzs34NTMJ-PSBz0m93AK2orsVRtVB3vVguQsjawfNnmz6F5B_UNKzDJ-xHsyWaxUimIh3pDfX-HNALUvW54tt_yHergCY_rOU1o4aTCrHuXL_gYq8QvTqwIpFkapz8i`,
//     },
//     body: JSON.stringify({
//       // to: '<NATIVE-DEVICE-PUSH-TOKEN>',
//       to: token,
//       priority: "normal",
//       data: {
//         experienceId: "@yourExpoUsername/yourProjectSlug",
//         scopeKey: "@yourExpoUsername/yourProjectSlug",
//         title: "📧 You've got mail",
//         message: "Hello world! 🌐",
//       },
//     }),
//   });
//   return token;
// };

import PushNotification, { Importance } from "react-native-push-notification";
// import { alarmCheckAPI } from "../axios";

class Notifications {
  constructor() {
    PushNotification.configure({
      onRegister: function (token: any) {
        console.log("TOKEN:", token);
      },
      onNotification: (notification: any) => {
        // postAlarmCheck(notification.data.alarmId);
      },

      onAction: function (notification: any) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
      },
      onRegistrationError: function (err: any) {
        console.error(err.message, err);
      },

      // Should the initial notification be popped automatically
      // default: true
      requestPermissions: true,
      popInitialNotification: true,

      // requestPermissions: true,
      // requestPermissions: Platform.OS === "ios",

      // // IOS ONLY
      // permissions: {
      //   alert: true,
      //   badge: true,
      //   sound: true,
      // },
    });

    PushNotification.createChannel(
      {
        channelId: "com.todaypills_app",
        channelName: "com.todaypills_app",
        channelDescription: "com.todaypills_app",

        playSound: false, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created: any) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      // () => {}
    );

    // postAlarmCheck = async (data) => {
    //   await alarmCheckAPI(data, 1);
    // };
  }

  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------
  cancelScheduledLocalNotifications(id: string) {
    PushNotification.cancelLocalNotification(id);
  }

  getScheduledLocalNotifications() {
    PushNotification.getScheduledLocalNotifications((rn: any) => {});
  }
  popInitialNotification() {
    (notification: any) => console.log("Initial Notification", notification);
  }

  getList() {
    PushNotification.getDeliveredNotifications((rn: any) => {});
  }

  scheduledLocalNotifications(
    alarmId: any,
    id: any,
    date: Date,
    title: string,
    medi: string
  ) {
    PushNotification.localNotificationSchedule({
      id: id,
      channelId: "com.todaypills_app",
      title: title,
      message: medi + ` 복용 시간입니다!`,
      playSound: true,
      tag: alarmId,
      date: date,
      userInfo: { id: id, alarmId: alarmId },
    });
  }
  deleteNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }
}

export default new Notifications();
