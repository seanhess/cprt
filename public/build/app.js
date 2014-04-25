(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */var HelloWorld = React.createClass({displayName: 'HelloWorld',
    render: function() {
        return (
            React.DOM.p(null, 
                  "Hello, ", React.DOM.input( {type:"text", placeholder:"Your name here"} ),"!"+' '+
                  "It is ", this.props.date.toTimeString()
            )
        );
    }
});

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
            React.DOM.a( {href:"#"}, "Celery seakale"),
            React.DOM.a( {href:"#"}, "Dulse daikon"),
            React.DOM.a( {href:"#"}, "Zucchini garlic"),
            React.DOM.a( {href:"#"}, "Catsear azuki bean"),
            React.DOM.a( {href:"#"}, "Dandelion bunya"),
            React.DOM.a( {href:"#"}, "Rutabaga")
        ))
    }
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
        this.fakeSuperComment.text = event.target.value
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

    getInitialState: function() {
        return {isMenuOpen: false}
    },

    showMenu: function() {
        this.setState({isMenuOpen: !this.state.isMenuOpen})
    },

    render: function() {
        var classes = React.addons.classSet({
            'cbp-spmenu-push': true,
            'cbp-spmenu-push-toright' : this.state.isMenuOpen
        })
        return (
            React.DOM.div( {className:classes}, 
                Nav( {isOpen:this.state.isMenuOpen}),
                React.DOM.button( {onClick:this.showMenu}, "M"),
                HelloWorld( {date:new Date()}),
                React.DOM.p(null, "This is a test"),
                DataTest(null )
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9hcHAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKiBAanN4IFJlYWN0LkRPTSAqL3ZhciBIZWxsb1dvcmxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnSGVsbG9Xb3JsZCcsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFxuICAgICAgICAgICAgICAgICAgXCJIZWxsbywgXCIsIFJlYWN0LkRPTS5pbnB1dCgge3R5cGU6XCJ0ZXh0XCIsIHBsYWNlaG9sZGVyOlwiWW91ciBuYW1lIGhlcmVcIn0gKSxcIiFcIisnICcrXG4gICAgICAgICAgICAgICAgICBcIkl0IGlzIFwiLCB0aGlzLnByb3BzLmRhdGUudG9UaW1lU3RyaW5nKClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxudmFyIE5hdiA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ05hdicsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgY2xhc3NlcyA9IFJlYWN0LmFkZG9ucy5jbGFzc1NldCh7XG4gICAgICAgICAgICAnY2JwLXNwbWVudSc6IHRydWUsXG4gICAgICAgICAgICAnY2JwLXNwbWVudS12ZXJ0aWNhbCc6IHRydWUsIFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtbGVmdCcgOiB0cnVlLFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtb3BlbicgOiB0aGlzLnByb3BzLmlzT3BlbixcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gKFJlYWN0LkRPTS5uYXYoIHtjbGFzc05hbWU6Y2xhc3NlcywgaWQ6XCJjYnAtc3BtZW51LXMxXCJ9LCBcbiAgICAgICAgICAgIFJlYWN0LkRPTS5oMyhudWxsLCBcIk1lbnVcIiksXG4gICAgICAgICAgICBSZWFjdC5ET00uYSgge2hyZWY6XCIjXCJ9LCBcIkNlbGVyeSBzZWFrYWxlXCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmEoIHtocmVmOlwiI1wifSwgXCJEdWxzZSBkYWlrb25cIiksXG4gICAgICAgICAgICBSZWFjdC5ET00uYSgge2hyZWY6XCIjXCJ9LCBcIlp1Y2NoaW5pIGdhcmxpY1wiKSxcbiAgICAgICAgICAgIFJlYWN0LkRPTS5hKCB7aHJlZjpcIiNcIn0sIFwiQ2F0c2VhciBhenVraSBiZWFuXCIpLFxuICAgICAgICAgICAgUmVhY3QuRE9NLmEoIHtocmVmOlwiI1wifSwgXCJEYW5kZWxpb24gYnVueWFcIiksXG4gICAgICAgICAgICBSZWFjdC5ET00uYSgge2hyZWY6XCIjXCJ9LCBcIlJ1dGFiYWdhXCIpXG4gICAgICAgICkpXG4gICAgfVxufSlcblxudmFyIERhdGFUZXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnRGF0YVRlc3QnLFxuXG4gICAgZmFrZVN1cGVyQ29tbWVudDoge2lkOiBcIjJcIiwgdGV4dDogXCJmYWtlIGd1eVwifSxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7Y29tbWVudHM6IFt7dGV4dDpcImZha2UgY29tbWVudFwifV19XG4gICAgfSxcblxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICQuZ2V0KCcuL3BhY2thZ2UuanNvbicsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50cyA9IFt0aGlzLmZha2VTdXBlckNvbW1lbnRdXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50czogY29tbWVudHN9KVxuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb21tZW50cyA9IHRoaXMuc3RhdGUuY29tbWVudHMubWFwKGZ1bmN0aW9uKGNvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBDb21tZW50KCB7a2V5OmNvbW1lbnQuaWQsIHRleHQ6Y29tbWVudC50ZXh0fSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYobnVsbCwgXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnVsKCB7Y2xhc3NOYW1lOlwiY29tbWVudHNcIn0sIGNvbW1lbnRzKSxcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uZm9ybSgge2NsYXNzTmFtZTpcImNvbW1lbnRGb3JtXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInRleHRcIiwgcmVmOlwidGV4dFwiLCBvbkNoYW5nZTp0aGlzLm9uQ2hhbmdlRmllbGR9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH0sXG5cbiAgICBvbkNoYW5nZUZpZWxkOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNoYW5nZWRcIiwgZXZlbnQudGFyZ2V0LnZhbHVlKVxuICAgICAgICB0aGlzLmZha2VTdXBlckNvbW1lbnQudGV4dCA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtjb21tZW50czpbdGhpcy5mYWtlU3VwZXJDb21tZW50XX0pXG4gICAgfSxcbn0pXG5cbnZhciBDb21tZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiAnQ29tbWVudCcsXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIFJlYWN0LkRPTS5saSgge2NsYXNzTmFtZTpcImNvbW1lbnRcIn0sIFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudGV4dFxuICAgICAgICAgICAgKVxuICAgICAgICApXG4gICAgfVxufSlcblxudmFyIFJvb3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6ICdSb290JyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB7aXNNZW51T3BlbjogZmFsc2V9XG4gICAgfSxcblxuICAgIHNob3dNZW51OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7aXNNZW51T3BlbjogIXRoaXMuc3RhdGUuaXNNZW51T3Blbn0pXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gUmVhY3QuYWRkb25zLmNsYXNzU2V0KHtcbiAgICAgICAgICAgICdjYnAtc3BtZW51LXB1c2gnOiB0cnVlLFxuICAgICAgICAgICAgJ2NicC1zcG1lbnUtcHVzaC10b3JpZ2h0JyA6IHRoaXMuc3RhdGUuaXNNZW51T3BlblxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgUmVhY3QuRE9NLmRpdigge2NsYXNzTmFtZTpjbGFzc2VzfSwgXG4gICAgICAgICAgICAgICAgTmF2KCB7aXNPcGVuOnRoaXMuc3RhdGUuaXNNZW51T3Blbn0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5idXR0b24oIHtvbkNsaWNrOnRoaXMuc2hvd01lbnV9LCBcIk1cIiksXG4gICAgICAgICAgICAgICAgSGVsbG9Xb3JsZCgge2RhdGU6bmV3IERhdGUoKX0pLFxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5wKG51bGwsIFwiVGhpcyBpcyBhIHRlc3RcIiksXG4gICAgICAgICAgICAgICAgRGF0YVRlc3QobnVsbCApXG4gICAgICAgICAgICApXG4gICAgICAgIClcbiAgICB9XG59KVxuXG5SZWFjdC5yZW5kZXJDb21wb25lbnQoUm9vdChudWxsICksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpO1xuXG5cblxuLypcblxuIHZhciBtZW51TGVmdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnY2JwLXNwbWVudS1zMScgKSxcbi0gICAgICAgICAgICAgICAgc2hvd0xlZnRQdXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdzaG93TGVmdFB1c2gnICksXG4tICAgICAgICAgICAgICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuIFxuLSAgICAgICAgICAgIHNob3dMZWZ0UHVzaC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4tICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbi0gICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdjYnAtc3BtZW51LXB1c2gtdG9yaWdodCcpXG4tICAgICAgICAgICAgICAgIG1lbnVMZWZ0LmNsYXNzTGlzdC50b2dnbGUoJ2NicC1zcG1lbnUtb3BlbicpXG4tICAgICAgICAgICAgfVxuXG5cbiovIl19
