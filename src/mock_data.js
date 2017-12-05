const get_feed_data = (id, time)=>{
    switch (id){
        case 1:
            return accepted_feed_data(time)
        case 2:
            return declined_feed_data(time)
        case 0:
        default:
            return default_feed_data(time)
    }
}

export default function (dispatch, feed_data_id=0, time = '') {
    let id = 1
    dispatch({
        type: 'LOAD_FEED_FULFILLED',
        payload: {
            data: get_feed_data(feed_data_id, time)
        }
    })
}

const declined_feed_data = () => {
    let id = 1
    return {
        status: "OK",
        errors: null,
        data: {
            feed: [
                {
                    id: id++,
                    type: 'declined',
                    title: "Interview Declined",
                    content: "You declined your interview with Project Fuse.",
                    time:  new Date(),
                },
                {
                    id: id++,
                    type: 'reminder',
                    title: "Meeting at 11:00 AM with Jim on Dec 11",
                    time: '2017-12-08T8:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'info',
                    title: "Tip of the day",
                    content: "Keep your résumé up to date so that people know what you can do.",
                    time: '2017-12-08T06:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'announcment',
                    title: "Announcment for Jim's class",
                    content: "Jim is offering free courses for juggling. Please contact Jim if you are interested.",
                    time: '2017-12-07T14:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'message',
                    title: "Message from Bob",
                    content: "I haven't seen you in a while, are you still able to do the database for the robot control website? If not, let me know so we can get someone else to do it.",
                    time: '2017-12-07T10:00:00+00:00'
                }
            ]
        }
    }
}


const accepted_feed_data = (time) => {
    let id = 1
    return {
        status: "OK",
        errors: null,
        data: {
            feed: [
                {
                    id: id++,
                    type: 'acceptance',
                    title: "Interview Scheduled",
                    content: `You're interview has been scheduled with Project Fuse!`,
                    schedule: time,
                    time: new Date(),
                },
                {
                    id: id++,
                    type: 'reminder',
                    title: "Meeting at 11:00 AM with Jim on Dec 11",
                    time: '2017-12-08T8:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'info',
                    title: "Tip of the day",
                    content: "Keep your résumé up to date so that people know what you can do.",
                    time: '2017-12-08T06:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'announcment',
                    title: "Announcment for Jim's class",
                    content: "Jim is offering free courses for juggling. Please contact Jim if you are interested.",
                    time: '2017-12-07T14:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'message',
                    title: "Message from Bob",
                    content: "I haven't seen you in a while, are you still able to do the database for the robot control website? If not, let me know so we can get someone else to do it.",
                    time: '2017-12-07T10:00:00+00:00'
                }
            ]
        }
    }
}

const default_feed_data = () => {
    let id=1
   return  {
        status: "OK",
        errors: null,
        data: {
            feed: [
                {
                    id: id++,
                    type: 'invite',
                    title: "Invitation to Interview With Project Fuse",
                    content: "You are invited to interview for joining Project Fuse!",
                    time: '2017-12-08T10:00:00+00:00'
                },
                {
                    id: id++,
                    type: 'reminder',
                    title: "Meeting at 11:00 AM with Jim on Dec 11",
                    time: '2017-12-08T8:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'info',
                    title: "Tip of the day",
                    content: "Keep your résumé up to date so that people know what you can do.",
                    time: '2017-12-08T06:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'announcment',
                    title: "Announcment for Jim's class",
                    content: "Jim is offering free courses for juggling. Please contact Jim if you are interested.",
                    time: '2017-12-07T14:00:00+00:00',
                },
                {
                    id: id++,
                    type: 'message',
                    title: "Message from Bob",
                    content: "I haven't seen you in a while, are you still able to do the database for the robot control website? If not, let me know so we can get someone else to do it.",
                    time: '2017-12-07T10:00:00+00:00'
                }
            ]
        }
    }
}
