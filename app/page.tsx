import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mx-auto mt-20 flex flex-col max-w-screen-sm gap-12">
      <h1 className="text-4xl font-bold text-center">This is heading-bold</h1>
      <h2 className="text-2xl font-semibold text-center">
        This is heading-semibold
      </h2>
      <h3 className="text-xl font-medium text-center">
        This is heading-medium
      </h3>
      <p className="text-base text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        inventore modi, facilis nesciunt libero et recusandae sapiente pariatur
        repellat amet dolores error quibusdam distinctio asperiores saepe
        blanditiis praesentium ipsa neque.
      </p>
      <Button className="w-fit mx-auto">Click me</Button>
    </div>
  );
}
