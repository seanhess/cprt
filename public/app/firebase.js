

var rootRef = exports.rootRef = new Firebase("https://cprt.firebaseio.com/");
var projectsRef = exports.projectsRef = rootRef.child("projects")

// I can maintain the state here I guess.... 

exports.nameId = function(name) {
    return name.replace(/\W/g, "-")
}