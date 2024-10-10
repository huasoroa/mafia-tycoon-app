import { getJobs, getProperties, getUsers } from "@/server/queries";

export default async function Home() {
  const users = await getUsers();
  const jobs = await getJobs();
  const properties = await getProperties();

  return (
    <div className="p-8 w-screen h-screen overflow-hidden">
      <h1 className="text-4xl font-bold">Mafia Tycoon</h1>
      <div className="grid grid-cols-3 gap-4 grid-flow-row mt-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Player</h2>
          <div className="grid grid-cols-2 pl-4 border-l-2 border-gray-500 h-full">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-sm">Age: {user.age}</p>
                <p className="text-sm">Gender: {user.gender}</p>
                <p className="text-sm">Money: {user.money}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Jobs</h2>
          <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-500 h-full">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{job.name}</h3>
                <p className="text-sm">Salary: {job.salary}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Properties</h2>
          <div className="grid grid-cols-2 pl-4 border-l-2 border-gray-500 h-full">
            {properties.map((property) => (
              <div key={property.id} className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{property.name}</h3>
                <p className="text-sm">Type: {property.type}</p>
                <p className="text-sm">Price: {property.price}</p>
                <p className="text-sm">Revenue: {property.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
