

exports.pointsLeft = function(project) {
    return project.total - project.completed
}

exports.pointsProgress = function(project) {
    return project.completed / project.total
}

exports.newProject = function(name, total) {
    return {
        name: name,
        points: 0,
        completed: 0,
        total: total
    }
}
