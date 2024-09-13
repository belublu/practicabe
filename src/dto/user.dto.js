class UserDto {
    constructor(user) {
        this.email = user.email
        this.role = user.role
    }
}

// Lo incluyo en user.controller.js

export default UserDto