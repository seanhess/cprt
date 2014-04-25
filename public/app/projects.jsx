var ProjectPage = module.exports = React.createClass({

    getInitialState: function() {
        return {projects: fakeProjects, currentPage: 'list'}
    },

    render: function() {
        var page;
        if (this.state.currentPage == "list")
            page = <ProjectsList projects={this.state.projects} onSelectProject={this.onSelectProject}/>
        else if (this.state.currentPage == "form")
            page = <ProjectForm onNewProject={this.onNewProject} />
        else if (this.state.currentPage == "details")
            page = <div>DETAILS</div>

        return (
            <div>
                <h3 className="page-header">Projects</h3>
                <div>
                    <button onClick={this.addNewProject}>Add New Project</button>
                </div>
                {page}
            </div>
        )
    },

    onSelectProject: function(project) {
        console.log("SELECTED PROJECT", project)
    },

    addNewProject: function(project) {
        this.setState({projects: this.state.projects, currentPage: 'form'})
    },

    onNewProject: function(project) {
        this.setState({projects: this.state.projects.concat([project]), currentPage: 'list'})
    },
})

var ProjectsList = React.createClass({
    render: function() {
        var rows = this.props.projects.map(function(project) {
            return <ProjectRow key={project.name} project={project} onSelectProject={this.props.onSelectProject}/>
        }.bind(this))

        return (<div>{rows}</div>)
    },  
})

var ProjectRow = React.createClass({
    render: function() {
        var project = this.props.project
        return (<div className="project-row" onClick={this.onClick}>
            <span>{project.name}</span>
        </div>)
    },

    onClick: function() {
        this.props.onSelectProject(this.props.project)
    },
})

var ProjectForm = React.createClass({
    render: function() {
        return (<form onSubmit={this.onSubmit}>
            <h3>New Project</h3>
            <div><input type="text" ref="name"/></div>
            <div><input type="submit" /></div>
        </form>)
    },

    onSubmit: function() {
        console.log("ON SUBMIT")
        this.props.onNewProject({
            name: this.refs.name.getDOMNode().value
        })
        return false
    },
})

var fakeProjects = [
    {name: "MATPAAS mk 2"},
    {name: "Alien Alloys"},
    {name: "Alien Energy Source 2"},
    {name: "Kangaroo Legs"},
]