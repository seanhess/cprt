var Projects = require('./projects.jsx')

// Shows/hides, takes an array of pages that it renders and reports as selected
var Nav = React.createClass({
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

var DataTest = React.createClass({

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
            return <Comment key={comment.id} text={comment.text}/>
        })
        return (
            <div>
                <ul className="comments">{comments}</ul>
                <form className="commentForm">
                    <input type="text" ref="text" onChange={this.onChangeField}/>
                </form>
            </div>
        )
    },

    onChangeField: function(event) {
        console.log("Changed", event.target.value)
        this.fakeSuperComment.text = event.target.value // or this.refs.text
        this.setState({comments:[this.fakeSuperComment]})
    },
})

var Comment = React.createClass({
    render: function() {
        return (
            <li className="comment">
                {this.props.text}
            </li>
        )
    }
})

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
            'cbp-spmenu-push': true,
            'cbp-spmenu-push-toright' : this.state.isMenuOpen
        })
        return (
            <div className={classes}>
                <Nav isOpen={this.state.isMenuOpen} onSelect={this.onNav} pages={this.pages}/>
                <button onClick={this.showMenu}>M</button>
                <div className="active-page">
                    {this.state.currentPage.component}
                </div>
            </div>
        )
    }
})



React.renderComponent(<Root />, document.getElementById('root'));



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