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

React.renderComponent(
  HelloWorld( {date:new Date()} ),
  document.getElementById('woot')
);


console.log("LOAD BABYT whatzer")
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2Vhbmhlc3MvcHJvamVjdHMvY3BydC9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3NlYW5oZXNzL3Byb2plY3RzL2NwcnQvcHVibGljL2FwcC9hcHAuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiogQGpzeCBSZWFjdC5ET00gKi92YXIgSGVsbG9Xb3JsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogJ0hlbGxvV29ybGQnLFxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgUmVhY3QuRE9NLnAobnVsbCwgXG4gICAgICAgICAgICAgICAgICBcIkhlbGxvLCBcIiwgUmVhY3QuRE9NLmlucHV0KCB7dHlwZTpcInRleHRcIiwgcGxhY2Vob2xkZXI6XCJZb3VyIG5hbWUgaGVyZVwifSApLFwiIVwiKycgJytcbiAgICAgICAgICAgICAgICAgIFwiSXQgaXMgXCIsIHRoaXMucHJvcHMuZGF0ZS50b1RpbWVTdHJpbmcoKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuUmVhY3QucmVuZGVyQ29tcG9uZW50KFxuICBIZWxsb1dvcmxkKCB7ZGF0ZTpuZXcgRGF0ZSgpfSApLFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd29vdCcpXG4pO1xuXG5cbmNvbnNvbGUubG9nKFwiTE9BRCBCQUJZVCB3aGF0emVyXCIpIl19
