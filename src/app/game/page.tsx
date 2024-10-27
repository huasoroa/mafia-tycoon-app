import {
  getAllJobs,
  getCharacters,
  getJobsByCharacter,
  getProperties,
} from "@/server/queries";
import JobsPanel from "./components/JobsPanel";
import PlayerPanel from "./components/PlayerPanel";
import PropertiesPanel from "./components/PropertiesPanel";

const Game = async () => {
  const characters = await getCharacters();
  const allJobs = await getAllJobs();
  const jobs = await getJobsByCharacter(characters[0].id);
  const properties = await getProperties();

  return (
    <div className="p-8 w-screen h-screen overflow-hidden">
      <h1 className="text-4xl font-bold">Mafia Tycoon</h1>
      <div className="grid grid-cols-3 gap-4 grid-flow-row mt-4">
        <PlayerPanel character={characters[0]} />
        <JobsPanel jobs={allJobs} />
        <PropertiesPanel properties={properties} />
      </div>
    </div>
  );
};

export default Game;
