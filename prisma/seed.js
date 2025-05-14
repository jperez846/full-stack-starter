const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear data in reverse order due to dependencies
  await prisma.kudosCardComment.deleteMany();
  await prisma.kudosCard.deleteMany();
  await prisma.kudosBoard.deleteMany();

  const boards = [
    {
      title: "Hello",
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHZnczJjbmxmZjZibjQ2M3gzMWt5cWZ3cTFyaDl0OTl1ZTdjcjNlaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/S2IfEQqgWc0AH4r6Al/giphy.gif",
      category: "Greetings",
      author: "jesus",
      cards: [
        {
          message: "Heya there jesus",
          author: "jesus",
          gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHZnczJjbmxmZjZibjQ2M3gzMWt5cWZ3cTFyaDl0OTl1ZTdjcjNlaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GRPy8MKag9U1U88hzY/giphy.gif",
          upvotes: 0,
          comments: []
        },
        {
          message: "demo-me",
          author: "jesus",
          gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZHZnczJjbmxmZjZibjQ2M3gzMWt5cWZ3cTFyaDl0OTl1ZTdjcjNlaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1kJxyyCq9ZHXX0GM3a/giphy.gif",
          upvotes: 1,
          comments: []
        }
      ]
    },
    {
      title: "Good Job",
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXczdWdqdG0xb2hzOXZkMzh0MjkxenpjeDUzYzdpazlleHBzajUyciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/glvNGHmbZwgrKH4YYA/giphy.gif",
      category: "Work",
      author: "jesus",
      cards: []
    },
    {
      title: "Congrats",
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXczdWdqdG0xb2hzOXZkMzh0MjkxenpjeDUzYzdpazlleHBzajUyciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IwAZ6dvvvaTtdI8SD5/giphy.gif",
      category: "Celebration",
      author: "jesus",
      cards: []
    },
    {
      title: "inspired",
      gifUrl: "https://media.giphy.com/media/pnQkwtT4bKgMAHZGA8/giphy.gif?cid=ecf05e47re6waw1m7fcvj93dktv942s423ldxmb9ko8r9qwq&ep=v1_gifs_search&rid=giphy.gif&ct=g",
      category: "Inspiration",
      author: "jesus",
      cards: [
        {
          message: "Im feeling motivated",
          author: "Anonymous",
          gifUrl: "https://media.giphy.com/media/AyVcoLz8kLoqNT7q3J/giphy.gif?cid=ecf05e47zxari6sev9kyesh2qgtky1d4az7b89l2ibax1c43&ep=v1_gifs_search&rid=giphy.gif&ct=g",
          upvotes: 0,
          comments: []
        }
      ]
    },
    {
      title: "Thank you",
      gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG01N3EyeGlhN2k3NjFzdXk5ajNuZTR4bnd2ZXJqOWM2MnJiOTV4YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/uWlpPGquhGZNFzY90z/giphy.gif",
      category: "Thank you",
      author: "jesus",
      cards: [
        {
          message: "Thanks!",
          author: "Anonymous",
          gifUrl: "https://media.giphy.com/media/BYoRqTmcgzHcL9TCy1/giphy.gif?cid=ecf05e47613wz5coniellycxyomujirxvzsf3bpd4ff76v5q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
          upvotes: 0,
          comments: []
        },
        {
          message: "coolio",
          author: "Anonymous",
          gifUrl: "https://media.giphy.com/media/6tHy8UAbv3zgs/giphy.gif?cid=ecf05e47613wz5coniellycxyomujirxvzsf3bpd4ff76v5q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
          upvotes: 0,
          comments: []
        },
        {
          message: "u are awesome!",
          author: "Anonymous",
          gifUrl: "https://media.giphy.com/media/3ohs4kI2X9r7O8ZtoA/giphy.gif?cid=ecf05e47613wz5coniellycxyomujirxvzsf3bpd4ff76v5q&ep=v1_gifs_search&rid=giphy.gif&ct=g",
          upvotes: 1,
          comments: []
        }
      ]
    }
  ];

  for (const board of boards) {
    await prisma.kudosBoard.create({
      data: {
        title: board.title,
        gifUrl: board.gifUrl,
        category: board.category ?? undefined,
        author: board.author ?? undefined,
        cards: {
          create: board.cards.map(card => ({
            message: card.message,
            author: card.author ?? undefined,
            gifUrl: card.gifUrl,
            upvotes: card.upvotes ?? 0,
            comments: {
              create: card.comments?.map(comment => ({
                message: comment.message,
                author: comment.author ?? undefined
              })) ?? []
            }
          }))
        }
      }
    });
  }

  console.log("🌱 Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
