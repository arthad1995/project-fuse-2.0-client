
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
                        content: "Keep your résumé up to date so that people know what you can do.",
                        time: 1509133200,
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment for Jim's class",
                        content: "Jim is offering free courses for juggling. Please contact Jim if you are interested.",
                        time: 1509133200,
                    },
                    {
                        id: id++,
                        type: 'reminder',
                        title: "Meeting at 11:00 AM on Oct 31",
                        time: 1508854243,
                    },
                    {
                        id: id++,
                        type: 'message',
                        title: "Message from Bob",
                        content: "I haven't seen you in a while, are you still able to do the database for the robot control website? If not, let me know so we can get someone else to do it.",
                        time: 1508659843
                    },
                    {
                        id: id++,
                        type: 'announcment',
                        title: "Announcment from Project Fuse",
                        content: "On November 12 the system will be undergoing maintenance from 01:00 UTC to 03:30 UTC. Expect latenct when using the site during that time.",
                        time: 1508339443
                    },
                    {
                        id: id++,
                        type: 'message',
                        title: "Message from Alice",
                        content: "We got the robot arm moving! Great job everyone! This is so exciting!!!!",
                        time: 1507993843,
                    }
                ]
            }
        }
    })

    store.dispatch({
        type: 'LOAD_USER_PROJECTS_FULFILLED',
        payload: {
            data: {
                my_projects: [
                    {
                        id: 1,
                        name: "Jim's Juggling Robot"
                    },
                    {
                        id: 2,
                        name: "Project Fuse 2.0"
                    }
                ],
                applied_projects: [
                    {
                        id: 3,
                        name: "Jim's Soccer Management App"
                    }
                ]
            }
        }
    })

    store.dispatch({
        type: 'LOAD_PROJECT_INFO_FULFILLED',
        payload: {
            data: { 1: {
                id: 1,
                name: "Jim's Juggling Robot",
                summary: "Jim wants to make two robot arms that can juggle different items simultaneously (i.e. items vary in size, shape, weight, and color).",
                content: `## Video\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/9asDO_1A27U" frameborder="0" allowfullscreen></iframe>\n\n## Why robot arms?\n\nBecause they look cool! And a lot of students do use robot arms for their senior projects, and if they can use robot arms then why can't I? I also know several people in the ME and ECE departments who could help with the hardware so I only have to work with the software.\n\n## Goals\n\nSome of the goals for this project ar as follows:\n * Create a robot arm\n * Have the robot pick up a ball\n * Have the robot reliably throw the ball and catch it\n * Have a second arm\n * Have the arms throw the ball to eachother\n * Have the arms juggle two balls\n * Have the arms juggle three balls\n * Have the arms juggle different objects`,
                image: 'https://c1.staticflickr.com/3/2640/3959355664_53d4cbe34f_z.jpg?zz=1',
                members: [{
                    id: id++,
                    name: 'Jim',
                    role: 'admin',
                },{
                    id: id++,
                    name: 'Bill',
                    role: 'contributer',
                },{
                    id: 12,
                    name: 'John Doe',
                    role: 'contributer',
                }],
                teams: [],
                Links: []
            }}
        }
    })
    
    store.dispatch({
        type: 'LOAD_PROJECT_INFO_FULFILLED',
        payload: {
            data: { 2: {
                id: 2,
                name: "Project Fuse 2.0",
                summary: "This is for Individuals who want to create amazing products but are disatisfied with finding teammates through LinkedIn, Facebook, or contractors. Project Fuse 2.0 is a networking site which facilitates finding people to work on projects that removes unnecesary red-tape and, unlike existing social media, is targeted towards letting anyone form a team with peers they meet.",
                content: `## What is Project Fuse?\n\nProject Fuse is a web application made to facilitate team formation. It allows individuals to find other people with similar interests, form teams, and work on projects with tools we provide for project management.`,
                image: 'https://c1.staticflickr.com/3/2640/3959355664_53d4cbe34f_z.jpg?zz=1',
                members: [{
                    id: id++,
                    name: 'Jim',
                    role: 'admin',
                },{
                    id: id++,
                    name: 'Bill',
                    role: 'contributer',
                },{
                    id: 12,
                    name: 'John Doe',
                    role: 'contributer',
                }],
                teams: [],
                Links: []
            }}
        }
    })
    
    store.dispatch({
        type: 'LOAD_ORGANIZATION_INFO_FULFILLED',
        payload: {
            data: { 1: {
                id: 1,
                name: "Jim's Class",
                summary: "This is for CS 4000 Fall 2017",
                content: `## Why this class?\n\nYou need it to graduate`,
                image: 'https://www.cs.utah.edu/~germain/Eye_Candy/jim_p.png',
                members: [{
                    id: id++,
                    name: 'Jim',
                    role: 'admin',
                }],
                teams: [],
                projects: [],
                Links: []
            }}
        }
    })
}
