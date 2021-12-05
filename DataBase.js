const books = [
    {
        ISBN : "101",
        title : "MERN Stack",
        pubDate : "2021-11-25",
        language : "English",
        numPage : 234,
        author : ["201", "202"],
        publication : ["301"],
        category : ["Tech", "Programming", "Education"]
    },
    {
        ISBN : "102",
        title : "Python",
        pubDate : "2021-11-28",
        language : "French",
        numPage : 335,
        author : ["202"],
        publication : ["301","302"],
        category : ["Dev", "Programming", "Education"]
    }
];

const authors = [
    {
        ID : "201",
        name : "sam",
        books : ["101"]
    },
    {
        ID : "202",
        name : "rob",
        books : ["102", "101"]
    }
];

const publications = [
    {
        ID : "301",
        name : "Telusko",
        books : ["101", "102"]
    },
    {
        ID : "302",
        name : "Let's Upgrade",
        books : ["102"]
    }
];

module.exports = {books, authors, publications};