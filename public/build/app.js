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

},{"./nav.jsx":2,"./projects.jsx":3,"./test.jsx":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */var ProjectPage = module.exports = React.createClass({displayName: 'exports',

    getInitialState: function() {
        return {projects: fakeProjects, currentPage: 'list'}
    },

    render: function() {
        var page;
        if (this.state.currentPage == "list")
            page = ProjectsList( {projects:this.state.projects, onSelectProject:this.onSelectProject})
        else if (this.state.currentPage == "form")
            page = ProjectForm( {onNewProject:this.onNewProject} )
        else if (this.state.currentPage == "details")
            page = React.DOM.div(null, "DETAILS")

        return (
            React.DOM.div(null, 
                React.DOM.h3( {className:"page-header"}, "Projects"),
                React.DOM.div(null, 
                    React.DOM.button( {onClick:this.addNewProject}, "Add New Project")
                ),
                page
            )
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
},{}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9hcHAuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9uYXYuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9wcm9qZWN0cy5qc3giLCIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9wdWJsaWMvYXBwL3Rlc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi92YXIgUHJvamVjdHMgPSByZXF1aXJlKCcuL3Byb2plY3RzLmpzeCcpXG52YXIgTmF2ID0gcmVxdWlyZSgnLi9uYXYuanN4JylcbnZhciBEYXRhVGVzdCA9IHJlcXVpcmUoJy4vdGVzdC5qc3gnKVxuXG52YXIgUm9vdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Jvb3QnLFxuXG4gICAgcGFnZXM6IFtcbiAgICAgICAge25hbWU6IFwiUHJvamVjdHNcIiwgY29tcG9uZW50OiBQcm9qZWN0cyhudWxsICl9LFxuICAgICAgICB7bmFtZTogXCJEYXRhIFRlc3RcIiwgY29tcG9uZW50OiBEYXRhVGVzdChudWxsICl9LFxuICAgIF0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge2lzTWVudU9wZW46IGZhbHNlLCBjdXJyZW50UGFnZTogdGhpcy5wYWdlc1swXX1cbiAgICB9LFxuXG4gICAgc2hvd01lbnU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtpc01lbnVPcGVuOiAhdGhpcy5zdGF0ZS5pc01lbnVPcGVufSlcbiAgICB9LFxuXG4gICAgb25OYXY6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNZW51T3BlbjogZmFsc2UsIGN1cnJlbnRQYWdlOiBwYWdlfSlcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBSZWFjdC5hZGRvbnMuY2xhc3NTZXQoe1xuICAgICAgICAgICAgJ21haW4tY29udGFpbmVyJzogdHJ1ZSxcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXB1c2gnOiB0cnVlLFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtcHVzaC10b3JpZ2h0JyA6IHRoaXMuc3RhdGUuaXNNZW51T3BlblxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpjbGFzc2VzfSwgXG4gICAgICAgICAgICAgICAgTmF2KCB7aXNPcGVuOnRoaXMuc3RhdGUuaXNNZW51T3Blbiwgb25TZWxlY3Q6dGhpcy5vbk5hdiwgcGFnZXM6dGhpcy5wYWdlc30pLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHtjbGFzc05hbWU6XCJtZW51LWJ1dHRvblwiLCBvbkNsaWNrOnRoaXMuc2hvd01lbnV9LCBcIk1cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImFjdGl2ZS1wYWdlXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50UGFnZS5jb21wb25lbnRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59KVxuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQoUm9vdChudWxsICksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovLy8gU2hvd3MvaGlkZXMsIHRha2VzIGFuIGFycmF5IG9mIHBhZ2VzIHRoYXQgaXQgcmVuZGVycyBhbmQgcmVwb3J0cyBhcyBzZWxlY3RlZFxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBjbGFzc2VzID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcbiAgICAgICAgICAgICdjYnAtc3BtZW51JzogdHJ1ZSxcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXZlcnRpY2FsJzogdHJ1ZSwgXG4gICAgICAgICAgICAnY2JwLXNwbWVudS1sZWZ0JyA6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS1vcGVuJyA6IHRoaXMucHJvcHMuaXNPcGVuLFxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLm5hdigge2NsYXNzTmFtZTpjbGFzc2VzLCBpZDpcImNicC1zcG1lbnUtczFcIn0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmgzKG51bGwsIFwiTWVudVwiKSxcbiAgICAgICAgICAgIHRoaXMucmVuZGVyUGFnZXMoKVxuICAgICAgICApKVxuICAgIH0sXG5cbiAgICByZW5kZXJQYWdlczogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnBhZ2VzLm1hcChmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuRE9NLmEoIHtrZXk6cGFnZS5uYW1lLCBvbkNsaWNrOnRoaXMub25TZWxlY3QuYmluZCh0aGlzLCBwYWdlKX0sIHBhZ2UubmFtZSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0sXG5cbiAgICBvblNlbGVjdDogZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHBhZ2UpXG4gICAgfSxcbn0pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIFByb2plY3RQYWdlID0gbW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7cHJvamVjdHM6IGZha2VQcm9qZWN0cywgY3VycmVudFBhZ2U6ICdsaXN0J31cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBhZ2U7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09IFwibGlzdFwiKVxuICAgICAgICAgICAgcGFnZSA9IFByb2plY3RzTGlzdCgge3Byb2plY3RzOnRoaXMuc3RhdGUucHJvamVjdHMsIG9uU2VsZWN0UHJvamVjdDp0aGlzLm9uU2VsZWN0UHJvamVjdH0pXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT0gXCJmb3JtXCIpXG4gICAgICAgICAgICBwYWdlID0gUHJvamVjdEZvcm0oIHtvbk5ld1Byb2plY3Q6dGhpcy5vbk5ld1Byb2plY3R9IClcbiAgICAgICAgZWxzZSBpZiAodGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PSBcImRldGFpbHNcIilcbiAgICAgICAgICAgIHBhZ2UgPSBSZWFjdC5ET00uZGl2KG51bGwsIFwiREVUQUlMU1wiKVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5oMygge2NsYXNzTmFtZTpcInBhZ2UtaGVhZGVyXCJ9LCBcIlByb2plY3RzXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHtvbkNsaWNrOnRoaXMuYWRkTmV3UHJvamVjdH0sIFwiQWRkIE5ldyBQcm9qZWN0XCIpXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBwYWdlXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9LFxuXG4gICAgb25TZWxlY3RQcm9qZWN0OiBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiU0VMRUNURUQgUFJPSkVDVFwiLCBwcm9qZWN0KVxuICAgIH0sXG5cbiAgICBhZGROZXdQcm9qZWN0OiBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Byb2plY3RzOiB0aGlzLnN0YXRlLnByb2plY3RzLCBjdXJyZW50UGFnZTogJ2Zvcm0nfSlcbiAgICB9LFxuXG4gICAgb25OZXdQcm9qZWN0OiBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Byb2plY3RzOiB0aGlzLnN0YXRlLnByb2plY3RzLmNvbmNhdChbcHJvamVjdF0pLCBjdXJyZW50UGFnZTogJ2xpc3QnfSlcbiAgICB9LFxufSlcblxudmFyIFByb2plY3RzTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Byb2plY3RzTGlzdCcsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJvd3MgPSB0aGlzLnByb3BzLnByb2plY3RzLm1hcChmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvamVjdFJvdygge2tleTpwcm9qZWN0Lm5hbWUsIHByb2plY3Q6cHJvamVjdCwgb25TZWxlY3RQcm9qZWN0OnRoaXMucHJvcHMub25TZWxlY3RQcm9qZWN0fSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLmRpdihudWxsLCByb3dzKSlcbiAgICB9LCAgXG59KVxuXG52YXIgUHJvamVjdFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Byb2plY3RSb3cnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwcm9qZWN0ID0gdGhpcy5wcm9wcy5wcm9qZWN0XG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInByb2plY3Qtcm93XCIsIG9uQ2xpY2s6dGhpcy5vbkNsaWNrfSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc3BhbihudWxsLCBwcm9qZWN0Lm5hbWUpXG4gICAgICAgICkpXG4gICAgfSxcblxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0UHJvamVjdCh0aGlzLnByb3BzLnByb2plY3QpXG4gICAgfSxcbn0pXG5cbnZhciBQcm9qZWN0Rm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Byb2plY3RGb3JtJyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5mb3JtKCB7b25TdWJtaXQ6dGhpcy5vblN1Ym1pdH0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmgzKG51bGwsIFwiTmV3IFByb2plY3RcIiksXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJ0ZXh0XCIsIHJlZjpcIm5hbWVcIn0pKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInN1Ym1pdFwifSApKVxuICAgICAgICApKVxuICAgIH0sXG5cbiAgICBvblN1Ym1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT04gU1VCTUlUXCIpXG4gICAgICAgIHRoaXMucHJvcHMub25OZXdQcm9qZWN0KHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMucmVmcy5uYW1lLmdldERPTU5vZGUoKS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxufSlcblxudmFyIGZha2VQcm9qZWN0cyA9IFtcbiAgICB7bmFtZTogXCJNQVRQQUFTIG1rIDJcIn0sXG4gICAge25hbWU6IFwiQWxpZW4gQWxsb3lzXCJ9LFxuICAgIHtuYW1lOiBcIkFsaWVuIEVuZXJneSBTb3VyY2UgMlwifSxcbiAgICB7bmFtZTogXCJLYW5nYXJvbyBMZWdzXCJ9LFxuXSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICAgIGZha2VTdXBlckNvbW1lbnQ6IHtpZDogXCIyXCIsIHRleHQ6IFwiZmFrZSBndXlcIn0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge2NvbW1lbnRzOiBbe3RleHQ6XCJmYWtlIGNvbW1lbnRcIn1dfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkLmdldCgnLi9wYWNrYWdlLmpzb24nLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB2YXIgY29tbWVudHMgPSBbdGhpcy5mYWtlU3VwZXJDb21tZW50XVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tbWVudHM6IGNvbW1lbnRzfSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29tbWVudHMgPSB0aGlzLnN0YXRlLmNvbW1lbnRzLm1hcChmdW5jdGlvbihjb21tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gQ29tbWVudCgge2tleTpjb21tZW50LmlkLCB0ZXh0OmNvbW1lbnQudGV4dH0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS51bCgge2NsYXNzTmFtZTpcImNvbW1lbnRzXCJ9LCBjb21tZW50cyksXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmZvcm0oIHtjbGFzc05hbWU6XCJjb21tZW50Rm9ybVwifSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJ0ZXh0XCIsIHJlZjpcInRleHRcIiwgb25DaGFuZ2U6dGhpcy5vbkNoYW5nZUZpZWxkfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9LFxuXG4gICAgb25DaGFuZ2VGaWVsZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2VkXCIsIGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgdGhpcy5mYWtlU3VwZXJDb21tZW50LnRleHQgPSBldmVudC50YXJnZXQudmFsdWUgLy8gb3IgdGhpcy5yZWZzLnRleHRcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tbWVudHM6W3RoaXMuZmFrZVN1cGVyQ29tbWVudF19KVxuICAgIH0sXG59KVxuXG5cblxudmFyIENvbW1lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdDb21tZW50JyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmxpKCB7Y2xhc3NOYW1lOlwiY29tbWVudFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50ZXh0XG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59KSJdfQ==
