require("../config/db");

const Book = require("../models/book");
const User = require("../models/user");


const seedBooks = () => {
  const bookData = [
    {
      title: "The Midnight Line",
      author: "Child, Lee",
      copies: 3,
      description:
        "This Lee Child book featuring Jack Reacher was disappointing as the story was weak and there was very little rock 'em sock 'em action I've learned to expect and enjoy from his other Reacher books. Still, it was certainly worth reading.",
      ISBN: "9780399593482"
    },
    {
      title: "The Rooster Bar",
      author: "Grisham, John",
      copies: 0,
      description:
        "This is the first John Grisham book that I have read and I enjoyed it. I plan on reading more of his books. Very interesting plot and I liked all the main characters.",
      ISBN: "9780385541176"
    },
    {
      title: "Two Kinds of Truth",
      author: "Connelly, Michael",
      copies: 5,
      description:
        "Another good read with Harry Bosch. This time he is working two cases, one is a current case & the other is from his past where he is accused of planting evidence in a case where the felon has ended up on death row.",
      ISBN: "9780316225908"
    },
    {
      title: "Origin",
      author: "Brown, Dan",
      copies: 4,
      description: "Another excellent adventure of Robert Langdon. This time Robert finds himself in a whirlwind of mystery surrounding the death of his dear friend, Edmund Kirsch, who is on the verge of discovering a scientific breakthrough.",
      ISBN: "9780385514231"
    },
    {
      title: "End Game",
      author: "Baldacci, David",
      copies: 2,
      description:
        "The John Puller series is another great 4 book series that could use some more added stories.",
      ISBN: "9781455586608"
    },
    {
      title: "Deep Freeze",
      author: "Sandford, John",
      copies: 2,
      description:
        "Deep Freeze is an interesting book",
      ISBN: "9780399176067"
    }
  ];

  bookData.forEach(item => {
    const book = new Book({
      title: item.title,
      author: item.author,
      copies: item.copies,
      description: item.description,
      ISBN: item.ISBN
    });

    book
      .save()
      .then(console.log)
      .catch(console.error);
  });
};

const clearBooks = () => {
  Book.remove({})
    .then(console.log)
    .catch(console.error);
};

const clearUsers = () => {
  User.remove({})
  .then(console.log)
  .catch(console.error)
};

// clearBooks();
// clearUsers();
seedBooks();