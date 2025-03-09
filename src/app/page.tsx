"use client";
import React from "react";
import SearchSection from "@/components/SearchSection";
import Spinner from "@/components/Spinner";
import UserItem from "@/components/UserItem";
import useGetRepositoryList from "@/hooks/useGetRepositoryList";
import useGetUserList from "@/hooks/useGetUserList";
import { useState } from "react";
import Link from "next/link";

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
      <main className="max-w-full lg:max-w-xl mx-auto pb-10">
        {/* header */}
        <div className="py-4">
          <h3 className="text-center font-bold">Github Repository Explorer</h3>
          <h4 className="text-center text-sm">
            Made by{" "}
            <Link
              className="text-[#2c9cdb]"
              href="https://github.com/AgungRiyanto"
              target={"_blank"}
            >
              Agung Riyanto
            </Link>
          </h4>
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
