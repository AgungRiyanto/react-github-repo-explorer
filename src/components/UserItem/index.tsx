import React from "react";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import StarIcon from "@mui/icons-material/Star";
import { IRepository } from "@/interfaces/repository.interface";
import Spinner from "../Spinner";

type Props = {
  name: string;
  repositories: IRepository[];
  onClick: (username: string) => void;
  expanded: boolean;
  loading: boolean;
};

const UserItem = (props: Props) => {
  const { name, onClick, expanded, repositories, loading } = props;

  const handleClick = () => {
    onClick(name);
  };

  return (
    <div className="mt-4 mx-6 rounded-md overflow-hidden">
      <div
        onClick={handleClick}
        className="flex flex-row bg-[#e0e0e0] justify-between p-2 cursor-pointer"
      >
        <label>{name}</label>
        {expanded ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
      </div>
      {loading && expanded && (
        <div className="mt-2">
          <Spinner text="Loading..." />
        </div>
      )}
      {expanded && (
        <div className="pl-2">
          {repositories.map((repo) => (
            <div
              key={`repo-${repo.id}`}
              className="bg-[#e0e0e0] mt-2 p-2 rounded-md"
            >
              <div className="flex flex-row justify-between">
                <label className="font-bold">{repo.name}</label>
                <div className="flex flex-row gap-x-2">
                  <label className="text-sm font-bold">
                    {repo.stargazers_count}
                  </label>
                  <StarIcon fontSize="small" />
                </div>
              </div>
              <label>{repo.description}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserItem;
