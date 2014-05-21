var _ = require('lodash')

// Shows/hides, takes an array of pages that it renders and reports as selected
module.exports = React.createClass({
    render: function() {
        var bars = _.times(this.props.points, function() {
            return "█"
        })

        return (<span>
            {bars}
        </span>)
    },
})