import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Create() {
    return(
        <div className="">
            <h1 className="text-xl text-foreground text-center">Create</h1>

            <Card className="w-9/12 mx-auto">

                <CardHeader>
                    <CardTitle>Post it here</CardTitle>
                    <CardDescription>Your post Description</CardDescription>
                </CardHeader>

                <CardContent>
                    <Label htmlFor="header">Header</Label>
                    <Input placeholder="Enter your Header..." id="header" autoFocus={true} className="mb-5" />

                    <Label htmlFor="content">Content</Label>
                    <Textarea placeholder="Enter your Content..." id="content" />

                    <Button className="mx-auto px-10 block my-5">Submit</Button>
                </CardContent>

                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>

            </Card>

        </div>
    )
}