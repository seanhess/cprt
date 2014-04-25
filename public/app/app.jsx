var HelloWorld = React.createClass({
    render: function() {
        return (
            <p>
                  Hello, <input type="text" placeholder="Your name here" />!
                  It is {this.props.date.toTimeString()}
            </p>
        );
    }
});

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
            <a href="#">Celery seakale</a>
            <a href="#">Dulse daikon</a>
            <a href="#">Zucchini garlic</a>
            <a href="#">Catsear azuki bean</a>
            <a href="#">Dandelion bunya</a>
            <a href="#">Rutabaga</a>
        </nav>)
    }
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
        this.fakeSuperComment.text = event.target.value
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
            <div className={classes}>
                <Nav isOpen={this.state.isMenuOpen}/>
                <button onClick={this.showMenu}>M</button>
                <HelloWorld date={new Date()}/>
                <p>This is a test</p>
                <DataTest />
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