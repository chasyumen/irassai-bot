module.exports = {
    name: "usernameFormat",
    run: function (name, tag) {
        if (tag == "0") {
            return name;
        } else {
            return `${name}#${tag}`;
        }
    }
}