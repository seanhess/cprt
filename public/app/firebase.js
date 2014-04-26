

var rootRef = exports.rootRef = new Firebase("https://cprt.firebaseio.com/");
var projectsRef = exports.projectsRef = rootRef.child("projects")

// I can maintain the state here I guess.... 

exports.nameId = function(name) {
    return name.replace(/\W/g, "-")
}

// an object that notifies you of updates
// sets the "id" field based on the ref name
// expects a .id field on new items
exports.managedArray = function(ref, onUpdate) {
    var items = []

    ref.on('child_added', function(snapshot, prevChildName) {
        var item = snapshot.val()
        item.id = snapshot.name()
        items = items.concat([item])
        onUpdate(items)
    })

    ref.on('child_removed', function(snapshot) {
        items = items.filter(function(item) {
            return snapshot.name() != item.id
        })
        onUpdate(items)
    })

    return {
        add: function(item) {
            console.log("ADDING", item, item.id)
            var childRef = ref.child(item.id)
            childRef.set(item)
        }
    }
}