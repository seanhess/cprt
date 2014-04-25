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
        console.log("ADD NEW PROJET")
        this.setState({projects: this.state.projects, currentPage: 'form'})
    },

    onNewProject: function(project) {
        console.log("NEW PROJECT", project)
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
        console.log("CLICKED PROJECT")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9hcHAuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9uYXYuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9wcm9qZWN0cy5qc3giLCIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9wdWJsaWMvYXBwL3Rlc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqIEBqc3ggUmVhY3QuRE9NICovdmFyIFByb2plY3RzID0gcmVxdWlyZSgnLi9wcm9qZWN0cy5qc3gnKVxudmFyIE5hdiA9IHJlcXVpcmUoJy4vbmF2LmpzeCcpXG52YXIgRGF0YVRlc3QgPSByZXF1aXJlKCcuL3Rlc3QuanN4JylcblxudmFyIFJvb3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdSb290JyxcblxuICAgIHBhZ2VzOiBbXG4gICAgICAgIHtuYW1lOiBcIlByb2plY3RzXCIsIGNvbXBvbmVudDogUHJvamVjdHMobnVsbCApfSxcbiAgICAgICAge25hbWU6IFwiRGF0YSBUZXN0XCIsIGNvbXBvbmVudDogRGF0YVRlc3QobnVsbCApfSxcbiAgICBdLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtpc01lbnVPcGVuOiBmYWxzZSwgY3VycmVudFBhZ2U6IHRoaXMucGFnZXNbMF19XG4gICAgfSxcblxuICAgIHNob3dNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNZW51T3BlbjogIXRoaXMuc3RhdGUuaXNNZW51T3Blbn0pXG4gICAgfSxcblxuICAgIG9uTmF2OiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTWVudU9wZW46IGZhbHNlLCBjdXJyZW50UGFnZTogcGFnZX0pXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcbiAgICAgICAgICAgICdtYWluLWNvbnRhaW5lcic6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS1wdXNoJzogdHJ1ZSxcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXB1c2gtdG9yaWdodCcgOiB0aGlzLnN0YXRlLmlzTWVudU9wZW5cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6Y2xhc3Nlc30sIFxuICAgICAgICAgICAgICAgIE5hdigge2lzT3Blbjp0aGlzLnN0YXRlLmlzTWVudU9wZW4sIG9uU2VsZWN0OnRoaXMub25OYXYsIHBhZ2VzOnRoaXMucGFnZXN9KSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7Y2xhc3NOYW1lOlwibWVudS1idXR0b25cIiwgb25DbGljazp0aGlzLnNob3dNZW51fSwgXCJNXCIpLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoIHtjbGFzc05hbWU6XCJhY3RpdmUtcGFnZVwifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY3VycmVudFBhZ2UuY29tcG9uZW50XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxufSlcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFJvb3QobnVsbCApLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcbiIsIi8qKiBAanN4IFJlYWN0LkRPTSAqLy8vIFNob3dzL2hpZGVzLCB0YWtlcyBhbiBhcnJheSBvZiBwYWdlcyB0aGF0IGl0IHJlbmRlcnMgYW5kIHJlcG9ydHMgYXMgc2VsZWN0ZWRcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgY2xhc3NlcyA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldCh7XG4gICAgICAgICAgICAnY2JwLXNwbWVudSc6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS12ZXJ0aWNhbCc6IHRydWUsIFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtbGVmdCcgOiB0cnVlLFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtb3BlbicgOiB0aGlzLnByb3BzLmlzT3BlbixcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5uYXYoIHtjbGFzc05hbWU6Y2xhc3NlcywgaWQ6XCJjYnAtc3BtZW51LXMxXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5oMyhudWxsLCBcIk1lbnVcIiksXG4gICAgICAgICAgICB0aGlzLnJlbmRlclBhZ2VzKClcbiAgICAgICAgKSlcbiAgICB9LFxuXG4gICAgcmVuZGVyUGFnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5wYWdlcy5tYXAoZnVuY3Rpb24ocGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS5hKCB7a2V5OnBhZ2UubmFtZSwgb25DbGljazp0aGlzLm9uU2VsZWN0LmJpbmQodGhpcywgcGFnZSl9LCBwYWdlLm5hbWUpXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9LFxuXG4gICAgb25TZWxlY3Q6IGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChwYWdlKVxuICAgIH0sXG59KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL3ZhciBQcm9qZWN0UGFnZSA9IG1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnZXhwb3J0cycsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge3Byb2plY3RzOiBmYWtlUHJvamVjdHMsIGN1cnJlbnRQYWdlOiAnbGlzdCd9XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwYWdlO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50UGFnZSA9PSBcImxpc3RcIilcbiAgICAgICAgICAgIHBhZ2UgPSBQcm9qZWN0c0xpc3QoIHtwcm9qZWN0czp0aGlzLnN0YXRlLnByb2plY3RzLCBvblNlbGVjdFByb2plY3Q6dGhpcy5vblNlbGVjdFByb2plY3R9KVxuICAgICAgICBlbHNlIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlID09IFwiZm9ybVwiKVxuICAgICAgICAgICAgcGFnZSA9IFByb2plY3RGb3JtKCB7b25OZXdQcm9qZWN0OnRoaXMub25OZXdQcm9qZWN0fSApXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhdGUuY3VycmVudFBhZ2UgPT0gXCJkZXRhaWxzXCIpXG4gICAgICAgICAgICBwYWdlID0gUmVhY3QuRE9NLmRpdihudWxsLCBcIkRFVEFJTFNcIilcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdihudWxsLCBcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uaDMoIHtjbGFzc05hbWU6XCJwYWdlLWhlYWRlclwifSwgXCJQcm9qZWN0c1wiKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnV0dG9uKCB7b25DbGljazp0aGlzLmFkZE5ld1Byb2plY3R9LCBcIkFkZCBOZXcgUHJvamVjdFwiKVxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgcGFnZVxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfSxcblxuICAgIG9uU2VsZWN0UHJvamVjdDogZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlNFTEVDVEVEIFBST0pFQ1RcIiwgcHJvamVjdClcbiAgICB9LFxuXG4gICAgYWRkTmV3UHJvamVjdDogZnVuY3Rpb24ocHJvamVjdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFERCBORVcgUFJPSkVUXCIpXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe3Byb2plY3RzOiB0aGlzLnN0YXRlLnByb2plY3RzLCBjdXJyZW50UGFnZTogJ2Zvcm0nfSlcbiAgICB9LFxuXG4gICAgb25OZXdQcm9qZWN0OiBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTkVXIFBST0pFQ1RcIiwgcHJvamVjdClcbiAgICB9LFxufSlcblxudmFyIFByb2plY3RzTGlzdCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Byb2plY3RzTGlzdCcsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJvd3MgPSB0aGlzLnByb3BzLnByb2plY3RzLm1hcChmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvamVjdFJvdygge2tleTpwcm9qZWN0Lm5hbWUsIHByb2plY3Q6cHJvamVjdCwgb25TZWxlY3RQcm9qZWN0OnRoaXMucHJvcHMub25TZWxlY3RQcm9qZWN0fSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuXG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLmRpdihudWxsLCByb3dzKSlcbiAgICB9LCAgXG59KVxuXG52YXIgUHJvamVjdFJvdyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Byb2plY3RSb3cnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwcm9qZWN0ID0gdGhpcy5wcm9wcy5wcm9qZWN0XG4gICAgICAgIHJldHVybiAoUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcInByb2plY3Qtcm93XCIsIG9uQ2xpY2s6dGhpcy5vbkNsaWNrfSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uc3BhbihudWxsLCBwcm9qZWN0Lm5hbWUpXG4gICAgICAgICkpXG4gICAgfSxcblxuICAgIG9uQ2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNMSUNLRUQgUFJPSkVDVFwiKVxuICAgICAgICB0aGlzLnByb3BzLm9uU2VsZWN0UHJvamVjdCh0aGlzLnByb3BzLnByb2plY3QpXG4gICAgfSxcbn0pXG5cbnZhciBQcm9qZWN0Rm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ1Byb2plY3RGb3JtJyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5mb3JtKCB7b25TdWJtaXQ6dGhpcy5vblN1Ym1pdH0sIFxuICAgICAgICAgICAgUmVhY3QuRE9NLmgzKG51bGwsIFwiTmV3IFByb2plY3RcIiksXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJ0ZXh0XCIsIHJlZjpcIm5hbWVcIn0pKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInN1Ym1pdFwifSApKVxuICAgICAgICApKVxuICAgIH0sXG5cbiAgICBvblN1Ym1pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiT04gU1VCTUlUXCIpXG4gICAgICAgIHRoaXMucHJvcHMub25OZXdQcm9qZWN0KHtcbiAgICAgICAgICAgIG5hbWU6IHRoaXMucmVmcy5uYW1lLmdldERPTU5vZGUoKS52YWx1ZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxufSlcblxudmFyIGZha2VQcm9qZWN0cyA9IFtcbiAgICB7bmFtZTogXCJNQVRQQUFTIG1rIDJcIn0sXG4gICAge25hbWU6IFwiQWxpZW4gQWxsb3lzXCJ9LFxuICAgIHtuYW1lOiBcIkFsaWVuIEVuZXJneSBTb3VyY2UgMlwifSxcbiAgICB7bmFtZTogXCJLYW5nYXJvbyBMZWdzXCJ9LFxuXSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdleHBvcnRzJyxcblxuICAgIGZha2VTdXBlckNvbW1lbnQ6IHtpZDogXCIyXCIsIHRleHQ6IFwiZmFrZSBndXlcIn0sXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge2NvbW1lbnRzOiBbe3RleHQ6XCJmYWtlIGNvbW1lbnRcIn1dfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkLmdldCgnLi9wYWNrYWdlLmpzb24nLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB2YXIgY29tbWVudHMgPSBbdGhpcy5mYWtlU3VwZXJDb21tZW50XVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tbWVudHM6IGNvbW1lbnRzfSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29tbWVudHMgPSB0aGlzLnN0YXRlLmNvbW1lbnRzLm1hcChmdW5jdGlvbihjb21tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gQ29tbWVudCgge2tleTpjb21tZW50LmlkLCB0ZXh0OmNvbW1lbnQudGV4dH0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICBSZWFjdC5ET00uZGl2KG51bGwsIFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS51bCgge2NsYXNzTmFtZTpcImNvbW1lbnRzXCJ9LCBjb21tZW50cyksXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmZvcm0oIHtjbGFzc05hbWU6XCJjb21tZW50Rm9ybVwifSwgXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJ0ZXh0XCIsIHJlZjpcInRleHRcIiwgb25DaGFuZ2U6dGhpcy5vbkNoYW5nZUZpZWxkfSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9LFxuXG4gICAgb25DaGFuZ2VGaWVsZDogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJDaGFuZ2VkXCIsIGV2ZW50LnRhcmdldC52YWx1ZSlcbiAgICAgICAgdGhpcy5mYWtlU3VwZXJDb21tZW50LnRleHQgPSBldmVudC50YXJnZXQudmFsdWUgLy8gb3IgdGhpcy5yZWZzLnRleHRcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y29tbWVudHM6W3RoaXMuZmFrZVN1cGVyQ29tbWVudF19KVxuICAgIH0sXG59KVxuXG5cblxudmFyIENvbW1lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdDb21tZW50JyxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmxpKCB7Y2xhc3NOYW1lOlwiY29tbWVudFwifSwgXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50ZXh0XG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59KSJdfQ==
