export async function GET(request: Request) {
  // Extract query parameters for page and limit
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");
  const limitParam = url.searchParams.get("limit");

  console.log("pageParam", pageParam);
  console.log("limitParam", limitParam);

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : 5;

  // Calculate start and end indices for slicing the data
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Slice the data to get the paginated results
  const paginatedData = mockData.slice(startIndex, endIndex);

  // Return the paginated data along with pagination info
  return new Response(
    JSON.stringify({
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(mockData.length / limit),
      totalItems: mockData.length,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

const mockData = [
  {
    firstName: "John",
    lastName: "Doe",
    submittedOn: "2024-07-01T10:30:00Z",
    status: "Pending",
    country: "USA",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    submittedOn: "2024-07-05T14:45:00Z",
    status: "Reached Out",
    country: "Canada",
  },
  {
    firstName: "Liam",
    lastName: "Brown",
    submittedOn: "2024-06-28T09:20:00Z",
    status: "Pending",
    country: "UK",
  },
  {
    firstName: "Olivia",
    lastName: "Johnson",
    submittedOn: "2024-07-10T11:15:00Z",
    status: "Reached Out",
    country: "Australia",
  },
  {
    firstName: "Noah",
    lastName: "Garcia",
    submittedOn: "2024-07-15T08:55:00Z",
    status: "Pending",
    country: "Spain",
  },
  {
    firstName: "Emma",
    lastName: "Martinez",
    submittedOn: "2024-07-08T13:35:00Z",
    status: "Reached Out",
    country: "Mexico",
  },
  {
    firstName: "Ava",
    lastName: "Davis",
    submittedOn: "2024-06-25T12:00:00Z",
    status: "Pending",
    country: "Germany",
  },
  {
    firstName: "William",
    lastName: "Lopez",
    submittedOn: "2024-07-03T15:45:00Z",
    status: "Reached Out",
    country: "Brazil",
  },
  {
    firstName: "Sophia",
    lastName: "Gonzalez",
    submittedOn: "2024-07-12T09:10:00Z",
    status: "Pending",
    country: "Argentina",
  },
  {
    firstName: "James",
    lastName: "Wilson",
    submittedOn: "2024-07-18T14:20:00Z",
    status: "Reached Out",
    country: "South Africa",
  },
  {
    firstName: "Mia",
    lastName: "Hernandez",
    submittedOn: "2024-07-02T10:00:00Z",
    status: "Pending",
    country: "USA",
  },
  {
    firstName: "Lucas",
    lastName: "Lee",
    submittedOn: "2024-07-06T15:30:00Z",
    status: "Reached Out",
    country: "Canada",
  },
  {
    firstName: "Mason",
    lastName: "Clark",
    submittedOn: "2024-06-29T11:00:00Z",
    status: "Pending",
    country: "UK",
  },
  {
    firstName: "Ethan",
    lastName: "Lewis",
    submittedOn: "2024-07-11T12:15:00Z",
    status: "Reached Out",
    country: "Australia",
  },
  {
    firstName: "Harper",
    lastName: "Robinson",
    submittedOn: "2024-07-16T09:45:00Z",
    status: "Pending",
    country: "Spain",
  },
  {
    firstName: "Isabella",
    lastName: "Walker",
    submittedOn: "2024-07-09T14:00:00Z",
    status: "Reached Out",
    country: "Mexico",
  },
  {
    firstName: "Elijah",
    lastName: "Young",
    submittedOn: "2024-06-26T13:30:00Z",
    status: "Pending",
    country: "Germany",
  },
  {
    firstName: "Amelia",
    lastName: "Allen",
    submittedOn: "2024-07-04T16:00:00Z",
    status: "Reached Out",
    country: "Brazil",
  },
  {
    firstName: "Logan",
    lastName: "King",
    submittedOn: "2024-07-13T10:30:00Z",
    status: "Pending",
    country: "Argentina",
  },
  {
    firstName: "Aiden",
    lastName: "Scott",
    submittedOn: "2024-07-19T15:45:00Z",
    status: "Reached Out",
    country: "South Africa",
  },
  {
    firstName: "Charlotte",
    lastName: "Green",
    submittedOn: "2024-07-01T09:00:00Z",
    status: "Pending",
    country: "USA",
  },
  {
    firstName: "Benjamin",
    lastName: "Adams",
    submittedOn: "2024-07-07T14:30:00Z",
    status: "Reached Out",
    country: "Canada",
  },
  {
    firstName: "Sebastian",
    lastName: "Baker",
    submittedOn: "2024-06-30T11:45:00Z",
    status: "Pending",
    country: "UK",
  },
  {
    firstName: "Sofia",
    lastName: "Wright",
    submittedOn: "2024-07-12T13:00:00Z",
    status: "Reached Out",
    country: "Australia",
  },
  {
    firstName: "Jackson",
    lastName: "Hill",
    submittedOn: "2024-07-17T09:15:00Z",
    status: "Pending",
    country: "Spain",
  },
  {
    firstName: "Mila",
    lastName: "Torres",
    submittedOn: "2024-07-09T15:30:00Z",
    status: "Reached Out",
    country: "Mexico",
  },
  {
    firstName: "Grayson",
    lastName: "Nguyen",
    submittedOn: "2024-06-27T10:45:00Z",
    status: "Pending",
    country: "Germany",
  },
  {
    firstName: "Avery",
    lastName: "Perry",
    submittedOn: "2024-07-05T16:15:00Z",
    status: "Reached Out",
    country: "Brazil",
  },
  {
    firstName: "Henry",
    lastName: "Roberts",
    submittedOn: "2024-07-14T11:30:00Z",
    status: "Pending",
    country: "Argentina",
  },
  {
    firstName: "Scarlett",
    lastName: "Price",
    submittedOn: "2024-07-20T16:45:00Z",
    status: "Reached Out",
    country: "South Africa",
  },
  {
    firstName: "Levi",
    lastName: "Bennett",
    submittedOn: "2024-07-02T09:30:00Z",
    status: "Pending",
    country: "USA",
  },
  {
    firstName: "Chloe",
    lastName: "Wood",
    submittedOn: "2024-07-08T15:00:00Z",
    status: "Reached Out",
    country: "Canada",
  },
  {
    firstName: "Daniel",
    lastName: "Harris",
    submittedOn: "2024-07-01T12:45:00Z",
    status: "Pending",
    country: "UK",
  },
  {
    firstName: "Ella",
    lastName: "Reed",
    submittedOn: "2024-07-11T13:15:00Z",
    status: "Reached Out",
    country: "Australia",
  },
  {
    firstName: "Alexander",
    lastName: "Cooper",
    submittedOn: "2024-07-15T10:00:00Z",
    status: "Pending",
    country: "Spain",
  },
  {
    firstName: "Aria",
    lastName: "Morris",
    submittedOn: "2024-07-10T14:45:00Z",
    status: "Reached Out",
    country: "Mexico",
  },
  {
    firstName: "Samuel",
    lastName: "Rogers",
    submittedOn: "2024-06-28T11:15:00Z",
    status: "Pending",
    country: "Germany",
  },
  {
    firstName: "Victoria",
    lastName: "Cook",
    submittedOn: "2024-07-06T16:30:00Z",
    status: "Reached Out",
    country: "Brazil",
  },
  {
    firstName: "David",
    lastName: "Morgan",
    submittedOn: "2024-07-13T12:00:00Z",
    status: "Pending",
    country: "Argentina",
  },
  {
    firstName: "Luna",
    lastName: "Peterson",
    submittedOn: "2024-07-18T16:15:00Z",
    status: "Reached Out",
    country: "South Africa",
  },
  {
    firstName: "Joseph",
    lastName: "Bailey",
    submittedOn: "2024-07-03T09:45:00Z",
    status: "Pending",
    country: "USA",
  },
  {
    firstName: "Zoey",
    lastName: "Rivera",
    submittedOn: "2024-07-07T15:15:00Z",
    status: "Reached Out",
    country: "Canada",
  },
  {
    firstName: "Matthew",
    lastName: "Kim",
    submittedOn: "2024-06-30T13:00:00Z",
    status: "Pending",
    country: "UK",
  },
  {
    firstName: "Layla",
    lastName: "Mitchell",
    submittedOn: "2024-07-12T14:30:00Z",
    status: "Reached Out",
    country: "Australia",
  },
  {
    firstName: "Owen",
    lastName: "Perez",
    submittedOn: "2024-07-16T11:15:00Z",
    status: "Pending",
    country: "Spain",
  },
  {
    firstName: "Riley",
    lastName: "Roberts",
    submittedOn: "2024-07-09T16:00:00Z",
    status: "Reached Out",
    country: "Mexico",
  },
  {
    firstName: "Gabriel",
    lastName: "Turner",
    submittedOn: "2024-06-27T12:30:00Z",
    status: "Pending",
    country: "Germany",
  },
  {
    firstName: "Lily",
    lastName: "Phillips",
    submittedOn: "2024-07-04T17:00:00Z",
    status: "Reached Out",
    country: "Brazil",
  },
  {
    firstName: "Jack",
    lastName: "Campbell",
    submittedOn: "2024-07-14T12:30:00Z",
    status: "Pending",
    country: "Argentina",
  },
  {
    firstName: "Hannah",
    lastName: "Parker",
    submittedOn: "2024-07-20T17:15:00Z",
    status: "Reached Out",
    country: "South Africa",
  },
];
