// despite seed is not really intended for this,
//  let's use it to make sure we have our hardcoded test-like user in the database :)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const user = {
  id: 'b9077855-7290-4c63-a13a-33f32f95840e',
  email: 'user@host.com',
};

async function main() {
  await prisma.user.upsert({
    where: {
      id: user.id,
    },
    update: {},
    create: user,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
