var Progress = require('../components/progress.jsx')
var PointBars = require('../components/PointBars.jsx')
var Project = require('./Project')

module.exports = React.createClass({
    render: function() {
        var project = this.props.project
        return (<div className="table-row" onClick={this.onClick}>
            <span className="row-title">{project.name}</span>
            <div className="row-data">
                <Progress value={this.props.project.total} progress={Project.pointsProgress(this.props.project)}/>
            </div>
            <div className="row-data">
                <PointBars points={this.props.project.points} />
            </div>
        </div>)
    },

    onClick: function() {
        this.props.onSelectProject(this.props.project)
    },
})