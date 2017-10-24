
export default function (store){
    // populate user
    store.dispatch({
        type:'LOAD_USER_FULFILLED',
        payload: {
            data: {
                id: 12,
                first_name: 'John',
                last_name: 'Doe',
                friend_count: 25
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
                        content: "Keep your rèsumè up to date so that people know what you can do.",
                        time: 1508868644,
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment for Jim's class",
                        content: "Jim is offering free courses for juggling. Please contact Jim if you are interested.",
                        time: 1508854243,
                    },
                    {
                        id: id++,
                        type: 'reminder',
                        title: "Meeting at 11:00 AM on Oct 31",
                        time: 1508659843,
                    },
                    {
                        id: id++,
                        type: 'message',
                        title: "Message from Bob",
                        content: "I haven't seen you in a while, are you still able to do the database for the robot control website? If not, let me know so we can get someone else to do it.",
                        time: 1508339443
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment from Project Fuse",
                        content: "On November 12 the system will be undergoing maintenance from 01:00 UTC to 03:30 UTC. Expect latenct when using the site during that time.",
                        time: 1507993843
                    },
                    {
                        id: id++,
                        type: 'message',
                        title: "Message from Alice",
                        content: "We got the robot arm moving! Great job everyone! This is so exciting!!!!",
                        time: 1507821043,
                    }
                ]
            }
        }
    })

    id = 1;
    store.dispatch({
        type: 'LOAD_USER_PROJECTS_FULFILLED',
        payload: {
            data: {
                my_projects: [
                    {
                        id: id++,
                        name: "Jim's Juggling Robot",
                        role: 'contributer'
                    },
                    {
                        id: id++,
                        name: "Project Fuse 2.0",
                        role: 'admin'
                    }
                ],
                applied_projects: [
                    {
                        id: id++,
                        name: "Jim's Soccer Management App"
                    }
                ]
            }
        }
    })
}
