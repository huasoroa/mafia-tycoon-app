import Card from "./components/Card";

const getData = async () => {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();

  return data.users;
};

export default async function Home() {
  const data = await getData();

  return (
    <div className="p-8 w-screen h-screen overflow-hidden">
      <h1 className="text-4xl font-bold">Mafia Tycoon</h1>
      <div className="grid grid-cols-3 gap-4 grid-flow-row mt-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Player</h2>
          <div className="grid grid-cols-2 pl-4 border-l-2 border-gray-500 h-full">
            {data.map((user: any) => (
              <Card
                key={user.id}
                title={`${user.firstName} ${user.lastName}`}
                description={user.ssn}
                image={user.image}
              >
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Play
                </button>
              </Card>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Legal</h2>
          <div className="grid grid-cols-2 pl-4 border-l-2 border-gray-500 h-full"></div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Illegal</h2>
          <div className="grid grid-cols-2 pl-4 border-l-2 border-gray-500 h-full"></div>
        </div>
      </div>
    </div>
  );
}
