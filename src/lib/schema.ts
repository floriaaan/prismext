export const parsePrismaSchema = async (schemaPath: string) => {
  const fs = await import("fs");
  const path = await import("path");
  const schema = await fs.promises.readFile(path.resolve(schemaPath), "utf-8");

  // get database provider from schema starting with "datasource db"
  const provider = schema.split("datasource db").slice(1)[0].split("provider = ")[1].split("\n")[0].replaceAll('"', "");

  const models = schema
    .split("model ")
    .slice(1)
    .map((model) => {
      const name = model.split(" ")[0];

      // check if model has a @map directive and get the table name else use the model name as table name
      const database = model.split('@@map("')[1]?.split('")')[0] ?? name;

      return { name: toPascaleCase(name), database };
    });

  return { provider, models };
};

const toPascaleCase = (str: string) => {
  // each seperator (-, _, ., etc.) in the string make the next character uppercase
  // first character is always lowercase
  // e.g. "hello-world" => "HelloWorld"
  return str
    .split(/[-_./]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
    .replace(/^\w/, (c) => c.toLowerCase());
};
