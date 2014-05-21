module.exports = React.createClass({
    render: function() {
        return (<div className="project-details">
            <div><button onClick={this.props.onClose}>Close</button></div>
            <p>{this.props.project.name}</p>
            <p>{this.props.project.total} Total Points</p>
            <p>
                <button onClick={this.pointMinus}>-</button>
                <span>{this.props.project.points}</span>
                <button onClick={this.pointPlus}>+</button>
            </p>
            <div>
                <button onClick={this.onDelete}>Delete Project</button>
            </div>
        </div>)
    },

    onDelete: function() {
        this.props.onDelete(this.props.project)
    },

    pointMinus: function() {
        this.props.project.points--
        this.props.onEditProject(this.props.project)
    },

    pointPlus: function() {
        this.props.project.points++
        this.props.onEditProject(this.props.project)
    }
})