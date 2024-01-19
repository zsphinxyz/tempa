import { useState } from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

function Tags({form}:any) {

    const [tags, setTags] = useState('')
  return (
    <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                   <FormItem>
                    <FormLabel>Tag (Seperate by comma ,)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Tags" {...field} 
                            // value={tags} 
                            // onChange={(e)=>setTags(e.target.value)} 
                            onChange={field.onChange}
                            onChangeCapture={e => setTags(e.currentTarget.value)}
                      />
                    </FormControl>
                    <FormDescription className="my-2">
                        <span className="flex gap-1 flex-wrap">
                            { tags !== '' && tags.split(',').filter(i => i !== '').map( (i,j) => ( <span key={j} className="bg-muted px-2 py-1 rounded-full text-foreground mr-1 block w-fit empty:hidden">{ i.trim()}</span> ))}
                        </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
  )
}

export default Tags