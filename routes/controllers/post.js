var parsePost = function(body, result) {

    console.log(body)
    body.content = body.content.trim()
    body.category = result.category
    body.writtenBy = result.user

    return body
}

module.exports = {
    parsePost: parsePost
}
