var fb = require('./firebase')

var ProjectPage = module.exports = React.createClass({

    getInitialState: function() {
        return {projects: [], currentPage: 'list', selectedProject: null}
    },

    componentWillMount: function() {
        // I'm not happy that I have to keep this around.
        // it doesn't feel like it really belongs in the state either

        // I'd say put it in the parent too
        // rule of thumb: views should be renerable server-side

        this.projectsManagedArray = fb.managedArray(fb.projectsRef, function(projects) {
            this.setState({projects:  projects})
        }.bind(this))
    },

    render: function() {
        var page;
        if (this.state.currentPage == "list") {
            page = (<div>
                <button onClick={this.addNewProject}>+ New Project</button>
                <ProjectsList projects={this.state.projects} onSelectProject={this.onSelectProject}/>
            </div>)
        }

        else if (this.state.currentPage == "form") {
            page = <ProjectForm onNewProject={this.onNewProject} />
        }
        else if (this.state.currentPage == "details") {
            page = <ProjectDetails project={this.state.selectedProject} onClose={this.closeProject}/>
        }

        return (<div className="page-padding">
            <header>
                <div className="header-info">0/10 points</div>
                <h1 className="site-header-title">CPRT: Projects</h1>
            </header> 
            <div>{page}</div>
        </div>)
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
        project.id = fb.nameId(project.name)
        this.projectsManagedArray.add(project)
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
        return (<div className="table-row" onClick={this.onClick}>
            <span className="row-title">{project.name}</span>
            <span className="row-data">
                <div className="row-data-value">40</div>
                <div className="row-data-label">left</div>
            </span>
            <span className="row-data">
                <div className="row-data-value">10</div>
                <div className="row-data-label">priority</div>
            </span>
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
            <div><button onClick={this.props.onClose}>Close</button></div>
            <div>{this.props.project.name}</div>
        </div>)
    },
})

var fakeProjects = [
    {name: "MATPAAS mk 2"},
    {name: "Alien Alloys"},
    {name: "Alien Energy Source 2"},
    {name: "Kangaroo Legs"},
]