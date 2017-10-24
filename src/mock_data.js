
export default function (store){
    // populate user
    store.dispatch({
        type:'LOAD_USER_FULFILLED',
        payload: {
            data: {
                id: 12,
                first_name: 'John',
                last_name: 'Doe',
                friend_count: 12
            }
        }
    })

    let id = 1;
    store.dispatch({
        type:'LOAD_FEED_FULFILLED',
        payload: {
            data: {
                feed: [
                    {
                        id: id++,
                        type: 'info',
                        title: "Tip of the day",
                        content: "Keep your rèsumè up to date so that people know what you can do."
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment for Jim's class",
                        content: "Jim is offering free courses for juggling. Please contact Jim if you are interested."
                    },
                    {
                        id: id++,
                        type: 'reminder',
                        title: "Meeting in 12 minutes"
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment for Jim's class",
                        content: "Jim is offering free courses for juggling. Please contact Jim if you are interested."
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment for Jim's class",
                        content: "Jim is offering free courses for juggling. Please contact Jim if you are interested."
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment for Jim's class",
                        content: "Jim is offering free courses for juggling. Please contact Jim if you are interested."
                    }
                ]
            }
        }
    })
}
