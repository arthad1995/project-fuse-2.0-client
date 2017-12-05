import React, { Component } from 'react'
import { AreaChart, BarChart, LineChart, PieChart, ScatterChart, Legend } from 'react-easy-chart'
import Dimensions from 'react-dimensions'
const Chance = require('chance'),
    chance = new Chance();

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const users = [
    "John", "Jim", "Peter", "Rachel", "George", "Bob"
]

require('./styles.scss')

class StatsPage extends Component {
    render() {
        let gitHubCommitData = []
        let trelloTaskData = []

        let gitHubCommitByUser = []
        let trelloTasksByUser = []

        months.forEach((month) => {
            const gitCommits = chance.integer({ min: 10, max: 100 })
            gitHubCommitData.push({ x: month, y: gitCommits })
            trelloTaskData.push({ x: month, y: chance.integer({ min: 10, max: gitCommits + 30 }) })
        })

        users.forEach((user) => {
            const gitCommits = chance.integer({ min: 1, max: 50 })
            gitHubCommitByUser.push({ key: user, value: gitCommits })
            const trelloCommits = chance.integer({min: 0, max: gitCommits})
            trelloTasksByUser.push({key: user, value: trelloCommits})
        })

        return <div className="stats">
            <h1>Sample Statistics Page</h1>
            <h2>GitHub Commits &amp; Completed Trello Tasks</h2>
            <BarChart
                axisLabels={{ x: 'Month', y: 'Number of Commits', y2: "Number of Trello Tasks Done" }}
                margin={{ top: 30, right: 70, bottom: 70, left: 70 }}
                interpolate={'cardinal'}
                xTickNumber={0}
                axes
                grid
                colorBars
                y2Type="linear"
                width={this.props.containerWidth}
                height={this.props.containerWidth / 2}
                lineData={trelloTaskData}
                data={gitHubCommitData}
            />
            <div className="inline">
                <h2>GitHub Commits By User</h2>
                <PieChart
                    size={this.props.containerWidth / 2 - 10}
                    styles={{
                        '.chart_lines': {
                            strokeWidth: 0
                        },
                        '.chart_text': {
                            fontFamily: 'serif',
                            fontSize: '1.25em',
                            fill: '#333'
                        }
                    }}
                    data={gitHubCommitByUser}
                />
            </div>
            <div className="inline margin">
                <h2>Trello Tasks By User</h2>
                <PieChart
                    size={this.props.containerWidth / 2 - 10}
                    styles={{
                        '.chart_lines': {
                            strokeWidth: 0
                        },
                        '.chart_text': {
                            fontFamily: 'serif',
                            fontSize: '1.25em',
                            fill: '#333'
                        }
                    }}
                    data={trelloTasksByUser}
                />
            </div>
            <Legend horizontal data={trelloTasksByUser} dataId={'key'} />
        </div>
    }
}

export default Dimensions()(StatsPage)
