var fb = require('./firebase')

var ProjectPage = module.exports = React.createClass({

    getInitialState: function() {
        return {projects: [], currentPage: 'list', selectedProject: null}
    },

    componentWillMount: function() {
        // this should go somewhere else...
        fb.projectsRef.on('child_added', function(snapshot, prevChildName) {
            var project = snapshot.val()
            project.id = snapshot.name()
            var projects = this.state.projects.concat([project])
            this.setState({ projects: projects})
        }.bind(this))

        fb.projectsRef.on('child_removed', function(snapshot) {
            var projects = this.state.projects.filter(function(project) {
                return project.name != snapshot.name()
            })
            this.setState({projects: projects})
        }.bind(this))

        // fb.projectsRef.on('child_changed', function(snapshot, prevChildName) {
        //     var projects = this.state.projects.concat([snapshot.val()])
        //     this.setState({projects: projects, currentPage: this.state.currentPage})
        // })
    },

    render: function() {
        var page;
        if (this.state.currentPage == "list") {
            page = (<div>
                <button onClick={this.addNewProject}>Add New Project</button>
                <ProjectsList projects={this.state.projects} onSelectProject={this.onSelectProject}/>
            </div>)
        }

        else if (this.state.currentPage == "form") {
            page = <ProjectForm onNewProject={this.onNewProject} />
        }
        else if (this.state.currentPage == "details") {
            page = <ProjectDetails project={this.state.selectedProject} onClose={this.closeProject}/>
        }

        return (
            <div>
                <h3 className="page-header">Projects</h3>
                {page}
            </div>
        )
    },

    closeProject: function() {
        this.setState({currentPage: 'list'})
    },

    onSelectProject: function(project) {
        this.setState({selectedProject: project, currentPage:'details'})
    },

    addNewProject: function() {
        this.setState({currentPage: 'form'})
    },

    onNewProject: function(project) {
        var childRef = fb.projectsRef.child(fb.nameId(project.name))
        childRef.set(project)
        this.setState({currentPage: 'list'})
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
        this.props.onNewProject({
            name: this.refs.name.getDOMNode().value
        })
        return false
    },
})

var ProjectDetails = React.createClass({
    render: function() {
        return (<div className="project-details">
            {this.props.project.name}
            <div><button onClick={this.props.onClose}>Close</button></div>
        </div>)
    },
})

var fakeProjects = [
    {name: "MATPAAS mk 2"},
    {name: "Alien Alloys"},
    {name: "Alien Energy Source 2"},
    {name: "Kangaroo Legs"},
]