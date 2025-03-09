"use client";
import SearchSection from "@/components/SearchSection";
import Spinner from "@/components/Spinner";
import UserItem from "@/components/UserItem";
import useGetRepositoryList from "@/hooks/useGetRepositoryList";
import useGetUserList from "@/hooks/useGetUserList";
import { useState } from "react";

export default function Home() {
  const [expandedUser, setExpandedUser] = useState("");
  const {
    data: users,
    error: errorUser,
    loading: loadingUser,
    fetchUser,
  } = useGetUserList();

  const {
    data: repos,
    loading: loadingRepos,
    fetchRepository,
  } = useGetRepositoryList();

  const handleSearch = (q: string) => {
    fetchUser(q);
  };

  const handleClickUser = (username: string) => {
    setExpandedUser(username);
    fetchRepository(username);
  };

  return (
    <div className="min-h-screen justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-full lg:max-w-xl mx-auto">
        {/* header */}
        <div className="py-4">
          <h3 className="text-center font-bold">Github Repository Explorer</h3>
        </div>
        {/* search section */}
        <SearchSection onSearch={handleSearch} />
        {loadingUser && <Spinner text="Searching..." />}
        {errorUser && <label className="text-center">{errorUser}</label>}
        {/* user lists */}
        {users.map((user) => (
          <UserItem
            key={`user-${user.login}`}
            name={user.login}
            repositories={repos}
            onClick={handleClickUser}
            expanded={user.login === expandedUser}
            loading={loadingRepos}
          />
        ))}
      </main>
    </div>
  );
}
