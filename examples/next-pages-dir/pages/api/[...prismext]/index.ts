import Prismext from "prismext";
import prisma from "lib/prisma";

export default Prismext({
  prisma: {
    instance: prisma,
  },
});
