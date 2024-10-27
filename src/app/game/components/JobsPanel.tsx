"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectJob } from "@/server/db/schema";

const JobsPanel = ({ jobs }: { jobs: SelectJob[] }) => {
  const hasJob = jobs.length > 0;

  const handleJobClick = () => {
    console.log("Get a job");
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-bold">Jobs</h3>
      <div className="flex flex-col gap-4 pl-4 border-l-2 border-gray-500 h-full">
        {!hasJob && <p className="text-sm">You are jobless</p>}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Get a job</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Looking for a job?</DialogTitle>
              <DialogDescription>
                You can get a job by filling out the form below.
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto flex flex-col gap-4 px-4">
              {jobs.map((job) => (
                <Card
                  key={job.id}
                  onClick={handleJobClick}
                  className="w-full hover:bg-card"
                >
                  <CardHeader>
                    <p className="font-bold">{job.name}</p>
                  </CardHeader>
                  <CardContent>
                    <p>{job.description}</p>
                    <p>{job.salary}€</p>
                    <p>{job.type}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant={"outline"}>Apply</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default JobsPanel;
