(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */var Projects = require('./projects.jsx')
var Nav = require('./nav.jsx')
var DataTest = require('./test.jsx')
var Login = require('./login.jsx')

var Root = React.createClass({displayName: 'Root',

    pages: [
        {name: "Projects", component: Projects(null )},
        // {name: "Data Test", component: <DataTest />},
        {name: "Login", component: Login(null )},
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
                React.DOM.button( {className:"menu-button", onClick:this.showMenu}, "Menu"),

                React.DOM.div( {className:"active-page"}, 
                    this.state.currentPage.component
                )
            )
        )
    }
})

React.renderComponent(Root(null ), document.getElementById('root'));

// I need some kind of navigation controller
// unless I have it get back to the root somehow...
// unless I REPEAT the header on each page

},{"./login.jsx":3,"./nav.jsx":4,"./projects.jsx":5,"./test.jsx":6}],2:[function(require,module,exports){


var rootRef = exports.rootRef = new Firebase("https://cprt.firebaseio.com/");
var projectsRef = exports.projectsRef = rootRef.child("projects")

// I can maintain the state here I guess.... 

exports.nameId = function(name) {
    return name.replace(/\W/g, "-")
}

// an object that notifies you of updates
// sets the "id" field based on the ref name
// expects a .id field on new items
exports.managedArray = function(ref, onUpdate) {
    var items = []

    ref.on('child_added', function(snapshot, prevChildName) {
        var item = snapshot.val()
        item.id = snapshot.name()
        items = items.concat([item])
        onUpdate(items)
    })

    ref.on('child_removed', function(snapshot) {
        items = items.filter(function(item) {
            return snapshot.name() != item.id
        })
        onUpdate(items)
    })

    return {
        add: function(item) {
            console.log("ADDING", item, item.id)
            var childRef = ref.child(item.id)
            childRef.set(item)
        }
    }
}
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */// Shows/hides, takes an array of pages that it renders and reports as selected
module.exports = React.createClass({displayName: 'exports',
    render: function() {

        // var classes = React.addons.classSet({
        //     'cbp-spmenu': true,
        // })

        return (React.DOM.div( {className:"login"}, 
            React.DOM.h1(null, "CPRT")
        ))
    },
})
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
/** @jsx React.DOM */var fb = require('./firebase')

var ProjectPage = module.exports = React.createClass({displayName: 'exports',

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
            page = (React.DOM.div(null, 
                React.DOM.button( {onClick:this.addNewProject}, "+ New Project"),
                ProjectsList( {projects:this.state.projects, onSelectProject:this.onSelectProject})
            ))
        }

        else if (this.state.currentPage == "form") {
            page = ProjectForm( {onNewProject:this.onNewProject} )
        }
        else if (this.state.currentPage == "details") {
            page = ProjectDetails( {project:this.state.selectedProject, onClose:this.closeProject})
        }

        return (React.DOM.div( {className:"page-padding"}, 
            React.DOM.header(null, 
                React.DOM.div( {className:"header-info"}, "0/10 points"),
                React.DOM.h1( {className:"site-header-title"}, "CPRT: Projects")
            ), 
            React.DOM.div(null, page)
        ))
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
        return (React.DOM.div( {className:"table-row", onClick:this.onClick}, 
            React.DOM.span( {className:"row-title"}, project.name),
            React.DOM.span( {className:"row-data"}, 
                React.DOM.div( {className:"row-data-value"}, "40"),
                React.DOM.div( {className:"row-data-label"}, "left")
            ),
            React.DOM.span( {className:"row-data"}, 
                React.DOM.div( {className:"row-data-value"}, "10"),
                React.DOM.div( {className:"row-data-label"}, "priority")
            )
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
            React.DOM.div(null, React.DOM.button( {onClick:this.props.onClose}, "Close")),
            React.DOM.div(null, this.props.project.name)
        ))
    },
})

