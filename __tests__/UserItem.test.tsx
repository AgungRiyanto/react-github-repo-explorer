import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IRepository } from "@/interfaces/repository.interface";
import UserItem from "@/components/UserItem";

describe("UserItem Component", () => {
  const mockOnClick = jest.fn();
  const mockRepositories: IRepository[] = [
    {
      id: 1,
      name: "Repo 1",
      description: "First repository",
      stargazers_count: 10,
    },
    {
      id: 2,
      name: "Repo 2",
      description: "Second repository",
      stargazers_count: 5,
    },
  ];

  test("renders the user name", () => {
    render(
      <UserItem
        name="octocat"
        repositories={[]}
        onClick={mockOnClick}
        expanded={false}
        loading={false}
      />
    );

    expect(screen.getByText("octocat")).toBeInTheDocument();
  });

  test("calls onClick when clicked", () => {
    render(
      <UserItem
        name="octocat"
        repositories={[]}
        onClick={mockOnClick}
        expanded={false}
        loading={false}
      />
    );

    const userItem = screen.getByText("octocat");
    fireEvent.click(userItem);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith("octocat");
  });

  test("shows spinner when loading", () => {
    render(
      <UserItem
        name="octocat"
        repositories={[]}
        onClick={mockOnClick}
        expanded={true}
        loading={true}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders repositories when expanded", () => {
    render(
      <UserItem
        name="octocat"
        repositories={mockRepositories}
        onClick={mockOnClick}
        expanded={true}
        loading={false}
      />
    );

    expect(screen.getByText("Repo 1")).toBeInTheDocument();
    expect(screen.getByText("First repository")).toBeInTheDocument();
    expect(screen.getByText("Repo 2")).toBeInTheDocument();
    expect(screen.getByText("Second repository")).toBeInTheDocument();
  });

  test("does not show repositories when not expanded", () => {
    render(
      <UserItem
        name="octocat"
        repositories={mockRepositories}
        onClick={mockOnClick}
        expanded={false}
        loading={false}
      />
    );

    expect(screen.queryByText("Repo 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Repo 2")).not.toBeInTheDocument();
  });
});
