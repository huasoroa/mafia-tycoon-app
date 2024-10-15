const JobsPanel = ({ jobs }: { jobs: any[] }) => {
  console.log(jobs);
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-bold">Jobs</h3>
      <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-500 h-full">
        {jobs.length === 0 && <p className="text-sm">You are jobless</p>}
        {jobs.map((job) => (
          <div key={job.id} className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">{job.name}</h3>
            <p className="text-sm">Salary: {job.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPanel;
