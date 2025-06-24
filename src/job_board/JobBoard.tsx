import { useEffect, useRef, useState } from "react";
import JobComponent from "./JobComponent";

type JobType = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

function JobBoard() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [jobIds, setJobIds] = useState<number[]>([]);
  const [loader, setLoader] = useState(true);
  const [currentJobIDs, setCurrentJobIDs] = useState<number[]>([]);
  const baseURL = "https://hacker-news.firebaseio.com/v0/";

  const currentJobsToShow = useRef(6);

  useEffect(() => {
    const getJobIDs = async () => {
      try {
        setLoader(true);
        const response = await fetch(`${baseURL}jobstories.json`);
        if (response.ok) {
          const result = await response.json();
          setJobIds(result);
          setCurrentJobIDs(result.slice(0, currentJobsToShow.current));
          setLoader(false);
        }
      } catch (error) {
        console.log("Error fetching jobs Ids", error);
      }
    };

    if (jobIds.length == 0) {
      getJobIDs();
    }

    getJobs();
  }, [currentJobIDs]);

  const getJobs = async () => {
    currentJobIDs?.forEach(async (id) => {
      try {
        setLoader(true);
        const res = await fetch(`${baseURL}/item/${id}.json?print=pretty`);
        if (res.ok) {
          const result = await res.json();
          if (result) {
            setJobs((prev) => {
              return [...prev, result];
            });
            setLoader(false);
          }
        }
      } catch (error) {
        console.log("Error fetching jobs :(", error);
      }
    });
  };

  return (
    <div>
      <h1 className="text-orange-400 text-2xl font-bold py-3">JobBoard</h1>
      {loader ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-col gap-3 p-4 rounded bg-orange-50">
            {jobs &&
              jobs.map((job) => (
                <JobComponent
                  key={job.id}
                  by={job.by}
                  id={job.id}
                  time={job.time}
                  title={job.title}
                  url={job.url}
                />
              ))}
          </div>
          <button
            className="mt-3 px-2 py-1 bg-blue-100 bg-text-800 rounded-md"
            disabled={currentJobIDs.length == 0}
            onClick={() => {
              if (jobIds && currentJobIDs) {
                const newIDs = new Set(
                  jobIds?.slice(
                    currentJobsToShow.current,
                    currentJobsToShow.current + 6
                  )
                );
                setCurrentJobIDs(Array.from(newIDs));
                currentJobsToShow.current += 6;
              }
            }}
          >
            Load more jobs
          </button>
        </>
      )}
    </div>
  );
}

export default JobBoard;
