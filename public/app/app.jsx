var Projects = require('./projects.jsx')
var Nav = require('./nav.jsx')
var DataTest = require('./test.jsx')

var Root = React.createClass({

    pages: [
        {name: "Projects", component: <Projects />},
        {name: "Data Test", component: <DataTest />},
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
            <div className={classes}>
                <Nav isOpen={this.state.isMenuOpen} onSelect={this.onNav} pages={this.pages}/>
                <button className="menu-button" onClick={this.showMenu}>M</button>
                <div className="active-page">
                    {this.state.currentPage.component}
                </div>
            </div>
        )
    }
})

React.renderComponent(<Root />, document.getElementById('root'));
