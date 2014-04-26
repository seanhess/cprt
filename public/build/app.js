(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */var Projects = require('./projects.jsx')
var Nav = require('./nav.jsx')
var DataTest = require('./test.jsx')

var Root = React.createClass({displayName: 'Root',

    pages: [
        {name: "Projects", component: Projects(null )},
        {name: "Data Test", component: DataTest(null )},
    ],

    getInitialState: function() {
        return {isMenuOpen: false, currentPage: this.pages[0]}
    },

    showMenu: function() {
        this.setState({isMenuOpen: !this.state.isMenuOpen})
    },

    onNav: function(page) {
        this.setState({isMenuOpen: false, currentPage: page})
    },

    render: function() {
        var classes = React.addons.classSet({
            'main-container': true,
            'cbp-spmenu-push': true,
            'cbp-spmenu-push-toright' : this.state.isMenuOpen
        })
        return (
            React.DOM.div( {className:classes}, 
                Nav( {isOpen:this.state.isMenuOpen, onSelect:this.onNav, pages:this.pages}),
                React.DOM.button( {className:"menu-button", onClick:this.showMenu}, "M"),
                React.DOM.div( {className:"active-page"}, 
                    this.state.currentPage.component
                )
            )
        )
    }
})

React.renderComponent(Root(null ), document.getElementById('root'));

},{"./nav.jsx":3,"./projects.jsx":4,"./test.jsx":5}],2:[function(require,module,exports){


var rootRef = exports.rootRef = new Firebase("https://cprt.firebaseio.com/");
var projectsRef = exports.projectsRef = rootRef.child("projects")

// I can maintain the state here I guess.... 

exports.nameId = function(name) {
    return name.replace(/\W/g, "-")
}
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */// Shows/hides, takes an array of pages that it renders and reports as selected
module.exports = React.createClass({displayName: 'exports',
    render: function() {

        var classes = React.addons.classSet({
            'cbp-spmenu': true,
            'cbp-spmenu-vertical': true, 
            'cbp-spmenu-left' : true,
            'cbp-spmenu-open' : this.props.isOpen,
        })

        return (React.DOM.nav( {className:classes, id:"cbp-spmenu-s1"}, 
            React.DOM.h3(null, "Menu"),
            this.renderPages()
        ))
    },

    renderPages: function() {
        return this.props.pages.map(function(page) {
            return React.DOM.a( {key:page.name, onClick:this.onSelect.bind(this, page)}, page.name)
        }.bind(this))
    },

    onSelect: function(page) {
        this.props.onSelect(page)
    },
})
},{}],4:[function(require,module,exports){
/** @jsx React.DOM */var fb = require('./firebase')

var ProjectPage = module.exports = React.createClass({displayName: 'exports',

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
            page = (React.DOM.div(null, 
                React.DOM.button( {onClick:this.addNewProject}, "Add New Project"),
                ProjectsList( {projects:this.state.projects, onSelectProject:this.onSelectProject})
            ))
        }

        else if (this.state.currentPage == "form") {
            page = ProjectForm( {onNewProject:this.onNewProject} )
        }
        else if (this.state.currentPage == "details") {
            page = ProjectDetails( {project:this.state.selectedProject, onClose:this.closeProject})
        }

        return (
            React.DOM.div(null, 
                React.DOM.h3( {className:"page-header"}, "Projects"),
                page
            )
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

var ProjectsList = React.createClass({displayName: 'ProjectsList',
    render: function() {
        var rows = this.props.projects.map(function(project) {
            return ProjectRow( {key:project.name, project:project, onSelectProject:this.props.onSelectProject})
        }.bind(this))

        return (React.DOM.div(null, rows))
    },  
})

var ProjectRow = React.createClass({displayName: 'ProjectRow',
    render: function() {
        var project = this.props.project
        return (React.DOM.div( {className:"project-row", onClick:this.onClick}, 
            React.DOM.span(null, project.name)
        ))
    },

    onClick: function() {
        this.props.onSelectProject(this.props.project)
    },
})

var ProjectForm = React.createClass({displayName: 'ProjectForm',
    render: function() {
        return (React.DOM.form( {onSubmit:this.onSubmit}, 
            React.DOM.h3(null, "New Project"),
            React.DOM.div(null, React.DOM.input( {type:"text", ref:"name"})),
            React.DOM.div(null, React.DOM.input( {type:"submit"} ))
        ))
    },

    onSubmit: function() {
        this.props.onNewProject({
            name: this.refs.name.getDOMNode().value
        })
        return false
    },
})

var ProjectDetails = React.createClass({displayName: 'ProjectDetails',
    render: function() {
        return (React.DOM.div( {className:"project-details"}, 
            this.props.project.name,
            React.DOM.div(null, React.DOM.button( {onClick:this.props.onClose}, "Close"))
        ))
    },
})

var fakeProjects = [
    {name: "MATPAAS mk 2"},
    {name: "Alien Alloys"},
    {name: "Alien Energy Source 2"},
    {name: "Kangaroo Legs"},
]
},{"./firebase":2}],5:[function(require,module,exports){
/** @jsx React.DOM */
module.exports = React.createClass({displayName: 'exports',

    fakeSuperComment: {id: "2", text: "fake guy"},

    getInitialState: function() {
        return {comments: [{text:"fake comment"}]}
    },

    componentWillMount: function() {
        $.get('./package.json', function(data) {
            var comments = [this.fakeSuperComment]
            this.setState({comments: comments})
        }.bind(this))
    },

    render: function() {
        var comments = this.state.comments.map(function(comment) {
            return Comment( {key:comment.id, text:comment.text})
        })
        return (
            React.DOM.div(null, 
                React.DOM.ul( {className:"comments"}, comments),
                React.DOM.form( {className:"commentForm"}, 
                    React.DOM.input( {type:"text", ref:"text", onChange:this.onChangeField})
                )
            )
        )
    },

    onChangeField: function(event) {
        console.log("Changed", event.target.value)
        this.fakeSuperComment.text = event.target.value // or this.refs.text
        this.setState({comments:[this.fakeSuperComment]})
    },
})



var Comment = React.createClass({displayName: 'Comment',
    render: function() {
        return (
            React.DOM.li( {className:"comment"}, 
                this.props.text
            )
        )
    }
})
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9hcHAuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9maXJlYmFzZS5qcyIsIi9Vc2Vycy9zZWFuaGVzcy9wcm9qZWN0cy9jcHJ0L3B1YmxpYy9hcHAvbmF2LmpzeCIsIi9Vc2Vycy9zZWFuaGVzcy9wcm9qZWN0cy9jcHJ0L3B1YmxpYy9hcHAvcHJvamVjdHMuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC90ZXN0LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIFByb2plY3RzID0gcmVxdWlyZSgnLi9wcm9qZWN0cy5qc3gnKVxudmFyIE5hdiA9IHJlcXVpcmUoJy4vbmF2LmpzeCcpXG52YXIgRGF0YVRlc3QgPSByZXF1aXJlKCcuL3Rlc3QuanN4JylcblxudmFyIFJvb3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdSb290JyxcblxuICAgIHBhZ2VzOiBbXG4gICAgICAgIHtuYW1lOiBcIlByb2plY3RzXCIsIGNvbXBvbmVudDogUHJvamVjdHMobnVsbCApfSxcbiAgICAgICAge25hbWU6IFwiRGF0YSBUZXN0XCIsIGNvbXBvbmVudDogRGF0YVRlc3QobnVsbCApfSxcbiAgICBdLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtpc01lbnVPcGVuOiBmYWxzZSwgY3VycmVudFBhZ2U6IHRoaXMucGFnZXNbMF19XG4gICAgfSxcblxuICAgIHNob3dNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNZW51T3BlbjogIXRoaXMuc3RhdGUuaXNNZW51T3Blbn0pXG4gICAgfSxcblxuICAgIG9uTmF2OiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTWVudU9wZW46IGZhbHNlLCBjdXJyZW50UGFnZTogcGFnZX0pXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcbiAgICAgICAgICAgICdtYWluLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS1wdXNoJzogdHJ1ZSxcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXB1c2gtdG9yaWdodCcgOiB0aGlzLnN0YXRlLmlzTWVudU9wZW5cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6Y2xhc3Nlc30sIFxuICAgICAgICAgICAgICAgIE5hdigge2lzT3Blbjp0aGlzLnN0YXRlLmlzTWVudU9wZW4sIG9uU2VsZWN0OnRoaXMub25OYXYsIHBhZ2VzOnRoaXMucGFnZXN9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7Y2xhc3NOYW1lOlwibWVudS1idXR0b25cIiwgb25DbGljazp0aGlzLnNob3dNZW51fSwgXCJNXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJhY3RpdmUtcGFnZVwifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudFBhZ2UuY29tcG9uZW50XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxufSlcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFJvb3QobnVsbCApLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcbiIsIlxuXG52YXIgcm9vdFJlZiA9IGV4cG9ydHMucm9vdFJlZiA9IG5ldyBGaXJlYmFzZShcImh0dHBzOi8vY3BydC5maXJlYmFzZWlvLmNvbS9cIik7XG52YXIgcHJvamVjdHNSZWYgPSBleHBvcnRzLnByb2plY3RzUmVmID0gcm9vdFJlZi5jaGlsZChcInByb2plY3RzXCIpXG5cbi8vIEkgY2FuIG1haW50YWluIHRoZSBzdGF0ZSBoZXJlIEkgZ3Vlc3MuLi4uIFxuXG5leHBvcnRzLm5hbWVJZCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9cXFcvZywgXCItXCIpXG59IiwiLyoqIEBqc3ggUmVhY3QuRE9NICovLy8gU2hvd3MvaGlkZXMsIHRha2VzIGFuIGFycmF5IG9mIHBhZ2VzIHRoYXQgaXQgcmVuZGVycyBhbmQgcmVwb3J0cyBhcyBzZWxlY3RlZFxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBjbGFzc2VzID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcbiAgICAgICAgICAgICdjYnAtc3BtZW51JzogdHJ1ZSxcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXZlcnRpY2FsJzogdHJ1ZSwgXG4gICAgICAgICAgICAnY2JwLXNwbWVudS1sZWZ0JyA6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS1vcGVuJyA6IHRoaXMucHJvcHMuaXNPcGVuLFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLm5hdigge2NsYXNzTmFtZTpjbGFzc2VzLCBpZDpcImNicC1zcG1lbnUtczFcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmgzKG51bGwsIFwiTWVudVwiKSxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUGFnZXMoKVxuICAgICAgICApKVxuICAgIH0sXG5cbiAgICByZW5kZXJQYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnBhZ2VzLm1hcChmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuRE9NLmEoIHtrZXk6cGFnZS5uYW1lLCBvbkNsaWNrOnRoaXMub25TZWxlY3QuYmluZCh0aGlzLCBwYWdlKX0sIHBhZ2UubmFtZSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0sXG5cbiAgICBvblNlbGVjdDogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHBhZ2UpXG4gICAgfSxcbn0pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIGZiID0gcmVxdWlyZSgnLi9maXJlYmFzZScpXG5cbnZhciBQcm9qZWN0UGFnZSA9IG1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge3Byb2plY3RzOiBbXSwgY3VycmVudFBhZ2U6ICdsaXN0Jywgc2VsZWN0ZWRQcm9qZWN0OiBudWxsfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyB0aGlzIHNob3VsZCBnbyBzb21ld2hlcmUgZWxzZS4uLlxuICAgICAgICBmYi5wcm9qZWN0c1JlZi5vbignY2hpbGRfYWRkZWQnLCBmdW5jdGlvbihzbmFwc2hvdCwgcHJldkNoaWxkTmFtZSkge1xuICAgICAgICAgICAgdmFyIHByb2plY3QgPSBzbmFwc2hvdC52YWwoKVxuICAgICAgICAgICAgcHJvamVjdC5pZCA9IHNuYXBzaG90Lm5hbWUoKVxuICAgICAgICAgICAgdmFyIHByb2plY3RzID0gdGhpcy5zdGF0ZS5wcm9qZWN0cy5jb25jYXQoW3Byb2plY3RdKVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHByb2plY3RzOiBwcm9qZWN0c30pXG4gICAgICAgIH0uYmluZCh0aGlzKSlcblxuICAgICAgICBmYi5wcm9qZWN0c1JlZi5vbignY2hpbGRfcmVtb3ZlZCcsIGZ1bmN0aW9uKHNuYXBzaG90KSB7XG4gICAgICAgICAgICB2YXIgcHJvamVjdHMgPSB0aGlzLnN0YXRlLnByb2plY3RzLmZpbHRlcihmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3QubmFtZSAhPSBzbmFwc2hvdC5uYW1lKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwcm9qZWN0czogcHJvamVjdHN9KVxuICAgICAgICB9LmJpbmQodGhpcykpXG5cbiAgICAgICAgLy8gZmIucHJvamVjdHNSZWYub24oJ2NoaWxkX2NoYW5nZWQnLCBmdW5jdGlvbihzbmFwc2hvdCwgcHJldkNoaWxkTmFtZSkge1xuICAgICAgICAvLyAgICAgdmFyIHByb2plY3RzID0gdGhpcy5zdGF0ZS5wcm9qZWN0cy5jb25jYXQoW3NuYXBzaG90LnZhbCgpXSlcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe3Byb2plY3RzOiBwcm9qZWN0cywgY3VycmVudFBhZ2U6IHRoaXMuc3RhdGUuY3VycmVudFBhZ2V9KVxuICAgICAgICAvLyB9KVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGFnZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT0gXCJsaXN0XCIpIHtcbiAgICAgICAgICAgIHBhZ2UgPSAoUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7b25DbGljazp0aGlzLmFkZE5ld1Byb2plY3R9LCBcIkFkZCBOZXcgUHJvamVjdFwiKSxcbiAgICAgICAgICAgICAgICBQcm9qZWN0c0xpc3QoIHtwcm9qZWN0czp0aGlzLnN0YXRlLnByb2plY3RzLCBvblNlbGVjdFByb2plY3Q6dGhpcy5vblNlbGVjdFByb2plY3R9KVxuICAgICAgICAgICAgKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT0gXCJmb3JtXCIpIHtcbiAgICAgICAgICAgIHBhZ2UgPSBQcm9qZWN0Rm9ybSgge29uTmV3UHJvamVjdDp0aGlzLm9uTmV3UHJvamVjdH0gKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT0gXCJkZXRhaWxzXCIpIHtcbiAgICAgICAgICAgIHBhZ2UgPSBQcm9qZWN0RGV0YWlscygge3Byb2plY3Q6dGhpcy5zdGF0ZS5zZWxlY3RlZFByb2plY3QsIG9uQ2xvc2U6dGhpcy5jbG9zZVByb2plY3R9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmgzKCB7Y2xhc3NOYW1lOlwicGFnZS1oZWFkZXJcIn0sIFwiUHJvamVjdHNcIiksXG4gICAgICAgICAgICAgICAgcGFnZVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfSxcblxuICAgIGNsb3NlUHJvamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRQYWdlOiAnbGlzdCd9KVxuICAgIH0sXG5cbiAgICBvblNlbGVjdFByb2plY3Q6IGZ1bmN0aW9uKHByb2plY3QpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRQcm9qZWN0OiBwcm9qZWN0LCBjdXJyZW50UGFnZTonZGV0YWlscyd9KVxuICAgIH0sXG5cbiAgICBhZGROZXdQcm9qZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudFBhZ2U6ICdmb3JtJ30pXG4gICAgfSxcblxuICAgIG9uTmV3UHJvamVjdDogZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICB2YXIgY2hpbGRSZWYgPSBmYi5wcm9qZWN0c1JlZi5jaGlsZChmYi5uYW1lSWQocHJvamVjdC5uYW1lKSlcbiAgICAgICAgY2hpbGRSZWYuc2V0KHByb2plY3QpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRQYWdlOiAnbGlzdCd9KVxuICAgIH0sXG59KVxuXG52YXIgUHJvamVjdHNMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnUHJvamVjdHNMaXN0JyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcm93cyA9IHRoaXMucHJvcHMucHJvamVjdHMubWFwKGZ1bmN0aW9uKHByb2plY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9qZWN0Um93KCB7a2V5OnByb2plY3QubmFtZSwgcHJvamVjdDpwcm9qZWN0LCBvblNlbGVjdFByb2plY3Q6dGhpcy5wcm9wcy5vblNlbGVjdFByb2plY3R9KVxuICAgICAgICB9LmJpbmQodGhpcykpXG5cbiAgICAgICAgcmV0dXJuIChSZWFjdC5ET00uZGl2KG51bGwsIHJvd3MpKVxuICAgIH0sICBcbn0pXG5cbnZhciBQcm9qZWN0Um93ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnUHJvamVjdFJvdycsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHByb2plY3QgPSB0aGlzLnByb3BzLnByb2plY3RcbiAgICAgICAgcmV0dXJuIChSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicHJvamVjdC1yb3dcIiwgb25DbGljazp0aGlzLm9uQ2xpY2t9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKG51bGwsIHByb2plY3QubmFtZSlcbiAgICAgICAgKSlcbiAgICB9LFxuXG4gICAgb25DbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3RQcm9qZWN0KHRoaXMucHJvcHMucHJvamVjdClcbiAgICB9LFxufSlcblxudmFyIFByb2plY3RGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnUHJvamVjdEZvcm0nLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLmZvcm0oIHtvblN1Ym1pdDp0aGlzLm9uU3VibWl0fSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaDMobnVsbCwgXCJOZXcgUHJvamVjdFwiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInRleHRcIiwgcmVmOlwibmFtZVwifSkpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBSZWFjdC5ET00uaW5wdXQoIHt0eXBlOlwic3VibWl0XCJ9ICkpXG4gICAgICAgICkpXG4gICAgfSxcblxuICAgIG9uU3VibWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk5ld1Byb2plY3Qoe1xuICAgICAgICAgICAgbmFtZTogdGhpcy5yZWZzLm5hbWUuZ2V0RE9NTm9kZSgpLnZhbHVlXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG59KVxuXG52YXIgUHJvamVjdERldGFpbHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdQcm9qZWN0RGV0YWlscycsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwicHJvamVjdC1kZXRhaWxzXCJ9LCBcbiAgICAgICAgICAgIHRoaXMucHJvcHMucHJvamVjdC5uYW1lLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBSZWFjdC5ET00uYnV0dG9uKCB7b25DbGljazp0aGlzLnByb3BzLm9uQ2xvc2V9LCBcIkNsb3NlXCIpKVxuICAgICAgICApKVxuICAgIH0sXG59KVxuXG52YXIgZmFrZVByb2plY3RzID0gW1xuICAgIHtuYW1lOiBcIk1BVFBBQVMgbWsgMlwifSxcbiAgICB7bmFtZTogXCJBbGllbiBBbGxveXNcIn0sXG4gICAge25hbWU6IFwiQWxpZW4gRW5lcmd5IFNvdXJjZSAyXCJ9LFxuICAgIHtuYW1lOiBcIkthbmdhcm9vIExlZ3NcIn0sXG5dIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuXG4gICAgZmFrZVN1cGVyQ29tbWVudDoge2lkOiBcIjJcIiwgdGV4dDogXCJmYWtlIGd1eVwifSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7Y29tbWVudHM6IFt7dGV4dDpcImZha2UgY29tbWVudFwifV19XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQuZ2V0KCcuL3BhY2thZ2UuanNvbicsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50cyA9IFt0aGlzLmZha2VTdXBlckNvbW1lbnRdXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50czogY29tbWVudHN9KVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21tZW50cyA9IHRoaXMuc3RhdGUuY29tbWVudHMubWFwKGZ1bmN0aW9uKGNvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBDb21tZW50KCB7a2V5OmNvbW1lbnQuaWQsIHRleHQ6Y29tbWVudC50ZXh0fSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnVsKCB7Y2xhc3NOYW1lOlwiY29tbWVudHNcIn0sIGNvbW1lbnRzKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uZm9ybSgge2NsYXNzTmFtZTpcImNvbW1lbnRGb3JtXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInRleHRcIiwgcmVmOlwidGV4dFwiLCBvbkNoYW5nZTp0aGlzLm9uQ2hhbmdlRmllbGR9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH0sXG5cbiAgICBvbkNoYW5nZUZpZWxkOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZWRcIiwgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICB0aGlzLmZha2VTdXBlckNvbW1lbnQudGV4dCA9IGV2ZW50LnRhcmdldC52YWx1ZSAvLyBvciB0aGlzLnJlZnMudGV4dFxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50czpbdGhpcy5mYWtlU3VwZXJDb21tZW50XX0pXG4gICAgfSxcbn0pXG5cblxuXG52YXIgQ29tbWVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0NvbW1lbnQnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5ET00ubGkoIHtjbGFzc05hbWU6XCJjb21tZW50XCJ9LCBcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnRleHRcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbn0pIl19
