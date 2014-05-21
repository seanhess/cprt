// Shows/hides, takes an array of pages that it renders and reports as selected
module.exports = React.createClass({
    render: function() {

        var styles = {
            width: this.props.progress+"%"
        }

        return (<div className="percent-box">
            <div className="percent-box-background" style={styles}> </div>
            <div className="percent-box-data">{this.props.value}</div>
        </div>)
    },
})