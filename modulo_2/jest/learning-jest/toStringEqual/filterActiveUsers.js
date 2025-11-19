function filterActiveUsers(users){
    return users.filter(user=>user.active);
}

module.exports = {filterActiveUsers};