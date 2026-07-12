import { notifications } from "@mantine/notifications"


const notifyStyles = {
    root: {
        // borderColor: "red",
        // color: "red",
    }
}


export const notify = {
    success: (title: string, message: string) => {
        notifications.show({
            styles: notifyStyles,
            title: title,
            message: message,
            color: "green",
            autoClose: 55000,

        })
    },

    error: (title: string, message: string) => {
        notifications.show({
            styles: notifyStyles,
            title: title,
            message: message,
            color: "red",
            autoClose: 55000,
        })

    }
}