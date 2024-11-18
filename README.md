### `❄Tech Stack `

<ul>
<li>Next Js</li>
<li>Typescript</li>
<li>Tailwind CSS</li>
<li>Shadcn UI Library</li>
<li>react-hot-toast</li>
</ul>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### `❄ Inject Fake todos for testing`

You can test the dashboard by injecting tasks. Run below code on browser inspect panel:

```
function generateTasks() {
  const priorities = ["low", "medium", "high"];
  const statuses = ["pending", "complete"];
  const tasks = [];

  for (let i = 0; i < 16; i++) {
    const randomPriority =
      priorities[Math.floor(Math.random() * priorities.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Generate a date in the past week
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 7));

    tasks.push({
      id: `${i + 1}`,
      name: `Task ${i + 1}`,
      priority: randomPriority,
      status: randomStatus,
      createdAt: createdAt.toISOString(),
    });
  }

  return tasks;
}


const tasks = generateTasks();
localStorage.setItem("FlowMate-Tasks", JSON.stringify(tasks));



```

This will insert some random tasks into browser local storage. So that you can see the populated dashboard
