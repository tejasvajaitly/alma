import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Hi, Welcome!</CardTitle>
        </CardHeader>
        <div className="flex flex-col justify-center items-center gap-2">
          <Button>
            <Link href="/dashboard">Go to admin dashboard</Link>
          </Button>

          <Button>
            <Link href="/apply">Get an assessment</Link>
          </Button>
        </div>
      </Card>
    </main>
  );
}
