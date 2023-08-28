import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const roundsOfHashing = 10;

const main = async () => {
  const hashedPassword = await hash('something', roundsOfHashing);
  const john = await prisma.user.upsert({
    where: { email: 'johndoe@gmail.com' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'johndoe@gmail.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
    }
  });
  const jane = await prisma.user.upsert({
    where: { email: 'janedoe@gmail.com' },
    update: {
      password: hashedPassword
    },
    create: {
      email: 'janedoe@gmail.com',
      password: hashedPassword,
      firstName: 'Jane',
      lastName: 'Doe',
    }
  });
}


main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  })
