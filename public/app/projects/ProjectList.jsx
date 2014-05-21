var ProjectRow = require('./ProjectRow.jsx')

module.exports = React.createClass({
    render: function() {
        var rows = this.props.projects.map(function(project) {
            return <ProjectRow key={project.name} project={project} onSelectProject={this.props.onSelectProject}/>
        }.bind(this))

        return (<div>{rows}</div>)
    },  
})