var fakeProjects = [
    {name: "MATPAAS mk 2"},
    {name: "Alien Alloys"},
    {name: "Alien Energy Source 2"},
    {name: "Kangaroo Legs"},
]
},{"./firebase":2}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9hcHAuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9maXJlYmFzZS5qcyIsIi9Vc2Vycy9zZWFuaGVzcy9wcm9qZWN0cy9jcHJ0L3B1YmxpYy9hcHAvbG9naW4uanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9uYXYuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9wcm9qZWN0cy5qc3giLCIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9wdWJsaWMvYXBwL3Rlc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL3ZhciBQcm9qZWN0cyA9IHJlcXVpcmUoJy4vcHJvamVjdHMuanN4JylcbnZhciBOYXYgPSByZXF1aXJlKCcuL25hdi5qc3gnKVxudmFyIERhdGFUZXN0ID0gcmVxdWlyZSgnLi90ZXN0LmpzeCcpXG52YXIgTG9naW4gPSByZXF1aXJlKCcuL2xvZ2luLmpzeCcpXG5cbnZhciBSb290ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnUm9vdCcsXG5cbiAgICBwYWdlczogW1xuICAgICAgICB7bmFtZTogXCJQcm9qZWN0c1wiLCBjb21wb25lbnQ6IFByb2plY3RzKG51bGwgKX0sXG4gICAgICAgIC8vIHtuYW1lOiBcIkRhdGEgVGVzdFwiLCBjb21wb25lbnQ6IDxEYXRhVGVzdCAvPn0sXG4gICAgICAgIHtuYW1lOiBcIkxvZ2luXCIsIGNvbXBvbmVudDogTG9naW4obnVsbCApfSxcbiAgICBdLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtpc01lbnVPcGVuOiBmYWxzZSwgY3VycmVudFBhZ2U6IHRoaXMucGFnZXNbMF19XG4gICAgfSxcblxuICAgIHNob3dNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNZW51T3BlbjogIXRoaXMuc3RhdGUuaXNNZW51T3Blbn0pXG4gICAgfSxcblxuICAgIG9uTmF2OiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTWVudU9wZW46IGZhbHNlLCBjdXJyZW50UGFnZTogcGFnZX0pXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcbiAgICAgICAgICAgICdtYWluLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS1wdXNoJzogdHJ1ZSxcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXB1c2gtdG9yaWdodCcgOiB0aGlzLnN0YXRlLmlzTWVudU9wZW5cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6Y2xhc3Nlc30sIFxuICAgICAgICAgICAgICAgIE5hdigge2lzT3Blbjp0aGlzLnN0YXRlLmlzTWVudU9wZW4sIG9uU2VsZWN0OnRoaXMub25OYXYsIHBhZ2VzOnRoaXMucGFnZXN9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7Y2xhc3NOYW1lOlwibWVudS1idXR0b25cIiwgb25DbGljazp0aGlzLnNob3dNZW51fSwgXCJNZW51XCIpLFxuXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImFjdGl2ZS1wYWdlXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50UGFnZS5jb21wb25lbnRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59KVxuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQoUm9vdChudWxsICksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuXG4vLyBJIG5lZWQgc29tZSBraW5kIG9mIG5hdmlnYXRpb24gY29udHJvbGxlclxuLy8gdW5sZXNzIEkgaGF2ZSBpdCBnZXQgYmFjayB0byB0aGUgcm9vdCBzb21laG93Li4uXG4vLyB1bmxlc3MgSSBSRVBFQVQgdGhlIGhlYWRlciBvbiBlYWNoIHBhZ2VcbiIsIlxuXG52YXIgcm9vdFJlZiA9IGV4cG9ydHMucm9vdFJlZiA9IG5ldyBGaXJlYmFzZShcImh0dHBzOi8vY3BydC5maXJlYmFzZWlvLmNvbS9cIik7XG52YXIgcHJvamVjdHNSZWYgPSBleHBvcnRzLnByb2plY3RzUmVmID0gcm9vdFJlZi5jaGlsZChcInByb2plY3RzXCIpXG5cbi8vIEkgY2FuIG1haW50YWluIHRoZSBzdGF0ZSBoZXJlIEkgZ3Vlc3MuLi4uIFxuXG5leHBvcnRzLm5hbWVJZCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gbmFtZS5yZXBsYWNlKC9cXFcvZywgXCItXCIpXG59XG5cbi8vIGFuIG9iamVjdCB0aGF0IG5vdGlmaWVzIHlvdSBvZiB1cGRhdGVzXG4vLyBzZXRzIHRoZSBcImlkXCIgZmllbGQgYmFzZWQgb24gdGhlIHJlZiBuYW1lXG4vLyBleHBlY3RzIGEgLmlkIGZpZWxkIG9uIG5ldyBpdGVtc1xuZXhwb3J0cy5tYW5hZ2VkQXJyYXkgPSBmdW5jdGlvbihyZWYsIG9uVXBkYXRlKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cblxuICAgIHJlZi5vbignY2hpbGRfYWRkZWQnLCBmdW5jdGlvbihzbmFwc2hvdCwgcHJldkNoaWxkTmFtZSkge1xuICAgICAgICB2YXIgaXRlbSA9IHNuYXBzaG90LnZhbCgpXG4gICAgICAgIGl0ZW0uaWQgPSBzbmFwc2hvdC5uYW1lKClcbiAgICAgICAgaXRlbXMgPSBpdGVtcy5jb25jYXQoW2l0ZW1dKVxuICAgICAgICBvblVwZGF0ZShpdGVtcylcbiAgICB9KVxuXG4gICAgcmVmLm9uKCdjaGlsZF9yZW1vdmVkJywgZnVuY3Rpb24oc25hcHNob3QpIHtcbiAgICAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90Lm5hbWUoKSAhPSBpdGVtLmlkXG4gICAgICAgIH0pXG4gICAgICAgIG9uVXBkYXRlKGl0ZW1zKVxuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQURESU5HXCIsIGl0ZW0sIGl0ZW0uaWQpXG4gICAgICAgICAgICB2YXIgY2hpbGRSZWYgPSByZWYuY2hpbGQoaXRlbS5pZClcbiAgICAgICAgICAgIGNoaWxkUmVmLnNldChpdGVtKVxuICAgICAgICB9XG4gICAgfVxufSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8vIFNob3dzL2hpZGVzLCB0YWtlcyBhbiBhcnJheSBvZiBwYWdlcyB0aGF0IGl0IHJlbmRlcnMgYW5kIHJlcG9ydHMgYXMgc2VsZWN0ZWRcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAvLyB2YXIgY2xhc3NlcyA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldCh7XG4gICAgICAgIC8vICAgICAnY2JwLXNwbWVudSc6IHRydWUsXG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgcmV0dXJuIChSZWFjdC5ET00uZGl2KCB7Y2xhc3NOYW1lOlwibG9naW5cIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmgxKG51bGwsIFwiQ1BSVFwiKVxuICAgICAgICApKVxuICAgIH0sXG59KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8vIFNob3dzL2hpZGVzLCB0YWtlcyBhbiBhcnJheSBvZiBwYWdlcyB0aGF0IGl0IHJlbmRlcnMgYW5kIHJlcG9ydHMgYXMgc2VsZWN0ZWRcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgY2xhc3NlcyA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldCh7XG4gICAgICAgICAgICAnY2JwLXNwbWVudSc6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS12ZXJ0aWNhbCc6IHRydWUsIFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtbGVmdCcgOiB0cnVlLFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtb3BlbicgOiB0aGlzLnByb3BzLmlzT3BlbixcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5uYXYoIHtjbGFzc05hbWU6Y2xhc3NlcywgaWQ6XCJjYnAtc3BtZW51LXMxXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5oMyhudWxsLCBcIk1lbnVcIiksXG4gICAgICAgICAgICB0aGlzLnJlbmRlclBhZ2VzKClcbiAgICAgICAgKSlcbiAgICB9LFxuXG4gICAgcmVuZGVyUGFnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5wYWdlcy5tYXAoZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS5hKCB7a2V5OnBhZ2UubmFtZSwgb25DbGljazp0aGlzLm9uU2VsZWN0LmJpbmQodGhpcywgcGFnZSl9LCBwYWdlLm5hbWUpXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9LFxuXG4gICAgb25TZWxlY3Q6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChwYWdlKVxuICAgIH0sXG59KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL3ZhciBmYiA9IHJlcXVpcmUoJy4vZmlyZWJhc2UnKVxuXG52YXIgUHJvamVjdFBhZ2UgPSBtb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtwcm9qZWN0czogW10sIGN1cnJlbnRQYWdlOiAnbGlzdCcsIHNlbGVjdGVkUHJvamVjdDogbnVsbH1cbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gSSdtIG5vdCBoYXBweSB0aGF0IEkgaGF2ZSB0byBrZWVwIHRoaXMgYXJvdW5kLlxuICAgICAgICAvLyBpdCBkb2Vzbid0IGZlZWwgbGlrZSBpdCByZWFsbHkgYmVsb25ncyBpbiB0aGUgc3RhdGUgZWl0aGVyXG5cbiAgICAgICAgLy8gSSdkIHNheSBwdXQgaXQgaW4gdGhlIHBhcmVudCB0b29cbiAgICAgICAgLy8gcnVsZSBvZiB0aHVtYjogdmlld3Mgc2hvdWxkIGJlIHJlbmVyYWJsZSBzZXJ2ZXItc2lkZVxuXG4gICAgICAgIHRoaXMucHJvamVjdHNNYW5hZ2VkQXJyYXkgPSBmYi5tYW5hZ2VkQXJyYXkoZmIucHJvamVjdHNSZWYsIGZ1bmN0aW9uKHByb2plY3RzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtwcm9qZWN0czogIHByb2plY3RzfSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGFnZTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT0gXCJsaXN0XCIpIHtcbiAgICAgICAgICAgIHBhZ2UgPSAoUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7b25DbGljazp0aGlzLmFkZE5ld1Byb2plY3R9LCBcIisgTmV3IFByb2plY3RcIiksXG4gICAgICAgICAgICAgICAgUHJvamVjdHNMaXN0KCB7cHJvamVjdHM6dGhpcy5zdGF0ZS5wcm9qZWN0cywgb25TZWxlY3RQcm9qZWN0OnRoaXMub25TZWxlY3RQcm9qZWN0fSlcbiAgICAgICAgICAgICkpXG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09IFwiZm9ybVwiKSB7XG4gICAgICAgICAgICBwYWdlID0gUHJvamVjdEZvcm0oIHtvbk5ld1Byb2plY3Q6dGhpcy5vbk5ld1Byb2plY3R9IClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09IFwiZGV0YWlsc1wiKSB7XG4gICAgICAgICAgICBwYWdlID0gUHJvamVjdERldGFpbHMoIHtwcm9qZWN0OnRoaXMuc3RhdGUuc2VsZWN0ZWRQcm9qZWN0LCBvbkNsb3NlOnRoaXMuY2xvc2VQcm9qZWN0fSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInBhZ2UtcGFkZGluZ1wifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaGVhZGVyKG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJoZWFkZXItaW5mb1wifSwgXCIwLzEwIHBvaW50c1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uaDEoIHtjbGFzc05hbWU6XCJzaXRlLWhlYWRlci10aXRsZVwifSwgXCJDUFJUOiBQcm9qZWN0c1wiKVxuICAgICAgICAgICAgKSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIHBhZ2UpXG4gICAgICAgICkpXG4gICAgfSxcblxuICAgIGNsb3NlUHJvamVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRQYWdlOiAnbGlzdCd9KVxuICAgIH0sXG5cbiAgICBvblNlbGVjdFByb2plY3Q6IGZ1bmN0aW9uKHByb2plY3QpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRQcm9qZWN0OiBwcm9qZWN0LCBjdXJyZW50UGFnZTonZGV0YWlscyd9KVxuICAgIH0sXG5cbiAgICBhZGROZXdQcm9qZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudFBhZ2U6ICdmb3JtJ30pXG4gICAgfSxcblxuICAgIG9uTmV3UHJvamVjdDogZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICBwcm9qZWN0LmlkID0gZmIubmFtZUlkKHByb2plY3QubmFtZSlcbiAgICAgICAgdGhpcy5wcm9qZWN0c01hbmFnZWRBcnJheS5hZGQocHJvamVjdClcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudFBhZ2U6ICdsaXN0J30pXG4gICAgfSxcbn0pXG5cbnZhciBQcm9qZWN0c0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdQcm9qZWN0c0xpc3QnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByb3dzID0gdGhpcy5wcm9wcy5wcm9qZWN0cy5tYXAoZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb2plY3RSb3coIHtrZXk6cHJvamVjdC5uYW1lLCBwcm9qZWN0OnByb2plY3QsIG9uU2VsZWN0UHJvamVjdDp0aGlzLnByb3BzLm9uU2VsZWN0UHJvamVjdH0pXG4gICAgICAgIH0uYmluZCh0aGlzKSlcblxuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5kaXYobnVsbCwgcm93cykpXG4gICAgfSwgIFxufSlcblxudmFyIFByb2plY3RSb3cgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdQcm9qZWN0Um93JyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcHJvamVjdCA9IHRoaXMucHJvcHMucHJvamVjdFxuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJ0YWJsZS1yb3dcIiwgb25DbGljazp0aGlzLm9uQ2xpY2t9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5zcGFuKCB7Y2xhc3NOYW1lOlwicm93LXRpdGxlXCJ9LCBwcm9qZWN0Lm5hbWUpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4oIHtjbGFzc05hbWU6XCJyb3ctZGF0YVwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInJvdy1kYXRhLXZhbHVlXCJ9LCBcIjQwXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJyb3ctZGF0YS1sYWJlbFwifSwgXCJsZWZ0XCIpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuRE9NLnNwYW4oIHtjbGFzc05hbWU6XCJyb3ctZGF0YVwifSwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInJvdy1kYXRhLXZhbHVlXCJ9LCBcIjEwXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJyb3ctZGF0YS1sYWJlbFwifSwgXCJwcmlvcml0eVwiKVxuICAgICAgICAgICAgKVxuICAgICAgICApKVxuICAgIH0sXG5cbiAgICBvbkNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdFByb2plY3QodGhpcy5wcm9wcy5wcm9qZWN0KVxuICAgIH0sXG59KVxuXG52YXIgUHJvamVjdEZvcm0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdQcm9qZWN0Rm9ybScsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChSZWFjdC5ET00uZm9ybSgge29uU3VibWl0OnRoaXMub25TdWJtaXR9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5oMyhudWxsLCBcIk5ldyBQcm9qZWN0XCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBSZWFjdC5ET00uaW5wdXQoIHt0eXBlOlwidGV4dFwiLCByZWY6XCJuYW1lXCJ9KSksXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJzdWJtaXRcIn0gKSlcbiAgICAgICAgKSlcbiAgICB9LFxuXG4gICAgb25TdWJtaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uTmV3UHJvamVjdCh7XG4gICAgICAgICAgICBuYW1lOiB0aGlzLnJlZnMubmFtZS5nZXRET01Ob2RlKCkudmFsdWVcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbn0pXG5cbnZhciBQcm9qZWN0RGV0YWlscyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Byb2plY3REZXRhaWxzJyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJwcm9qZWN0LWRldGFpbHNcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBSZWFjdC5ET00uYnV0dG9uKCB7b25DbGljazp0aGlzLnByb3BzLm9uQ2xvc2V9LCBcIkNsb3NlXCIpKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgdGhpcy5wcm9wcy5wcm9qZWN0Lm5hbWUpXG4gICAgICAgICkpXG4gICAgfSxcbn0pXG5cbnZhciBmYWtlUHJvamVjdHMgPSBbXG4gICAge25hbWU6IFwiTUFUUEFBUyBtayAyXCJ9LFxuICAgIHtuYW1lOiBcIkFsaWVuIEFsbG95c1wifSxcbiAgICB7bmFtZTogXCJBbGllbiBFbmVyZ3kgU291cmNlIDJcIn0sXG4gICAge25hbWU6IFwiS2FuZ2Fyb28gTGVnc1wifSxcbl0iLCIvKiogQGpzeCBSZWFjdC5ET00gKi9cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgICBmYWtlU3VwZXJDb21tZW50OiB7aWQ6IFwiMlwiLCB0ZXh0OiBcImZha2UgZ3V5XCJ9LFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtjb21tZW50czogW3t0ZXh0OlwiZmFrZSBjb21tZW50XCJ9XX1cbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgJC5nZXQoJy4vcGFja2FnZS5qc29uJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIGNvbW1lbnRzID0gW3RoaXMuZmFrZVN1cGVyQ29tbWVudF1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbW1lbnRzOiBjb21tZW50c30pXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbW1lbnRzID0gdGhpcy5zdGF0ZS5jb21tZW50cy5tYXAoZnVuY3Rpb24oY29tbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIENvbW1lbnQoIHtrZXk6Y29tbWVudC5pZCwgdGV4dDpjb21tZW50LnRleHR9KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00udWwoIHtjbGFzc05hbWU6XCJjb21tZW50c1wifSwgY29tbWVudHMpLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5mb3JtKCB7Y2xhc3NOYW1lOlwiY29tbWVudEZvcm1cIn0sIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00uaW5wdXQoIHt0eXBlOlwidGV4dFwiLCByZWY6XCJ0ZXh0XCIsIG9uQ2hhbmdlOnRoaXMub25DaGFuZ2VGaWVsZH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfSxcblxuICAgIG9uQ2hhbmdlRmllbGQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhbmdlZFwiLCBldmVudC50YXJnZXQudmFsdWUpXG4gICAgICAgIHRoaXMuZmFrZVN1cGVyQ29tbWVudC50ZXh0ID0gZXZlbnQudGFyZ2V0LnZhbHVlIC8vIG9yIHRoaXMucmVmcy50ZXh0XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2NvbW1lbnRzOlt0aGlzLmZha2VTdXBlckNvbW1lbnRdfSlcbiAgICB9LFxufSlcblxuXG5cbnZhciBDb21tZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQ29tbWVudCcsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5saSgge2NsYXNzTmFtZTpcImNvbW1lbnRcIn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGV4dFxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxufSkiXX0=
