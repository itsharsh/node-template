module.exports = function (html = `<h1>Default message.</h1>`) {
    const res = this;
    res.send(html);
};
