
module.exports = React.createClass({

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