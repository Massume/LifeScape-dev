import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      passwordHash: 'hash',
      isVerified: true,
      districts: {
        create: {
          name: 'Central District',
          streets: {
            create: {
              name: 'Main Street',
              buildings: {
                create: [
                  { number: '1' },
                  { number: '2' },
                ],
              },
            },
          },
        },
      },
    },
    include: {
      districts: {
        include: {
          streets: {
            include: {
              buildings: true,
            },
          },
        },
      },
    },
  });

  const street = user.districts[0].streets[0];
  const [building1, building2] = street.buildings;

  await prisma.decision.create({
    data: {
      title: 'Good decision',
      isGood: true,
      userId: user.id,
      buildingId: building1.id,
    },
  });

  await prisma.decision.create({
    data: {
      title: 'Bad decision',
      isGood: false,
      userId: user.id,
      buildingId: building2.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
