// Shows/hides, takes an array of pages that it renders and reports as selected
module.exports = React.createClass({
    render: function() {

        var classes = React.addons.classSet({
            'cbp-spmenu': true,
            'cbp-spmenu-vertical': true, 
            'cbp-spmenu-left' : true,
            'cbp-spmenu-open' : this.props.isOpen,
        })

        return (<nav className={classes} id="cbp-spmenu-s1">
            <h3>Menu</h3>
            {this.renderPages()}
        </nav>)
    },

    renderPages: function() {
        return this.props.pages.map(function(page) {
            return <a key={page.name} onClick={this.onSelect.bind(this, page)}>{page.name}</a>
        }.bind(this))
    },

    onSelect: function(page) {
        this.props.onSelect(page)
    },
})