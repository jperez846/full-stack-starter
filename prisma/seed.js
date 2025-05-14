const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear data in reverse order due to dependencies
  await prisma.kudosCardComment.deleteMany();
  await prisma.kudosCard.deleteMany();
  await prisma.kudosBoard.deleteMany();

  const boards = [
    {
      title: "Team Appreciation",
      gifUrl: "https://media.giphy.com/media/teamwork.gif",
      category: "Work",
      author: "Manager",
      cards: [
        {
          message: "Great job on the product launch!",
          author: "Sarah",
          gifUrl: "https://media.giphy.com/media/congrats.gif",
          upvotes: 3,
          comments: [
            { message: "Absolutely crushed it!", author: "John" },
            { message: "Proud of this team 💪", author: "Emma" }
          ]
        },
        {
          message: "Thanks for staying late to fix the issue!",
          author: "Liam",
          gifUrl: "https://media.giphy.com/media/thanks.gif",
          comments: [
            { message: "Real MVP!", author: "Olivia" }
          ]
        }
      ]
    },
    {
      title: "Shoutouts",
      gifUrl: "https://media.giphy.com/media/shoutout.gif",
      category: "Fun",
      cards: [
        {
          message: "Love your positive attitude!",
          gifUrl: "https://media.giphy.com/media/smile.gif",
          upvotes: 5,
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
