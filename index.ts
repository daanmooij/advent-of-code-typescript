import { intro, isCancel, outro, text } from "@clack/prompts";

intro("Advent of Code");

const year = await text({
  message: "Which year?",
  placeholder: "2021",
  defaultValue: "2021",
});

const day = await text({
  message: "Which day?",
  placeholder: "1",
  validate: (value) => (value ? undefined : "Please enter a day"),
});

if (isCancel(year) || isCancel(day)) {
  outro("Cancelled");
  process.exit(0);
}

const paddedDay = day.padStart(2, "0");

outro(`Running ${year} day ${paddedDay}`);

await import(`./src/${year}/day${paddedDay}/solution.ts`);
