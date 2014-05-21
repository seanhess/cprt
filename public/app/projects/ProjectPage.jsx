var fb = require('../firebase')
var Progress = require('../components/progress.jsx')
var PointBars = require('../components/PointBars.jsx')
var ProjectForm = require('./ProjectForm.jsx')
var ProjectList = require('./ProjectList.jsx')
var ProjectDetails = require('./ProjectDetails.jsx')
var ProjectRow = require('./ProjectRow.jsx')

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
                <ProjectList projects={this.state.projects} onSelectProject={this.onSelectProject}/>
            </div>)
        }

        else if (this.state.currentPage == "form") {
            page = <ProjectForm onNewProject={this.onNewProject} />
        }
        else if (this.state.currentPage == "details") {
            page = <ProjectDetails 
                project={this.state.selectedProject} 
                onDelete={this.deleteProject} 
                onEditProject={this.onEditProject}
                onClose={this.closeProject} />
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

    onEditProject: function(project) {
        this.setState({selectedProject:project})
    },

    deleteProject: function(project) {
        this.projectsManagedArray.remove(project)
        this.setState({currentPage: 'list'})
    }
})

