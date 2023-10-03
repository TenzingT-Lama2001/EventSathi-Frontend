import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



export const metadata = {
  title: "Dashboard",
  description: "Dashboard to get started.",
}
const times = [1,2,3]

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-3 lg:mt-6">
      {times.map((t, index) =>{
        return (

        <Card key ={index}>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
            </Card>
         
        )
      })}

    </main>
  );
}
