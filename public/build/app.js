(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */var Projects = require('./projects.jsx')

// Shows/hides, takes an array of pages that it renders and reports as selected
var Nav = React.createClass({displayName: 'Nav',
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

var DataTest = React.createClass({displayName: 'DataTest',

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
            'cbp-spmenu-push': true,
            'cbp-spmenu-push-toright' : this.state.isMenuOpen
        })
        return (
            React.DOM.div( {className:classes}, 
                Nav( {isOpen:this.state.isMenuOpen, onSelect:this.onNav, pages:this.pages}),
                React.DOM.button( {onClick:this.showMenu}, "M"),
                React.DOM.div( {className:"active-page"}, 
                    this.state.currentPage.component
                )
            )
        )
    }
})



React.renderComponent(Root(null ), document.getElementById('root'));



/*

 var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
-                showLeftPush = document.getElementById( 'showLeftPush' ),
-                body = document.body;
 
-            showLeftPush.onclick = function() {
-                this.classList.toggle('active')
-                body.classList.toggle('cbp-spmenu-push-toright')
-                menuLeft.classList.toggle('cbp-spmenu-open')
-            }


*/
},{"./projects.jsx":2}],2:[function(require,module,exports){
/** @jsx React.DOM */

module.exports = React.createClass({displayName: 'exports',
    render: function() {
        return React.DOM.div(null, "Projects")
    },
})
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9hcHAuanN4IiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9wcm9qZWN0cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi92YXIgUHJvamVjdHMgPSByZXF1aXJlKCcuL3Byb2plY3RzLmpzeCcpXG5cbi8vIFNob3dzL2hpZGVzLCB0YWtlcyBhbiBhcnJheSBvZiBwYWdlcyB0aGF0IGl0IHJlbmRlcnMgYW5kIHJlcG9ydHMgYXMgc2VsZWN0ZWRcbnZhciBOYXYgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdOYXYnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIGNsYXNzZXMgPSBSZWFjdC5hZGRvbnMuY2xhc3NTZXQoe1xuICAgICAgICAgICAgJ2NicC1zcG1lbnUnOiB0cnVlLFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtdmVydGljYWwnOiB0cnVlLCBcbiAgICAgICAgICAgICdjYnAtc3BtZW51LWxlZnQnIDogdHJ1ZSxcbiAgICAgICAgICAgICdjYnAtc3BtZW51LW9wZW4nIDogdGhpcy5wcm9wcy5pc09wZW4sXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIChSZWFjdC5ET00ubmF2KCB7Y2xhc3NOYW1lOmNsYXNzZXMsIGlkOlwiY2JwLXNwbWVudS1zMVwifSwgXG4gICAgICAgICAgICBSZWFjdC5ET00uaDMobnVsbCwgXCJNZW51XCIpLFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJQYWdlcygpXG4gICAgICAgICkpXG4gICAgfSxcblxuICAgIHJlbmRlclBhZ2VzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucGFnZXMubWFwKGZ1bmN0aW9uKHBhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5ET00uYSgge2tleTpwYWdlLm5hbWUsIG9uQ2xpY2s6dGhpcy5vblNlbGVjdC5iaW5kKHRoaXMsIHBhZ2UpfSwgcGFnZS5uYW1lKVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfSxcblxuICAgIG9uU2VsZWN0OiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25TZWxlY3QocGFnZSlcbiAgICB9LFxufSlcblxudmFyIERhdGFUZXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnRGF0YVRlc3QnLFxuXG4gICAgZmFrZVN1cGVyQ29tbWVudDoge2lkOiBcIjJcIiwgdGV4dDogXCJmYWtlIGd1eVwifSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7Y29tbWVudHM6IFt7dGV4dDpcImZha2UgY29tbWVudFwifV19XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQuZ2V0KCcuL3BhY2thZ2UuanNvbicsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50cyA9IFt0aGlzLmZha2VTdXBlckNvbW1lbnRdXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50czogY29tbWVudHN9KVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21tZW50cyA9IHRoaXMuc3RhdGUuY29tbWVudHMubWFwKGZ1bmN0aW9uKGNvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBDb21tZW50KCB7a2V5OmNvbW1lbnQuaWQsIHRleHQ6Y29tbWVudC50ZXh0fSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnVsKCB7Y2xhc3NOYW1lOlwiY29tbWVudHNcIn0sIGNvbW1lbnRzKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uZm9ybSgge2NsYXNzTmFtZTpcImNvbW1lbnRGb3JtXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInRleHRcIiwgcmVmOlwidGV4dFwiLCBvbkNoYW5nZTp0aGlzLm9uQ2hhbmdlRmllbGR9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH0sXG5cbiAgICBvbkNoYW5nZUZpZWxkOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZWRcIiwgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICB0aGlzLmZha2VTdXBlckNvbW1lbnQudGV4dCA9IGV2ZW50LnRhcmdldC52YWx1ZSAvLyBvciB0aGlzLnJlZnMudGV4dFxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50czpbdGhpcy5mYWtlU3VwZXJDb21tZW50XX0pXG4gICAgfSxcbn0pXG5cbnZhciBDb21tZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQ29tbWVudCcsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5saSgge2NsYXNzTmFtZTpcImNvbW1lbnRcIn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGV4dFxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxufSlcblxudmFyIFJvb3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdSb290JyxcblxuICAgIHBhZ2VzOiBbXG4gICAgICAgIHtuYW1lOiBcIlByb2plY3RzXCIsIGNvbXBvbmVudDogUHJvamVjdHMobnVsbCApfSxcbiAgICAgICAge25hbWU6IFwiRGF0YSBUZXN0XCIsIGNvbXBvbmVudDogRGF0YVRlc3QobnVsbCApfSxcbiAgICBdLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHtpc01lbnVPcGVuOiBmYWxzZSwgY3VycmVudFBhZ2U6IHRoaXMucGFnZXNbMF19XG4gICAgfSxcblxuICAgIHNob3dNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNZW51T3BlbjogIXRoaXMuc3RhdGUuaXNNZW51T3Blbn0pXG4gICAgfSxcblxuICAgIG9uTmF2OiBmdW5jdGlvbihwYWdlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2lzTWVudU9wZW46IGZhbHNlLCBjdXJyZW50UGFnZTogcGFnZX0pXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXB1c2gnOiB0cnVlLFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtcHVzaC10b3JpZ2h0JyA6IHRoaXMuc3RhdGUuaXNNZW51T3BlblxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpjbGFzc2VzfSwgXG4gICAgICAgICAgICAgICAgTmF2KCB7aXNPcGVuOnRoaXMuc3RhdGUuaXNNZW51T3Blbiwgb25TZWxlY3Q6dGhpcy5vbk5hdiwgcGFnZXM6dGhpcy5wYWdlc30pLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHtvbkNsaWNrOnRoaXMuc2hvd01lbnV9LCBcIk1cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpcImFjdGl2ZS1wYWdlXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5jdXJyZW50UGFnZS5jb21wb25lbnRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59KVxuXG5cblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFJvb3QobnVsbCApLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKTtcblxuXG5cbi8qXG5cbiB2YXIgbWVudUxlZnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ2NicC1zcG1lbnUtczEnICksXG4tICAgICAgICAgICAgICAgIHNob3dMZWZ0UHVzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnc2hvd0xlZnRQdXNoJyApLFxuLSAgICAgICAgICAgICAgICBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiBcbi0gICAgICAgICAgICBzaG93TGVmdFB1c2gub25jbGljayA9IGZ1bmN0aW9uKCkge1xuLSAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4tICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnY2JwLXNwbWVudS1wdXNoLXRvcmlnaHQnKVxuLSAgICAgICAgICAgICAgICBtZW51TGVmdC5jbGFzc0xpc3QudG9nZ2xlKCdjYnAtc3BtZW51LW9wZW4nKVxuLSAgICAgICAgICAgIH1cblxuXG4qLyIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ2V4cG9ydHMnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5ET00uZGl2KG51bGwsIFwiUHJvamVjdHNcIilcbiAgICB9LFxufSkiXX0=
