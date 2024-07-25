import { sql } from "drizzle-orm";
import { db } from "@/db/index";
import { leads } from "@/db/schemas/schemas";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");
  const limitParam = url.searchParams.get("limit");

  console.log("pageParam", pageParam);
  console.log("limitParam", limitParam);

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = limitParam ? parseInt(limitParam, 10) : 5;

  const offset = (page - 1) * limit;

  const paginatedData = await db
    .select()
    .from(leads)
    .limit(limit)
    .offset(offset);

  const [{ count }] = await db
    .select({
      count: sql<number>`count(*)`,
    })
    .from(leads);

  return new Response(
    JSON.stringify({
      data: paginatedData,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

const mockData = [
  {
    firstName: "Emma",
    lastName: "Chen",
    submittedOn: "2024-07-15T08:45:23Z",
    status: "Pending",
    country: "Canada",
  },
  {
    firstName: "Liam",
    lastName: "Rodriguez",
    submittedOn: "2024-07-03T14:22:56Z",
    status: "Pending",
    country: "Mexico",
  },
  {
    firstName: "Sophia",
    lastName: "Müller",
    submittedOn: "2024-07-09T11:17:39Z",
    status: "Reached Out",
    country: "Germany",
  },
  {
    firstName: "Ethan",
    lastName: "Nguyen",
    submittedOn: "2024-07-22T19:05:12Z",
    status: "Pending",
    country: "Vietnam",
  },
  {
    firstName: "Olivia",
    lastName: "Patel",
    submittedOn: "2024-07-18T06:33:47Z",
    status: "Reached Out",
    country: "India",
  },
  {
    firstName: "Noah",
    lastName: "Kim",
    submittedOn: "2024-07-05T21:59:01Z",
    status: "Pending",
    country: "South Korea",
  },
  {
    firstName: "Ava",
    lastName: "Silva",
    submittedOn: "2024-07-11T16:40:34Z",
    status: "Reached Out",
    country: "Brazil",
  },
  {
    firstName: "Mason",
    lastName: "Ivanov",
    submittedOn: "2024-07-27T03:12:58Z",
    status: "Reached Out",
    country: "Russia",
  },
  {
    firstName: "Isabella",
    lastName: "Johnson",
    submittedOn: "2024-07-02T09:28:15Z",
    status: "Pending",
    country: "USA",
  },
  {
    firstName: "William",
    lastName: "García",
    submittedOn: "2024-07-19T13:51:42Z",
    status: "Pending",
    country: "Spain",
  },
  {
    firstName: "Mia",
    lastName: "Tanaka",
    submittedOn: "2024-07-08T22:37:09Z",
    status: "Reached Out",
    country: "Japan",
  },
  {
    firstName: "James",
    lastName: "Ahmed",
    submittedOn: "2024-07-25T07:14:36Z",
    status: "Pending",
    country: "Egypt",
  },
  {
    firstName: "Charlotte",
    lastName: "Kowalski",
    submittedOn: "2024-07-13T18:00:53Z",
    status: "Reached Out",
    country: "Poland",
  },
  {
    firstName: "Benjamin",
    lastName: "Lee",
    submittedOn: "2024-07-06T11:47:20Z",
    status: "Pending",
    country: "Australia",
  },
  {
    firstName: "Amelia",
    lastName: "Andersson",
    submittedOn: "2024-07-21T15:33:47Z",
    status: "Reached Out",
    country: "Sweden",
  },
  {
    firstName: "Elijah",
    lastName: "Mbeki",
    submittedOn: "2024-07-17T04:20:14Z",
    status: "Pending",
    country: "South Africa",
  },
  {
    firstName: "Harper",
    lastName: "Dubois",
    submittedOn: "2024-07-10T20:06:41Z",
    status: "Reached Out",
    country: "France",
  },
  {
    firstName: "Lucas",
    lastName: "Rossi",
    submittedOn: "2024-07-28T09:53:08Z",
    status: "Pending",
    country: "Italy",
  },
  {
    firstName: "Evelyn",
    lastName: "Sato",
    submittedOn: "2024-07-04T17:39:35Z",
    status: "Reached Out",
    country: "Japan",
  },
  {
    firstName: "Alexander",
    lastName: "Singh",
    submittedOn: "2024-07-23T12:26:02Z",
    status: "Pending",
    country: "India",
  },
  {
    firstName: "Abigail",
    lastName: "O'Brien",
    submittedOn: "2024-07-14T01:12:29Z",
    status: "Reached Out",
    country: "Ireland",
  },
  {
    firstName: "Daniel",
    lastName: "Yilmaz",
    submittedOn: "2024-07-07T23:58:56Z",
    status: "Pending",
    country: "Turkey",
  },
  {
    firstName: "Emily",
    lastName: "Wong",
    submittedOn: "2024-07-20T05:45:23Z",
    status: "Reached Out",
    country: "Singapore",
  },
  {
    firstName: "Henry",
    lastName: "Kovács",
    submittedOn: "2024-07-16T19:31:50Z",
    status: "Pending",
    country: "Hungary",
  },
  {
    firstName: "Elizabeth",
    lastName: "Santos",
    submittedOn: "2024-07-01T10:18:17Z",
    status: "Reached Out",
    country: "Philippines",
  },
  {
    firstName: "Michael",
    lastName: "Andersen",
    submittedOn: "2024-07-26T14:04:44Z",
    status: "Pending",
    country: "Denmark",
  },
  {
    firstName: "Avery",
    lastName: "Popescu",
    submittedOn: "2024-07-12T08:51:11Z",
    status: "Reached Out",
    country: "Romania",
  },
  {
    firstName: "Jackson",
    lastName: "Yamamoto",
    submittedOn: "2024-07-24T22:37:38Z",
    status: "Pending",
    country: "Japan",
  },
  {
    firstName: "Sofia",
    lastName: "Novak",
    submittedOn: "2024-07-08T16:24:05Z",
    status: "Reached Out",
    country: "Czech Republic",
  },
  {
    firstName: "Sebastian",
    lastName: "Van der Berg",
    submittedOn: "2024-07-29T03:10:32Z",
    status: "Pending",
    country: "Netherlands",
  },
  {
    firstName: "Scarlett",
    lastName: "Fernandez",
    submittedOn: "2024-07-05T11:56:59Z",
    status: "Reached Out",
    country: "Argentina",
  },
  {
    firstName: "Jack",
    lastName: "Papadopoulos",
    submittedOn: "2024-07-21T20:43:26Z",
    status: "Pending",
    country: "Greece",
  },
  {
    firstName: "Victoria",
    lastName: "Nielsen",
    submittedOn: "2024-07-18T07:29:53Z",
    status: "Reached Out",
    country: "Norway",
  },
  {
    firstName: "Aiden",
    lastName: "Cho",
    submittedOn: "2024-07-02T15:16:20Z",
    status: "Pending",
    country: "South Korea",
  },
  {
    firstName: "Grace",
    lastName: "Mancini",
    submittedOn: "2024-07-27T09:02:47Z",
    status: "Reached Out",
    country: "Italy",
  },
  {
    firstName: "Owen",
    lastName: "Petrov",
    submittedOn: "2024-07-11T23:49:14Z",
    status: "Pending",
    country: "Bulgaria",
  },
  {
    firstName: "Chloe",
    lastName: "Larsson",
    submittedOn: "2024-07-15T13:35:41Z",
    status: "Reached Out",
    country: "Sweden",
  },
  {
    firstName: "Isaac",
    lastName: "Nkosi",
    submittedOn: "2024-07-06T02:22:08Z",
    status: "Pending",
    country: "Zimbabwe",
  },
  {
    firstName: "Zoey",
    lastName: "Mahfouz",
    submittedOn: "2024-07-25T18:08:35Z",
    status: "Reached Out",
    country: "Lebanon",
  },
  {
    firstName: "Gabriel",
    lastName: "Costa",
    submittedOn: "2024-07-09T06:55:02Z",
    status: "Pending",
    country: "Portugal",
  },
  {
    firstName: "Penelope",
    lastName: "Schmidt",
    submittedOn: "2024-07-19T21:41:29Z",
    status: "Reached Out",
    country: "Germany",
  },
  {
    firstName: "Lincoln",
    lastName: "Chow",
    submittedOn: "2024-07-03T10:27:56Z",
    status: "Pending",
    country: "Hong Kong",
  },
  {
    firstName: "Lily",
    lastName: "Eriksson",
    submittedOn: "2024-07-30T16:14:23Z",
    status: "Reached Out",
    country: "Finland",
  },
  {
    firstName: "Miles",
    lastName: "Morales",
    submittedOn: "2024-07-13T05:00:50Z",
    status: "Pending",
    country: "Puerto Rico",
  },
  {
    firstName: "Layla",
    lastName: "Khoury",
    submittedOn: "2024-07-22T14:47:17Z",
    status: "Reached Out",
    country: "United Arab Emirates",
  },
  {
    firstName: "Christopher",
    lastName: "Jansen",
    submittedOn: "2024-07-07T19:33:44Z",
    status: "Pending",
    country: "South Africa",
  },
  {
    firstName: "Riley",
    lastName: "O'Connor",
    submittedOn: "2024-07-28T08:20:11Z",
    status: "Reached Out",
    country: "Ireland",
  },
  {
    firstName: "Mateo",
    lastName: "Hernandez",
    submittedOn: "2024-07-10T00:06:38Z",
    status: "Pending",
    country: "Colombia",
  },
];
