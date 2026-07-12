import { notifications } from "@mantine/notifications"


const notifyStyles = {
    root: {
        // borderColor: "red",
        // color: "red",
    }
}


export const notify = {
    success: (title: string, message: string) => {
         const id = notifications.show({
            styles: notifyStyles,
            title: title,
            message: message,
            color: "green",
            autoClose: 55000,

        })

        return id
    },

    loading: (title: string, message: string) => {
         const id = notifications.show({
            styles: notifyStyles,
            title: title,
            message: message,
            loading: true,
            autoClose: false,
        })

        return id
    },

    update : (id:string,title: string, message: string, color: string = "green") => {
        notifications.update({
            styles: notifyStyles,
            id: id,
            title: title,
            message: message,
            color: color,
            loading: false,
            autoClose: 3000,
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