var Project = require('./Project')

module.exports = React.createClass({
    render: function() {
        return (<form onSubmit={this.onSubmit}>
            <h3>New Project</h3>
            <div><input type="text" ref="name"/> Name</div>
            <div><input type="number" ref="points"/> Points Required</div>
            <div><input type="submit" /></div>
        </form>)
    },

    onSubmit: function() {
        var name = this.refs.name.getDOMNode().value
        var total = this.refs.points.getDOMNode().value
        var project = Project.newProject(this.refs.name.getDOMNode().value, this.refs.points.getDOMNode().value)
        this.props.onNewProject(project)
        return false
    },
})