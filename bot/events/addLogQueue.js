module.exports = {
    name: "addLogQueue",
    event: "addLogQueue",
    exec: function (subject, title, time, content) {
        var content = `[${time.getFullYear()}/${time.getMonth()+1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}]`+
        ` [${subject}-${title}] ${content}`;
        client.logQueue.push(content);
        return content;
    }
}